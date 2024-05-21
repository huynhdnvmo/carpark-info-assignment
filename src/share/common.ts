export interface IPagination<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
}
