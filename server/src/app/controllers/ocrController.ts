import { Request, Response } from 'express';

import { IController } from '../../interfaces/iController';
import aadharRepository from "../repository/aadharRepository";

const aadahrRepo=new aadharRepository()



export default class Controller implements IController {
  postAadhaar = async (req: Request, res: Response): Promise<void> => {
    
  }
}