"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipos para as colunas
export interface DataTableColumn<T> {
  key: string;
  title: string;
  render?: (value: any, item: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
}

// Configuração de paginação
export interface PaginationConfig {
  enabled: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  showTotal?: boolean;
  showPageSizeSelector?: boolean;
}

// Configuração de seleção
export interface SelectionConfig<T> {
  enabled: boolean;
  selectedItems?: T[];
  onSelectionChange?: (selectedItems: T[]) => void;
  getItemId: (item: T) => string | number;
}

// Props principais do DataTable
export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T, index: number) => void;
  pagination?: PaginationConfig;
  selection?: SelectionConfig<T>;
  className?: string;
  rowClassName?: string | ((item: T, index: number) => string);
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = "Nenhum item encontrado",
  onRowClick,
  pagination = { enabled: false },
  selection,
  className,
  rowClassName,
}: DataTableProps<T>) {
  // Estados internos
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(pagination.pageSize || 10);
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Dados processados (ordenação e filtros)
  const processedData = React.useMemo(() => {
    let result = [...data];

    // Aplicar ordenação
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, sortConfig]);

  // Dados paginados
  const paginatedData = React.useMemo(() => {
    if (!pagination.enabled) return processedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, currentPage, pageSize, pagination.enabled]);

  // Cálculos de paginação
  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Handlers
  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    setSortConfig((prevSort) => {
      if (prevSort?.key === key) {
        return prevSort.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleSelectAll = () => {
    if (!selection?.enabled || !selection.onSelectionChange) return;

    const allIds = paginatedData.map((item) => selection.getItemId(item));
    const selectedIds =
      selection.selectedItems?.map((item) => selection.getItemId(item)) || [];
    const isAllSelected = allIds.every((id) => selectedIds.includes(id));

    if (isAllSelected) {
      // Deselecionar todos da página atual
      const newSelection =
        selection.selectedItems?.filter(
          (item) => !allIds.includes(selection.getItemId(item))
        ) || [];
      selection.onSelectionChange(newSelection);
    } else {
      // Selecionar todos da página atual
      const currentPageItems = paginatedData.filter(
        (item) => !selectedIds.includes(selection.getItemId(item))
      );
      selection.onSelectionChange([
        ...(selection.selectedItems || []),
        ...currentPageItems,
      ]);
    }
  };

  const handleSelectItem = (item: T) => {
    if (!selection?.enabled || !selection.onSelectionChange) return;

    const itemId = selection.getItemId(item);
    const selectedIds =
      selection.selectedItems?.map((item) => selection.getItemId(item)) || [];
    const isSelected = selectedIds.includes(itemId);

    if (isSelected) {
      const newSelection =
        selection.selectedItems?.filter(
          (selectedItem) => selection.getItemId(selectedItem) !== itemId
        ) || [];
      selection.onSelectionChange(newSelection);
    } else {
      selection.onSelectionChange([...(selection.selectedItems || []), item]);
    }
  };

  const isItemSelected = (item: T) => {
    if (!selection?.enabled) return false;
    const itemId = selection.getItemId(item);
    const selectedIds =
      selection.selectedItems?.map((item) => selection.getItemId(item)) || [];
    return selectedIds.includes(itemId);
  };

  const isAllPageSelected = () => {
    if (!selection?.enabled || !selection.selectedItems) return false;
    const allIds = paginatedData.map((item) => selection.getItemId(item));
    const selectedIds = selection.selectedItems.map((item) =>
      selection.getItemId(item)
    );
    return allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));
  };

  // Render do valor da célula
  const renderCellValue = (
    column: DataTableColumn<T>,
    item: T,
    index: number
  ) => {
    if (column.render) {
      return column.render((item as any)[column.key], item, index);
    }
    return (item as any)[column.key];
  };

  // Classe da linha
  const getRowClassName = (item: T, index: number) => {
    const baseClass = "group cursor-pointer";
    if (typeof rowClassName === "function") {
      return `${baseClass} ${rowClassName(item, index)}`;
    }
    return `${baseClass} ${rowClassName || ""}`;
  };

  return (
    <div className={`space-y-4 ${className || ""}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {selection?.enabled && (
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border/30 text-accent focus:ring-accent/20"
                  checked={isAllPageSelected()}
                  onChange={handleSelectAll}
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`${column.className || ""} ${
                  column.sortable ? "cursor-pointer hover:bg-primary/5" : ""
                } ${column.align === "center" ? "text-center" : ""} ${
                  column.align === "right" ? "text-right" : ""
                }`}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.title}
                  {column.sortable && sortConfig?.key === column.key && (
                    <span className="text-accent">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selection?.enabled ? 1 : 0)}
                className="text-center py-8"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
                  <span className="text-muted-foreground">Carregando...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selection?.enabled ? 1 : 0)}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item, index) => (
              <TableRow
                key={selection?.enabled ? selection.getItemId(item) : index}
                className={getRowClassName(item, index)}
                onClick={() => onRowClick?.(item, index)}
                data-state={isItemSelected(item) ? "selected" : undefined}
              >
                {selection?.enabled && (
                  <TableCell>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border/30 text-accent focus:ring-accent/20"
                      checked={isItemSelected(item)}
                      onChange={() => handleSelectItem(item)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={`${column.className || ""} ${
                      column.align === "center" ? "text-center" : ""
                    } ${column.align === "right" ? "text-right" : ""}`}
                  >
                    {renderCellValue(column, item, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      {pagination.enabled && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-6 lg:space-x-8">
            {pagination.showPageSizeSelector && (
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Itens por página</p>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {(pagination.pageSizeOptions || [10, 20, 30, 40, 50]).map(
                      (size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            {pagination.showTotal && (
              <div className="text-sm text-muted-foreground">
                Mostrando {startItem} a {endItem} de {totalItems} resultados
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex items-center space-x-1">
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
