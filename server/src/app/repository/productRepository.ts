import { Product, Productwithid } from '../../interfaces/interface';
import IProductRepository from '../../interfaces/iRepositories/iProductRepository';
import ProductModel from '../../models/productModel';

export default class ProductRepository implements IProductRepository {
  async getAllProducts(): Promise<Productwithid[] | null> {
    const products = await ProductModel.find();
    return products.length > 0 ? (products as Productwithid[]) : null;
  }

  async saveProduct(product: Product): Promise<Productwithid | null> {
    try {
      console.log(product,"ichshfsja");
      
      const savedProduct = await ProductModel.create(product);
      return savedProduct ? (savedProduct as Productwithid) : null;
    } catch (error) {
      console.error('Error saving product:', error);
      return null;
    }
  }

  async editProduct(id: string, product: Product): Promise<Productwithid | null> {
    console.log('Updating product with id:', id);
    console.log('Update data:', product);
    
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      product,
      { new: true, runValidators: true }
    );
    
    console.log('Updated product:', updatedProduct);
    
    return updatedProduct ? (updatedProduct as Productwithid) : null;
}

  
  async findProduct(id: string): Promise<Productwithid | null> {
    const product = await ProductModel.findById(id);
    return product ? (product as Productwithid) : (null as null);
  }
}
