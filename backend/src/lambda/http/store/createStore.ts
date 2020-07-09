import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";

import { getUserId } from "../../utils";
import * as Stores from "../../../businessLayer/Store";
import { CreateStoreRequest } from "../../../requests/CreateStoreRequest";

export const storeCreate: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("getting user id");
  const userId = getUserId(event);
  console.log(event.body);
  console.log("parsing event body");
  const newStore: CreateStoreRequest = JSON.parse(event.body);

  const item = await Stores.createStore(newStore, userId);
  console.log(item);
  // DONE: Implement creating a new Store item
  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      item,
    }),
  };
};
