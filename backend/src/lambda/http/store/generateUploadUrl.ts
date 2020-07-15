import "source-map-support/register";
import * as AWS from "aws-sdk";

import * as Stores from "../../../businessLayer/Store";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";

export const storeUploadURL: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const StoreId = event.pathParameters.StoreId;
  const s3bucket = process.env.IMAGES_S3_BUCKET;
  //const urlExpiration = process.env.SIGNED_URL_EXPIRATION
  console.log(StoreId);

  const s3 = new AWS.S3({
    signatureVersion: "v4", // Use Sigv4 algorithm
  });
  const uuid = require("uuid");
  const fileId = uuid.v4();
  const keyId = StoreId;
  console.log(keyId);
  const result = await Stores.addImage(StoreId, fileId);
  console.log(result);
  const presignedUrl = s3.getSignedUrl("putObject", {
    // The URL will allow to perform the PUT operation
    Bucket: s3bucket, // Name of an S3 bucket
    Key: result.imageId, // id of an object this URL allows access to
    Expires: 3000, // A URL is only valid for 5 minutes
  });
  console.log(presignedUrl);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ uploadUrl: presignedUrl }),
  };
};
