import { useState } from 'react'
import './Login.css';
// import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography, Button } from '@mui/material'
// import {VisibilityIcon, VisibilityOffIcon} from '@mui/icons-material';
// import { orange, grey } from '@mui/material/colors'
// import Button from '@mui/material/Button';

const Login = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [textarr, settextarr] = useState({
        email:"",
        passward:""
    });

    // console.log(textarr)


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };








const ChangeHandler =(e)=>{
    const name= e.target.name;
    const value=e.target.value;
    settextarr({...textarr,[name]:value})

   

}

const submitHandler =()=>{

    const data={...textarr}
    settextarr({
        email:"",
        passward:""
    })
    

}

    
   


    return (
        <div>

            <div className="containerr text-center px-3">
                <div class="row align-items-center vh-100 ">
                    <div class="col-6 mx-auto">
                        <div className="card st rounded-4 " >


                            <div class="card text-center rounded-4  ">
                                <div className="card-body  text-center rounded-4">

                                    <div className="mb-md-1 mt-md-4 pb-5">
                                        <div className='container '>
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-black-50 mb-5">Please enter your login and password!</p>
                                            <div class="form-floating mb-3 d-grid  col-12 mx-auto">
                                                <input type="email" class="form-control" id="floatingInput" name='email' placeholder="name@example.com" value={textarr.email}  onChange={ChangeHandler} />
                                                <label htmlFor="floatingInput">Email address</label>
                                            </div>
                                            <div class="form-floating d-grid  col-12 mx-auto d-flex justify-content-between align-items-center border rounded-1">
                                                <input type={showPassword ? 'text' : 'password'} class="form-control input_custom" name='passward'  id="floatingPassword" placeholder="Password" value={textarr.passward} onChange={ChangeHandler}/>
                                                <span onClick={handleClickShowPassword} className='show_btn mx-3' >{showPassword ? "Show" : "Hide"}</span>                                                
                                                <label htmlFor="floatingPassword">Password</label>
                                            </div>
                                            <div className=' d-flex justify-content-between '>
                                                <p className='small '>Having trouble in Sign in?</p>
                                                <p className="small mb-5 pb-lg-2 fw-bold">Forgot password?  </p>

                                            </div>
                                            <div class="d-grid  col-12 mx-auto">
                                                <button class="btn btn-primary" type="submit" disabled={!isValid} onClick={submitHandler}>Login</button>                                               
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
            
           
        </div>

        


    )
}

export default Login;
