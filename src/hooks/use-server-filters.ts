import { useState, useCallback } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { useDebounce } from "./use-debounce";

interface PaginatedResponse<T> {
  data: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  nextPage: number | null;
  previousPage: number | null;
}

interface UseServerFiltersOptions<TData, TFilters extends FieldValues> {
  initialData: PaginatedResponse<TData>;
  initialFilters: {
    page: number;
    limit: number;
    search: string;
  };
  fetchAction: (filters: Record<string, unknown>) => Promise<{
    success: boolean;
    data?: PaginatedResponse<TData>;
    error?: string;
  }>;
  filtersForm: UseFormReturn<TFilters>;
  searchFieldName?: string;
  debounceDelay?: number;
}

export function useServerFilters<
  TData,
  TFilters extends FieldValues = FieldValues,
>({
  initialData,
  initialFilters,
  fetchAction,
  filtersForm,
  searchFieldName = "searchTerm",
  debounceDelay = 500,
}: UseServerFiltersOptions<TData, TFilters>) {
  const [data, setData] = useState<PaginatedResponse<TData>>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(initialFilters.search);

  const { watch } = filtersForm;
  const formValues = watch();

  const fetchData = useCallback(
    async (
      filters: Record<string, unknown> & {
        pageNumber?: number;
        pageSize?: number;
      }
    ) => {
      setIsLoading(true);
      try {
        const response = await fetchAction({
          pageNumber: filters.pageNumber || 1,
          pageSize: filters.pageSize || data.itemsPerPage,
          [searchFieldName]: filters[searchFieldName] || "",
          ...Object.keys(formValues).reduce(
            (acc, key) => {
              if (key !== searchFieldName) {
                acc[key] = filters[key] || formValues[key];
              }
              return acc;
            },
            {} as Record<string, unknown>
          ),
        });

        if (response.success && response.data) {
          setData(response.data);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAction, data.itemsPerPage, formValues, searchFieldName]
  );

  const { isPending: searchPending, handleChange } = useDebounce(
    async (searchTerm: string) => {
      (filtersForm.setValue as (name: string, value: unknown) => void)(
        searchFieldName,
        searchTerm
      );

      await fetchData({
        pageNumber: 1,
        pageSize: data.itemsPerPage,
        [searchFieldName]: searchTerm,
      });
    },
    debounceDelay
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      handleChange(value);
    },
    [handleChange]
  );

  const handlePageChange = useCallback(
    async (page: number) => {
      await fetchData({
        pageNumber: page,
        pageSize: data.itemsPerPage,
        [searchFieldName]: formValues[searchFieldName],
      });
    },
    [fetchData, data.itemsPerPage, formValues, searchFieldName]
  );

  const handlePageSizeChange = useCallback(
    async (pageSize: number) => {
      await fetchData({
        pageNumber: 1,
        pageSize,
        [searchFieldName]: formValues[searchFieldName],
      });
    },
    [fetchData, formValues, searchFieldName]
  );

  const updateFilters = useCallback(
    async (newFilters: Record<string, unknown>) => {
      await fetchData({
        pageNumber: 1,
        pageSize: data.itemsPerPage,
        [searchFieldName]: formValues[searchFieldName],
        ...newFilters,
      });
    },
    [fetchData, data.itemsPerPage, formValues, searchFieldName]
  );

  const clearFilters = useCallback(async () => {
    setSearchInput("");
    const resetValues = {
      ...Object.keys(formValues).reduce(
        (acc, key) => {
          if (key === searchFieldName) {
            acc[key] = "";
          } else if (typeof formValues[key] === "string") {
            acc[key] = "all";
          } else {
            acc[key] = formValues[key];
          }
          return acc;
        },
        {} as Record<string, unknown>
      ),
    };

    (filtersForm.reset as (values?: Record<string, unknown>) => void)(
      resetValues
    );

    await fetchData({
      pageNumber: 1,
      pageSize: data.itemsPerPage,
      [searchFieldName]: "",
      ...Object.keys(resetValues).reduce(
        (acc, key) => {
          if (key !== searchFieldName) {
            acc[key] = resetValues[key];
          }
          return acc;
        },
        {} as Record<string, unknown>
      ),
    });
  }, [filtersForm, formValues, fetchData, data.itemsPerPage, searchFieldName]);

  const isFiltered = Object.keys(formValues).some((key) => {
    const value = formValues[key];
    if (key === searchFieldName) {
      return Boolean(value);
    }
    return value !== "all" && Boolean(value);
  });

  const totalLoading = isLoading || searchPending;

  return {
    // Data
    data,
    isLoading: totalLoading,

    // Form
    filtersForm,
    formValues,
    searchInput,
    isFiltered,

    // Handlers
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
    updateFilters,
    clearFilters,

    // Utils
    fetchData,
  };
}
