import React, {useEffect, useState} from 'react';
import {fetchProducts} from "./api/product";
import {Product} from "./types/Product";
import {Link} from "react-router-dom";
import Navbar from "./components/Micro/Navbar";
import Footer from "./components/Micro/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';

function App() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    (async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    })();
  }, []);


  return (
      <>
          <Navbar/>

          <header className="bg-dark py-5">
              <div className="container px-4 px-lg-5 my-5">
                  <div className="text-center text-white">
                      <h1 className="display-4 fw-bolder">Shop with us!</h1>
                      <p className="lead fw-normal text-white-50 mb-0">All the products you need.</p>
                  </div>
              </div>
          </header>

          <section className="py-5">
              <div className="container px-4 px-lg-5 mt-5">
                  <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                      {products.map(product => (
                          <div className="col mb-5">
                              <div className="card h-100">
                                  <img className="card-img-top" src={product.image_url} alt="..."/>
                                  <div className="card-body p-4">
                                      <div className="text-center">
                                          <h5 className="fw-bolder">{product.title}</h5>
                                          ${product.price}
                                      </div>
                                  </div>
                                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                      <div className="text-center">
                                          <Link to={`products/${product.id}`}
                                                className="btn btn-outline-dark mt-auto">View More</Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>

          <Footer/>
      </>
  );
}

export default App;
