import React, { useState, FC } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import MainRoutes from './modules/MainRoutes/MainRoutes';
import InputModal from './components/InputModal/InputModal';



const App: FC = () => {
  const [modal, setModal] = useState<boolean | null>(false);

  const openModal = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    !modal ? setModal(true) : setModal(false)
    console.log(e)
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
