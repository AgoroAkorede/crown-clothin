import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from '../../redux/shop/shop.selector';
import {firestore} from '../../firebase/firebase.utils'

import './collection.styles.scss';
const CollectionPage = ({ collection }) => {
    //----------------Using hooks to replecate component will unmount------------
    useEffect(() => {
        const unsubscribeFromCollecions = firestore.collection('colletions').onSnapshot(snapshot=>console.log(snapshot))
       

        return () => {
            unsubscribeFromCollecions()
        }
    }, []);
    
    const { title, items } = collection;
    return(
    <div className='collection'>
            <h2 className='title'>{ title }</h2>
            <div className='items'>
                {
                    items.map(item => (<CollectionItem key={ item.id } item={ item } />
                    ))}
            </div>
    </div>
    );
}
const mapStateToProps = (state, ownProps) => ({
    collection:selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);
