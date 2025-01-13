import React from 'react'
import { Card, Col, Row, Form, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default function UserRights() {
  return (
    <>
      <div className='contentHeader mb-4'>
        <h3 className='contentTitle'>User Rights</h3>
      </div>
      <Card>
        <Card.Body>
          <Form>
            <Row>
              <Col xl={3} lg={6} md={6} className='mb-md-0 mb-3'>
                <Form.Select aria-label="Default select example">
                  <option>Select Department</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
              <Col xl={3} lg={6} md={6} className='mb-md-0 mb-3'>
                <Form.Select aria-label="Default select example">
                  <option>Select District</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
              <Col xl={4} lg={6} md={6} className='ms-auto text-md-end'>
                <Button variant="outline-success" className='px-5 me-2' type="reset">Reset</Button>
                <Button variant="success" className='px-5' type="submit">Search</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Row>
        <Col lg={4} md={6} className='d-flex flex-column align-items-stretch'>
          <Card className='h-100'>
            <Card.Body>
              <h5 className='mb-3'>
                Assigned Rights
                <Form.Check
                  reverse
                  type="checkbox"
                  id=""
                  label="All"
                  className='float-end'
                />
              </h5>
              <hr/>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Supervisor"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="PRinter"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Publisher"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Director"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Writer"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Lead"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Delivery Charges"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Logistic"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="HR"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Administrator"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Finance Head"
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id=""
                  label="Helper"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} md={6} className='d-flex flex-column align-items-stretch'>
          <Card className='h-100'>
            <Card.Body>
              <h5 className='mb-3'>
                Assigned Users
              </h5>
              <hr/>
              <Table borderedless hover responsive>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Serial</th>
                    <th>Login</th>
                    <th>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label=""
                      />
                    </td>
                    <td>01</td>
                    <td className='text-dark fw-semibold'>Ahmad Khan</td>
                    <td>Publisher</td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label=""
                      />
                    </td>
                    <td>02</td>
                    <td className='text-dark fw-semibold'>Numair bin Mehmood</td>
                    <td>Writer</td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label=""
                      />
                    </td>
                    <td>03</td>
                    <td className='text-dark fw-semibold'>Azzaz ur Rehman</td>
                    <td>Writer</td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label=""
                      />
                    </td>
                    <td>04</td>
                    <td className='text-dark fw-semibold'>Abdullah Shahid</td>
                    <td>Publisher</td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label=""
                      />
                    </td>
                    <td>05</td>
                    <td className='text-dark fw-semibold'>Ahmad Khan</td>
                    <td>Writer</td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label=""
                      />
                    </td>
                    <td>06</td>
                    <td className='text-dark fw-semibold'>Abdullah Shahid</td>
                    <td>Writer</td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id=""
                        label=""
                      />
                    </td>
                    <td>07</td>
                    <td className='text-dark fw-semibold'>Umair Afzal</td>
                    <td>Publisher</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
