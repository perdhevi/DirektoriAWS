import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";

import * as Stores from "../../../businessLayer/Store";

export const storeGetByCategory: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event: ", event);
  const lastKey = event.pathParameters.lastKey;
  const categoryId = event.pathParameters.categoryId;
  const items = await Stores.getStoreByCategory(categoryId, lastKey);

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
