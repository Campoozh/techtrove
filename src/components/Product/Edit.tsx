import React, {FormEvent, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {Category} from "../../types/Category";
import {fetchCategories} from "../../api/category";
import {editProduct, fetchProductByUuid} from "../../api/product";
import Navbar from "../Micro/Navbar";
import styles from "../../styles/product/Create.module.css";
import Footer from "../Micro/Footer";

export function ProductEdit() {

    const [categories, setCategories] = useState<Category[]>([])
    const [product, setProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: 0,
        image_url: '',
        category_id: ''
    });
    const [queryParameters] = useSearchParams();
    const productId = queryParameters.get("uuid");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const productsData = await fetchCategories();
            setCategories(productsData);
            if (productId) {
                const productResponse = await fetchProductByUuid(productId);
                setProduct({
                    id: productResponse.id,
                    title: productResponse.title,
                    description: productResponse.description,
                    price: productResponse.price,
                    image_url: productResponse.image_url,
                    category_id: productResponse.category_id
                });
            }
        })();
    }, [productId]);

    const onChangeProductAttribute = (e: any) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: name === 'price' ? Number(value) : value
        }));
        console.log(product)
    }

    const handleProductEditFormSubmission = (event: FormEvent) => {
        event.preventDefault();
        editProduct(product).then((res: any) => {
            if (res.status === 200) navigate('/products', {
                replace: true, state: { message: 'Product edited successfully!' }
            });
            else console.error(res)
        });
    }

    return (
        <>
            <Navbar/>

            <div className="text-center" style={{marginTop: '5vh'}}>
                <h1 className="display-6">Edit a product</h1>
                <p className="text-muted">Change the product's attributes by editing in the fields below</p>
            </div>

            <div className="card" style={{width: "50vw", margin: "5vh auto 10vh auto"}}>
                <div className="card-body">
                    <form onSubmit={handleProductEditFormSubmission} method="POST">

                        <div className="form-group">
                            <label htmlFor="titleInput" className={styles.labels}>Title</label>
                            <input type="text" className="form-control" id="titleInput"
                                   placeholder="Title" name="title" value={product.title} onChange={onChangeProductAttribute}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="descriptionInput" className={styles.labels}>Description</label>
                            <input type="text" className="form-control" id="descriptionInput"
                                   placeholder="Description" name="description" value={product.description} onChange={onChangeProductAttribute}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priceInput" className={styles.labels}>Price</label>
                            <input type="number" className="form-control" id="priceInput"
                                   placeholder="Price" name="price" value={product.price} onChange={onChangeProductAttribute}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrlInput" className={styles.labels}>Image URL</label>
                            <input type="text" className="form-control" id="imageUrlInput"
                                   placeholder="Image URL" name="image_url" value={product.image_url} onChange={onChangeProductAttribute}/>
                            {/* Input do tipo text considerando que a API não tem file storage handling e por isso é
                            suposto fornecer um link para uma imagem em cloud storage*/}
                        </div>

                        <div className="form-group">
                            <label htmlFor="categorySelect" className={styles.labels}>Category</label>
                            <select className="form-control" id="categorySelect"
                                    onChange={onChangeProductAttribute} name="category_id" >
                                <option value="">Choose a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id} selected={product.category_id === category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group text-center mt-4">
                            <button type="submit" className="btn btn-success" style={{margin: "0 auto"}}>Edit Product</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer/>
        </>
    );
}

