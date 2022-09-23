import React from 'react';
import { FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { loadWeb3 } from "../api.js";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenAddress, tokenAbi } from '../Utils/token'
import { contractAddress, contractAbi } from '../Utils/contract'
import { Spinner } from './';
import { toast } from 'react-toastify';
function Register_main({ notify }) {
    const [loader, setloader] = useState(false)
    const navigate = useNavigate();
    let [matic, setmatic] = useState("")
    let [ule, setule] = useState("")
    let [uid, setuid] = useState("");
    const [address, setaddress] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [connected, setconnected] = useState('MetaMask is not connected..!..Wait...')

    const callapi = async (position, sellCall) => {
        setloader(true)

        console.log("position", position);
        let res = await axios.post('https://ulematic-api.herokuapp.com/registration',
            {
                sid: uid,
                accountnumber: address,
                position: position,
                amount: 10,
                paymentType: "MATIC",
                traxn: sellCall
                // traxn: "0x2636a0fa8327fdad7c0441b038838749cec83211bdbe955d278fbc58e1d1bace"

            });
        setloader(true)

        console.log("reg_Api", res)
        if (res.data.data == "waiting") {
            console.log(res.data)
            // localStorage.setItem('user_Id', uid)
            setloader(true)
            setTimeout(() => {

                callLoginApi()
            }, 50000);
            toast.success('Registered Successfully')

        } else {
            toast.error('Account Already Resgistered with this ID')
            navigate('/Login_main')

        }

        // setloader(false)
    }
    const callLoginApi = async () => {

        // isLoading(true)
        console.log("address", address)
        let res = await axios.get(`https://ulematic-api.herokuapp.com/login?id='${address}'`); console.log("login_data", res)
        if (res.data.data !== 0) {

            localStorage.setItem("isAuthenticated", true);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            toast.success('Login Successfully')
            navigate('/Dashboard/Home')
        }
        else {
            toast.error("Something went wrong ! ");
            setloader(false)
        }
        setloader(false)
    }
    const ConnectToMetaMask = async () => {
        let acc = await loadWeb3();
        if (acc == 'No Wallet') {
            notify('No Wallet')
        }
        else if (acc == 'Wrong Network') {
            notify(' Wrong Network Please Connect Polygon Network')
        }
        else {
            setaddress(acc)
            setconnected('MetaMask is connected... Ready To Register')
        }

    }
    const cotractCall = async (position) => {
        console.log('what is contractvall position', position)
        setloader(true)
        let acc = await loadWeb3();
        if (acc == 'No Wallet') {
            toast.error('No Wallet')
        }
        else if (acc == 'Wrong Network') {
            toast.error('Wrong Network Please Connect Polygon Network')
        }
        else {
            setaddress(acc)
            setconnected('MetaMask is connected... Ready To Register')

            try {

                let res = await axios.get(`https://ulematic-api.herokuapp.com/login?id='${address}'`); 
                if (res.data.data !== 0) {

                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("user", JSON.stringify(res.data.data));
                    toast.success('Account Already Resgistered with this ID')
                    navigate('/Dashboard/Home')
                }
                else {



                    let contract = await new window.web3.eth.Contract(contractAbi, contractAddress)
                    // console.log('what is  contract ', contract)

                    let token = await new window.web3.eth.Contract(tokenAbi, tokenAddress)
                    // console.log('what is  token', token)
                    let balance = await token.methods.balanceOf(acc).call();
                    balance = window.web3.utils.fromWei(balance)
                    console.log('balance', balance)
                    if (balance > ule) {

                        ule = ule.toString()
                        console.log('what is contractvall ule', ule)

                        ule = window.web3.utils.toWei(ule)
                        console.log('what is  ule after towei', ule)

                        matic = matic.toString()
                        matic = window.web3.utils.toWei(matic)

                        let approveCall = await token.methods.approve(contractAddress, ule).send({ from: acc });
                        console.log('what is  approveCall', approveCall)
                        toast.success('Approved')
                        let sellCall = await contract.methods.sell(ule).send({ from: acc, value: matic });
                        toast.success('Transection Succesfull')
                        sellCall = sellCall.transactionHash
                        callapi(position, sellCall)
                    } else {
                        toast.error("Insufficient Fund")
                    }
                }
            }
            catch (err) {
                console.log("error while calling fuction sell", err)
            }

        }
        setloader(false)
    }
    const callMaticUrliApi = async () => {
        let res = await axios.get(`https://ulematic-api.herokuapp.com/live_rate_matic`);
        setmatic((Number(1 / res.data.data[0].usdperunit) * 10))
        console.log("matic", 1 / res.data.data[0].usdperunit * 10);

    }
    const callUleApi = async () => {
        let res = await axios.get(`https://ulematic-api.herokuapp.com/live_rate`);
        setule((Number(1 / res.data.data[0].usdperunit) * 10))
        console.log("ULE", Number(1 / res.data.data[0].usdperunit))
        console.log("ULEMatic", 1 / res.data.data[0].usdperunit)


    }

    useEffect(() => {
        setloader(true)
        ConnectToMetaMask();
        callUleApi();
        callMaticUrliApi();

        setloader(false)
        setIsLoading(false)

    }, [])

    return (

        <div className='row m-0 justify-content-center align-items-center' style={{ height: '100vh' }}>
            {loader == true ? <Spinner /> : <></>}
            <div className=' col-md-6 col-lg-3 bg-white  mainForm'>
                <div className="main_form p-5">
                    <h4 className='hh mb-3'>Registration With Matic</h4>
                    <p className='peera'>Automatic login if you have MetaMask wallet:</p>

                    <img src="ule_maticogo.png" width="150px" alt="" />
                    {connected == 'MetaMask is not connected..!..Wait...' ? <p className='peera2 pt-3' style={{ color: 'red' }}>{connected}</p> : <p className='peera2 pt-3' style={{ color: 'green' }}>{connected}</p>}


                    <div className="batan">
                        <button className="btn log_batan" onClick={() => {
                            let modelRegister = document.querySelector('.modelRegister')
                            modelRegister.classList.remove('d-none')
                            modelRegister.classList.add('d-flex')
                        }}>Register</button>

                        <div className=' w-100 h-100 d-none justify-content-center align-items-center  position-absolute  modelRegister'>
                            <div className=' bg-white bord border-dark py-3 px-5 flex-column justify-content-center align-items-center d-flex' style={{ marginLeft: "-4%" }}>
                                <h4 className=' text-dark fs-5 my-3' id='pop-id'>Enter Upline ID</h4>
                                <input type={'number'} className="boxset"
                                    onChange={(e) => {
                                        setuid(e.target.value)
                                    }} />
                                <div className=' mt-4'>
                                    <button className="btn bt loginbtn px-3 mx-2" onClick={() => {
                                        if (uid.length > 0) {
                                            let modelRegister = document.querySelector('.bordd')
                                            let modelRegisterR = document.querySelector('.bord')

                                            modelRegister.classList.remove('d-none')
                                            modelRegister.classList.add('d-flex')
                                            modelRegisterR.classList.remove('d-flex')
                                            modelRegisterR.classList.add('d-none')
                                        }
                                    }}>OK</button>
                                    <button className="btn bt loginbtn px-3 mx-2 " onClick={() => {
                                        let modelRegister = document.querySelector('.modelRegister')
                                        modelRegister.classList.remove('d-flex')
                                        modelRegister.classList.add('d-none')
                                    }}>Close</button>
                                </div>
                            </div>
                            <div className=' bg-white bordd border-dark py-3 px-5 flex-column justify-content-center align-items-center d-none' style={{ marginLeft: "-4%" }}>
                                <h4 className=' text-dark fs-5 my-3' id='pop-id'>Referral Confirmation</h4>
                                <p>Your Current Referral ID is {uid}</p>
                                <div className=' d-flex flex-row align-items-center justify-content-center my-2'>
                                    <p className=' p-0  m-0'>Matic</p> <input className='input1 mx-2 ' defaultValue={matic} value={matic} disabled type={'number'} />
                                    <p className=' p-0  m-0'>ULE</p> <input className='input1 mx-2' defaultValue={ule} value={ule} disabled type={'number'} />
                                </div>
                                <select className="boxset" name='position'>
                                    <option value={1}>Left</option>
                                    <option value={2}>Right</option>
                                </select>
                                <div className=' mt-4'>
                                    <button className="btn bt loginbtn px-1 mx-1" onClick={async () => {
                                        let position = document.getElementsByName('position')[0].value;
                                        await cotractCall(position)

                                        let modelRegister = document.querySelector('.modelRegister')
                                        let modelRegisterR = document.querySelector('.bord')
                                        modelRegisterR.classList.remove('d-none')
                                        modelRegisterR.classList.add('d-flex')

                                        let modelRegisterRR = document.querySelector('.bordd')
                                        modelRegisterRR.classList.remove('d-flex')
                                        modelRegisterRR.classList.add('d-none')



                                        modelRegister.classList.remove('d-flex')
                                        modelRegister.classList.add('d-none')

                                    }}
                                        disabled={isLoading}

                                    >
                                        {isLoading && (
                                            <div class="spinner-border text-secondary" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        )}




                                        Proceed</button>
                                    <button className="btn bt loginbtn " onClick={() => {
                                        let modelRegister = document.querySelector('.bordd')
                                        let modelRegisterR = document.querySelector('.bord')

                                        modelRegister.classList.remove('d-flex')
                                        modelRegister.classList.add('d-none')
                                        modelRegisterR.classList.remove('d-none')
                                        modelRegisterR.classList.add('d-flex')
                                    }}>No I want to change ID</button>
                                </div>

                            </div>
                        </div>
                        <input className="btn log_batan" placeholder='Please enter ID or Metamask address' onChange={(e) => {
                            setuid(e.target.value)
                        }} />
                        <div className="btn log_batan" onClick={() => {
                            callLoginApi()
                        }}>Connect to Wallet</div>
                        <button className="btn log_batan" onClick={() => {
                            navigate('/Login_main')
                        }}>Login</button>
                        <button className="btn log_batan" onClick={() => {
                            navigate('/')
                        }}>Go To Home</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register_main