import { useState } from "react";
import usePeople from "../../hooks/usePeople/usePeople";
import {
    Typography,
    Stack,
} from "@mui/material";
import TableWithPagination from "../../components/Table/Table";

const ArgazimMainPage = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const { data, isLoading, isError } = usePeople(pageSize, page);
    const columns = ['firstName', 'lastName', 'gender', 'age']
    const peopleArray = data?.data || [];
    const totalCount = Number(data?.totalCount) || 0;

    const handleUpagePageSize = (pSize: number) => {
        setPageSize(pSize)
    }

    const handleUpdatePage = (pageNumber: number) => {
        setPage(pageNumber)
    }

    return (
        <div>
            <Stack spacing={2} alignItems="center">
                <Typography variant="h4">
                    People List
                </Typography>
            </Stack>
            <TableWithPagination
                data={peopleArray}
                pageNumber={page}
                pageSize={pageSize}
                handleUpagePageSize={handleUpagePageSize}
                handleUpdatePage={handleUpdatePage}
                totalCount={totalCount}
                isError={isError}
                isLoading={isLoading}
                columns={columns}
            />
        </div>
    );
};

export default ArgazimMainPage;
