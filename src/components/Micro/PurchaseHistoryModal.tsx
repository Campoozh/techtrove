import React, {useContext, useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {PurchaseHistoryContext} from "../../contexts/PurchaseHistoryContext";
import {PurchaseHistoryModalProps, PurchaseHistoryProduct} from "../../types/PurchaseHistory";
import {Product} from "../../types/Product";

function PurchaseHistoryModal({show, handleClose}: PurchaseHistoryModalProps) {

    const { getPurchaseHistory ,getProductsFromPurchaseHistory } = useContext(PurchaseHistoryContext);
    const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([])
    const [purchasedHistory, setPurchasedHistory] = useState<PurchaseHistoryProduct[]>([])
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setPurchasedProducts(getProductsFromPurchaseHistory());
        setPurchasedHistory(getPurchaseHistory());
    }, [getProductsFromPurchaseHistory, getPurchaseHistory]);

    function formatDate(dateString: string) {
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
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
                    {purchasedProducts.length > 0 ? purchasedProducts
                            .filter(product =>
                                product.title.toUpperCase().includes(searchTerm.toUpperCase())
                            )
                            .map(((product, index) => {
                                const purchasedHistoryItem = purchasedHistory.find(purchasedHistoryProduct => purchasedHistoryProduct.id === product.id);

                                let boughtAt = ''
                                if (purchasedHistoryItem?.bought_at) boughtAt = formatDate(purchasedHistoryItem?.bought_at)

                                return (
                                    <div className="d-flex justify-content-between my-3">
                                        <div className="d-flex align-items-center px-3">
                                            <img src={product.image_url} alt={product.title} width="50px" height="50px"/>
                                        </div>
                                        <div className="w-75">
                                            {product.title}
                                            <p>Quantity: {purchasedHistoryItem?.quantity} pieces</p>
                                        </div>
                                        <div className="d-flex align-items-center px-3">
                                            {boughtAt}
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