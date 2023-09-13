export interface PageResultDTO<T> {
  readonly content: T[];
  readonly total_pages: number;
  readonly total_elements: number;
}
