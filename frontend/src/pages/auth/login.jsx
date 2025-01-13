import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import { Formik, ErrorMessage } from "formik";
import MessageAlert from '../../components/sweetAlert/messageAlert'
import UserService from '../../services/auth-service';
import * as yup from 'yup';
import {authStore} from '../../store/authStore';
import spinnerStore from '../../store/spinnerStore';
import sweetAlertStore from '../../store/sweetAlertStore'
import Spinner from '../../components/spinner/spinner';
import './auth.css';

export default function Login() {

    const navigate = useNavigate();
    const setTokenAndUser = authStore((state) => state.setTokenAndUser);
    const setIsLoading = spinnerStore((state) => state.setIsLoading);
    const setRedirection = authStore((state) => state.setRedirectionUrl);
    const showAlert = sweetAlertStore((state) => state.showAlert);
    const setShowAlert = sweetAlertStore((state) => state.setShowAlert);
    const [errorMessage, setErrorMessage] = useState('');
    // const [showAlert, setShowAlert] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const schema = yup.object().shape({
        username: yup.string().required(),

    });

    const getSubmitHandler = () => (values) => {
        setIsLoading(true);
        UserService.login(values).then(response => {
            console.log(response)
            const token = response.data.access_token
            const user = response.data.user
            setTokenAndUser(token, user, true);
            //setRedirection("/item/listing");
            setIsLoading(false);
            navigate("/item/listing");
        }).catch(error => {
            setIsLoading(false);
            setShowAlert(true)
            console.log(error);
            setErrorMessage(error.response.data.message);
        })
    };
  return (
    <>
        <main className="main-auth">
        
            {showAlert && (<MessageAlert title={errorMessage} type='error' />)} 
            <Container className="px-md-0" fluid>
                
                <Row className="g-0">
                       
                    <Col xl={6} lg={6} md={6} className="mx-auto auth-content">
                        <Spinner />
                        <div className='d-md-flex align-items-center logo p-lg-4 p-3'>
                            <div className='flex-shrink-0 text-md-start text-center'>
                                
                            </div>
                            <div className='flex-grow-1 ms-md-3 d-md-block d-none'>
                                <h5>Bidding System</h5>
                                
                            </div>
                        </div>
                        <Col xl={6} lg={8} md={10} className="mx-auto mt-lg-4">
                        <Formik validationSchema={schema}
                            onSubmit={getSubmitHandler()}
                            initialValues={{
                                username: '',
                            }}>
                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form className="auth-form pt-lg-5" onSubmit={handleSubmit} id="loginform" action="">
                                <div className="mb-4 text-center">
                                    <h2 className="text-theme-blue fw-bold">Log in to your Account</h2>
                                </div>
                                <div className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="user1" name="username" value={values.username} onChange={handleChange} isValid={touched.username && !errors.email}></Form.Control>
                                    <small className="text-danger">{errors.username}</small>
                                </div>
                                
                                
                                <div className="d-grid">
                                    <Button variant="primary" type="submit" className='w-100 py-3'>Sign In</Button>
                                </div>
                            </Form>
                            )}
                            </Formik>
                        </Col>
                    </Col>
                    
                </Row>
            </Container>
        </main>
    </>
  )
}