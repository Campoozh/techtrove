import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {fetchProductsByCategory} from "../../../api/product";
import {Product, RelatedProductsProps} from "../../../types/Product";

function RelatedProducts({product}: RelatedProductsProps) {

    const [relatedProducts, setRelatedProducts] = useState<Product[]>()

    useEffect(() => {
        (async () => {
            const sameCategoryProducts = await fetchProductsByCategory(product.category_id);
            const fourSameCategoryProducts = sameCategoryProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
            setRelatedProducts(fourSameCategoryProducts);
        })();
    }, [product]);

    return (
        <section className="py-5 bg-light">
            <div className="container px-4 px-lg-5 mt-5">
                <h2 className="fw-bolder mb-4">Related products</h2>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        relatedProducts?.map(product => (
                            <div className="col mb-5">
                                <div className="card h-100">
                                    <img className="card-img-top"
                                         src={product.image_url}
                                         alt="..."/>
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{product.title}</h5>
                                            ${product.price}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <Link to={`/products/${product.id}`}
                                                  className="btn btn-outline-dark mt-auto">View
                                                More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default RelatedProducts;