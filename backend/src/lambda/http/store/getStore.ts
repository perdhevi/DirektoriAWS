import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";

import * as Stores from "../../../businessLayer/Store";
//import { getUserId } from "../../utils";

export const getStore: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event: ", event);
  const _StoreId = event.pathParameters.StoreId;

  // Store: Authorization for this user
  //const userId = getUserId(event);
  //console.log(userId);
  // DONE: Get all Store items for a current user
  console.log("http call to BL", _StoreId);
  const items = await Stores.getStore(_StoreId);

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
