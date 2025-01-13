import React from 'react'
import ReactPaginate from 'react-paginate';

export const pagination = ({ pageCount, currentPage, onPageChange }) => {
    
  return (
        <>
          <div className='float-end mt-4'>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={onPageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={10}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage}
            />
          </div>
            
        </>
        
  )
}

export default pagination;