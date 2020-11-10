import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux'
// import { 
// 	initialRemindersAction
//  } from './js/actions/index'

import './App.scss';
import Header from './components/Header/Header';
import MainRoutes from './modules/MainRoutes/MainRoutes';
import InputModal from './components/InputModal/InputModal';
import { 
	addReminder
 } from './js/actions/index'
// import {io} from "socket.io-client";
const io = require('socket.io-client');
let socket = io('http://localhost:8000', {transports: ['websocket']});

const App: FC = () => {
  const [modal, setModal] = useState<boolean | null>(false);
  const dispatch = useDispatch();
  // dispatch(initialRemindersAction(socket))

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected); 

     });

    }, [])

    
	useEffect(() => {
		socket.on('reminderAdded', (reminderDataResponse: any) => {
			dispatch(addReminder(reminderDataResponse))
		})
	}, [dispatch, socket])



  const openModal = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    !modal ? setModal(true) : setModal(false)
  }
  
  return (
    <section className="mainwrapper">
      <MainRoutes/>
      <Header openModal={openModal}/>
      {modal ? <InputModal openModal={openModal} socket={socket}/> : null}
    </section>
  );
}

export default App;
