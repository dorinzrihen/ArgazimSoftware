import {
    Table,
    Button,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Stack,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Skeleton,
    Paper,
} from "@mui/material";
import { TableProps } from "./Table.types";

const TableWithPagination = <TRow extends Record<string, any>>({ columns, data, pageNumber = 0, pageSize = 0, handleUpdatePage, handleUpagePageSize, totalCount = 0, isLoading, isError }: TableProps<TRow>) => {
    const capitalizeFirstLetter = (str?: string) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

    const totalPages = Math.ceil(totalCount / pageSize);

    const handlePrev = () => {
        handleUpdatePage(pageNumber - 1);
    };

    const handleNext = () => {
        handleUpdatePage(pageNumber + 1);
    };

    return <>
        <Stack>
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            {columns.map(column => {
                                return <TableCell key={`column-${column}`}><strong>{capitalizeFirstLetter(column)}</strong></TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading
                            ? Array.from({ length: pageSize }).map((_, index) => (
                                <TableRow key={index}>
                                    {columns.map((column, i) => {
                                        return <TableCell key={`${column}-${i}`}>
                                            <Skeleton key={`${column}-${i}`} variant="text" />
                                        </TableCell>
                                    })}
                                </TableRow>
                            ))
                            : isError ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        Failed to load people data.
                                    </TableCell>
                                </TableRow>
                            ) : data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No people found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((row: TRow, index: number) => (
                                    <TableRow key={`${index}`}>
                                        {columns.map(col => {
                                            return <TableCell key={`${col}-${index}`}>{row[col]}</TableCell>
                                        })}
                                    </TableRow>
                                ))
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
        <Stack direction='row' sx={{
            marginTop: '10px',
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Stack direction='row' sx={{ alignItems: "center", gap: '10px' }}>
                <Typography>Results per page</Typography>
                <FormControl variant="outlined" size="small">
                    <Select
                        value={pageSize}
                        onChange={(e) => {
                            handleUpagePageSize(Number(e.target.value));
                            handleUpdatePage(1);
                        }}
                        label="Results per page"
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <div>
                <Button
                    variant="outlined"
                    onClick={handlePrev}
                    disabled={pageNumber === 1}
                    sx={{ mx: 1 }}
                >
                    Prev
                </Button>
                <Typography component="span">{
                    isLoading ? "Loading..." : `Page ${pageNumber} of ${totalPages}`
                }
                </Typography>
                <Button
                    variant="outlined"
                    onClick={handleNext}
                    disabled={pageNumber >= totalPages}
                    sx={{ mx: 1 }}
                >
                    Next
                </Button>
            </div>
        </Stack>
    </>
}

export default TableWithPagination;