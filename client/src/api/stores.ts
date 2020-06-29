import ax from "./index";
import Auth from "../auth/auth";
import { StoreItem } from "../types/store";

export function getStoreList(auth: Auth) {
  return ax.get("/stores", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });
}

export function getStore(auth: Auth, storeId: string) {
  console.log("action: getStore api ", auth, storeId);
  return ax.get("/stores/" + storeId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });
}

export function createStore(auth: Auth, store: StoreItem) {
  //console.log(JSON.stringify({ ...store }));
  //console.log(auth.getAccessToken());
  return ax.post("/stores", store, {
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });
}

export function updateStore(auth: Auth, store: StoreItem) {
  console.log(store);
  return ax.patch("/stores/" + store.StoreId, store, {
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });
}

export async function getUploadUrl(
  auth: Auth,
  storeId: string
): Promise<string> {
  console.log("getting upload URL");

  const response = await ax.post(`/stores/${storeId}/attachment`, "", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });
  return response.data.uploadUrl;
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<void> {
  await ax.put(uploadUrl, file);
}