import React from 'react';
import "./List.scss"
import ListItems from './ListItems/ListItems';
import images from '../../../assets/images';

function List() {
    return (
        <div className='sidebar_pannel'>
            <div className="login__detailsSec text-center ">
                <div className="innerLogin__detailsSec">
                    <div className="user__img">
                        <img src={images.users} alt="users" loading='lazy' className='img-fluid' />
                    </div>
                    <div className="user__name">
                        <p>Sanjeev Kumar</p>
                    </div>
                    <div className="user__logout">
                        <a href="">
                            Logout
                            <img src={images.logout} alt="logout" loading='lazy' className='img-fluid' />
                        </a>
                    </div>
                </div>
            </div>
            <div className="listStyle">
                <ul className="sideBar__list list-unstyled m-0 h-100 d-flex flex-column">
                    <ListItems />
                </ul>
            </div>
        </div>
    )
}

export default List
