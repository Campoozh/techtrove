import React from "react";
import {createBrowserRouter,} from "react-router-dom";
import {ProductDelete} from "./components/Product/Delete";
import {ProductEdit} from "./components/Product/Edit";
import {AuthMiddleware} from "./components/Middlewares/AuthMiddleware";
import ProductCreate from "./components/Product/Create";
import ProductIndex from "./components/Product/Index";
import Auth from "./components/Auth/Register";
import App from "./App";
import ProductShow from "./components/Product/Show";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/products",
        children: [
            {
                index: true,
                element: <ProductIndex />
            },
            {
                path: ":productId",
                element: <ProductShow />,
            },
            {
                path: "create",
                element: <AuthMiddleware element={<ProductCreate />}/>
            },
            {
                path: "delete",
                element: <AuthMiddleware element={<ProductDelete />}/>
            },
            {
                path: "edit",
                element: <AuthMiddleware element={<ProductEdit />}/>
            }
        ]
    },
]);

export default router;