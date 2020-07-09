import { CategoryItem } from "../models/CategoryItems";
import { CategoryAccess } from "../dataLayer/CategoryAccess";

const categoryAccess = new CategoryAccess();

export async function getCategories(): Promise<CategoryItem[]> {
  return categoryAccess.getCategories();
}
