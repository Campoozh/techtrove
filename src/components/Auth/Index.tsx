import React, { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Micro/Navbar';
import styles from '../../styles/product/Create.module.css';
import Footer from '../Micro/Footer';

export default function Auth() {
    const { signUp, signIn } = useContext(AuthContext);
    const [registerState, setRegisterState] = useState({ name: '', email: '', password: '' });
    const [loginState, setLoginState] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleRegisterChange = (event: any) => { setRegisterState({ ...registerState, [event.target.name]: event.target.value }); };
    const handleLoginChange = (event: any) => { setLoginState({ ...loginState, [event.target.name]: event.target.value }); };

    async function handleRegisterFormSubmission(event: FormEvent) {
        event.preventDefault();
        await signUp(registerState);
        navigate('/');
    }

    async function handleLoginFormSubmission(event: FormEvent) {
        event.preventDefault();
        await signIn(loginState);
        navigate('/');
    }

    return (
        <>
            <Navbar/>

            <div className="text-center" style={{ marginTop: '5vh' }}>
                <h1 className="display-6">Access your account</h1>
                <p className="text-muted">Fill the respective forms below in order to access or create your account</p>
            </div>

            <div className="d-flex w-75" style={{ margin: '0 auto' }}>
                <div className="card" style={{ width: '45%', margin: '5vh auto 10vh auto' }}>
                    <div className="card-body">
                        <form onSubmit={handleRegisterFormSubmission}>
                            <div className="form-group">
                                <label htmlFor="registerNameInput" className={styles.labels}>Name</label>
                                <input type="text" name="name" className="form-control" id="registerNameInput"
                                       placeholder="Name" onChange={handleRegisterChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerEmailInput" className={styles.labels}>Email</label>
                                <input type="email" name="email" className="form-control" id="registerEmailInput"
                                       placeholder="Email" onChange={handleRegisterChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerPasswordInput" className={styles.labels}>Password</label>
                                <input type="password" name="password" className="form-control" id="registerPasswordInput"
                                       placeholder="Password" onChange={handleRegisterChange}/>
                            </div>
                            <div className="form-group text-center mt-4">
                                <button type="submit" className="btn btn-success" style={{ margin: '0 auto' }}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>

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