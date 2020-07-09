import { CategoryItem } from "../models/CategoryItems";
import * as AWS from "aws-sdk";
import { createLogger } from "../utils/logger";
const logger = createLogger("CategoryAccess");

export class CategoryAccess {
  constructor(
    private readonly docClient: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly CategoryTable = process.env.CATEGORY_TABLE
  ) {}

  async getCategories(): Promise<CategoryItem[]> {
    logger.info("------ DL:getCategories Start---------");
    const result = await this.docClient
      .scan({
        TableName: this.CategoryTable,
      })
      .promise();
    const items = result.Items;
    logger.info("------ DL:getCategories End---------");
    return items as CategoryItem[];
  }
}
