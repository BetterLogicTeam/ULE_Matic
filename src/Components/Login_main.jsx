import React, { useEffect, useState } from 'react';
import { loadWeb3 } from "../api.js";
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Confirm from './Confirm';
import './Login_main.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from './';
import { toast } from 'react-toastify';
import Web3 from "web3";
import { loadWeb4 } from '../api2.js';

var bol = false;
function Login_main({ notify }) {
  const navigate = useNavigate();
  const [loader,setloader] = useState(false)
  const [uid, setuid] = useState();
  const [openLogin ,setOpenLogin]= useState(false);
  const [address, setaddress] = useState('');
  const [connected, setconnected] = useState('MetaMask is not connected..!..Wait...')

  const callapi = async () => {
    setloader(true)

    if(uid.length>6){
      console.log("logindata_Address",)

      let res = await axios.get(`https://ulematic-api.herokuapp.com/login?id='${uid}'`);
      console.log("logindata",res.data.data)
      if (res.data.data !== 0) {
       
        toast.success('Login Successfully')
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate('/Dashboard/Home')
      }else{
        toast.error("Something went wrong ! ");
  
      }
    }else{
      let res = await axios.get(`https://ulematic-api.herokuapp.com/login?id=${uid}`);
      console.log("logindata",res.data.data)
      if (res.data.data !== 0) {
       
        toast.success('Login Successfully')
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate('/Dashboard/Home')
      }else{
        toast.error("Something went wrong ! ");
  
      }
    }
    setloader(false) 

  }
  var NetId

  const ConnectToMetaMask = async () => {

    setloader(true)

    const web3=window.web3;
    window.web3 = new Web3(window.ethereum);

    await window.web3.eth.getChainId((err, netId) => {

      NetId = netId
      // setNetId_set(NetId)

    }
    )


    console.log("netId",NetId);
    let acc
    if(NetId==56){
      acc = await loadWeb4();

    }else{
      acc = await loadWeb3();

    }

  
    if (acc == 'No Wallet') {
      notify('No Wallet')
    }
    else if (acc == 'Wrong Network') {
      notify('Wrong Network')
    }
    else {
      //   notify("Wallet Connected");
      setuid(acc)

      setaddress(acc)
      setconnected('MetaMask is connected... Ready To Go')
    }
    setloader(false)

  }

  useEffect(() => {
    console.log("what is input value", uid)

  }, [uid])
  return (
    <div className='row m-0 justify-content-center align-items-center' style={{height:'100vh'}}>
      {openLogin && <Confirm handleLogin={callapi} setRegistered={setOpenLogin} />}
            { loader == true ? <Spinner /> : <></>}
            <div className=' col-md-4 col-lg-3 bg-white  mainForm'>
            <div className="main_form  p-5">
                <h2 className='hh mb-3'>Login</h2>
                <p className='peera'>Automatic login if you have MetaMask wallet:</p>

                <img src="ule_maticogo.png" width="150px" alt="" />
                { connected=='MetaMask is not connected..!..Wait...' ? <p className='peera2 pt-3' style={{color:'red'}}>{connected}</p> : <p className='peera2 pt-3' style={{color:'green'}}>{connected}</p>}

                <div className="batan">
                  <div className="btn log_batan" onClick={ConnectToMetaMask}>Automatic Login</div>
                  <input className='btn log_batan' name='signin' defaultValue={uid} placeholder='Please enter ID or Metamask address' onChange={(e) => {
                    setuid(e.target.value)
                  }} />
                  {/* <div className=""></div> */}
                  <button className="btn log_batan" onClick={() => {
                    setOpenLogin(true)
                  }}>Login</button>
                  <button className="btn log_batan" onClick={() => {
                    navigate('/Register_with_Matic')
                  }}>Register</button>
                  <button className="btn log_batan" onClick={() => {
                    navigate('/')
                  }}>Go To Home</button>
                </div>
              </div>
            </div>
        </div>
   
  )
}

export default Login_main