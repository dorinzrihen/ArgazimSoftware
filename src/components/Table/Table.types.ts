export type TableProps = {
    pageSize?: number;
    totalCount?: number;
    pageNumber?: number;
    handleUpdatePage: (pageSize: number) => void;
    handleUpagePageSize: (pageSize: number) => void;
    isLoading: boolean;
    isError: boolean;
    data: any;
    columns: string[]
}