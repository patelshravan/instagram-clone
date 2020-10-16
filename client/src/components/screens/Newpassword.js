import React,{useState,useContext} from 'react'
import { Link,useHistory,useParams  } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'



const SignIn = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const {token} = useParams()

    const PostData = () => {
        fetch("/new-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                // "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                password,
                token
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#81c784 green lighten-2" })
                    history.push('/signin')
                }

            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="password"
                    placeholder="Enter a New Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                />
                <button className="btn waves-effect waves-light #616161 grey darken-2"
                onClick={()=>PostData()}
                >
                    Update Password
                </button>

            </div>
        </div>)

}


export default SignIn