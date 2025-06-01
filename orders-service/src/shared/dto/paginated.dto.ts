export class PaginatedDto<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  page: number;
  limit: number;
}
