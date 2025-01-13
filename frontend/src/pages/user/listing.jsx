import React, {useState, useEffect} from 'react'
import { Card, Col, Row, Form, Table } from 'react-bootstrap';
import { PencilSquare, Plus } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import spinnerStore from '../../store/spinnerStore';
import UserService from '../../services/user-service';
import Pagination from '../../components/pagination/pagination'

export default function Users() {

    const setIsLoading = spinnerStore((state) => state.setIsLoading);
    const [users, setUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    const [pageRange, setPageRange] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [toRecordCount, setToRecordCount] = useState(0);
    const [fromRecordCount, setFromRecordCount] = useState(0);
    const [totalRecordCount, setTotalRecordCount] = useState(0);
    const [perPageRecord, setPerPageRecord] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
  
 
  useEffect(() => {
    getUsers();
  }, [pageNumber]);

  const getUsers = () => {
    
    setIsLoading(true);
    UserService.listing(pageNumber, searchQuery).then(response => {
        
        console.log(response)
        setUsers([...response.data.data.users.data])
        setPageCount(response.data.data.users.last_page);
        setCurrentPage(response.data.data.users.current_page-1)
        setPerPageRecord(response.data.data.users.per_page)
        setToRecordCount(response.data.data.users.to)           
        setFromRecordCount(response.data.data.users.from)
        setTotalRecordCount(response.data.data.users.total) 
        
        setIsLoading(false);
        
    }).catch(error => {
        setIsLoading(false);
        console.log(error)
    })
  }
  const handlePageChange = ({selected}) => {
    setPageNumber(selected+1)
  };

  const handleSearch = () => {
    getUsers();
    setPageNumber(0)
  }

  const handleReset = () => {
    setSearchQuery('')
    getUsers();
    setPageNumber(1);
    setCurrentPage(0);
   
  }
  return (
    <>
      <div className='contentHeader mb-4'>
        <Row>
          <Col md={6}>
            <h3 className='contentTitle'>User Listing</h3>
          </Col>
          <Col md={6} className='text-md-end'>
            <Link to="/user/create" className='btn btn-outline-success me-2'><Plus/> Add Users</Link>
            {/* <Link to="/user-hirarchy" className='btn btn-outline-success'><Plus/> Add Hirarchy</Link> */}
          </Col>
        </Row>
      </div>
      
      <Card className='mb-4'>
        <Card.Body>
          <Form>
            <Row>
              {/* <Col xl={3} lg={6} md={6} className='mb-md-0 mb-3'>
                <Form.Select aria-label="Default select example">
                  <option>Select Department</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col> */}
              {/* <Col xl={3} lg={6} md={6} className='mb-md-0 mb-3'>
                <Form.Select aria-label="Default select example">
                  <option>Select District</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col> */}
              <Col xl={3} lg={6} md={6} className='mb-md-0 mb-3'>
                <Form.Control type="text" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search User Name" />
              </Col>
              <Col xl={4} lg={6} md={6} className='ms-auto text-md-end'>
                <Button variant="outline-success" onClick={handleReset} className='px-5 me-2'>Reset</Button>
                <Button variant="success" onClick={handleSearch} className='px-5'>Search</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
            {users?.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>Department</td>
                    
                    
                    <td>
                      <span className={`fw-semibold ${
                          user.status == '1'
                            ? 'text-success'
                            : 'text-danger'
                        }

                      `}>{user.status == '1'
                      ? 'Active'
                      : 'Inactive'}</span>
                    </td>
                    <td className='text-center'>
                      <Link to={{
                        pathname: `/user/edit/${user.id}`,
                      }}>
                        <Button className='bg-transparent p-0 text-success' variant="link">
                          <PencilSquare/>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))  
              }   
              
            </tbody>
          </Table>
          <Pagination pageCount={pageCount} currentPage={currentPage} onPageChange={handlePageChange} />
        </Card.Body>
      </Card>
    </>
  )
}
