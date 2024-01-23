import {CartProduct, Product} from "./Product";

type PurchaseHistoryContextType = {
    orders: any,
    addProductsToPurchaseHistory: (products: CartProduct[]) => string,
    getProductsFromPurchaseHistory: () => any,
};

type PurchaseHistoryProduct = {
    order_id: string,
    product_id: string,
    quantity: number,
    price: number,
}

type OrderedProducts = {
    id: string,
    title: string,
    image_url: string,
    price: number,
    quantity: number
}

type PurchaseHistoryModalProps = {
    show: boolean,
    handleClose: () => void,
}

export type {
    PurchaseHistoryContextType,
    PurchaseHistoryProduct,
    PurchaseHistoryModalProps,
    OrderedProducts
}