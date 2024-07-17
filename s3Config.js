import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import mime from 'mime-types';

import {
    AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_S3_BUCKET,
} from './constants/config.js';

const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_S3_BUCKET,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const productsFolder = 'product-images';
            const fileName = Date.now().toString() + '-' + file.originalname;
            cb(null, productsFolder + '/' + fileName);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
});

export default upload;