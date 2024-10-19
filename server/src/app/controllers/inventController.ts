import { Request, Response } from 'express';
import Inventservice from '../services/inventService';
import { StatusCode } from '../../enums/statusCodes';
import { StatusMessage } from '../../interfaces/interface';
import iInventService from '../../interfaces/iServices/iInventService';

const service = new Inventservice();

export default class InventController {
  private service: iInventService;

  constructor() {
    this.service = service;
  }

  addProduct = async (req: Request, res: Response) => {
    try {
      const registerResponse: StatusMessage = (await this.service.addProduct(
        req.body
      )) as StatusMessage;
      res.status(registerResponse?.status).json(registerResponse);
    } catch (error) {
      res
        .status(StatusCode.InternalServerError)
        .json({ 
          status:StatusCode.InternalServerError,
          message: 'Internal Server Error' });
    }
  };
getAllProducts = async (req:Request,res:Response)=>{
  try{
      const AllProductsResponse = await this.service.getAllProducts(req.params.vendorid) 
      res.status(AllProductsResponse.status).json(AllProductsResponse);
  }catch{
    res
    .status(StatusCode.InternalServerError)
    .json({ 
      status:StatusCode.InternalServerError,
      message: 'Internal Server Error' });  }
}
 getProduct= async (req:Request,res:Response)=>{
  try{const id = req.params.id as string;
    const vendorid = req.params.vendorid as string
      const getProductResponse = await this.service.getProduct({vendorid:vendorid,id:id}) 
      res.status(getProductResponse.status).json(getProductResponse);
  }catch{
    res
    .status(StatusCode.InternalServerError)
    .json({ 
      status:StatusCode.InternalServerError,
      message: 'Internal Server Error' });  }
}
editProduct= async (req:Request,res:Response)=>{
  try{const _id = req.params.id as string
      const vendorid = req.params.vendorid as string
      const getProductResponse = await this.service.editProduct({vendorid:vendorid,_id,product:req.body.product}) 
      res.status(getProductResponse.status).json(getProductResponse);
  }catch{
    res
    .status(StatusCode.InternalServerError)
    .json({ 
      status:StatusCode.InternalServerError,
      message: 'Internal Server Error' });  }
}
}
