import { DynamoDBStreamEvent, DynamoDBStreamHandler } from "aws-lambda";
import "source-map-support/register";

import * as elasticsearch from "elasticsearch";
import * as httpAwsEs from "http-aws-es";

const esHost = process.env.ES_ENDPOINT;
const es = new elasticsearch.Client({
  hosts: [esHost],
  connectionClass: httpAwsEs,
});

export const handler: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  console.log("Processing Event batch from DynamoDB", JSON.stringify(event));

  for (const record of event.Records) {
    console.log("Processing event ", JSON.stringify(record));

    if (record.eventName !== "INSERT") {
      continue;
    }

    const newItem = record.dynamodb.NewImage;

    const StoreId = newItem.StoreId.S;

    const body = {
      StoreId: StoreId,
      createdAt: newItem.createdAt.S,
      name: newItem.name.S,
      dueDate: newItem.dueDate.S,
      done: newItem.done.BOOL,
    };

    await es.index({
      index: "Store-index",
      type: "Stores",
      id: "StoreId",
      body,
    });
  }
};
