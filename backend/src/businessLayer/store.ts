import { StoreItem, StorePagedItem } from "../models/StoreItem";
import { StoreAccess } from "../dataLayer/StoreAccess";
import { CreateStoreRequest } from "../requests/CreateStoreRequest";
import { UpdateStoreRequest } from "../requests/UpdateStoreRequest";

const storeAccess = new StoreAccess();

export async function getStores(userId): Promise<StoreItem[]> {
  return storeAccess.getStores(userId);
}

export async function getStore(StoreId): Promise<StoreItem> {
  return storeAccess.getStore(StoreId);
}

export async function getAllStore(lastKey: any): Promise<StorePagedItem> {
  return storeAccess.getAllStores(lastKey);
}

export async function getStoreByCategory(
  categoryId: string,
  lastKey: any
): Promise<StorePagedItem> {
  return storeAccess.getStoresByCategory(categoryId, lastKey);
}

export async function createStore(newStore: CreateStoreRequest, userId) {
  const uuid = require("uuid");
  const _StoreId = uuid.v4();
  const _now = new Date();

  const item = {
    StoreId: _StoreId,
    createdAt: _now.toISOString(),
    userId: userId,
    ...newStore,
  };
  return storeAccess.createStore(item);
}

export async function updateStore(
  _StoreId,
  updatedBody: UpdateStoreRequest,
  userId
): Promise<any> {
  console.log("------BL start--------");
  const _now = new Date();
  const updatedStore = {
    StoreId: _StoreId,
    updatedAt: _now.toISOString(),
    ...updatedBody,
  };
  console.log(updatedStore);

  const queryRest = await storeAccess.getStore(_StoreId);
  console.log(queryRest);

  const updateResult = await storeAccess.updateStore(
    _StoreId,
    userId,
    updatedStore
  );
  console.log("------BL end--------");
  return updateResult;
}

export async function deleteStore(StoreId, userId): Promise<any> {
  console.log("------BL start--------");
  const result = await storeAccess.deleteStore(userId, StoreId);
  console.log(result);
  console.log("------BL end--------");
  return result;
}

export async function updateURL(StoreId, url): Promise<any> {
  console.log("------BL start--------");
  const result = await storeAccess.updateStoreAttachment(StoreId, url);
  console.log("------BL end--------");
  return result;
}
