import React from 'react';
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer';
import { Outlet } from 'react-router-dom'; // Import Outlet để render các route con

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet /> {/* Đây là nơi để render nội dung con */}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
