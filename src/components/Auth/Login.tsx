import React, { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from '../Micro/Navbar';
import styles from '../../styles/product/Create.module.css';
import Footer from '../Micro/Footer';

export default function Login() {
    const { signIn } = useContext(AuthContext);
    const [loginState, setLoginState] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLoginChange = (event: any) => { setLoginState({ ...loginState, [event.target.name]: event.target.value }); };

    async function handleLoginFormSubmission(event: FormEvent) {
        event.preventDefault();
        await signIn(loginState);
        // navigate('/');
    }

    return (
        <>
            <Navbar/>

            <div className="text-center" style={{marginTop: '5vh'}}>
                <h1 className="display-6">Access your account</h1>
                <p className="text-muted">Fill the form below in order to access your account.</p>
                <p className="text-muted">If you don't have an account, create one <Link to='/register'>here</Link></p>
            </div>

            <div className="d-flex w-75" style={{margin: '0 auto'}}>

                <div className="card" style={{width: '45%', margin: '5vh auto 10vh auto'}}>
                    <div className="card-body">
                        <form onSubmit={handleLoginFormSubmission}>
                            <div className="form-group">
                                <label htmlFor="loginEmailInput" className={styles.labels}>Email</label>
                                <input type="text" name="email" className="form-control" id="loginEmailInput"
                                       placeholder="Email" onChange={handleLoginChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPasswordInput" className={styles.labels}>Password</label>
                                <input type="password" name="password" className="form-control" id="loginPasswordInput"
                                       placeholder="Password" onChange={handleLoginChange}/>
                            </div>



                            <div className="form-group text-center mt-4">
                                <button type="submit" className="btn btn-success" style={{margin: '0 auto'}}>Login
                                </button>
                            </div>


                        </form>
                    </div>
                </div>

            </div>

            <Footer/>
        </>
    );
}