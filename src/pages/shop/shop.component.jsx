import React from 'react';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import CollectionPage from '../collection/collection.component'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.action'
import WithSPinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSPinner(CollectionsOverview) 
const CollectionsPageWithSpinner= WithSPinner(CollectionPage)


class ShopPage extends React.Component{ 
    state = {
            loading:true
        }
    
    unsubscribeFromSnapshot = null;  

    componentDidMount() {
        const {updateCollections}=this.props
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })
    };
    render() {
        const { loading } = this.state;
        return(
        <div className='shop-page'>
            <Routes>
                <Route exact path="/" element={ <CollectionsOverviewWithSpinner isLoading={loading} /> } />
            </Routes>
        </div>
        )
    }
};
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
        dispatch(updateCollections(collectionsMap))
})

export default connect(mapDispatchToProps)(ShopPage);
