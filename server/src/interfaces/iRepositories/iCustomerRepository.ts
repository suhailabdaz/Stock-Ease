import { Customer, Customerwithid } from "../interface";

export default interface ICustomerRepository {
  findCustomer(vendorid:string,id:string): Promise<Customerwithid | null >;
  getAllCustomers(vendorid:string): Promise<Customerwithid[] | null>;
  saveCustomer(customer: Customer): Promise<Customerwithid | null >;
  editCustomer(vendorid:string,id:string,customer: Customer): Promise<Customerwithid | null >;
}