export interface StoreItem {
  userId: string;
  StoreId: string;
  createdAt: string;
  price: number;
  name: string;
  phone: string;
  address: string;
  notes?: string;
  categoryId?: string;
}

export interface StorePagedItem {
  Items: StoreItem[];
  LastEvaluatedKey: any;
}

export interface StoreItemUpdate {
  name: string;
  phone: string;
  address: string;
  price: number;
  updatedAt: string;
  notes?: string;
  categoryId?: string;
}
