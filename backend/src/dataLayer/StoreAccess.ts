import { StoreItem, StorePagedItem } from "../models/StoreItem";
import { StoreUpdate } from "../models/StoreUpdate";
import * as AWS from "aws-sdk";
import { createLogger } from "../utils/logger";
const logger = createLogger("StoreAccess");

export class StoreAccess {
  constructor(
    private readonly docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly StoreTable = process.env.STORE_TABLE,
    private readonly StoreIndex = process.env.INDEX_NAME
  ) {}

  async getAllStores(lastKey): Promise<StorePagedItem> {
    let result = null;
    console.log(lastKey);
    if (!lastKey || lastKey == null || lastKey === "null")
      result = await this.docClient
        .scan({
          TableName: this.StoreTable,
          Limit: 5,
        })
        .promise();
    else
      result = await this.docClient
        .scan({
          TableName: this.StoreTable,
          Limit: 5,
          ExclusiveStartKey: { StoreId: lastKey },
        })
        .promise();

    const items = result;
    return items as StorePagedItem;
  }

  async getStores(userId): Promise<StoreItem[]> {
    const result = await this.docClient
      .query({
        TableName: this.StoreTable,
        IndexName: this.StoreIndex,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise();
    const items = result.Items;
    return items as StoreItem[];
  }

  async createStore(item: StoreItem): Promise<StoreItem> {
    await this.docClient
      .put({
        TableName: this.StoreTable,
        Item: item,
      })
      .promise()
      .then((res) => res)
      .catch((err) => logger.info(err));

    return item;
  }

  async getStore(userId, StoreId): Promise<StoreItem> {
    logger.info("------ DL:getStore Start---------");
    const queryRest = await this.docClient
      .query({
        TableName: this.StoreTable,
        IndexName: this.StoreIndex,
        KeyConditionExpression: "StoreId = :storeKey AND userId = :userKey",

        ExpressionAttributeValues: {
          ":storeKey": StoreId,
          ":userKey": userId,
        },
      })
      .promise();

    logger.info(queryRest);

    const items = queryRest.Items[0];
    logger.info(items);
    logger.info("------ DL:getStore end---------");
    return items as StoreItem;
  }

  async updateStore(StoreId, userId, updatedStore: StoreUpdate): Promise<any> {
    logger.info("------ DL:updateStore Start---------");

    const updateResult = await this.docClient
      .update({
        TableName: this.StoreTable,

        Key: { StoreId: StoreId, userId: userId },
        ExpressionAttributeValues: {
          ":name": updatedStore.name,
          ":phone": updatedStore.phone,
          ":address": updatedStore.address,
          ":notes": updatedStore.notes,
        },
        ExpressionAttributeNames: {
          "#nm": "name",
        },
        UpdateExpression:
          "SET #nm = :name, phone = :phone, address = :address, notes = :notes",

        ReturnValues: "UPDATED_NEW",
      })
      .promise()
      .then((res) => {
        logger.info(res);
        return res.Attributes as StoreUpdate;
      })
      .catch((err) => logger.info(err));

    logger.info(updateResult);
    logger.info("------ DL:updateStore End---------");
    return updateResult;
  }

  async updateStoreAttachment(StoreId, attachmentUrl): Promise<any> {
    logger.info("------ DL:updateStoreAttachment Start---------");
    logger.info("-----updating Store table-----");
    logger.info("find : ", StoreId);
    const queryRest = await this.docClient
      .query({
        TableName: this.StoreTable,
        KeyConditionExpression: "StoreId = :paritionKey",
        ExpressionAttributeValues: {
          ":paritionKey": StoreId,
        },
      })
      .promise();

    if (queryRest.Count === 0) {
      logger.info("Nooooo");
      return;
    } else {
      logger.info("found and running update");
      //const userId = queryRest.Items[0].userId;
      await this.docClient
        .update({
          TableName: this.StoreTable,
          Key: { StoreId: StoreId },
          ExpressionAttributeValues: {
            ":attachmentUrl": attachmentUrl,
          },
          UpdateExpression: "SET attachmentUrl = :attachmentUrl",

          ReturnValues: "UPDATED_NEW",
        })
        .promise()
        .then((res) => {
          return res;
        });
    }
    logger.info("------ DL:updateStoreAttachment End---------");
  }

  async deleteStore(userId, StoreId): Promise<any> {
    await this.docClient
      .delete({
        TableName: this.StoreTable,
        Key: {
          StoreId: StoreId,
          userId: userId,
        },
      })
      .promise()
      .then((res) => {
        return res;
      })
      .catch((err) => logger.info(err));
  }
}
