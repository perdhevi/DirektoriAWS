import ax from "./index";

export function getCategories() {
  return ax.get("/categories", {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
