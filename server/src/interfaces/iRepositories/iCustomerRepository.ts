import { Customer, Customerwithid } from "../interface";

export default interface ICustomerRepository {
  findCustomer(id: string): Promise<Customerwithid | null >;
  getAllCustomers(): Promise<Customerwithid[] | null>;
  saveCustomer(customer: Customer): Promise<Customerwithid | null >;
  editCustomer(id:string,customer: Customer): Promise<Customerwithid | null >;
}