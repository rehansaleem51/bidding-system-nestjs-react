import React from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap';
import { Formik, FieldArray } from "formik";
import Button from 'react-bootstrap/Button';
import spinnerStore from '../../store/spinnerStore';
import itemService from '../../services/item-service';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

export default function AddDepartment() {

    const setIsLoading = spinnerStore((state) => state.setIsLoading);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        // emp_info: yup.object().shape({
        item: yup.object().shape({
            name: yup.string().required(' Name is required'),
            description: yup.string().required('Description is required'),
            starting_price: yup.number().required('Starting is required'),
            auction_end_datetime: yup.string().required('Auction End DateTime is required'),
            
        }),
    });
    const initialValues = {
        
        item:{
            name: '',
            description: '',
            starting_price: '',
            auction_end_datetime: '',
        },
        

    };
    const getSubmitHandler = () => (values) => {
        setIsLoading(true);
        itemService.create(values.item).then(response => {
            console.log(response);
            setIsLoading(false);
            navigate("/item/listing");
        }).catch(error => {
            setIsLoading(false);
            console.log(error)
        })
    };
    return (
    <>
        <div className='contentHeader mb-4'>
            <Row>
                <Col md={6}>
                    <h3 className='contentTitle'>Add New Item</h3>
                </Col>
            </Row>
        </div>
        <Card>
            <Card.Body>
                
                <Formik
                    validationSchema={schema}
                    onSubmit={getSubmitHandler()}
                    initialValues={initialValues}
                    >
                    {({ handleSubmit, handleChange, values, touched, errors,setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Item Name<sup className='text-danger'>*</sup></Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter Name" name="item.name" />
                            {errors.item?.name && touched.item?.name && (
                                <div className="text-danger">{errors.item?.name}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Item Description<sup className='text-danger'>*</sup></Form.Label>
                            <Form.Control onChange={handleChange} type="text" placeholder="Enter Description" name="item.description" />
                            {errors.item?.description && touched.item?.description && (
                                <div className="text-danger">{errors.item?.address}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Starting Price<sup className='text-danger'>*</sup></Form.Label>
                            <Form.Control onChange={handleChange} type="number" placeholder="" name="item.starting_price" />
                            {errors.item?.starting_price && touched.item?.starting_price && (
                                <div className="text-danger">{errors.item?.starting_price}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Auction End DateTime<sup className='text-danger'>*</sup></Form.Label>
                            <Form.Control onChange={handleChange} type="datetime-local" placeholder="" name="item.auction_end_datetime" />
                            {errors.item?.auction_end_datetime && touched.item?.auction_end_datetime && (
                                <div className="text-danger">{errors.item?.auction_end_datetime}</div>
                            )}
                        </Form.Group>
                    </Col>
                    
                    
                    <Col md={12} className='text-md-end'>
                        {/* <Button variant="outline-success" className='px-5 me-2' type="reset">Cancel</Button> */}
                        <Button variant="success" className='px-5' type="submit">Submit</Button>
                    </Col>
                    </Row>
                </Form>
                )}
            </Formik>
            </Card.Body>
        </Card>
    </>
  )
}
