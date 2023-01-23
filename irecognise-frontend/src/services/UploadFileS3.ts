import ReactS3Client from 'react-aws-s3-typescript';
import { s3Config } from "./s3Config";

export const uploadFileS3 = async (file: any, filename: string, dirName: string ) => {

    const s3 = new ReactS3Client({
        ...s3Config,
        dirName: dirName
    });

    try {
        filename = filename.split('.')[0]; // remove extension
        const res = await s3.uploadFile(file, filename);

        console.log(res);
        /*
        * {
        *   Response: {
        *     bucket: "bucket-name",
        *     key: "directory-name/filename-to-be-uploaded",
        *     location: "https:/your-aws-s3-bucket-url/directory-name/filename-to-be-uploaded"
        *   }
        * }
        */

    } catch (exception) {
        console.log(exception);
    }
}

export const listFilesS3 = async ( dirName?: string ) => {
    const s3 = new ReactS3Client({
        ...s3Config,
    });

    try {
        const fileList = await s3.listFiles();
        const contents = fileList.data.Contents

        // console.log(fileList);

        if (dirName) {
            const res: any[] = [];
            contents.filter((object: any) => !object.Key.endsWith('/')).forEach((object: any) => {
                if (object.Key.startsWith(`${dirName}`)) {
                    // console.log(idx)
                    // console.log(object.Key)
                    // console.log(object)
                    res.push(object)
                }
            });
            return res
        }

        return contents

        /*
        * {
        *   Response: {
        *     message: "Objects listed succesfully",
        *     data: {                   // List of Objects
        *       ...                     // Meta data
        *       Contents: []            // Array of objects in the bucket
        *     }
        *   }
        * }
        */

    } catch (exception) {
        console.log(exception);
        /* handle the exception */
    }
}