import React, {useContext} from 'react';
import {CartContext} from "../../contexts/CartContext";
import {Modal} from "react-bootstrap";
import {Bag, XLg} from "react-bootstrap-icons";
import {CartModalProps} from "../../types/Cart";
import {PurchaseHistoryContext} from "../../contexts/PurchaseHistoryContext";
import {CartProduct} from "../../types/Product";

function CartModal({cart, products, show, handleClose}: CartModalProps) {

    const { updateProductQuantity, removeProductFromCart, resetCart } = useContext(CartContext);
    const { addProductsToPurchaseHistory } = useContext(PurchaseHistoryContext);
    const handleRemoveProductFromCart = (productId: string) => { removeProductFromCart(productId); }
    const handleProductQuantityUpdate = (productId: string, quantity: number, price: number) => { updateProductQuantity(productId, quantity, price); }
    const buyProducts = (products: CartProduct[]) => {
        addProductsToPurchaseHistory(products);
        resetCart();
    }

    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Your Cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {products.length > 0 ? products.map(((product, index) => {
                                const cartItem = cart.find(cartProduct => cartProduct.id === product.id);

                                return (
                                    <div className="d-flex justify-content-between my-3">
                                        <div className="d-flex align-items-center px-3">
                                            <img src={product.image_url} alt={product.title} width="50px" height="50px"/>
                                        </div>
                                        <div className="w-75">
                                            {product.title}
                                            <input className="form-control text-center me-3" id="inputQuantity"
                                                   type="number"
                                                   value={cartItem?.quantity}
                                                   min="1"
                                                   style={{maxWidth: '5.5rem', maxHeight: '1.5rem'}}
                                                   onChange={event =>
                                                       handleProductQuantityUpdate(product.id, Number(event.target.value), Number(product.price))}
                                            />
                                            -
                                            <p>${cartItem?.price}</p>
                                        </div>
                                        <div className="d-flex align-items-center px-3">
                                            <button type="button" className="btn btn-outline-dark" id="clearFilter"
                                                    onClick={() => handleRemoveProductFromCart(product.id)}>
                                                <XLg/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        ))
                        :
                        <>
                            <div className="text-center">
                                No products added to your cart.
                            </div>
                        </>
                    }
                    <div className="d-flex justify-content-center py-2">
                        <button type="button" className="btn btn-outline-dark d-flex align-items-center"
                                id="clearFilter"
                                onClick={() => buyProducts(cart)}>
                            <Bag/> &nbsp;
                            Finalizar compra
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CartModal;