import React, {useContext, useEffect, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import {Product, ProductListProps} from "../../../types/Product";
import {AuthContext} from "../../../contexts/AuthContext";
import {fetchProducts, fetchProductsByCategory} from "../../../api/product";

function ProductList({searchTerm}: ProductListProps) {

    const [products, setProducts] = useState<Product[]>([])
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true)
    const [params] = useSearchParams();
    const categoryId = params.get('categoryId');
    const {token} = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            let productsData: Product[] = [];

            if (categoryId) productsData = await fetchProductsByCategory(categoryId)
            else productsData = await fetchProducts()

            setProducts(productsData)
            setLoadingProducts(false)
        })();
    }, [categoryId, products]);


    if (loadingProducts) return <>Loading products...</>

    return (
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-2">
                    <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-3 justify-content-center mx-md-2 mx-lg-5">
                        {products
                            .filter(product =>
                                product.title.toUpperCase().includes(searchTerm.toUpperCase())
                            )
                            .map(product => (
                                <div className="col mb-5" key={product.id}>
                                    <div className="card h-100">
                                        <img className="card-img-top" src={product.image_url} alt="..."/>
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                {token ?
                                                    <h5 className="fw-bolder">
                                                        <Link to={product.id}>{product.title}</Link>
                                                    </h5>
                                                    :
                                                    <h5 className="fw-bolder">{product.title}</h5>
                                                }
                                                ${product.price}
                                            </div>
                                        </div>
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center">
                                                {token ?
                                                    <>
                                                        <Link to={`edit?uuid=${product.id}`}
                                                              className="btn btn-outline-success mt-auto">Edit</Link> &nbsp;
                                                        <Link to={`delete?uuid=${product.id}`}
                                                              className="btn btn-outline-danger mt-auto">Delete</Link>
                                                    </>
                                                    :
                                                    <Link to={product.id} className="btn btn-outline-dark mt-auto">View More</Link>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductList;