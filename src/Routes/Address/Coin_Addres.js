import {PagePath} from "../../Components";

const Coin_Address = () => {
    // return ( 
    //     <div className="row justify-content-center" style={{ overflow: "scroll"}}>
    //         <div className="col-md-11 py-3">
    //             <PagePath data={{page_name:"Contract Address",page_path:"Address / Contract Address"}} />                
    //         <div className="mt-5 container">
    //                 <h5 className="text-white">  Contract Address: <a className="text-white"  target="_blank" 
    //                 href="https://bscscan.com/address/0x3a549866a592c81719f3b714a356a8879e20f5d0">
    //                     0x3a549866a592C81719F3b714a356A8879E20F5d0</a>  </h5>
    //             </div>
    //         </div>
    //     </div>
    //  );


     return (
        <div className="row justify-content-center">
            <div className="col-md-11 py-3">
            
                <PagePath data={{ page_name: "Contract Address", page_path: "Address / Contract Address" }} />

                <h4 className="text-white" style={{ marginTop: "100px",color : "white"}}>
                    Contract Address&nbsp;:&nbsp;
                    <span style={{fontSize : "large"}}>
                        <a target="_blank" className="text-white"
                        href="https://polygonscan.com/address/0xc98516a06d49ee33af86385a015198a8fc667b2b#code">
                        0xc98516a06d49ee33af86385a015198a8fc667b2b
                        </a>
                    </span>
                </h4>
            </div>
        </div>
    );
}
 
export default Coin_Address;