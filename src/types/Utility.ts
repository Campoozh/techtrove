type ResponseMessageProps = {
    responseMessage: string
}

type ErrorMessages = ErrorMessage[];

type ErrorMessage = {
    status: number,
    message: string,
}

export type {
    ResponseMessageProps,
    ErrorMessages,
    ErrorMessage
}