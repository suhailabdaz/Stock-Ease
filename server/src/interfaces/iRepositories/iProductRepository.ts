import { Product, Productwithid } from "../interface";

export default interface IProductRepository {
  findProduct(vendorid:string,id: string): Promise<Productwithid | null >;
  getAllProducts(vendorid:string): Promise<Productwithid[] | null>;
  saveProduct(product: Product): Promise<Productwithid | null >;
  editProduct(vendorId:string,id:string,product: Product): Promise<Productwithid | null >;
}