import { Request, Response } from 'express';
import Inventservice from '../services/inventService';
import { StatusCode } from '../../enums/statusCodes';
import { StatusMessage } from '../../interfaces/interface';
import iInventService from '../../interfaces/iServices/iInventService';

const service = new Inventservice();

export default class InventController {
  private service: iInventService;

  constructor() {
    this.service = service;
  }

  addProduct = async (req: Request, res: Response) => {
    try {
      const registerResponse: StatusMessage = (await this.service.addProduct(
        req.body
      )) as StatusMessage;
      res.status(registerResponse?.status).json(registerResponse);
    } catch (error) {
      res
        .status(StatusCode.InternalServerError)
        .json({ 
          status:StatusCode.InternalServerError,
          message: 'Internal Server Error' });
    }
  };}
