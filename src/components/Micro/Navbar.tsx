import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import {Cart, CartCheck, DoorOpen, Person} from "react-bootstrap-icons";
import {CartContext} from "../../contexts/CartContext";
import CartModal from "./CartModal";
import {Product} from "../../types/Product";
import {PurchaseHistoryContext} from "../../contexts/PurchaseHistoryContext";
import PurchaseHistoryModal from "./PurchaseHistoryModal";

function Navbar() {

    const { token, signOut } = useContext(AuthContext)
    const { getCart, getCartProducts } = useContext(CartContext);
    const { getPurchaseHistory } = useContext(PurchaseHistoryContext);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showPurchaseHistoryModal, setShowPurchaseHistoryModal] = useState(false);
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const navigate = useNavigate();
    const logout = () => {
        signOut()
        navigate('/')
    }
    const cart = getCart();


    useEffect(() => {
        const products = getCartProducts()
        setCartProducts(products)
    }, [getPurchaseHistory, getCartProducts]);


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">Tech Trove</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarContent" aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item"><a className="nav-link" href="/products">Products</a></li>
                    </ul>

                    <div className="d-flex">
                        <button className="btn btn-outline-dark d-flex align-items-center" onClick={() => setShowCartModal(true)}>
                            <Cart/> &nbsp;
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{cartProducts.length}</span>
                        </button>
                        <CartModal cart={cart} products={cartProducts} show={showCartModal} handleClose={() => setShowCartModal(false)} />
                        &nbsp;
                        {token
                            ?
                            <>
                                <button className="btn btn-outline-dark" onClick={() => setShowPurchaseHistoryModal(true)}>
                                    <CartCheck/>
                                </button>
                                <PurchaseHistoryModal show={showPurchaseHistoryModal} handleClose={() => setShowPurchaseHistoryModal(false)} />&nbsp;
                                <button className="btn btn-outline-dark" onClick={logout}>
                                    <DoorOpen />
                                </button>
                            </>
                            :
                            <Link to={"/auth"} className="btn btn-outline-dark" type="submit">
                    <Person/>
                            </Link>
                        }
                    </div>

                </div>
            </div>
        </nav>
    );

}

export default Navbar;