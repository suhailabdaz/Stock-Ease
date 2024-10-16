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

  async editProduct(product: Productwithid): Promise<Productwithid | null> {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      product._id,
      product,
      { new: true }
    );
    return updatedProduct ? (updatedProduct as Productwithid) : null;
  }

  async blockProduct(id: string): Promise<Productwithid | null> {
    const product = await ProductModel.findById(id);
    if (!product) {
      return null;
    }
    const newStatus = product.status === 'blocked' ? 'active' : 'blocked';
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true } 
    );
    return updatedProduct ? (updatedProduct as Productwithid) : null;
  }

  async findProduct(id: string): Promise<Productwithid | null> {
    const product = await ProductModel.findById(id);
    return product ? (product as Productwithid) : (null as null);
  }
}
