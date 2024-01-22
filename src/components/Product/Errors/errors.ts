const statusHandlers = [
    { status: 400, handler: "Verify the fields and try again." },
    { status: 401, handler: "You're not authorized to do that." },
    { status: 500, handler: "Verify the fields and try again." },
];

export const processErrorResponse = (errorCode: number): string => {
    const handler = statusHandlers.find(h => h.status === errorCode );
    if (handler) return handler.handler;
    else return "An error occurred.";
}
