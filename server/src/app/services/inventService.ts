import { StatusCode } from '../../enums/statusCodes';
import {
  AddProductReq,
  AddProductResponse,
  ErrorRes,
  AllProductsReq,
  AllProductsRes,
  EditProductReq,
  EditProductRes,
  GetProductReq,
  GetProductRes,
  BlockProductReq,
  BlockProductRes,
} from '../../interfaces/iDTOs/iInventDTO';
import IProductRepository from '../../interfaces/iRepositories/iProductRepository';
import iInventService from '../../interfaces/iServices/iInventService';
import ProductRepository from '../repository/productRepository';

const repository = new ProductRepository();

export default class InventService implements iInventService {
  private repository: IProductRepository;
  constructor() {
    this.repository = repository;
  }
  async addProduct(
    data: AddProductReq
  ): Promise<AddProductResponse | ErrorRes> {
    try {
      const AddProduct = await this.repository.saveProduct(data);
      if (AddProduct) {
        return {
          status: StatusCode.Created as number,
          message: 'Product Added Succesfully',
        };
      } else {
        return {
          status: StatusCode.BadRequest as number,
          message: 'Internal Server Error',
        };
      }
    } catch {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  }
  async getAllProducts(
    data: AllProductsReq
  ): Promise<AllProductsRes | ErrorRes> {
    try {
      const AllProduct = await this.repository.getAllProducts();
      if (AllProduct) {
        return {
          status: StatusCode.OK as number,
          message: 'Got all products',
          products: AllProduct,
        };
      } else {
        return {
          status: StatusCode.Conflict as number,
          message: 'Error Fetching Products',
        };
      }
    } catch {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  }

  async editProduct(data: EditProductReq): Promise<EditProductRes | ErrorRes> {
    try {
      console.log(data.product,"inservice");
      
      const Product = await this.repository.editProduct(data._id,data.product);
      if (Product) {
        return {
          status: StatusCode.OK as number,
          message: 'Got  product',
          product: Product,
        };
      } else {
        return {
          status: StatusCode.Conflict as number,
          message: 'Error Fetching Products',
        };
      }
    } catch {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
    }
  async getProduct(
    data: string
  ): Promise<GetProductRes | ErrorRes> {
    try {
      const Product = await this.repository.findProduct(data);
      if (Product) {
        return {
          status: StatusCode.OK as number,
          message: 'Got  product',
          product: Product,
        };
      } else {
        return {
          status: StatusCode.Conflict as number,
          message: 'Error Fetching Products',
        };
      }
    } catch {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  }
  
}
