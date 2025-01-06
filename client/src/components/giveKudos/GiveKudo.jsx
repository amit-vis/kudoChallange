import { useEffect } from "react";
import { useUser } from "../../context/user";
import "./giveKudo.css";
import { useLanding } from "../../context/landingpage";
export const GiveKudo = () => {
    const {dropdownUser, getUserData} = useUser();
    const {getKudosData, getKudos,handlePostKudos, setKudos, setSetKudos} = useLanding();
    useEffect(()=>{
        getUserData();
        getKudosData();
    },[])
    return (
        <>
        <div class="give-kudo-container">
        <div style={{width: '60%'}}>
        <div class="input-container">
            <select value={setKudos.toUser} onChange={(e)=>setSetKudos({...setKudos, toUser: e.target.value})}>
                <option value="">Select the user you want to give kudos to</option>
                {dropdownUser?.map((data)=>(
                    <option key={data._id} value={data._id}>{data.name}</option>
                ))}
            </select>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div class="input-container">
        <select value={setKudos.kudoId} onChange={(e)=>setSetKudos({...setKudos, kudoId: e.target.value})}>
                <option value="">Select the badge you want to give</option>
                {getKudos?.map((data)=>(
                    <option key={data._id} value={data._id}>{data.kudos}</option>
                ))}
            </select>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div class="input-container">
            <input type="text" value={setKudos.reason} 
            onChange={(e)=>setSetKudos({...setKudos, reason: e.target.value})}
             placeholder="Reason for kudos"/>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div style={{display: 'flex'}}>
        <button onClick={handlePostKudos} style={{width: "20%", backgroundColor: "white", 
            border: '2px solid #9f9aa7', color: '#545454', fontWeight: '500' }}>Give Kudos</button> 
        </div>
        </div>
        </div>
        </>
    )
}