import mongoose from 'mongoose';
import AadharModel from '../../entities/aadharInfo';
import { IRepository } from '../../interfaces/iRepository';
import AadhaarInfo from '../../interfaces/iAadhar';

export default class aadharRepository implements IRepository {
  createAadharDoc = async (data: AadhaarInfo): Promise<AadhaarInfo | null> => {
    return null
  };
}
