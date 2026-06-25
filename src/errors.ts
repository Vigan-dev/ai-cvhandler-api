export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export function getErrorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
    };
  }

  if (
    error instanceof SyntaxError &&
    'status' in error &&
    error.status === 400
  ) {
    return {
      statusCode: 400,
      message: 'Invalid JSON request body',
    };
  }

  return {
    statusCode: 500,
    message: 'Internal server error',
  };
}
