import React, { useState, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './App.scss';
import Header from './components/Header/Header';
import MainRoutes from './modules/MainRoutes/MainRoutes';
import InputModal from './components/InputModal/InputModal';
import { 
  addReminder, 
  toggleReminder,
  deleteReminder,
  updateReminder,
  editTask
 } from './js/actions/index';


const io = require('socket.io-client');
let socket = io('http://ninnih-codetest.herokuapp.com', {transports: ['websocket']});

const App: FC = () => {
  const [modal, setModal] = useState<boolean | null>(false);
  const dispatch = useDispatch();
  // const [username, setUsername] = useState({
  //   socket: socket.id,
  //   username: '',
  //   usernameSet: false
  // })
  // const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername({
  //     ...username,
  //     username: e.target.value
  //   })
  // }

  // const submitName = (e:any) => {

  // }

  useEffect(() => {
    socket.on('connect', () => {
     });

    }, [])

    
	useEffect(() => {
		socket.on('reminderAdded', (reminderDataResponse: any) => {
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
      <Header openModal={openModal}/>
      {modal ? <InputModal openModal={openModal} socket={socket}/> : null}
      {/* {!username.usernameSet ? 
      <section>
        <form>
          <input type="text" id="username"
          onChange={changeName}/>
          <button type="submit">submit</button>
        </form>
      </section>:null} */}
    </section>
  );
}

export default App;
