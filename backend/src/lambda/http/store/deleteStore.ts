import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";

//import * as AWS from 'aws-sdk';
import { getUserId } from "../../utils";
import * as Stores from "../../../businessLayer/Store";

export const storeDelete: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //Store: Add authorization
  const _StoreId = event.pathParameters.StoreId;
  // DONE: Remove a Store item by id
  const userId = getUserId(event);
  console.log("deleting");
  console.log(userId);
  console.log(_StoreId);
  await Stores.deleteStore(_StoreId, userId);

  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: "",
  };
};
