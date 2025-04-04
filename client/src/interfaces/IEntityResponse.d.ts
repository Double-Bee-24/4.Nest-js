export interface IEntityResponse<T> {
  entityData: T[];
  limit: string;
  page: string;
  total: number;
  totalPages: number;
}
