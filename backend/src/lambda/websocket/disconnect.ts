import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import * as AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient();

const connectionTable = process.env.CONNECTIONS_TABLE;


export const handler: APIGatewayProxyHandler = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Websocket connect ', event);

    const connectionId = event.requestContext.connectionId
    
    const item ={
        id:connectionId
    }

    await docClient.delete({
        TableName: connectionTable,
        Key: item
        }
    ).promise();

    return{
        statusCode: 200,
        body: ''
    }
}