import React from 'react';
import "./Toggler.scss"
import images from '../../../assets/images';

function Toggler(props) {

    return (
        <div className='toggler p-4'>
            <img src={images.toggler} alt="Toggler" loading='lazy' onClick={()=>props.drawerHandler()}/>
            
        </div>
    )
}

export default Toggler
