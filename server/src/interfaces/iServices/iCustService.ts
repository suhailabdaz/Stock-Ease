import {AddCustomerReq,AddCustomerResponse,AllCustomersReq,AllCustomersRes,EditCustomerReq
  ,EditCustomerRes,GetCustomerReq,GetCustomerRes,ErrorRes
  } from '../iDTOs/iCustDTO'
  
  export default interface iCustService {
    addCustomer(data:AddCustomerReq):Promise<AddCustomerResponse | ErrorRes>
    getAllCustomers(data:AllCustomersReq):Promise<AllCustomersRes | ErrorRes>
    editCustomer(data:EditCustomerReq):Promise<EditCustomerRes | ErrorRes>
    getCustomer(data:GetCustomerReq):Promise<GetCustomerRes | ErrorRes>
  }