import { Request, Response } from 'express';

export interface IController {
  postAadhaar(req: Request, res: Response): Promise<void>;
}