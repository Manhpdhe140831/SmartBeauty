export interface PaginatedResponse<T> {
  data: Array<T>;
  pageIndex: number;
  totalElement: number;
  totalPage: number;
}
