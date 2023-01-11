import React from 'react'
import br0ke from '../components/pictures/br0ke.jpg';
import errorR from '../components/pictures/errorR.jpg';
import { Dimensions } from "react-native";
import * as Icon from 'react-bootstrap-icons';
import {Link, useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
function Broke() {
    const nav=useNavigate();
const win = Dimensions.get('window');

  return (
    <>
    <div className='d-flex justify-content-center text-center mx-auto mt-5 ' >
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </svg>
    <div className="he1">ERROR 404</div>
    </div>
    <div className=" he1  text-center mx-auto text-danger">Page Not Found!</div>
    <div className='text-center m'> 
    <p>Sorry, this pages does not exist. </p>
    <div className='mt-5'>  
    <img src={br0ke}  style={{width:win.width/10,height:win.width/10,}}/>
    <Link to="/">
    <Button className='mx-5 mt-5'>Click to go back to reality!</Button>
    </Link>
    </div>
    </div>
    </>
  )
}

export default Broke