import React from 'react';
import withRouter from '../hoc/withRouter'
import { useNavigate } from 'react-router-dom';

import './menu-item.styles.scss';


const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
    const navigate = useNavigate();
    

    return (
        // <div style={ {
        //     backgroundImage:`url(${imageUrl})`
        // } }
        <div
            className={ `${size} menu-item` }
            onClick={ () => navigate(`/${linkUrl}`) }
        >
            <div
                className='background-image'
                style={ {
                    backgroundImage: `url(${imageUrl})`
                } }
            />
            {/* <Link to={`${linkUrl}`} /> */}
            <div className='content'>
                <h1 className='title'>{ title.toUpperCase() }</h1>
                <span className='subtitle'>SHOP NOW</span>
            </div>
           
        </div>
    )
}


export default withRouter(MenuItem);
