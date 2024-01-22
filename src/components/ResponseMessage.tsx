import React from 'react';
import {ResponseMessageProps} from "../types/Utility";

function ResponseMessage({responseMessage}: ResponseMessageProps) {
    return (
        <>
            {
                responseMessage && (
                    <div style={{margin: '0 auto'}} className="border border-danger rounded w-75 p-2 my-4 text-danger text-center">
                        {responseMessage}
                    </div>
                )
            }
        </>
    );
}

export default ResponseMessage;