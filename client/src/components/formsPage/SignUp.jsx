import { useUser } from "../../context/user";
import "./form.css";
export const SignUp = () => {
    const {user, setUser, handlesignup} = useUser();
    return(
        <>
        <div class="form-container">
            <div style={{width: "50%"}}>
        <h1>WELCOME TO KUDOSPOT</h1>
        <div class="input-container">
            <input type="text" 
            value={user.name}
            onChange={(e)=>setUser({...user, name: e.target.value})}
            placeholder="Enter your name"/>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div class="input-container">
            <input type="email" 
            value={user.email}
            onChange={(e)=>setUser({...user, email: e.target.value})}
            placeholder="Enter your email"/>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div class="input-container">
            <input type="password" 
            value={user.password}
            onChange={(e)=>setUser({...user, password: e.target.value})}
            placeholder="Enter your password"/>
            {/* <div class="tooltip">
                No authentication required in MVP. User advances to home page if they enter a name that is already present in the database
            </div> */}
        </div>
        <div style={{display: 'flex'}}>
        <button onClick={handlesignup}>Sign Up</button> 
        </div>
        </div>
        </div>
        </>
    )
}