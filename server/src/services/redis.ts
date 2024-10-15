import { createClient } from 'redis';
import { User } from '../interfaces/interface';

const client = createClient();

client.on('error', (err: any) => {
  console.error('Redis Client Error', err);
});

client.connect().catch(console.error);

export const otpSetData = async (data: User, otp: string) => {
  try {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      otp: otp,
    };

console.log("preredis",userData);

    await Promise.all([
      client.hSet(`user:${data.email}`, userData),
      client.expire(`user:${data.email}`, 300),
    ]);
    console.log('data setted');
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (email: string): Promise<User | null> => {
  try {
    const userData = await client.hGetAll(`user:${email}`);
    if (Object.keys(userData).length === 0) {
      return null;
    }
    const user: User = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      otp: userData.otp || '',
    };
    return user;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

export default client;
