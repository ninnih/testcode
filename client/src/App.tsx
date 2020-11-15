import React, { useState, useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { 
  addReminder, 
  toggleReminder,
  deleteReminder,
  updateReminder,
  editTask
 } from './js/actions/index';
import './App.scss';
import Header from './components/Header/Header';
import MainRoutes from './modules/MainRoutes/MainRoutes';
import InputModal from './components/InputModal/InputModal';
import Button from './components/Button/Button';

const uri = 'https://ninnih-codetest.herokuapp.com';
const io = require('socket.io-client');
const socket = io('http://localhost:8000/', { transports: ['websocket'] });

interface UsernameType {
  username: string,
  usernameSet: boolean
}

const App: FC = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState<boolean | null>(false);
  const [username, setUsername] = useState<UsernameType>({
    username: '',
    usernameSet: false
  })
  const [users, setUsers] = useState([])

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername({
      ...username,
      username: e.target.value
    })
  }

  const submitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    socket.emit('join', username.username)

    setUsername({
      ...username,
      usernameSet: true
    })
  }

	useEffect(() => {
    socket.on('updateName', (response: any) => {
      setUsers(response)
    })

		socket.on('reminderAdded', (reminderDataResponse: any, id: any) => {
			dispatch(addReminder(reminderDataResponse))
    })
    
    socket.on('toggleReminderReceived', (toggleResponse: any) => {
      dispatch(toggleReminder(toggleResponse))
    })
    
    socket.on('toggleDeleteReceived', (deleteResponse: any) => {
      dispatch(deleteReminder(deleteResponse))
    })

    socket.on('updateReminderDataReceived', (updateResponse: any) => {
      dispatch(updateReminder(updateResponse))
    })

    socket.on('editReminderReceived', (deleteResponse: any) => {
      dispatch(editTask(deleteResponse))
    })
	}, [dispatch])

  const openModal = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    !modal ? setModal(true) : setModal(false)
  }
  
  return (
    <section className="mainwrapper">
      <MainRoutes socket={socket}/>
      <Header 
        openModal={openModal}
        users={users}/>
      { modal ? 
                <InputModal openModal={openModal} socket={socket}/> 
              : null }
      { !username.usernameSet ? 
                                <section className="setUsername">
                                  <form onSubmit={submitName}>
                                    <p>Please enter a name to continue.</p>
                                    <label htmlFor="username">Username</label>
                                    <input 
                                      type="text" 
                                      id="username"
                                      onChange={changeName}/>
                                    <Button type="submit" value="Submit"></Button>
                                  </form>
                                </section>
                              : null }
    </section>
  );
}

export default App;
