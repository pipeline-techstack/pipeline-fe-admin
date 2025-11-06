export interface Workbook {
  id: string;
  name: string;
  owners: string[];
  createdAt?: string;
}

export interface WorkbooksResponse {
  workbooks: Workbook[];
  total: number;
  page: number;
  pageSize: number;
}

export interface WorkbookParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

