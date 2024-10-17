import { Product, Productwithid } from "../interface";

export default interface IProductRepository {
  findProduct(id: string): Promise<Productwithid | null >;
  getAllProducts(): Promise<Productwithid[] | null>;
  saveProduct(product: Product): Promise<Productwithid | null >;
  editProduct(id:string,product: Product): Promise<Productwithid | null >;
}