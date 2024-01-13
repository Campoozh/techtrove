import {ReactNode} from "react";
import {CartProduct, Product} from "./Product";

type CartContextProviderProps = {
    children: ReactNode,
};

type CartContextType = {
    getCart: () => CartProduct[],
    getCartProducts: () => Product[],
    addProductToCart: (productId: string, quantity: number) => string,
    removeProductFromCart: (productId: string) => string,
    resetCart: () => void,
    updateProductQuantity: (productId: string, newQuantity: number) => string,
}

type CartModalProps = {
    cart: CartProduct[],
    products: Product[],
    show: boolean,
    handleClose: () => void,
}

export type {
    CartContextProviderProps,
    CartContextType,
    CartModalProps
}