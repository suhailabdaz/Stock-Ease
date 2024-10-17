declare global {
  namespace Express {
    interface Request {
      userId?: string; // Add this line to extend the Request type
    }
  }
}
import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { StatusCode } from '../enums/statusCodes';
import { DecodedToken } from '../interfaces/interface';
import redisClient from './redis';
import { generateTokenOptions } from '../utils/generateTokenOptions';
const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'suhail';

export default class JwtControllers {
  constructor() {}

  createToken = async (
    userId: ObjectId | string,
    expire: string,
    secret: string
  ): Promise<string> => {
    try {
      const token = jwt.sign({ userId }, secret, { expiresIn: expire });
      return token;
    } catch (error) {
      console.error('Error creating token:', error);
      throw new Error('Failed to create token');
    }
  };
  isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =  req.cookies.token

      console.log(token, 'Token validating...');

      if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
      }

      // Check if token is blacklisted
      const isBlacklisted = await this.isTokenBlacklisted(token);
      if (isBlacklisted) {
        return res
          .status(StatusCode.Unauthorized)
          .json({ message: 'Token is blacklisted' });
      }

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || 'suhail'
      ) as DecodedToken;
      console.log(decoded, 'Decoded token');

      if (!decoded) {
        return res
          .status(StatusCode.Unauthorized)
          .json({ message: 'Invalid token' });
      }

      req.userId = decoded.id;

      return next();
    } catch (e) {
      console.error(e);
      return res
        .status(StatusCode.Unauthorized)
        .json({ message: 'Token authentication failed' });
    }
  };
  refreshToken = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is missing' });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET_KEY || 'rashi123'
      ) as DecodedToken;

      if (!decoded) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      const newRefreshToken = jwt.sign(
        { id: decoded.userId },
        process.env.JWT_REFRESH_SECRET_KEY || 'suhailrefresh',
        {
          expiresIn: '7d',
        }
      );

      const newAccessToken = jwt.sign(
        { id: decoded.userId },
        process.env.JWT_SECRET_KEY || 'suhail',
        {
          expiresIn: '15m',
        }
      );
      const options = generateTokenOptions();

      // Set the new tokens as HttpOnly cookies
      res.cookie('token', newAccessToken, options.accessTokenOptions);

      res.cookie('refreshToken', newRefreshToken,options.refreshTokenOptions);

      return res.json({ message: 'Tokens refreshed successfully' });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ message: 'Something went wrong in authentication' });
    }
  };

  public async logout(req: Request, res: Response): Promise<Response> {
    try {
      const accessToken = req.cookies.token;  // Extract access token
      const refreshToken = req.cookies.refreshToken; // Extract refresh token
      
      if (!accessToken || !refreshToken) {
        return res.status(StatusCode.BadRequest).json({ message: 'Tokens not provided' });
      }
  
      // Add the access token to the Redis blacklist (using TTL matching the token expiration)
      const accessTokenExpireTime = 3600; // TTL for access token (1 hour or adjust to match your JWT expiry)
      await redisClient.setEx(accessToken, accessTokenExpireTime, 'blacklisted');
  
      // Add the refresh token to the Redis blacklist (TTL based on refresh token expiry)
      const refreshTokenExpireTime = 604800; // TTL for refresh token (7 days, adjust as needed)
      await redisClient.setEx(refreshToken, refreshTokenExpireTime, 'blacklisted');
  
      // Clear cookies from the client
      res.clearCookie('token', { path: '/' });
      res.clearCookie('refreshToken', { path: '/auth/' });
  
      return res.status(StatusCode.OK).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Error logging out:', error);
      return res.status(StatusCode.InternalServerError).json({ error: 'Error logging out' });
    }
  }
  

  async isTokenBlacklisted(token: string): Promise<boolean | null> {
    try {
      const result = await redisClient.get(token);
      return result === 'blacklisted';
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
