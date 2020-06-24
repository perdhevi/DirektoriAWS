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

export function createStore(auth, store) {
  console.log(JSON.stringify({ ...store }));
  console.log(auth.getAccessToken());
  return ax.post("/stores", store, {
    headers: {
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
  });
}
