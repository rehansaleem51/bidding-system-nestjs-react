import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap';
import { Formik, FieldArray } from "formik";
import Button from 'react-bootstrap/Button';
import spinnerStore from '../../store/spinnerStore';
import DepartmentService from '../../services/item-service';
import * as yup from 'yup';
import { useParams,useNavigate} from 'react-router-dom';

export default function EditDepartment() {

    const setIsLoading = spinnerStore((state) => state.setIsLoading);
    const navigate = useNavigate();
    const [departmentObj, setDepartmentObj] = useState(null)
    let { id } = useParams();
    const schema = yup.object().shape({
        // emp_info: yup.object().shape({
        department: yup.object().shape({
            name: yup.string().required('Department Name is required'),
            address: yup.string().required('Department Address is required'),
            contact_number: yup.string().required('Department Contact Number is required'),
            email: yup.string().required('Department Email Address is required'),
            logo: yup.mixed(),
        }),
    });
    const initialValues = {
        
        department:{
            name: '',
            address: '',
            contact_number: '',
            email: '',
            logo: '',
            status: 'active'
        },
        

    };
    useEffect(() => {
        setIsLoading(true);
        DepartmentService.find(id).then(response => {
            
            console.log(response.data.data)
            console.log(initialValues)
            setDepartmentObj(response.data.data);
            initialValues.department.name = response.data.data.department.name
            setIsLoading(false);
            
        }).catch(error => {
            setIsLoading(false);
            console.log(error)
        })
    }, []);

    const getSubmitHandler = () => (values) => {
        setIsLoading(true);
        DepartmentService.edit(values.department, id).then(response => {
            console.log(response);
            setIsLoading(false);
            navigate("/department/listing");
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
                    <h3 className='contentTitle'>Edit Department</h3>
                </Col>
            </Row>
        </div>
        <Card>
            <Card.Body>
                <h5 className='mb-4'>Department Information</h5>
                <Formik
                    validationSchema={schema}
                    onSubmit={getSubmitHandler()}
                    initialValues={departmentObj || initialValues}
                    enableReinitialize={true}
                    >
                    {({ handleSubmit, handleChange, values, touched, errors,setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Department Name<sup className='text-danger'>*</sup></Form.Label>
                            <Form.Control onChange={handleChange} value={values.department.name} type="text" placeholder="Department Name" name="department.name" />
                            {errors.department?.name && touched.department?.name && (
                                <div className="text-danger">{errors.department?.name}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Department Address<sup className='text-danger'>*</sup></Form.Label>
                            <Form.Control onChange={handleChange} value={values.department.address} type="text" placeholder="Department Address" name="department.address" />
                            {errors.department?.address && touched.department?.address && (
                                <div className="text-danger">{errors.department?.address}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Contact Number<sup className='text-danger'>*</sup></Form.Label>
                            <Form.Control onChange={handleChange} value={values.department.contact_number} type="text" placeholder="03*********" name="department.contact_number" />
                            {errors.department?.contact_number && touched.department?.contact_number && (
                                <div className="text-danger">{errors.department?.contact_number}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email Address<sup className='text-danger'>*</sup></Form.Label>
                            <Form.Control onChange={handleChange} value={values.department.email} type="email" placeholder="name@example.com" name="department.email" />
                            {errors.department?.email && touched.department?.email && (
                                <div className="text-danger">{errors.department?.email}</div>
                            )}
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group controlId="formFile" className="mb-4">
                            <Form.Label>Upload Logo</Form.Label>
                            <Form.Control type="file" name="department.logo" onChange={(event) => {
                                setFieldValue("department.logo", event.currentTarget.files[0]);
                            }} />
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Select onChange={handleChange} value={values.department.status} aria-label="Default select example" name="department.status">
                                <option>Select Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                {/* <option value="hold">On Hold</option> */}
                            </Form.Select>
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
