import { HttpStatus } from '@nestjs/common'

export const httpErrorValidation = (
  errorMessage: string,
  statusCode: number,
) => {
  const matcher: { [key: string]: { message: string; statusCode: number } } = {
    USER_ALREADY_EXISTS: { message: errorMessage, statusCode },
    USER_NOT_FOUND: { message: errorMessage, statusCode },
    INVALID_CREDENTIALS: { message: errorMessage, statusCode },
  }

  const defaultError = {
    message: 'SOMETHING_WENT_WRONG',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  }

  return matcher[errorMessage] ?? defaultError
}
