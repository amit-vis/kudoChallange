import { useUser } from "../../context/user";
import "./form.css";
export const Login = ()=>{
    const {loginUser, setLoginUser, handleLogin} = useUser();
    return(
        <>
        <div class="form-container">
            <div style={{width: "50%"}}>
        <h1>WELCOME TO KUDOSPOT</h1>
        <div class="input-container">
            <input type="text"
            value={loginUser}
            onChange={(e)=>setLoginUser(e.target.value)}
             placeholder="Enter your name"/>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div style={{display: 'flex'}}>
        <button onClick={handleLogin}>Login</button> 
        </div>
        </div>
        </div>
        </>
    )
}