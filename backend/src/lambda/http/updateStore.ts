import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";

import { UpdateStoreRequest } from "../../requests/UpdateStoreRequest";
import * as Stores from "../../businessLayer/Store";

import { getUserId } from "../utils";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const _StoreId = event.pathParameters.StoreId;
  console.log(event);
  const updatedBody: UpdateStoreRequest = JSON.parse(event.body);

  const updateResult = await Stores.updateStore(
    _StoreId,
    updatedBody,
    getUserId(event)
  );

  console.log(updateResult);
  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      updateResult,
    }),
  };
};
