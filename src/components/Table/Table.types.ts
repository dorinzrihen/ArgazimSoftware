export type TableProps<TRow> = {
    pageSize?: number;
    totalCount?: number;
    pageNumber?: number;
    handleUpdatePage: (pageSize: number) => void;
    handleUpagePageSize: (pageSize: number) => void;
    isLoading: boolean;
    isError: boolean;
    data: TRow[];
    columns: Array<Extract<keyof TRow, string>>
}