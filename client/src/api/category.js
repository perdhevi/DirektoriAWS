import ax from "./index";

export function getStoreList(auth) {
  return ax.get("/categories", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getAccessToken()}`,
    },
    body: {},
  });
}
