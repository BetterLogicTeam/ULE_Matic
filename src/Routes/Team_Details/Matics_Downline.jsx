

import { useState,useEffect } from "react";
import {PagePath,Table, Table_Buttons} from "../../Components";
import moment from "moment";
import './Matics_Downline.css';
import { API } from "../../Redux/actions/API";


const Matics_Downline = () => {
    const [currentPage, setcurrentPage] = useState(1)
    var [level_details,set_level_details]= new useState({
        cols:[
                {Header:'S.No',accessor:'sr'},
                {Header:'User ID',accessor:'user_id'},
                {Header:'Level',accessor:'level'},
                {Header:'Auto Club',accessor:'package'}, 
                {Header:'Date',accessor:'date'}, 
            ],
        rows:[
                {sr:'1',user_id:'726340',level:'9',reg_date:'23/06/2022',activation_date:'23/06/2022',id_type:'Inactive',package:'Inactive USD'},
                {sr:'2',user_id:'726340',level:'9',reg_date:'23/06/2022',activation_date:'23/06/2022',id_type:'Inactive',package:'Inactive USD'},
                {sr:'3',user_id:'726340',level:'9',reg_date:'23/06/2022',activation_date:'23/06/2022',id_type:'Inactive',package:'Inactive USD'},
                {sr:'4',user_id:'726340',level:'9',reg_date:'23/06/2022',activation_date:'23/06/2022',id_type:'Inactive',package:'Inactive USD'},
        ]});
    const [LevelValue,setLevelValue] = useState(0)
    const [referralApi, setreferralApi] = useState([])
    const [PackgaeValue,setPackageValue] = useState(0);



    const referral_API = async () => {
        try {

            const user = localStorage?.getItem("user");
            let ress = JSON?.parse(user);
            let uId = ress?.uid;
       
            
            // console.log('PAckageValue',`/poolIncome?id=${uId}&package=${PackgaeValue}`)
            let responce = await API?.get(`/matrixDownline?id=${uId}&package=${PackgaeValue}&level=${LevelValue}`)
            responce = responce?.data?.data;

            console.log("responce", responce);
            let arr = []
            responce?.forEach((item, index) => {

                arr?.push({
                    sr: index + 1,
                    user_id: `${item?.uid} `,
                    fromid: `${item?.sid} `,

                    level: `${item?.leveltype} `,
                    package:`${item?.package}`,
                    
                    date:moment(item?.dd).format("M/D/YYYY h:m:s A"),
                    // date: item?.edate


                });



            }
            )
            


            setreferralApi(arr)
            console.log('Matrics Downline Response : ',arr)

         



        } catch (e) {
            console.log("Error While calling Referrer API", e);
        }
    }


    useEffect(() => {
        referral_API()
    }, [])
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-11 py-3">
                <PagePath data={{page_name:"Club Downline",page_path:"Team Details / Club Downline"}} />
                <div className="row my-4 align-items-end justify-content-center gy-4">
                    <div className="col-md-4 col-lg-3 col-8 selectlevel">
                        <p className="p-color p-0 m-0">Select Level</p>
                        <select className=" input bg-color ps-4" onChange={(e)=>{
                            setLevelValue(e.target.value)
                        }}>
                            <option value={0}>All Levels</option>
                            <option value={1}>Level 1</option>
                            <option value={2}>Level 2</option>
                        </select>
                    </div>
                    <div className="col-md-4 col-lg-3 col-8 selectpool">
                        <p className="p-color p-0 m-0">Select Pool</p>
                        <select className="input bg-color" onChange={(e)=>{
                            setPackageValue(e.target.value)
                        }}>

                            <option value={0}>All Auto Club</option>
                            <option value={1}>Auto Club 1</option>
                            <option value={2}>Auto Club 2</option>
                            <option value={3}>Auto Club 3</option>
                            <option value={4}>Auto Club 4</option>
                            <option value={5}>Auto Club 5</option>
                            <option value={6}>Auto Club 6</option>
                            <option value={7}>Auto Club 7</option>
                            <option value={8}>Auto Club 8</option>
                            <option value={9}>Auto Club 9</option>
                            <option value={10}>Auto Club 10</option>
                            <option value={11}>Auto Club 11</option>
                            <option value={12}>Auto Club 12</option>
                            <option value={13}>Auto Club 13</option>
                            <option value={14}>Auto Club 14</option>
                            <option value={15}>Auto Club 15</option>
                        </select>
                    </div>
                    <button className="bg-success col-md-2 col-6 col-lg-1 btn text-white"  onClick={()=>{referral_API()}}>Search</button>
                </div>
                <Table
                    data={referralApi}
                    columns={level_details.cols}
                />
                
                <Table_Buttons currentPage={currentPage} setcurrentPage={setcurrentPage} data = {{first_value:'1', last_value:'10',current_value:'5'}} />
            </div>
        </div>
     );
}
 
export default Matics_Downline;