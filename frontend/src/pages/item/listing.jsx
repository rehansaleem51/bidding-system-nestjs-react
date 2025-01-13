import React, {useState, useEffect} from 'react'
import { Card, Col, Row, Form, Table } from 'react-bootstrap';
import { BoxArrowUp, PencilSquare, Plus } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import './department.css'
import spinnerStore from '../../store/spinnerStore';
import ItemService from '../../services/item-service';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination/pagination'
export default function Item() {

  
  const setIsLoading = spinnerStore((state) => state.setIsLoading);
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState()
  const [pageRange, setPageRange] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [toRecordCount, setToRecordCount] = useState(0);
  const [fromRecordCount, setFromRecordCount] = useState(0);
  const [totalRecordCount, setTotalRecordCount] = useState(0);
  const [perPageRecord, setPerPageRecord] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
 
  useEffect(() => {
    getitems();
  }, [pageNumber]);

  
  const getitems = () => {
    
    setIsLoading(true);
    ItemService.listing(pageNumber, searchQuery).then(response => {
      console.log(response.data);
         setItems([...response.data]);  
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
    getitems();
    setPageNumber(0)
  }

  const handleReset = () => {
    setSearchQuery('')
    getitems();
    setPageNumber(1);
    setCurrentPage(0);
   
  }
  const renderTimeLeft = (auctionEndDatetime) => {
    var endTime = new Date(auctionEndDatetime);
    endTime =   new Date( endTime.getTime() + ( endTime.getTimezoneOffset() * 60000 ) ).getTime();
    const currentTime = new Date().getTime();
    
    if (currentTime > endTime) {
      return <span className="text-danger">Expired</span>;
    } else {
      const timeLeft = endTime - currentTime;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      return (
        <span>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  const isExpired = (auctionEndDatetime) => {
    var endTime = new Date(auctionEndDatetime);
    endTime =   new Date( endTime.getTime() + ( endTime.getTimezoneOffset() * 60000 ) ).getTime();
    const currentTime = new Date().getTime();
    
    if (currentTime > endTime) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className='contentHeader mb-4'>
        <Row>
          <Col md={6}>
            <h3 className='contentTitle'>Items Listing</h3>
          </Col>
          <Col md={6} className='text-md-end'>
            {/* <Button variant="outline-success" className='me-2'><BoxArrowUp/> Export to Excel</Button> */}
            <Link to={{
                        pathname: `/item/create`,
                      }} className='btn btn-outline-success'><Plus/> Add Item</Link>
          </Col>
        </Row>
      </div>
      
      
      <Card>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Auction Room ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Starting price</th>
                <th>Highest Bid</th>
                <th>Highest Bid By</th>
                <th>Auction End time left</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              
              {items?.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.id}
                    </td>
                    <td className='text-dark fw-semibold'>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.starting_price}</td>
                    <td>{item.highest_bid}</td>
                    <td></td>
                    <td>{renderTimeLeft(item.auction_end_datetime)}</td>
                    
                    <td className='text-center'>
                    {!isExpired(item.auction_end_datetime) && ( 
                      <Link  to={{
                        pathname: `/item/bid/${item.id}`,
                      }}>
                        <Button className='bg-transparent p-0 text-success' variant="link">
                          Join Auction
                        </Button>
                      </Link>
                    )}
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
