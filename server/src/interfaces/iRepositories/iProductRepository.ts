import { Product, Productwithid } from "../interface";

export default interface IProductRepository {
  findProduct(id: string): Promise<Productwithid | null >;
  getAllProducts(): Promise<Productwithid[] | null>;
  saveProduct(product: Product): Promise<Productwithid | null >;
  editProduct(product: Productwithid): Promise<Productwithid | null >;
  blockProduct(id: string): Promise<Productwithid | null >;
}