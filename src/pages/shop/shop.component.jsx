import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux'
import CollectionPage from '../collection/collection.component'
import { fetchCollectionsStart } from '../../redux/shop/shop.action';
import {selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selector';

import WithSpinner from '../../components/with-spinner/with-spinner.component'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
const CollectionsPageWithSpinner= WithSpinner(CollectionPage)


class ShopPage extends React.Component{ 

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    };
    render() {
        const { isCollectionLoaded } = this.props;
        return(
        <div className='shop-page'>
            <Routes>
                <Route exact path="/" element={ <CollectionsOverviewContainer isLoading={isCollectionLoaded} /> } />
            </Routes>
        </div>
        )
    }
};
const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded:selectIsCollectionLoaded
});
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage);
