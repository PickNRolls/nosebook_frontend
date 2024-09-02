export type FindResult<T> = {
  data: T[];
  totalCount: number;
  next?: string;
};
