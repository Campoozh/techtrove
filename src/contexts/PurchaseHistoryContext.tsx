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
                        price: item.price / 100,
                        quantity: item.quantity
                    }))
                );
            });

            localStorage.setItem("orders", JSON.stringify(fetchedOrders));

            setProducts(await fetchProducts())
        })();
    }, []);

    function addProductsToPurchaseHistory(products: CartProduct[]): string {

        const newOrder : {} = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: product.price,
        }));

        createOrder(newOrder).then((res: any) => {
            const data = res.data

            const order = data.orderItems.map((item: any) => ({
                id: data.order.id,
                product_id: item.product_id,
                price: item.price,
                quantity: item.quantity
            }));

            console.log(order.price)

            setOrders(prevOrders => {
                const updatedOrders = [...prevOrders, ...order];
                localStorage.setItem("orders", JSON.stringify(updatedOrders));
                return updatedOrders;
            });

        });

        return "Products bought with success.";
    }

    function getProductsFromPurchaseHistory() {
        return orders.map(boughtProduct => {
                const boughtProductInfo = products.find(product => product.id === boughtProduct.product_id);
                return {
                    title: boughtProductInfo?.title,
                    image_url: boughtProductInfo?.image_url,
                    quantity: boughtProduct.quantity,
                    price: boughtProduct.price
                }
            }
        );
    }

    return (
        <PurchaseHistoryContext.Provider value={{ orders, addProductsToPurchaseHistory, getProductsFromPurchaseHistory }}>
            {children}
        </PurchaseHistoryContext.Provider>
    )


}