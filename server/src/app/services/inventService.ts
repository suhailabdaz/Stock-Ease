import { StatusCode } from '../../enums/statusCodes';
import { AddProductReq, AddProductResponse, ErrorRes, AllProductsReq, AllProductsRes, EditProductReq,
        EditProductRes, GetProductReq, GetProductRes, BlockProductReq, BlockProductRes 
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
  async addProduct(data: AddProductReq): Promise<AddProductResponse | ErrorRes> {
    try{
          const AddProduct = await this.repository.saveProduct(data)
          if(AddProduct){
            return {
              status: StatusCode.Created as number,
              message: 'Product Added Succesfully',
            };
          }else{
            return {
              status: StatusCode.BadRequest as number,
              message: 'Internal Server Error',
            };
          }
    }catch{
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  }
  getAllProducts(data: AllProductsReq): Promise<AllProductsRes | ErrorRes> {
    throw new Error('Method not implemented.');
  }
  editProduct(data: EditProductReq): Promise<EditProductRes | ErrorRes> {
    throw new Error('Method not implemented.');
  }
  getProduct(data: GetProductReq): Promise<GetProductRes | ErrorRes> {
    throw new Error('Method not implemented.');
  }
  blockProduct(data: BlockProductReq): Promise<BlockProductRes | ErrorRes> {
    throw new Error('Method not implemented.');
  }
 

}
