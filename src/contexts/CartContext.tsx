import React, {createContext, useEffect, useState} from "react";
import {CartProduct, Product} from "../types/Product";
import {fetchProducts} from "../api/product";
import {CartContextProviderProps, CartContextType} from "../types/Cart";

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({children}: CartContextProviderProps) {

    const localStorageCart = localStorage.getItem("cart");
    const [cart, setCart] = useState<CartProduct[]>(() =>
        localStorageCart ? JSON.parse(localStorageCart) : []
    )
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        (async () => setProducts(await fetchProducts()))();
    }, [cart]);

    function getCart(): CartProduct[] { return cart; }

    function getCartProducts(): Product[] {
        const productsInCart = cart.map(productInCart => {
                return products.find(product => product.id === productInCart.id)
            }
        ).filter(Boolean) as Product[];

        return productsInCart || [];
    }

    function addProductToCart(productId: string, quantity: number): string  {
        if (!isProductInCart(productId)) {
            setCart([...cart, {id: productId, quantity: quantity}]);
            return "Product added to cart successfully."
        } else return "Product already in cart."
    }

    function removeProductFromCart(productId: string): string {
        if (isProductInCart(productId)) {
            setCart(cart.filter(product => product.id !== productId))
            return "Product removed to cart successfully."
        } else return "Product was not found in your cart."
    }

    function updateProductQuantity(productId: string, newQuantity: number): string {
        if (isProductInCart(productId)) {
            const updatedCart = cart.map(product =>
                product.id === productId ? { id: productId, quantity: newQuantity } : product
            )
            setCart(updatedCart);
            return "Product updated successfully"
        } else return "Product was not found in your cart."
    }

    function isProductInCart(productId: string): boolean {
        return cart.some(product => product.id === productId);
    }

    function resetCart(): void {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ getCart, getCartProducts, addProductToCart, removeProductFromCart, resetCart, updateProductQuantity }}>
            {children}
        </CartContext.Provider>
    )

}
