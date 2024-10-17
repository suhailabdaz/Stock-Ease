import {AddProductReq,AddProductResponse,AllProductsReq,AllProductsRes,BlockProductReq,BlockProductRes,EditProductReq
,EditProductRes,GetProductReq,GetProductRes,ErrorRes
} from '../iDTOs/iInventDTO'

export default interface iInventService {
  addProduct(data:AddProductReq):Promise<AddProductResponse | ErrorRes>
  getAllProducts(data:AllProductsReq):Promise<AllProductsRes | ErrorRes>
  editProduct(data:EditProductReq):Promise<EditProductRes | ErrorRes>
  getProduct(data:GetProductReq):Promise<GetProductRes | ErrorRes>
}