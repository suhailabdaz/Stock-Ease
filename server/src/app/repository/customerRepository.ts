import { Customer, Customerwithid } from '../../interfaces/interface';
import ICustomerRepository from '../../interfaces/iRepositories/iCustomerRepository';
import  CustomerModel from '../../models/customerModel';

export default class CustomerRepository implements ICustomerRepository {
  async getAllCustomers(vendorid:string): Promise<Customerwithid[] | null> {
    const customers = await CustomerModel.find({vendorid:vendorid});
    return customers ? (customers as Customerwithid[]) : null;
  }

  async saveCustomer(customer: Customer): Promise<Customerwithid | null> {
    try {      
      const savedCustomer = await CustomerModel.create(customer);
      return savedCustomer ? (savedCustomer as Customerwithid) : null;
    } catch (error) {
      console.error('Error saving customer:', error);
      return null;
    }
  }

  async editCustomer(vendorid: string, id: string, customer: Customer): Promise<Customerwithid | null> {
    const existingCustomer = await CustomerModel.findOne({ _id: id, vendorid });
  
    if (!existingCustomer) {
      return null
    }
  
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      customer,
      { new: true, runValidators: true }
    );
  
    return updatedCustomer ? (updatedCustomer as Customerwithid) : null;
  }
  

  
  async findCustomer(vendorid:string,id: string): Promise<Customerwithid | null> {
    const customer = await CustomerModel.findOne({_id:id,vendorid:vendorid});
    return customer ? (customer as Customerwithid) : (null as null);
  }
}
