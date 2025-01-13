import React from 'react'
import { Card, Col, Row, Form } from 'react-bootstrap';
import { Formik, FieldArray } from "formik";
import spinnerStore from '../../store/spinnerStore';
import UserService from '../../services/user-service';
import Button from 'react-bootstrap/Button';
import DepartmentService from '../../services/item-service';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function UserRegistration() {

  const setIsLoading = spinnerStore((state) => state.setIsLoading);
  const navigate = useNavigate();
  const [departmentNames, setDepartmentNames] = useState([]);
  const schema = yup.object().shape({
      // emp_info: yup.object().shape({
      user: yup.object().shape({
          type: yup.string().required('Type is required'),
          department: yup.number().required('Department is required'),
          designation: yup.number().required('Designation is required'),
          name: yup.string().required('Name is required'),
          email: yup.string().required('Email is required').email('Email Address Must be Valid'),
          password: yup.string().required('Password is required'),
          status: yup.number().required('Status is required'),
      }),
  });
  const initialValues = {
      
      user:{
          type: '',
          department: '',
          designation: '',
          name: '',
          email: '',
          password: '',
          status: 1
      },
  };

  useEffect(() => {
    setIsLoading(true);
    DepartmentService.getAll().then(response => {
        setDepartmentNames(response.data.data.departments) 
        setIsLoading(false);
    }).catch(error => {
        setIsLoading(false);
        console.log(error)
    })
    }, []);
  const getSubmitHandler = () => (values) => {
      setIsLoading(true);
      UserService.create(values.user).then(response => {
          console.log(response);
          setIsLoading(false);
          navigate("/user/listing");
      }).catch(error => {
          setIsLoading(false);
          console.log(error)
      })
  };
  return (
    <>
    <div className='contentHeader mb-4'>
        <Row>
            <Col md={12}>
                <h3 className='contentTitle'>User Registration</h3>
            </Col>
        </Row>
    </div>
    <Row>
      <Col lg={12} md={6} className='d-flex flex-column align-items-stretch'>
        <Card className='h-100'>
            <Card.Body>
              <h5 className='mb-3'>Add User</h5>
              <hr/>
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
                  <Form.Label>User Type<sup className='text-danger'>*</sup></Form.Label>
                  <Form.Select onChange={handleChange} name="user.type" aria-label="Default select example">
                      <option>Select User Type</option>
                      <option value="mobile">Mobile</option>
                      <option value="web">Web</option>
                  </Form.Select>
                  {errors.user?.type && touched.user?.type && (
                                <div className="text-danger">{errors.user?.type}</div>
                            )}
                </Form.Group>
              </Col>
              <Col lg={4} md={6}>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Label>Department<sup className='text-danger'>*</sup></Form.Label>
                <Form.Select onChange={handleChange} name="user.department" aria-label="Default select example">
                    <option>Select Department</option>
                    {
                        departmentNames.map(department => {
                            return <option key={department.id} value={department.id}>{department.name}</option>
                        })
                    }
                    
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                {errors.user?.department && touched.user?.department && (
                                <div className="text-danger">{errors.user?.department}</div>
                            )}
              </Form.Group>
              </Col>
              <Col lg={4} md={6}>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Label>Designation<sup className='text-danger'>*</sup></Form.Label>
                <Form.Select onChange={handleChange} name="user.designation" aria-label="Default select example">
                    <option>Select Designation</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                {errors.user?.designation && touched.user?.designation && (
                                <div className="text-danger">{errors.user?.designation}</div>
                            )}
              </Form.Group>
              </Col>
              <Col lg={4} md={6}>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                  <Form.Label>Name<sup className='text-danger'>*</sup></Form.Label>
                  <Form.Control onChange={handleChange} name="user.name" type="text" placeholder="Enter Name" />
                  {errors.user?.name && touched.user?.name && (
                                <div className="text-danger">{errors.user?.name}</div>
                            )}
              </Form.Group>
              </Col>
              <Col lg={4} md={6}>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                  <Form.Label>Email<sup className='text-danger'>*</sup></Form.Label>
                  <Form.Control onChange={handleChange} name="user.email" type="email" placeholder="xyz@gmail.com" />
                  {errors.user?.email && touched.user?.email && (
                                <div className="text-danger">{errors.user?.email}</div>
                            )}
              </Form.Group>
              </Col>
              <Col lg={4} md={6}>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                  <Form.Label>password<sup className='text-danger'>*</sup></Form.Label>
                  <Form.Control onChange={handleChange} name="user.password" type="password" placeholder="your awesome passowrd" />
                  {errors.user?.password && touched.user?.password && (
                                <div className="text-danger">{errors.user?.password}</div>
                            )}
              </Form.Group>
              </Col>
              <Col lg={4} md={6}>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                  <Form.Label>Status<sup className='text-danger'>*</sup></Form.Label>
                  <Form.Select onChange={handleChange} name="user.status" aria-label="Default select example">
                      <option>Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                  </Form.Select>
                  {errors.user?.status && touched.user?.status && (
                                <div className="text-danger">{errors.user?.status}</div>
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
      </Col>
      
      
    </Row>
</>
  )
}
