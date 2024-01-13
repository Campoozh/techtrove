import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './routes';
import { RouterProvider } from 'react-router-dom';
import {AuthContextProvider} from "./contexts/AuthContext";
import {CartContextProvider} from "./contexts/CartContext";
import {PurchaseHistoryContextProvider} from "./contexts/PurchaseHistoryContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <CartContextProvider>
        <AuthContextProvider>
            <PurchaseHistoryContextProvider>
                <RouterProvider router={router} />
            </PurchaseHistoryContextProvider>
        </AuthContextProvider>
    </CartContextProvider>
);
