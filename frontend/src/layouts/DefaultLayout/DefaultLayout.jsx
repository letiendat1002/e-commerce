import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import HeaderMUI from '../Header/HeaderMUI';
import SubHeader from '../SubHeader/SubHeader';

const DefaultLayout = (props) => {
    return (
        <div className='default-layout'>
            <SubHeader/>
            <HeaderMUI/>
            <Outlet />
            <Footer/>
        </div>
    );
}

export default DefaultLayout;
