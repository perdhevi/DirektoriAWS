import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";

//import * as AWS from 'aws-sdk';
import { getUserId } from "../../utils";
import * as Stores from "../../../businessLayer/Store";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //Store: Add authorization

  const _StoreId = event.pathParameters.StoreId;
  //const docClient = new AWS.DynamoDB.DocumentClient();
  //const StoreTable = process.env.STORE_TABLE;

  // DONE: Remove a Store item by id
  const userId = getUserId(event);
  console.log("deleting");
  console.log(userId);
  console.log(_StoreId);
  await Stores.deleteStore(_StoreId, userId);
  /*
  const queryRest = await docClient.query({
    TableName: StoreTable,
    KeyConditionExpression: 'StoreId = :paritionKey AND userId = :hashKey',
    ExpressionAttributeValues: {
      ':paritionKey': _StoreId,
      ':hashKey': userId
    }
  })
  .promise();  
  if(queryRest.Count === 0 ){
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body:"{ message: empty }"
       
    }
  }
  await docClient.delete({
    TableName: StoreTable,
    Key: { 
      'StoreId': _StoreId,
      'userId' : queryRest.Items[0].userId
    }
  }).promise().then(res => res).catch(err => console.log(err));
  */

  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: "",
  };
};
