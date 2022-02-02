import React from 'react';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import Midbar from 'components/Midbar/Midbar';
import 'container/main/Main.scss'

function Main() {
    return (
        <>
          <Header/>  
          <div className='main-page-content'>
            <Sidebar/>
            <Midbar/>
          </div>
        </>
    )
}

export default Main
