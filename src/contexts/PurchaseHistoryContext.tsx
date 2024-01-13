import {createContext, useEffect, useState} from "react";
import {PurchaseHistoryContextType, PurchaseHistoryProduct} from "../types/PurchaseHistory";
import {ContextProviderProps} from "../types/Context";
import {CartProduct, Product} from "../types/Product";
import {fetchProducts} from "../api/product";

export const PurchaseHistoryContext = createContext({} as PurchaseHistoryContextType)

export function PurchaseHistoryContextProvider({children}: ContextProviderProps) {

    const localStoragePurchaseHistory = localStorage.getItem('purchaseHistory')
    const [products, setProducts] = useState<Product[]>([])
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryProduct[]>(
        localStoragePurchaseHistory ? JSON.parse(localStoragePurchaseHistory) : []
    )

    useEffect(() => {
        localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));
        (async () => setProducts(await fetchProducts()))();
    }, [purchaseHistory]);

    function getPurchaseHistory(): PurchaseHistoryProduct[] { return purchaseHistory; }

    function addProductsToPurchaseHistory(products: CartProduct[]): string {
        const newPurchaseHistory: PurchaseHistoryProduct[] = [
            ...purchaseHistory,
            ...products.map(product => {
                return { id: product.id, quantity: product.quantity, bought_at: new Date().toLocaleString() }
            })
        ]
        setPurchaseHistory(newPurchaseHistory)
        return "Products bought with success."; /* example of when the button buy is clicked */
    }

    function getProductsFromPurchaseHistory(): Product[] {
        const productsFromPurchaseHistory = purchaseHistory.map(productInCart => {
                return products.find(product => product.id === productInCart.id)
            }
        ).filter(Boolean) as Product[];
        return productsFromPurchaseHistory || [];
    }

    return (
        <PurchaseHistoryContext.Provider value={{ getPurchaseHistory, addProductsToPurchaseHistory, getProductsFromPurchaseHistory }}>
            {children}
        </PurchaseHistoryContext.Provider>
    )


}