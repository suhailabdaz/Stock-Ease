import { Customer, Customerwithid } from '../../interfaces/interface';
import ICustomerRepository from '../../interfaces/iRepositories/iCustomerRepository';
import  CustomerModel from '../../models/customerModel';

export default class CustomerRepository implements ICustomerRepository {
  async getAllCustomers(): Promise<Customerwithid[] | null> {
    const customers = await CustomerModel.find();
    return customers.length > 0 ? (customers as Customerwithid[]) : null;
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

  async editCustomer(id: string, customer: Customer): Promise<Customerwithid | null> {
    
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      customer,
      { new: true, runValidators: true }
    );
        
    return updatedCustomer ? (updatedCustomer as Customerwithid) : null;
}

  
  async findCustomer(id: string): Promise<Customerwithid | null> {
    const customer = await CustomerModel.findById(id);
    return customer ? (customer as Customerwithid) : (null as null);
  }
}
