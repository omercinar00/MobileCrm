/* eslint-disable eslint-comments/no-unlimited-disable */
/*  eslint-disable  */

export const CONNECTION_ERROR = 'error_connection';
export const SERVER_ERROR = 'error_server';
export const UNAUTHENTICATED_ERROR = 'error_unauthenticated';
export const FORBIDDEN_ERROR = 'error_forbidden';
export const NOT_FOUND_ERROR = 'error_not_found';
export const TIMEOUT_ERROR = 'error_timeout';
export const CONLICT_ERROR = 'error_conflict';

export class BaseError extends Error {
  statusCode: number | undefined;
  constructor(message?: string, statusCode?: number) {
    super(message || UNAUTHENTICATED_ERROR);
    this.name = UNAUTHENTICATED_ERROR;
    this.statusCode = statusCode;
  }
}

export class InternetConnectionError extends BaseError {
  constructor(message?: string) {
    super(message || CONNECTION_ERROR);
    this.name = CONNECTION_ERROR;
  }
}
export const isInternetConnectionError = (error: BaseError) => error.name === CONNECTION_ERROR;

export class ServerError extends BaseError {
  constructor(message?: string) {
    super(message || SERVER_ERROR, 500);
    this.name = SERVER_ERROR;
  }
}
export const isServerError = (error: BaseError) => error.name === SERVER_ERROR;

export class ConflictError extends BaseError {
  constructor(message?: string) {
    super(message || CONLICT_ERROR);
    this.name = CONLICT_ERROR;
  }
}
export const isConflictError = (error: BaseError) => error.name === CONLICT_ERROR;

export class UnauthenticatedError extends BaseError {
  constructor(message?: string) {
    super(message || UNAUTHENTICATED_ERROR, 409);
    this.name = UNAUTHENTICATED_ERROR;
  }
}
export const isUnauthenticatedError = (error: BaseError) => error.name === UNAUTHENTICATED_ERROR;

export class ForbiddenError extends BaseError {
  constructor(message?: string) {
    super(message || FORBIDDEN_ERROR, 403);
    this.name = FORBIDDEN_ERROR;
  }
}
export const isForbiddenError = (error: BaseError) => error.name === FORBIDDEN_ERROR;

export class NotFoundError extends BaseError {
  constructor(message?: string) {
    super(message || NOT_FOUND_ERROR, 404);
    this.name = NOT_FOUND_ERROR;
  }
}
export const isNotFoundError = (error: BaseError) => error.name === NOT_FOUND_ERROR;

export class TimeoutError extends BaseError {
  constructor(message?: string) {
    super(message || TIMEOUT_ERROR);
    this.name = TIMEOUT_ERROR;
  }
}
export const isTimeoutError = (error: BaseError) => error.name === TIMEOUT_ERROR;

export const buildErrorMessage = (error: BaseError, overrideErrorMessages: any = {}) => {
  let message = 'error_unknown';
  if (isInternetConnectionError(error)) {
    message = CONNECTION_ERROR;
  } else if (isServerError(error)) {
    message = SERVER_ERROR;
  } else if (isConflictError(error)) {
    message = CONLICT_ERROR;
  } else if (isUnauthenticatedError(error)) {
    message = UNAUTHENTICATED_ERROR;
  } else if (isForbiddenError(error)) {
    message = FORBIDDEN_ERROR;
  } else if (isNotFoundError(error)) {
    message = NOT_FOUND_ERROR;
  } else if (isTimeoutError(error)) {
    message = TIMEOUT_ERROR;
  }

  if (overrideErrorMessages && overrideErrorMessages[message]) {
    message = overrideErrorMessages[message];
  }

  return message;
};
/* eslint-enable */
