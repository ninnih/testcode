import React, { useState, useEffect, FC } from 'react';

import './App.scss';
import Header from './components/Header/Header';
import MainRoutes from './modules/MainRoutes/MainRoutes';
import InputModal from './components/InputModal/InputModal';
// import {io} from "socket.io-client";
const io = require('socket.io-client');
const socket = io('http://localhost:8000', {transports: ['websocket']});

const App: FC = () => {
  const [modal, setModal] = useState<boolean | null>(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected); 
     });
  }, [])

  const openModal = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    !modal ? setModal(true) : setModal(false)
  }
  
  return (
    <section className="mainwrapper">
      <MainRoutes/>
      <Header openModal={openModal}/>
      {modal ? <InputModal openModal={openModal}/> : null}
    </section>
  );
}

export default App;
