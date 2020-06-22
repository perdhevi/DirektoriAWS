/**
 * Fields in a request to update a single Store item.
 */
export interface UpdateStoreRequest {
  name: string;
  dueDate: string;
  done: boolean;
}
