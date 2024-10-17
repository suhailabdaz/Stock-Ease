import { Request, Response } from 'express';
import Custservice from '../services/custService';
import { StatusCode } from '../../enums/statusCodes';
import { StatusMessage } from '../../interfaces/interface';
import iCustService from '../../interfaces/iServices/iCustService';

const service = new Custservice();

export default class CustController {
  private service: iCustService;

  constructor() {
    this.service = service;
  }

  addCustomer = async (req: Request, res: Response) => {
    try {
      const registerResponse: StatusMessage = (await this.service.addCustomer(
        req.body
      )) as StatusMessage;
      res.status(registerResponse?.status).json(registerResponse);
    } catch (error) {
      res.status(StatusCode.InternalServerError).json({
        status: StatusCode.InternalServerError,
        message: 'Internal Server Error',
      });
    }
  };
  getAllCustomers = async (req: Request, res: Response) => {
    try {
      const AllCustomersResponse = await this.service.getAllCustomers(null);
      res.status(AllCustomersResponse.status).json(AllCustomersResponse);
    } catch {
      res.status(StatusCode.InternalServerError).json({
        status: StatusCode.InternalServerError,
        message: 'Internal Server Error',
      });
    }
  };
  getCustomer = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const getCustomerResponse = await this.service.getCustomer(id);
      res.status(getCustomerResponse.status).json(getCustomerResponse);
    } catch {
      res.status(StatusCode.InternalServerError).json({
        status: StatusCode.InternalServerError,
        message: 'Internal Server Error',
      });
    }
  };
  editCustomer = async (req: Request, res: Response) => {
    try {
      const _id = req.params.id as string;

      const getCustomerResponse = await this.service.editCustomer({
        _id,
        customer: req.body.customer,
      });
      res.status(getCustomerResponse.status).json(getCustomerResponse);
    } catch {
      res.status(StatusCode.InternalServerError).json({
        status: StatusCode.InternalServerError,
        message: 'Internal Server Error',
      });
    }
  };
}
