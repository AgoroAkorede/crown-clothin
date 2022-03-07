import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component'
import { selectCollection } from '../../redux/shop/shop.selector';


import './menspage.styles.scss';
const MensPage = ({ collection }) => {
    const { title, items } = collection;
    return (
        <div className='hats-page'>
                <h2 className='title'>{ title }</h2>
                <div className='items'>
                    {
                        items.map(item => <CollectionItem key={ item.id } item={ item } /> )
                }
                </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    collection:selectCollection('mens')(state)
})

export default connect(mapStateToProps)(MensPage);