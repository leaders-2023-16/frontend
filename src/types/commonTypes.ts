export type PaginationResponse<T> = {
  count: number;
  results: T;
};

export type PaginationRequest = {
    limit: number;
    offset: number;
}

export type IQualification = {
  id: number;
  name: string;
};
export type IDirection = {
  id: number;
  name: string;
};
