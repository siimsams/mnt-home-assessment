export class PaginatedDto<T> {
    data: T[];
    totalPages: number;
    page: number;
    limit: number;
}