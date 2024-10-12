import iAadhar from "./iAadhar";

export interface IRepository {
    createAadharDoc(data:iAadhar): Promise<iAadhar | null>;
}