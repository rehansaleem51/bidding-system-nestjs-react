import React from 'react'
import {authStore} from '../store/authStore'
import { Navigate } from "react-router-dom";
import checkPermission  from '../hooks/checkPermission';

export const protectedRoute = (props) => {
    const {Component} = props
    const { routeName } = props 
    const isAuthenticated = authStore(state => state.isAuthenticated);
    const token = authStore(state => state.token);
    const user = authStore(state => state.user);
    const redirectionUrl = authStore(state => state.redirectionUrl);
    if(isAuthenticated && token && user) {
       

        return (
            <div>
                <Component />
            </div>
        
        );
    } else {
        return <Navigate to="/login" replace />
    }
    
}

export const unProtectedRoute = (props) => {
    const {Component} = props
    const isAuthenticated = authStore(state => state.isAuthenticated);
    const token = authStore(state => state.token);
    const redirectionUrl = authStore(state => state.redirectionUrl);
    if(!isAuthenticated && !token) {
        return (
            <div>
                <Component />
            </div>
        
        );
        
    } else {
        return <Navigate to={redirectionUrl} replace />
    }
    
}