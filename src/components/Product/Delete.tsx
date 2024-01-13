import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {deleteProduct} from "../../api/product";

export function ProductDelete() {

    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    const productId = queryParameters.get("uuid");

    useEffect(() => {
        if (productId) {
            deleteProduct(productId).then((res: any) => {
                if(res.status === 201) navigate('/products', { replace: true, state: { message: res.data.message }});
                else navigate('/products', { replace: true, state: { message: "Product not found." }});
            });
        }
    }, [navigate, productId]);

    return (<></>);
}

