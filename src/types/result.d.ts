export interface Result<T> {
  success: boolean;
  data?: T;
  message: string;
  errorCode: string;
  statusCode: number;
  timestamp: Date;
}

export type SuccessResult<T> = Result<T> & {
  success: true;
  data: T;
};

export type ErrorResult = Result<never> & {
  success: false;
  data?: never;
};

export type ResultHandler<T> = {
  onSuccess: (data: T) => void;
  onError: (error: ErrorResult) => void;
};
