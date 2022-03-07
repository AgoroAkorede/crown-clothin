import React from 'react';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Routes, Route } from 'react-router-dom';

// import CollectionsOverview from '../../components/collections-overview'


const ShopPage = ({  }) => (
    <div className='shop-page'>
        <Routes>
            <Route exact path="/" element={ <CollectionsOverview /> } />
        </Routes>
    </div>
);


export default ShopPage;
