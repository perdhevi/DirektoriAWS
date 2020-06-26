import ax from "./index";

export function getStoreList(auth) {
  return ax.get("/stores", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: {},
  });
}

export function getStore(auth, storeId) {
  console.log("action: getStore api ", auth, storeId);
  return ax.get("/stores/" + storeId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: {},
  });
}

export function createStore(auth, store) {
  //console.log(JSON.stringify({ ...store }));
  //console.log(auth.getAccessToken());
  return ax.post("/stores", store, {
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });
}

export function updateStore(auth, store) {
  console.log(store);
  return ax.patch("/stores/" + store.StoreId, store, {
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });
}
