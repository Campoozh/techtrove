import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {deleteProduct} from "../../api/product";
import {ProductMessages} from "../../api/Error/ProductMessages";

export function ProductDelete() {

    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    const productId = queryParameters.get("uuid");

    useEffect(() => {
        if (productId) {
            deleteProduct(productId).then((res: any) => {
                if(res.status === 201)
                    navigate('/products',
                        { replace: true, state: { message: ProductMessages.DELETED }});
                else navigate('/products', { replace: true, state: { message: ProductMessages.NOT_FOUND }});
            });
        }
    }, [navigate, productId]);

    return (<></>);
}

