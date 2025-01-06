import { createContext, useContext, useState } from "react";
import axios from 'axios';
import {base_url} from "./baseuser";

const dashboardContext = createContext();
export const useDash = ()=>{
    const value = useContext(dashboardContext);
    return value
}

export const DashboardProvider = ({children})=>{
    const [dashUserData, setDashUserData] = useState([]);
    const [dashKudo, setDashKudo] = useState([]);
    const [mostLike, setMostLike] = useState(null)

    const getUserDash = async ()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${base_url}/postkudo/usercount`,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            });
            if(res.status === 200){
                setDashUserData(res.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getKudosData = async ()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${base_url}/postkudo/kudocount`,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            })
            if(res.status === 200){
                setDashKudo(res.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getMostLiked = async ()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${base_url}/postkudo/mostLiked`,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            });

            if(res.status === 200){
                setMostLike(res.data.data)
            }

        } catch (error) {
            console.error(error)
        }
    }
    return(
        <dashboardContext.Provider value={{dashUserData, getUserDash, getKudosData, dashKudo, getMostLiked, mostLike}}>
            {children}
        </dashboardContext.Provider>
    )
}