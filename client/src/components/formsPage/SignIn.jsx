import { useUser } from "../../context/user";
import "./form.css";
export const SignIn = () => {
    const {signinUser, setSigninUser, handlesignin} = useUser();
    
    return(
        <div class="form-container">
            <div style={{width: "50%"}}>
        <h1>WELCOME TO KUDOSPOT</h1>
        <div class="input-container">
            <input type="email"
            value={signinUser.email}
            onChange={(e)=>setSigninUser({...signinUser, email: e.target.value})}
             placeholder="Enter your email"/>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div class="input-container">
            <input type="password"
            value={signinUser.password}
            onChange={(e)=>setSigninUser({...signinUser, password: e.target.value})}
             placeholder="Enter your password"/>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div style={{display: 'flex'}}>
        <button onClick={handlesignin}>Sign In</button> 
        </div>
        </div>
        </div>
    )
}