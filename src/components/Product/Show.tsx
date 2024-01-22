import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchProductByUuid} from "../../api/product";
import Navbar from "../Micro/Navbar";
import Footer from "../Micro/Footer";
import {CartContext} from "../../contexts/CartContext";
import RelatedProducts from "./Micro/RelatedProducts";

function ProductShow() {

    const params = useParams();
    const productId = params.productId;
    const { addProductToCart } = useContext(CartContext);
    const [product, setProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: 0,
        image_url: '',
        category_id: '',
    });
    const [quantity, setQuantity] = useState(1)
    const [message, setMessage] = useState("")

    useEffect(() => {
        (async () => {
            if (productId) {
                const productResponse = await fetchProductByUuid(productId);
                setProduct({...productResponse});
            }
        })();
    }, [productId]);

    const addToCart = () => {
        const message = addProductToCart(product.id, quantity, product.price);
        setMessage(message)
    }

    return (
        <>
            <Navbar/>

            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img className="card-img-top mb-5 mb-md-0"
                                 src={product.image_url}
                                 width={600}
                                 height={680}
                                 alt="..."/></div>
                        <div className="col-md-6">
                            <h1 className="display-5 fw-bolder">{product.title}</h1>
                            <div className="fs-5 mb-5">
                                <span>${product.price}</span>
                            </div>
                            <p className="lead">{product.description}</p>
                            <div className="d-flex">
                                <input className="form-control text-center me-3" id="inputQuantity" type="number"
                                       value={quantity}
                                       style={{maxWidth: '6rem'}}
                                       min="0"
                                       onChange={event => setQuantity(Number(event.target.value))}/>
                                <button className="btn btn-outline-dark flex-shrink-0" type="button"
                                        onClick={addToCart}>
                                    <i className="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>
                            </div>
                            <section className="container d-flex flex-row mt-5">
                                {message &&
                                    <>
                                        <p className="border border-dark rounded d-flex justify-content-center align-content-center py-2 px-5"> {message}</p>
                                    </>
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedProducts product={product} />

            <Footer/>
        </>
    );
}

export default ProductShow;