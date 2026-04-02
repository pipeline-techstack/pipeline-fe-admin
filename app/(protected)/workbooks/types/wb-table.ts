export interface Workbook {
  updated_at: any;
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
  totalPages: number;
}

export interface WorkbookParams {
  page?: number;
  pageSize?: number;
  search?: string;
  id: string;
}

export interface DuplicateWorkbookPayload {
  workbook_id: string;
  user_email: string;
  new_name: string;
}

