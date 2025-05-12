import { S3 } from 'aws-sdk';
import { NextRequest } from 'next/server';

const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: 'v4'
});

export async function POST(req: NextRequest) {
  const { file, file_name, file_type } = await req.json();
  console.log({ file, file_name, file_type });

  try {
    if (!file || !file_name || !file_type)
      return Response.json(
        { status: 400, message: 'Missing required fields!' },
        {
          status: 400
        }
      );

    const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `uploads/${file_name}`,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: file_type
    };

    const uploadResult = await s3.upload(params).promise();

    return Response.json({
      status: 200,
      response: uploadResult.Location
    });
  } catch (error) {
    console.log({ error });

    return Response.json(
      {
        status: 500,
        message: 'Internal server error'
        //   result: error,
      },
      {
        status: 500
      }
    );
  }
}
