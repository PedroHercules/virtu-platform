import { ReactNode } from "react";
import { Result, ErrorResult } from "@/types/result";
import { isSuccess, isError } from "@/lib/result-utils";

interface ResultHandlerProps<T> {
  result: Result<T>;
  children: {
    success: (data: T) => ReactNode;
    error: (error: Result<never>) => ReactNode;
    loading?: () => ReactNode;
  };
  fallback?: ReactNode;
}

export function ResultHandler<T>({
  result,
  children,
  fallback,
}: ResultHandlerProps<T>) {
  if (!result) {
    return <>{fallback || null}</>;
  }

  if (isSuccess(result)) {
    return <>{children.success(result.data!)}</>;
  }

  if (isError(result)) {
    return <>{children.error(result as ErrorResult)}</>;
  }

  return <>{fallback || null}</>;
}

interface ResultSuccessProps<T> {
  result: Result<T>;
  children: (data: T) => ReactNode;
  fallback?: ReactNode;
}

export function ResultSuccess<T>({
  result,
  children,
  fallback,
}: ResultSuccessProps<T>) {
  if (isSuccess(result)) {
    return <>{children(result.data!)}</>;
  }
  return <>{fallback || null}</>;
}

interface ResultErrorProps<T> {
  result: Result<T>;
  children: (error: ErrorResult) => ReactNode;
  fallback?: ReactNode;
}

export function ResultError<T>({
  result,
  children,
  fallback,
}: ResultErrorProps<T>) {
  if (isError(result)) {
    return <>{children(result as ErrorResult)}</>;
  }
  return <>{fallback || null}</>;
}
