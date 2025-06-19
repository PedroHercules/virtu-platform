import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface UseServerFiltersConfig {
  basePath: string;
  resetPageOnFilter?: boolean;
  debounceDelay?: number;
}

export function useServerFilters<
  T extends Record<string, string | number | undefined> & {
    page?: number;
    limit?: number;
  },
>(config: UseServerFiltersConfig) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { basePath, resetPageOnFilter = true, debounceDelay = 500 } = config;

  const updateFilters = useCallback(
    (newFilters: Partial<T>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });

      // Reset para primeira página quando filtros mudam
      if (resetPageOnFilter) {
        const hasFilterChange = Object.keys(newFilters).some(
          (key) => key !== "page" && key !== "limit"
        );

        if (hasFilterChange) {
          params.delete("page");
        }
      }

      router.push(`${basePath}?${params.toString()}`);
    },
    [router, searchParams, basePath, resetPageOnFilter]
  );

  const debouncedSearch = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (value: string, filterKey = "search") => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        updateFilters({ [filterKey]: value } as Partial<T>);
      }, debounceDelay);
    };
  }, [updateFilters, debounceDelay]);

  const updatePage = useCallback(
    (page: number) => {
      updateFilters({ page } as Partial<T>);
    },
    [updateFilters]
  );

  const updatePageSize = useCallback(
    (limit: number) => {
      updateFilters({ limit, page: 1 } as Partial<T>);
    },
    [updateFilters]
  );

  return {
    updateFilters,
    debouncedSearch,
    updatePage,
    updatePageSize,
  };
}
