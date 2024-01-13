import React, {useContext, useEffect, useState} from 'react';
import {Product} from '../../types/Product';
import {Category} from "../../types/Category";
import {useLocation} from 'react-router-dom';
import {fetchCategories} from "../../api/category";
import Navbar from "../Micro/Navbar";
import Footer from "../Micro/Footer";
import {Link, Outlet, useSearchParams} from 'react-router-dom';
import {XLg} from "react-bootstrap-icons";
import '../../styles/product/index.css'
import {fetchProducts, fetchProductsByCategory} from "../../api/product";
import {AuthContext} from "../../contexts/AuthContext";

export default function ProductIndex() {

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [params] = useSearchParams();
  const categoryId = params.get('categoryId');
  const {token} = useContext(AuthContext)
  const message = location.state?.message;

  useEffect(() => {
      (async () => {
          let productsData: Product[] = [];

          if(categoryId) productsData = await fetchProductsByCategory(categoryId)
          else productsData = await fetchProducts()

          if (token) setCategories(await fetchCategories())
          /* Contando que o user é ADMIN, porque na request de login a ROLE não vem na payload */

          setProducts(productsData)
      })();
  }, [categoryId, params, token]);

  return (
      <>
          <Navbar/>

          <header className="mt-5 mb-1">
              <div className="container px-4 px-lg-5">
                  <div className="text-center text-black">
                      <h5 className="display-6 fw-bolder">Check out all of our products</h5>
                      <p className="lead fw-normal text-black mb-0">Filter the searches as you need and find everything</p>
                  </div>
              </div>
          </header>

          <section className="container d-flex flex-row justify-content-around px-4 px-lg-5 mt-5">
              <div className="flex-fill">

                  {/*
                        Como o endpoint das categorias necessita de JWT,
                        apenas tornei possível filtrar por categoria se estiver na conta.
                  */}

                  {
                      token && (
                          <div className="dropdown">
                              <button className="btn btn-outline-dark mt-auto dropdown-toggle" type="button"
                                      id="categoriesMenu"
                                      data-bs-toggle="dropdown" aria-expanded="false">
                                  Categories
                              </button>&nbsp;
                              <Link to='/products' className="btn btn-outline-dark mt-auto"
                                      id="clearFilter"
                                      >
                                  <XLg /> Clear filter
                              </Link>
                              <ul className="dropdown-menu" aria-labelledby="categoriesMenu">
                                  {
                                      categories.map(category => (
                                          <li>
                                              <a className="dropdown-item"
                                                 href={`products?categoryId=${category.id}`}>{category.name}</a>
                                          </li>
                                      ))
                                  }
                              </ul>
                          </div>
                      )
                  }
              </div>
              <div className="flex-fill d-flex justify-content-center">
                  <input type="email" className="form-control" id="nameFilterInput"
                         placeholder="Type a name to search for..." onChange={event => {setSearchTerm(event.target.value)}
                  }/>
              </div>
              <div className="flex-fill d-flex justify-content-end">
                  {
                      token &&
                      <Link to={`create`} className="btn btn-outline-dark mt-auto">Create a product</Link>
                  }
              </div>
          </section>

          <section className="container d-flex flex-row justify-content-around px-4 px-lg-5 mt-5">
              {message &&
                  <>
                    <p className="border border-dark rounded d-flex justify-content-center align-content-center py-2 px-5"> {message}</p>
                  </>
              }
          </section>

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

          <Outlet/>
          <Footer/>
      </>
  );
}
