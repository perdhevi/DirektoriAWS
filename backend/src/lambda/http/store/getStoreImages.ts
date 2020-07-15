import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";

import * as Stores from "../../../businessLayer/Store";
//import { getUserId } from "../../utils";

export const storeGetStoreImages: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event: ", event);
  // Store: Authorization for this user
  // DONE: Get all Store items for a current user
  const storeId = event.pathParameters.storeId;
  const items = await Stores.getStoreImages(storeId);

  console.log("Fetch complete with ", items);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ items }),
  };
};
