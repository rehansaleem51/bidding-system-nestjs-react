import React from 'react'
import { Routes ,Route} from 'react-router-dom';
import Dashboard from '../pages/dashboard/dashboard';
import Login from '../pages/auth/login';
import itemListing from '../pages/item/listing';
import itemCreate from '../pages/item/create';
import itemEdit from '../pages/item/edit';
import UserCreate from '../pages/user/create';
import UserListing from '../pages/user/listing';
import UserEdit from '../pages/user/edit';
import Layout from '../components/layout/layout';
import {protectedRoute as Protected} from './protectedRoute';
import {unProtectedRoute as UnProtected} from './protectedRoute';
import bidPage from '../pages/item/bid';

export default function routing() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Layout />}>
              
                <Route path="/" element={
                  <Protected Component={itemListing} routeName={'item_listing'} /> }
                />
               
                <Route path='item'>
                  <Route path='listing' element={
                    <Protected Component={itemListing} routeName={'item_listing'} />
                  }/>
                  <Route path='create' element={
                    <Protected Component={itemCreate} routeName={'item_create'} />
                  }/>
                  <Route path='edit/:id' element={
                    <Protected Component={itemEdit} routeName={'item_edit'} />
                  }/>
                  <Route path='bid/:roomId' element={
                    <Protected Component={bidPage} routeName={'bid_page'} />
                  }/>
                </Route>

                <Route path='user'>
                 
                  <Route path='listing' element={
                    <Protected Component={UserListing} routeName={'user_listing'} />
                  }/>
                  <Route path='create' element={
                    <Protected Component={UserCreate} routeName={'user_create'} />
                  }/>
                  <Route path='edit/:id' element={
                    <Protected Component={UserEdit} routeName={'user_edit'} />
                  }/>
                </Route>
            </Route>

            <Route path="login" element={
              <UnProtected Component={Login} />
              
            }/>
           
            

        </Routes>
    </>    
  )
}