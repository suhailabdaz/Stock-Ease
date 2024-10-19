import { Product, Productwithid } from '../../interfaces/interface';
import IProductRepository from '../../interfaces/iRepositories/iProductRepository';
import ProductModel from '../../models/productModel';

export default class ProductRepository implements IProductRepository {
  async getAllProducts(vendorid:string): Promise<Productwithid[] | null> {
    const products = await ProductModel.find({vendorid:vendorid});
    return products? (products as Productwithid[]) : null;
  }

  async saveProduct(product: Product): Promise<Productwithid | null> {
    try {      
      const savedProduct = await ProductModel.create(product);
      return savedProduct ? (savedProduct as Productwithid) : null;
    } catch (error) {
      console.error('Error saving product:', error);
      return null;
    }
  }

  async editProduct(vendorid:string,id: string, product: Product): Promise<Productwithid | null> {
    const existingProduct = await ProductModel.findOne({ _id: id, vendorid });

    if (!existingProduct) {
      return null
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      product,
      { new: true, runValidators: true }
    );
        
    return updatedProduct ? (updatedProduct as Productwithid) : null;
}

  
  async findProduct(vendorid:string,id: string): Promise<Productwithid | null> {
    const product = await ProductModel.findOne({vendorid:vendorid,_id:id});
    return product ? (product as Productwithid) : (null as null);
  }
}
