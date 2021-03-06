import React from "react";
import { connect } from 'react-redux';
import  PreviewCollection  from '../preview-collection-components/preview-collection.component';
import { createStructuredSelector } from "reselect";
import {selectCollectionForPreview} from '../../redux/shop/shop.selector'

import './collections-overview.styles.scss';
const CollectionsOverview = ({ collections }) => (
    <div className='collections-overview'>
          {
            collections.map(({ id, ...otherCollectionProps }) => (
                <PreviewCollection key={ id }{ ...otherCollectionProps } />
            ))
        }
    </div>
)
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);