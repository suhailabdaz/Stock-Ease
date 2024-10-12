import express from 'express';
import Controller from '../controllers/ocrController';
import upload from '../../utils/multer';

const controller = new Controller()

const router = express.Router();

router.post('/parse-aadhar',upload.fields([{name:'frontImage'}, {name:"backImage"}]),controller.postAadhaar)

export default router;