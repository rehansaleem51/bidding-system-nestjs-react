import React from 'react'
import {authStore} from '../store/authStore'

const checkPermission = (permission) => {
  let permissions = authStore((state) => state.permissions);
  console.log('permissions', permissions)
  return permissions.includes(permission)
}

export default checkPermission