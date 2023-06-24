export const unauthorized = (message) => {
  const error = new Error(message);
  error.name = "UnauthorizedError";
  return error;
};

export const notFound = (message) => {
  const error = new Error(message);
  error.name = "NotFoundError";
  return error;
};

export const validationError = (message) => {
  const error = new Error(message);
  error.name = "ValidationError";
  return error;
};

export const badRequest = (message) => {
  const error = new Error(message);
  error.name = "BadRequestError";
  return error;
};

export const ok = ({
  message,
  data,
  statusCode,
  pagination,
}: {
  message?: string;
  data: any;
  statusCode: number;
  pagination?: any;
}) => {
  return {
    statusCode,
    message,
    pagination,
    data,
  };
};
