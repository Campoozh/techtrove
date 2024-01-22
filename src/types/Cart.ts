import {CartProduct, Product} from "./Product";

type CartContextType = {
    getCart: () => CartProduct[],
    getCartProducts: () => Product[],
    addProductToCart: (productId: string, quantity: number, price: number) => string,
    updateProductQuantity: (productId: string, newQuantity: number, newPrice: number) => string,
    removeProductFromCart: (productId: string) => string,
    resetCart: () => void,
}

type CartModalProps = {
    cart: CartProduct[],
    products: Product[],
    show: boolean,
    handleClose: () => void,
}

export type {
    CartContextType,
    CartModalProps
}