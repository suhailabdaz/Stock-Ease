export default interface RequestWithFiles extends Request {
  files: {
    [fieldname: string]: Express.Multer.File[];
  };
}