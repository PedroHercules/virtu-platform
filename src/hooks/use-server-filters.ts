import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useTransition } from "react";

interface UseServerFiltersConfig {
  basePath: string;
  resetPageOnFilter?: boolean;
  debounceDelay?: number;
  optimistic?: boolean;
}

export function useServerFilters<
  T extends Record<string, string | number | undefined> & {
    page?: number;
    limit?: number;
  },
>(config: UseServerFiltersConfig) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const {
    basePath,
    resetPageOnFilter = true,
    debounceDelay = 300,
    optimistic = true,
  } = config;

  const updateFilters = useCallback(
    (newFilters: Partial<T>, options?: { immediate?: boolean }) => {
      const params = new URLSearchParams(searchParams);

      // Aplicar novos filtros
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });

      // Reset página quando filtros mudam (exceto paginação)
      if (resetPageOnFilter && !options?.immediate) {
        const hasFilterChange = Object.keys(newFilters).some(
          (key) => key !== "page" && key !== "limit"
        );

        if (hasFilterChange) {
          params.delete("page");
        }
      }

      const newUrl = `${basePath}?${params.toString()}`;

      // Usar transição para otimizar re-renders
      if (optimistic) {
        startTransition(() => {
          router.replace(newUrl);
        });
      } else {
        router.push(newUrl);
      }
    },
    [router, searchParams, basePath, resetPageOnFilter, optimistic]
  );

  const debouncedSearch = useCallback(
    (value: string, filterKey = "search") => {
      // Clear timeout anterior
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Se valor vazio, aplicar imediatamente
      if (!value || value.trim() === "") {
        updateFilters({ [filterKey]: "" } as Partial<T>);
        return;
      }

      // Debounce para valores não vazios
      debounceRef.current = setTimeout(() => {
        updateFilters({ [filterKey]: value } as Partial<T>);
      }, debounceDelay);
    },
    [updateFilters, debounceDelay]
  );

  const updatePage = useCallback(
    (page: number) => {
      updateFilters({ page } as Partial<T>, { immediate: true });
    },
    [updateFilters]
  );

  const updatePageSize = useCallback(
    (limit: number) => {
      updateFilters({ limit, page: 1 } as Partial<T>);
    },
    [updateFilters]
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams();
    // Manter apenas limit se existir
    const currentLimit = searchParams.get("limit");
    if (currentLimit) {
      params.set("limit", currentLimit);
    }

    if (optimistic) {
      startTransition(() => {
        const newUrl = params.toString()
          ? `${basePath}?${params.toString()}`
          : basePath;
        router.replace(newUrl);
      });
    } else {
      const newUrl = params.toString()
        ? `${basePath}?${params.toString()}`
        : basePath;
      router.push(newUrl);
    }
  }, [router, searchParams, basePath, optimistic]);

  const getCurrentFilters = useCallback((): Partial<T> => {
    const filters: Record<string, string | number> = {};

    for (const [key, value] of searchParams.entries()) {
      // Convert numeric values
      if (key === "page" || key === "limit") {
        filters[key] = parseInt(value);
      } else {
        filters[key] = value;
      }
    }

    return filters as Partial<T>;
  }, [searchParams]);

  return {
    updateFilters,
    debouncedSearch,
    updatePage,
    updatePageSize,
    clearFilters,
    getCurrentFilters,
    isPending,
  };
}
