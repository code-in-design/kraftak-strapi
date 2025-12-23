export class BaseResponse<T> {
  data: T;

  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };

  constructor(data: T, page?: number, pageSize?: number, total?: number) {
    this.data = data;
    if (page !== undefined && pageSize !== undefined && total !== undefined) {
      this.pagination = {
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
        total,
      };
    }
  }
}
