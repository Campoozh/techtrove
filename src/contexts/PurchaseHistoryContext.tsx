import {createContext, useEffect, useState} from "react";
import {PurchaseHistoryContextType, PurchaseHistoryProduct} from "../types/PurchaseHistory";
import {ContextProviderProps} from "../types/Context";
import {CartProduct, Product} from "../types/Product";
import {fetchProducts} from "../api/product";
import {createOrder, fetchOrdersByUser} from "../api/orders";

export const PurchaseHistoryContext = createContext({} as PurchaseHistoryContextType)

export function PurchaseHistoryContextProvider({children}: ContextProviderProps) {

    const localStoragePurchaseHistory = localStorage.getItem('orders')
    const [products, setProducts] = useState<Product[]>([])
    const [orders, setOrders] = useState<PurchaseHistoryProduct[]>(
        localStoragePurchaseHistory ? JSON.parse(localStoragePurchaseHistory) : []
    )

    useEffect(() => {
        (async () => {

            const fetchedOrders = await fetchOrdersByUser().then(res => {
                return res.orders.flatMap((order: any) =>
                    order.orderItem.map((item: any) => ({
                        id: order.id,
                        product_id: item.product_id,
                        price: item.price,
                        quantity: item.quantity
                    }))
                );
            });

            localStorage.setItem("orders", JSON.stringify(fetchedOrders));

            setProducts(await fetchProducts())

        })();
    }, [orders]);

    function getPurchaseHistory(): PurchaseHistoryProduct[] { return orders; }

    function addProductsToPurchaseHistory(products: CartProduct[]): string {

        const newOrder : {} = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: (product.price * product.quantity) / 100,
        }));

        createOrder(newOrder).then((res: any) => {
            const data = res.data

            console.log(res)

            const order = data.orderItems.map((item: any) => ({
                id: data.order.id,
                product_id: item.id,
                price: item.price,
                quantity: item.quantity
            }));

            setOrders([...orders, order])

        });

        return "Products bought with success."; /* example of when the button buy is clicked */
    }

    function getProductsFromPurchaseHistory(): Product[] {
        const productsFromPurchaseHistory = orders.map(boughtProduct => {
                return products.find(product => product.id === boughtProduct.product_id)
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