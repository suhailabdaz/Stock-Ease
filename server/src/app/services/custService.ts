import { StatusCode } from '../../enums/statusCodes';
import {
  AddCustomerReq,
  AddCustomerResponse,
  ErrorRes,
  AllCustomersReq,
  AllCustomersRes,
  EditCustomerReq,
  EditCustomerRes,
  GetCustomerRes,
  GetCustomerReq,
} from '../../interfaces/iDTOs/iCustDTO';
import ICustomerRepository from '../../interfaces/iRepositories/iCustomerRepository';
import iCustService from '../../interfaces/iServices/iCustService';
import CustomerRepository from '../repository/customerRepository';

const repository = new CustomerRepository();

export default class CustService implements iCustService {
  private repository: ICustomerRepository;
  constructor() {
    this.repository = repository;
  }
  async addCustomer(
    data: AddCustomerReq
  ): Promise<AddCustomerResponse | ErrorRes> {
    try {
      const AddCustomer = await this.repository.saveCustomer(data);
      if (AddCustomer) {
        return {
          status: StatusCode.Created as number,
          message: 'Customer Added Succesfully',
        };
      } else {
        return {
          status: StatusCode.BadRequest as number,
          message: 'Internal Server Error',
        };
      }
    } catch {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  }
  async getAllCustomers(
    data: AllCustomersReq
  ): Promise<AllCustomersRes | ErrorRes> {
    try {
      const AllCustomer = await this.repository.getAllCustomers(data);
      if (AllCustomer) {
        return {
          status: StatusCode.OK as number,
          message: 'Got all customers',
          customers: AllCustomer,
        };
      } else {
        return {
          status: StatusCode.Conflict as number,
          message: 'Error Fetching Products',
        };
      }
    } catch {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  }

  async editCustomer(data: EditCustomerReq): Promise<EditCustomerRes | ErrorRes> {
    try {      
      const Customer = await this.repository.editCustomer(data.vendorid,data._id,data.customer);
      if (Customer) {
        return {
          status: StatusCode.OK as number,
          message: 'Got  customer',
          customer: Customer,
        };
      } else {
        return {
          status: StatusCode.Conflict as number,
          message: 'Error Fetching Products',
        };
      }
    } catch {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
    }
  async getCustomer(
    data: GetCustomerReq
  ): Promise<GetCustomerRes | ErrorRes> {
    try {
      const Customer = await this.repository.findCustomer(data.vendorid,data.id);
      if (Customer) {
        return {
          status: StatusCode.OK as number,
          message: 'Got  customer',
          customer: Customer,
        };
      } else {
        return {
          status: StatusCode.Conflict as number,
          message: 'Error Fetching customer',
        };
      }
    } catch {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  }
  
}
