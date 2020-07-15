import { ImageItem } from "../models/ImageItem";
import * as AWS from "aws-sdk";
import { createLogger } from "../utils/logger";
const logger = createLogger("ImageAccess");

export class ImageAccess {
  constructor(
    private readonly docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly ImageTable = process.env.IMAGE_TABLE,
    private readonly ImageIndex = process.env.IMAGE_INDEX
  ) {}

  async addImage(pStoreId, pImageId): Promise<ImageItem> {
    const item: ImageItem = { StoreId: pStoreId, imageId: pImageId };
    logger.info(item);
    await this.docClient
      .put({
        TableName: this.ImageTable,
        Item: item,
      })
      .promise()
      .then((res) => res)
      .catch((err) => logger.info(err));

    return item;
  }

  async updateImageUrl(pImageId, pUrl): Promise<any> {
    logger.info("------ DL:image.UpdateUrl Start---------");
    logger.info("userId : ", pImageId);
    console.log("userId : ", pImageId);
    const updateResult = await this.docClient
      .update({
        TableName: this.ImageTable,
        Key: { imageId: pImageId },
        ExpressionAttributeValues: {
          ":url": pUrl,
        },
        ExpressionAttributeNames: {
          "#url": "url",
        },
        UpdateExpression: "SET #url = :url",

        ReturnValues: "ALL_NEW",
      })
      .promise()
      .then((res) => {
        logger.info(res);
        return res.Attributes as ImageItem;
      })
      .catch((err) => logger.info(err));

    logger.info(updateResult);
    logger.info("------ DL:image.UpdateUrl Start End---------");

    return updateResult;
  }

  async getImages(StoreId): Promise<ImageItem[]> {
    const result = await this.docClient
      .query({
        TableName: this.ImageTable,
        IndexName: this.ImageIndex,
        KeyConditionExpression: "StoreId = :StoreId",
        ExpressionAttributeValues: {
          ":StoreId": StoreId,
        },
      })
      .promise();
    const items = result.Items;
    return items as ImageItem[];
  }
}
