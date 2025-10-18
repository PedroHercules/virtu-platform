import {
  Result,
  SuccessResult,
  ErrorResult,
  ResultHandler,
} from "@/types/result";

export function isSuccess<T>(result: Result<T>): result is SuccessResult<T> {
  return result.success;
}

export function isError<T>(result: Result<T>): result is ErrorResult {
  return !result.success;
}

export function handleResult<T>(
  result: Result<T>,
  handler: ResultHandler<T>
): void {
  if (isSuccess(result)) {
    handler.onSuccess(result.data);
  } else {
    handler.onError(result as ErrorResult);
  }
}

export function getDataOrDefault<T>(result: Result<T>, defaultValue: T): T {
  return isSuccess(result) ? result.data : defaultValue;
}

export function getErrorMessage(result: Result<unknown>): string {
  return isError(result) ? result.message : "";
}

export function createSuccessResult<T>(
  data: T,
  message: string = "Success"
): SuccessResult<T> {
  return {
    success: true,
    data,
    message,
    errorCode: "",
    statusCode: 200,
    timestamp: new Date(),
  };
}

export function createErrorResult(
  message: string,
  errorCode: string = "UNKNOWN_ERROR",
  statusCode: number = 500
): ErrorResult {
  return {
    success: false,
    message,
    errorCode,
    statusCode,
    timestamp: new Date(),
  };
}

export async function logResult(
  result: Result<unknown>,
  context: string
): Promise<void> {
  const logData = {
    context,
    success: result.success,
    message: result.message,
    errorCode: result.errorCode,
    statusCode: result.statusCode,
    timestamp: result.timestamp,
  };

  if (isError(result)) {
    console.error(`[API Error] ${context}:`, logData);
  } else {
    console.log(`[API Success] ${context}:`, logData);
  }
}
