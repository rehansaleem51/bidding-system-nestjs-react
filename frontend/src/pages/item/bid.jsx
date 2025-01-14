import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { io, Socket } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import itemService from '../../services/item-service';
import spinnerStore from '../../store/spinnerStore';
import {authStore} from '../../store/authStore';
import ItemService from '../../services/item-service';
import sweetAlertStore from '../../store/sweetAlertStore'
import MessageAlert from '../../components/sweetAlert/messageAlert'

export const BidPage = () => {
    const setIsLoading = spinnerStore((state) => state.setIsLoading);
    const user = authStore((state) => state.user);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [highestBid, setHighestBid] = useState(0);
  const showAlert = sweetAlertStore((state) => state.showAlert);
    const setShowAlert = sweetAlertStore((state) => state.setShowAlert);
    const [errorMessage, setErrorMessage] = useState('');
    const [statusType, setstatusType] = useState('');

  useEffect(() => {
    setShowAlert(false);
    setIsLoading(true);
            itemService.find(roomId).then(response => {
                if(response.data.highest_bid == null)
                {
                    setHighestBid(response.data.starting_price);
                }
                else{
                setHighestBid(response.data.highest_bid);
                }
                setIsLoading(false);
                
            }).catch(error => {
                setIsLoading(false);
                console.log(error)
            })
    // Initialize Socket.IO connection
    let socket_url=import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL+"place-bid";
    
    const newSocket = io(socket_url, {
      transports: ['websocket'], // Use WebSocket transport
    });

    setSocket(newSocket);

    // Join the room on connect
    newSocket.emit('place-bid-join', 'room'+roomId);

    // Listen for new bids
    newSocket.on('new-bid-placed', (data) => {
      setBids((prevBids) => [...prevBids, data]);
      console.log(data);
      setMessage(`New bid placed by ${data.highestBidBy.username} with amount ${data.highestBid}`);
      setHighestBid(data.highestBid);
    });

    // Clean up on unmount
    return () => {
      newSocket.emit('place-bid-leave', 'room'+roomId);
      newSocket.disconnect();
    };
  }, [roomId]);

  const handlePlaceBid = async () => {
    if (!socket) return;

    // Emit the bid-placing event
    const payload = { itemId:roomId,bidAmount: bidAmount, userId: user.id }; 
    console.log(payload);
    ItemService.bid(payload).then(response => {
          console.log(response.data);
          if(response.data.statusCode == 200)
            {
                setstatusType('success');
                setShowAlert(true)
                setErrorMessage(response.data.message)
                
                
            }
           else if(response.data.statusCode == 999)
                {
                    setstatusType('error');
                    setShowAlert(true)
                setErrorMessage(response.data.message)
                
                    if (socket) {
                        socket.emit('place-bid-leave', 'room'+roomId);
                        socket.disconnect();
                      }
                      navigate('/item/listing');
                }
            else
            {
                setstatusType('error');
                setShowAlert(true)
                setErrorMessage(response.data.message)
                
            }   
            
        }).catch(error => {
            console.log(error)
        });
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit('place-bid-leave', 'room'+roomId);
      socket.disconnect();
    }
    navigate('/item/listing'); // Redirect to home or any other page
  };

  return (
    <div>
      <h1>Room: Item {roomId}</h1>
      <h2>Real-Time Bids</h2>
      <ul>
        {bids.map((bid, index) => (
          <li key={index}>
          ${bid.highestBidBy.username}  : ${bid.highestBid}
          </li>
        ))}
      </ul>
      <h3>Current Highest Bid : {highestBid} </h3>
      <p>{message}</p>
      {showAlert && (<MessageAlert title={errorMessage} type={statusType} />)}
      <div>
        <input
          type="number"
          placeholder="Enter bid amount"
          
          onChange={(e) => setBidAmount(Number(e.target.value))}
        />
        <Button variant='success' onClick={handlePlaceBid}>Place Bid</Button>
      </div>
      <Button variant='success' onClick={handleLeaveRoom}>Leave Room</Button>
    </div>
  );
};

export default BidPage;
