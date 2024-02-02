import { useState } from "react";
import "./List.scss"
import ListItems from './ListItems/ListItems';
import images from '../../../assets/images';
import verifyToken from '../../SignIn/verifyToken';


function List(props) {
    const loginToken= verifyToken()

    const LogoutHandler = () => {
        localStorage.removeItem('token')
    }
    // "sidebar_pannel sidebar__width"    

    const [first, setfirst] = useState(false)
    
    console.log("ddddddddddddddddddddddddd", first)
    return (
        <>
       <div className={`${props.drawerData === true ? "sidebar__width" : 'sidebar_pannel'}`} onMouseLeave={()=>props.drawerHandlers()} onClick={()=>props.drawerClick()} >
            <div className="login__detailsSec text-center  ">
                <div className="innerLogin__detailsSec">
                    <div className="user__img ">
                        <img src={images.users} alt="users" loading='lazy' className='img-fluid ' />
                    </div>
                    <div className="user__name  ">
                        <p >{loginToken.firstName  }</p>
                    </div>
                    <div className="user__logout text-center ">
                        <a href="" onClick={LogoutHandler}>
                            Logout
                            <img src={images.logout} alt="logout" loading='lazy' className='img-fluid text-center ' />
                        </a>
                    </div>
                </div>
            </div>
            <div className="listStyle">
                <ul className="sideBar__list list-unstyled m-0 h-100 d-flex flex-column">
                    <ListItems isActive = {props.drawerData} />
                </ul>
            </div>
        </div>
        </>
    )
}

export default List
