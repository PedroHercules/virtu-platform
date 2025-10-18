import { useState } from "react";
import { Result } from "@/types/result";
import { isSuccess } from "@/lib/result-utils";

interface UseResultOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Result<never>) => void;
}

interface UseResultReturn<T> {
  data: T | undefined;
  error: Result<never> | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  execute: (promise: Promise<Result<T>>) => Promise<void>;
  reset: () => void;
}

export function useResult<T>(
  options: UseResultOptions<T> = {}
): UseResultReturn<T> {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [error, setError] = useState<Result<never> | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (promise: Promise<Result<T>>) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const result = await promise;

      if (isSuccess(result)) {
        setData(result.data);
        options.onSuccess?.(result.data);
      } else {
        setError(result as Result<never>);
        options.onError?.(result as Result<never>);
      }
    } catch (err) {
      const errorResult: Result<never> = {
        success: false,
        message: err instanceof Error ? err.message : "Erro desconhecido",
        errorCode: "UNKNOWN_ERROR",
        statusCode: 500,
        timestamp: new Date(),
      };
      setError(errorResult);
      options.onError?.(errorResult);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(options.initialData);
    setError(undefined);
    setIsLoading(false);
  };

  return {
    data,
    error,
    isLoading,
    isSuccess: data !== undefined && error === undefined,
    isError: error !== undefined,
    execute,
    reset,
  };
}
