import { useCallback, useMemo, useRef, memo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  ModuleRegistry,
  ClientSideRowModelModule,
  FilterChangedEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import {
  IconButton,
  Tooltip,
  Box,
  styled,
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  Visibility,
  Delete,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import { Car } from "../../types/car";
import { Loader } from "../Loader/Loader";

// Register the ClientSideRowModel module
ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface DataGridProps {
  rowData: Car[];
  totalRows: number;
  page: number;
  pageSize: number;
  isLoading?: boolean;
  onGridReady?: (params: GridReadyEvent) => void;
  onViewClick?: (data: Car) => void;
  onDeleteClick?: (data: Car) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  onFilterChange?: (filters: unknown[]) => void;
}

const StyledGridBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: 600,
  width: "100%",
  position: "relative",
  "& .ag-theme-material": {
    "--ag-font-family": theme.typography.fontFamily,
    "--ag-font-size": "14px",
    "--ag-grid-size": "6px",
    "--ag-row-height": "52px",
    "--ag-header-height": "56px",
    "--ag-header-foreground-color": theme.palette.text.secondary,
    "--ag-foreground-color": theme.palette.text.primary,
    "--ag-background-color": theme.palette.background.paper,
    "--ag-header-background-color": theme.palette.background.default,
    "--ag-odd-row-background-color": theme.palette.background.default,
    "--ag-row-border-color": "transparent",
    "--ag-row-hover-color": `${theme.palette.primary.main}08`,
    "--ag-selected-row-background-color": `${theme.palette.primary.main}15`,
    "--ag-modal-overlay-background-color": "rgba(0, 0, 0, 0.5)",
    "--ag-borders": "none",
    "--ag-border-radius": "12px",
    "--ag-cell-horizontal-padding": theme.spacing(2),
    "--ag-input-focus-border-color": theme.palette.primary.main,
    "--ag-input-focus-box-shadow": `0 0 2px ${theme.palette.primary.main}`,
    "--ag-card-radius": "12px",
    "--ag-popup-shadow": theme.shadows[3],

    // Remove hover effects from filter rows
    "& .ag-floating-filter-body": {
      backgroundColor: "transparent !important",
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    "& .ag-floating-filter-input": {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    "& .ag-floating-filter-button": {
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },
    "& .ag-floating-filter": {
      backgroundColor: "transparent !important",
      "&:hover": {
        backgroundColor: "transparent !important",
      },
    },

    // Rest of the styles
    "& .ag-header": {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },

    "& .ag-row": {
      transition: "background-color 0.2s ease, transform 0.2s ease",
      borderBottom: `1px solid ${theme.palette.divider}`,
      "&:last-child": {
        borderBottom: "none",
      },
      "&.ag-row-animation": {
        transform: "translateY(0)",
        opacity: 1,
      },
      "&.ag-row-animation-entering": {
        transform: "translateY(10px)",
        opacity: 0,
      },
    },

    // Pagination panel styling
    "& .ag-paging-panel": {
      height: "56px",
      borderTop: `1px solid ${theme.palette.divider}`,
      color: theme.palette.text.secondary,
      "& .ag-paging-row-summary-panel": {
        margin: "0 16px",
      },
      "& .ag-paging-page-summary-panel": {
        margin: "0 16px",
      },
      "& .ag-paging-button": {
        cursor: "pointer",
        padding: "8px",
        borderRadius: "8px",
        transition: theme.transitions.create(["background-color"], {
          duration: theme.transitions.duration.short,
        }),
        "&:hover:not(.ag-disabled)": {
          backgroundColor: `${theme.palette.primary.main}15`,
        },
        "&.ag-disabled": {
          opacity: 0.5,
          cursor: "default",
        },
      },
    },

    // Fade transition for content
    "& .ag-cell": {
      transition: "opacity 0.2s ease",
    },
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const PageButton = styled(Button)(({ theme }) => ({
  minWidth: "40px",
  height: "40px",
  padding: theme.spacing(1),
  margin: theme.spacing(0, 0.5),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  height: "40px",
  minWidth: "80px",
  marginLeft: theme.spacing(2),
}));

export const DataGrid = memo(
  ({
    rowData,
    totalRows,
    page,
    pageSize,
    isLoading,
    onGridReady,
    onViewClick,
    onDeleteClick,
    onPageChange,
    onFilterChange,
  }: DataGridProps) => {
    const gridRef = useRef<AgGridReact>(null);

    const actionRenderer = useCallback(
      (params: ICellRendererParams) => {
        const data = params.data as Car;
        return (
          <div>
            <Tooltip title="View">
              <IconButton onClick={() => onViewClick?.(data)}>
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => onDeleteClick?.(data)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      [onViewClick, onDeleteClick]
    );

    const handleFilterChanged = useCallback(
      (event: FilterChangedEvent) => {
        const filterModel = event.api.getFilterModel();
        const filters = Object.entries(filterModel).map(([field, model]) => ({
          field,
          operator: model.type,
          value: model.filter,
        }));
        onFilterChange?.(filters);
      },
      [onFilterChange]
    );

    const defaultColDef = useMemo(
      () => ({
        sortable: true,
        filter: true,
        floatingFilter: true,
        filterParams: {
          buttons: ["reset", "apply"],
          closeOnApply: true,
        },
        resizable: true,
        minWidth: 100,
        flex: 1,
      }),
      []
    );

    const columnDefs: ColDef[] = useMemo(() => {
      if (!rowData.length) return [];

      const sampleData = rowData[0];
      const cols = Object.keys(sampleData)
        .filter((key) => key !== "_id" && key !== "__v")
        .map((key) => ({
          field: key,
          headerName: key.replace(/([A-Z])/g, " $1").trim(),
          flex: 1,
          filter:
            key.includes("Km") || key.includes("Sec") || key.includes("Euro")
              ? "agNumberColumnFilter"
              : "agTextColumnFilter",
        }));

      return [
        ...cols,
        {
          headerName: "Actions",
          field: "actions",
          cellRenderer: actionRenderer,
          filter: false,
          sortable: false,
          width: 120,
          flex: 0,
        },
      ];
    }, [rowData, actionRenderer]);

    const totalPages = Math.ceil(totalRows / pageSize);

    const handlePageSizeChange = (event: SelectChangeEvent<unknown>) => {
      const newPageSize = Number(event.target.value);
      if (!isNaN(newPageSize)) {
        onPageChange?.(1, newPageSize); // Reset to first page when changing page size
      }
    };

    const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange?.(newPage, pageSize);
      }
    };

    const handleGridReady = useCallback(
      (params: GridReadyEvent) => {
        onGridReady?.(params);

        if (params.api) {
          params.api.setDomLayout("normal");
          params.api.paginationSetPageSize(pageSize);

          // Set the total row count for proper pagination
          const totalPages = Math.ceil(totalRows / pageSize);
          params.api.setRowCount(totalRows);

          // Ensure page is within bounds
          const targetPage = Math.min(page - 1, totalPages - 1);
          params.api.paginationGoToPage(targetPage);
        }
      },
      [onGridReady, page, pageSize, totalRows]
    );

    return (
      <StyledGridBox>
        <div
          className="ag-theme-material"
          style={{
            flex: 1,
            width: "100%",
            opacity: isLoading ? 0.6 : 1,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            headerHeight={48}
            rowHeight={48}
            rowStyle={{ alignItems: "center" }}
            onGridReady={handleGridReady}
            pagination={false}
            suppressPaginationPanel={true}
            animateRows={true}
            loadingOverlayComponent={null}
            suppressLoadingOverlay={true}
            rowModelType="clientSide"
            suppressScrollOnNewData={true}
            onFilterChanged={handleFilterChanged}
            rowSelection="multiple"
            suppressRowClickSelection={true}
          />
        </div>
        {isLoading && <Loader />}
        <PaginationContainer>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Rows per page:
            </Typography>
            <StyledSelect
              value={pageSize}
              onChange={handlePageSizeChange}
              variant="outlined"
              size="small"
            >
              {[10, 25, 50, 100].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </StyledSelect>
            <Typography variant="body2" color="text.secondary">
              {`${(page - 1) * pageSize + 1}-${Math.min(
                page * pageSize,
                totalRows
              )} of ${totalRows}`}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PageButton
              variant="outlined"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              <NavigateBefore />
            </PageButton>
            <Typography variant="body2" color="text.secondary">
              Page {page} of {totalPages}
            </Typography>
            <PageButton
              variant="outlined"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              <NavigateNext />
            </PageButton>
          </Stack>
        </PaginationContainer>
      </StyledGridBox>
    );
  }
);

DataGrid.displayName = "DataGrid";
