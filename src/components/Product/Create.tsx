import React, {FormEvent, useEffect, useState} from 'react'
import {Product} from "../../types/Product";
import {Category} from "../../types/Category";
import {createProduct} from "../../api/product";
import {fetchCategories} from "../../api/category";
import {processErrorResponse} from "./errors";
import {useNavigate} from 'react-router-dom';
import Navbar from "../Micro/Navbar";
import Footer from "../Micro/Footer";
import styles from "../../styles/product/Create.module.css";

export default function ProductCreate() {

    const [categories, setCategories] = useState<Category[]>([])
    const [responseMessage, setResponseMessage] = useState("")
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
                const productsData = await fetchCategories();
                setCategories(productsData);
        })();
    }, []);

    let handleProductCreationFormSubmission = (event: FormEvent) => {
        event.preventDefault();
        const data: Product = {id: "", title, description, price, image_url: imageUrl, category_id: categoryId}

        createProduct(data).then((res: any) => {
            if (res.status === 201) navigate('/products', {
                replace: true, state: { message: 'Product created successfully!' }});
            else setResponseMessage(processErrorResponse(res.response.status))
        })
    }

    return (
        <>
            <Navbar/>

            <div className="text-center" style={{marginTop: '5vh'}}>
                <h1 className="display-6">Create a product</h1>
                <p className="text-muted">Fill the form below in order to add a new product</p>
            </div>

            <div className="card" style={{width: "50vw", margin: "5vh auto 10vh auto"}}>
                <div className="card-body">
                    <form onSubmit={handleProductCreationFormSubmission} method="POST">

                        <div className="form-group">
                            <label htmlFor="titleInput" className={styles.labels}>Title</label>
                            <input type="text" className="form-control" id="titleInput"
                                   placeholder="Title" onChange={event => setTitle(event.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="descriptionInput" className={styles.labels}>Description</label>
                            <input type="text" className="form-control" id="descriptionInput"
                                   placeholder="Description" onChange={event => setDescription(event.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priceInput" className={styles.labels}>Price</label>
                            <input type="number" className="form-control" id="priceInput"
                                   placeholder="Price" onChange={event => setPrice(Number(event.target.value) * 100)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrlInput" className={styles.labels}>Image URL</label>
                            <input type="text" className="form-control" id="imageUrlInput"
                                   placeholder="Image URL" onChange={event => setImageUrl(event.target.value)}/>
                            {/* Input do tipo text considerando que a API não tem file storage handling e por isso é
                            suposto fornecer um link para uma imagem em cloud storage*/}
                        </div>

                        <div className="form-group">
                            <label htmlFor="categorySelect" className={styles.labels}>Category</label>
                            <select className="form-control" id="categorySelect"
                                    onChange={event => setCategoryId(event.target.value)}>
                                <option value="">Choose a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group text-center mt-4">
                            <button type="submit" className="btn btn-success" style={{margin: "0 auto"}}>Create Product</button>
                        </div>

                    </form>
                </div>
            </div>

            <Footer/>
        </>
    )
}
