/* eslint-disable react/prop-types */
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  Trash2,
} from "lucide-react";
import { memo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { SearchBar } from "../Navbar";

const DataTable = memo(
  ({
    content = false,
    data,
    columns,
    entriesPerPage = 5,
    canSearch = true,
    showTotalEntries = true,
    onDelete,
    csv = false,
    print = false,
    filter = false,
    download = false,
    selectOption = true,
    datePicker = false,
    filterFunction = () => {},
    tableHeader,
    children,
  }) => {
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRows, setSelectedRows] = useState({});
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(entriesPerPage);

    const instance = useReactTable({
      data,
      columns,
      state: {
        globalFilter,
        pagination: {
          pageIndex,
          pageSize,
        },
      },
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: (updater) => {
        let newPageIndex = pageIndex;
        let newPageSize = pageSize;

        if (typeof updater === "function") {
          const pagination = updater({ pageIndex, pageSize });
          newPageIndex = pagination.pageIndex;
          newPageSize = pagination.pageSize || pageSize;
        } else if (updater) {
          newPageIndex = updater.pageIndex || pageIndex;
          newPageSize = updater.pageSize || pageSize;
        }

        setPageIndex(newPageIndex);
        setPageSize(newPageSize);
      },
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      enableSorting: true,
    });

    const visibleRows = instance.getRowModel().rows;
    const isAllSelected =
      visibleRows.length > 0 &&
      visibleRows.every((row) => selectedRows[row.original.id]);

    const isSomeSelected =
      visibleRows.some((row) => selectedRows[row.original.id]) &&
      !isAllSelected;

    const handleSelectAllRows = (isChecked) => {
      const newSelected = { ...selectedRows };

      visibleRows.forEach((row) => {
        newSelected[row.original.id] = isChecked;
      });

      setSelectedRows(newSelected);
    };

    const toggleRowSelection = (row) => {
      setSelectedRows((prev) => ({
        ...prev,
        [row.original.id]: !prev[row.original.id],
      }));
    };

    const handleDelete = () => {
      const selectedIds = Object.keys(selectedRows).filter(
        (id) => selectedRows[id]
      );
      if (onDelete) onDelete(selectedIds);
    };
    const hasSelectedRows = Object.values(selectedRows).some(
      (selected) => selected
    );
    return (
      <div className="space-y-3">
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={1}
          className="lg:justify-between"
        >
          <Box
            className="flex flex-wrap items-center gap-x-2 gap-y-1"
            spacing={1}
          >
            {csv && (
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                color=""
              >
                Export CSV
              </Button>
            )}
            {download && (
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                startIcon={<Download size={16} />}
                color=""
              >
                Download PDF
              </Button>
            )}
            {print && (
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => reactToPrintFn()}
                startIcon={<Printer size={16} />}
                variant="contained"
                color=""
              >
                Print
              </Button>
            )}
            {filter && (
              <Button
                sx={{ textTransform: "none" }}
                startIcon={<FilterAltIcon size={16} />}
                variant="contained"
                onClick={filterFunction}
                color=""
              >
                Filter
              </Button>
            )}
            {canSearch && (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
              // <SearchBar changeHandler={(e)=>setGlobalFilter(e.target.value)} />
            )}
          </Box>
          <Box className="flex items-center gap-1" spacing={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {datePicker && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #c4c4c4",
                    borderRadius: "8px",
                    padding: "4px",
                    maxWidth: "500px",
                  }}
                  className="gap-2"
                >
                  <IconButton
                    onClick={() =>
                      setSelectedDate(selectedDate.subtract(1, "day"))
                    }
                  >
                    <ChevronLeft fontSize="small" />
                  </IconButton>

                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    format="dddd, MMM DD YYYY"
                    slotProps={{
                      textField: {
                        variant: "standard",
                        InputProps: {
                          disableUnderline: true,
                          style: { textAlign: "center" },
                        },
                      },
                    }}
                  />

                  <IconButton
                    onClick={() => setSelectedDate(selectedDate.add(1, "day"))}
                  >
                    <ChevronRight fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </LocalizationProvider>
            {hasSelectedRows && (
              <Button
                variant="contained"
                color="error"
                startIcon={<Trash2 size={16} />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            {children}
          </Box>
        </Stack>
        {content && content}
        <TableContainer ref={contentRef}>
          <Table>
            <TableHead>
              {tableHeader && (
                <TableRow>
                  <TableCell
                    colSpan={
                      selectOption
                        ? instance.getAllColumns().length + 1
                        : instance.getAllColumns().length
                    }
                    sx={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      backgroundColor: "#F3FAF9",
                      color: "#50b5b7",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                      padding: "16px",
                    }}
                  >
                    {tableHeader}
                  </TableCell>
                </TableRow>
              )}
              {instance.getHeaderGroups().map((headerGroup, index) => (
                <TableRow key={headerGroup.id}>
                  {selectOption && (
                    <TableCell
                      sx={{
                        borderTopLeftRadius: tableHeader
                          ? 0
                          : index === 0
                          ? "16px"
                          : 0,
                        backgroundColor: "#D6F1ED",
                      }}
                    >
                      <Checkbox
                        size="small"
                        indeterminate={isSomeSelected}
                        checked={isAllSelected}
                        onChange={(e) => handleSelectAllRows(e.target.checked)}
                      />
                    </TableCell>
                  )}
                  {headerGroup.headers.map((header, ind) => (
                    <TableCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: header.column.getCanSort()
                          ? "pointer"
                          : "default",
                        fontWeight: "bold",
                        backgroundColor: "#D6F1ED",
                        textTransform: "uppercase",
                        color: "#73798F",
                        textAlign: "center",
                        borderTopLeftRadius: tableHeader
                          ? 0
                          : selectOption
                          ? 0
                          : ind === 0
                          ? "16px"
                          : 0,
                        borderTopRightRadius: tableHeader
                          ? 0
                          : ind === headerGroup.headers.length - 1
                          ? "16px"
                          : 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0rem",
                        }}
                      >
                        {header.column.columnDef.header}
                        <span
                          style={{
                            visibility: header.column.getIsSorted()
                              ? "visible"
                              : "hidden",
                          }}
                        >
                          {header.column.getIsSorted() === "asc" ? "🔼" : "🔽"}
                        </span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {instance.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {selectOption && (
                    <TableCell>
                      <Checkbox
                        checked={!!selectedRows[row.original.id]}
                        size="small"
                        onChange={() => toggleRowSelection(row)}
                      />
                    </TableCell>
                  )}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} sx={{ textAlign: "center" }}>
                      {cell.getValue()}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex items-center justify-end">
          {showTotalEntries && (
            <div style={{ textAlign: "right" }}>
              Total Entries: {data.length}
            </div>
          )}
          <TablePagination
            component="div"
            count={data.length}
            page={pageIndex || 0}
            onPageChange={(_, newPage) => setPageIndex(newPage)}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[entriesPerPage]}
            onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
          />
        </div>
      </div>
    );
  }
);

DataTable.displayName = "DataTable";

export default DataTable;
