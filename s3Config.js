import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import mime from 'mime-types';

import { Config } from './constants/index.js';

const s3 = new S3Client({
    region: Config.AWS_REGION,
    credentials: {
        accessKeyId: Config.AWS_ACCESS_KEY,
        secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: Config.AWS_S3_BUCKET,
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
