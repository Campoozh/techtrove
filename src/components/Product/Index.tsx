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
import ProductList from "./Micro/ProductList";

export default function ProductIndex() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const location = useLocation();
  const {token} = useContext(AuthContext)
  const message = location.state?.message;

  useEffect(() => {
      (async () => {

          if (token) setCategories(await fetchCategories())
          /* Contando que o user é ADMIN, porque na request de login a ROLE não vem na payload */

      })();
  }, [token]);

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

          <ProductList searchTerm={searchTerm}/>

          <Outlet/>
          <Footer/>
      </>
  );
}
