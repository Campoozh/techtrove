import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {PurchaseHistoryContext} from "../../contexts/PurchaseHistoryContext";
import {OrderedProducts, PurchaseHistoryModalProps} from "../../types/PurchaseHistory";

function PurchaseHistoryModal({show, handleClose}: PurchaseHistoryModalProps) {

    const { orders, getProductsFromPurchaseHistory } = useContext(PurchaseHistoryContext);
    const [orderedProducts, setOrderedProducts] = useState<OrderedProducts[]>([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        setOrderedProducts(getProductsFromPurchaseHistory());

    }, [orders, getProductsFromPurchaseHistory]);

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
                        Purchase history
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center py-3">
                        <div className="w-50">
                            <input type="email" className="form-control" id="nameFilterInput"
                                   placeholder="Search for a bought product..." onChange={event => {
                                setSearchTerm(event.target.value)
                            }
                            }/>
                        </div>
                    </div>
                    {orderedProducts.length > 0 ?
                        orderedProducts
                            .filter(product =>
                                product.title && product.title.toUpperCase().includes(searchTerm.toUpperCase())
                            )
                            .map(((product, index) => {
                                return (
                                    <div key={index} className="d-flex justify-content-between my-3">
                                        <div className="d-flex align-items-center px-3">
                                            <img src={product.image_url} alt={product.title} width="50px" height="50px"/>
                                        </div>
                                        <div className="w-75">
                                            {product.title}
                                            <p>Quantity: {product.quantity} pieces</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start px-3">
                                           ${product.price}
                                        </div>
                                    </div>
                                )
                            }
                        ))
                        :
                        <>
                            <div className="text-center">
                                No products were yet bought.
                            </div>
                        </>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PurchaseHistoryModal;