export interface TablePaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly callback: (page: number) => void;
}
