import React, {useState} from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import sweetAlertStore from '../../store/sweetAlertStore';

const MessageAlert = ({title, type}) => {
    // const [showAlert, setShowAlert] = useState(true);
    const showAlert = sweetAlertStore((state) => state.showAlert);
    const setShowAlert = sweetAlertStore((state) => state.setShowAlert);
  // Define the onConfirm and onCancel functions
  const onConfirm = () => {
    setShowAlert(false);
    // updateParentState(false);
    // Additional logic to execute on confirmation
  };

  const onCancel = () => {
    setShowAlert(false)
    // updateParentState(false);
    // Additional logic to execute on cancellation
  };  
  return (
    <div>
        {showAlert && (<SweetAlert type={type} title={title} onConfirm={onConfirm} onCancel={onCancel}>
            
        </SweetAlert>
        )}
    </div>
    
  )
}

export default MessageAlert