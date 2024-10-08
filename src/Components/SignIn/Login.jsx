import { useState, useEffect } from 'react'
import './Login.css';
import { useDispatch } from 'react-redux';
import { fetchLoginPage } from '../../Store/Slice/LoginSlices';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAlert }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [textarr, settextarr] = useState({
        userName: "",
        password: ""
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const ChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        settextarr({ ...textarr, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = { ...textarr }
        const response = await dispatch(fetchLoginPage(data));

        if (response.payload.token) {
            setAlert({ type: "success", message: "Login successfully" })
            navigate(`/dashboard`)
        } else {
            navigate(`/login`)
            setAlert({ type: "error", message: "please try Again" })
        }

    }

    const { userName, password } = textarr;
    return (
        <div>
            <form onSubmit={submitHandler}>

                <div className="containerr text-center px-3">
                    <div className="row align-items-center vh-100 ">
                        <div className="col-6 mx-auto">
                            <div className="card st rounded-4 " >


                                <div className="card text-center rounded-4  ">
                                    <div className="card-body  text-center rounded-4">

                                        <div className="mb-md-1 mt-md-4 pb-5">
                                            <div className='container '>
                                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                                <p className="text-black-50 mb-5">Please enter your login and password!</p>
                                                <div className="form-floating mb-3 d-grid  col-12 mx-auto">
                                                    <input type="email"
                                                        className="form-control"
                                                        id="floatingInput"
                                                        name='userName'
                                                        placeholder="name@example.com"
                                                        value={userName}
                                                        onChange={ChangeHandler}
                                                    />
                                                    <label htmlFor="floatingInput">Email address</label>
                                                </div>
                                                <div className="form-floating d-grid  col-12 mx-auto d-flex justify-content-between align-items-center border rounded-1">
                                                    <input type={showPassword ? 'text' : 'password'}
                                                        className="form-control input_custom"
                                                        name='password'
                                                        id="floatingPassword"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={ChangeHandler}
                                                    />
                                                    <span onClick={handleClickShowPassword} className='show_btn mx-3' >{showPassword ? "Show" : "Hide"}</span>
                                                    <label htmlFor="floatingPassword">Password</label>
                                                </div>
                                                <div className=' d-flex justify-content-between '>
                                                    <p className='small '>Having trouble in Sign in?</p>
                                                    <p className="small mb-5 pb-lg-2 fw-bold">Forgot password?  </p>

                                                </div>
                                                <div className="d-grid  col-12 mx-auto">
                                                    <button className="btn btn-primary" type="submit" >Login</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-0">Don't have an account? <a href="#!" className="text-black fw-bold">Sign Up</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer>
                                <div className='copyright  '>
                                    <p className='copyright '>Copyright @wework 2022 | Privacy Policy</p>
                                </div>
                            </footer>
                        </div>
                    </div>

                </div>
            </form>


        </div>




    )
}

export default Login;
