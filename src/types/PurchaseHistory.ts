import {CartProduct, Product} from "./Product";

type PurchaseHistoryContextType = {
    getPurchaseHistory: () => PurchaseHistoryProduct[],
    addProductsToPurchaseHistory: (products: CartProduct[]) => string,
    getProductsFromPurchaseHistory: () => Product[],
};

type PurchaseHistoryProduct = {
    id: string,
    quantity: number,
    bought_at: string,
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