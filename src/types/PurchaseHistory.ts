import {CartProduct, Product} from "./Product";

type PurchaseHistoryContextType = {
    getPurchaseHistory: () => PurchaseHistoryProduct[],
    addProductsToPurchaseHistory: (products: CartProduct[]) => string,
    getProductsFromPurchaseHistory: () => Product[],
};

type PurchaseHistoryProduct = {
    order_id: string,
    product_id: string,
    quantity: number,
    price: number,
}

type PurchaseHistoryModalProps = {
    show: boolean,
    handleClose: () => void,
}

export type {
    PurchaseHistoryContextType,
    PurchaseHistoryProduct,
    PurchaseHistoryModalProps
}