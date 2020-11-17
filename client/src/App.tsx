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
const io =  require('socket.io-client');
const endpoint = 'https://ninnih-codetest.herokuapp.com';
const socket = io('http://localhost:8000', { transports: ['websocket'] });

interface UsernameType {
  username: string,
  usernameSet: boolean
}

interface ReminderServerResponse {
  title: string,
  done: boolean,
  edit: boolean,
  id: string,
  owner: string,
  tasks: Array<any>,
  time: string,
  timeDone: string,
  expand: boolean
}

const App: FC = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState<boolean | null>(false);
  const [username, setUsername] = useState<UsernameType>({ username: '', usernameSet: false })
  const [users, setUsers] = useState<Array<Object>>([])

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

  const openModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    !modal ? setModal(true) : setModal(false)
  }

	useEffect(() => {
    socket.on('updateName', (response: any) => {
      setUsers(response)
    })

		socket.on('reminderAdded', (reminderDataResponse: ReminderServerResponse) => {
      dispatch(addReminder(reminderDataResponse))
    })
    
    socket.on('toggleReminderReceived', (toggleResponse: { id: string, timeDone: string }) => {
      dispatch(toggleReminder(toggleResponse))
    })
    
    socket.on('deleteReceived', (deleteResponse: { id: string }) => {
      dispatch(deleteReminder(deleteResponse))
    })

    socket.on('updateReminderReceived', (updateResponse: { cardid: string, cardtitle: string }) => {
      dispatch(updateReminder(updateResponse))
    })

    socket.on('editReminderReceived', (editResponse: { edit: boolean, id: string }) => {
      dispatch(editTask(editResponse))
    })
	}, [dispatch])
  
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
                                    <Button type="submit" value="Enter"></Button>
                                  </form>
                                </section>
                              : null }
    </section>
  );
}

export default App;
