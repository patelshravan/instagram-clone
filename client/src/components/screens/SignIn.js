import React,{useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'



const SignIn = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "Invalid Email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                // "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    M.toast({ html: "Signed in success", classes: "#81c784 green lighten-2" })
                    history.push('/')
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
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} 
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                />
                <button className="btn waves-effect waves-light #616161 grey darken-2"
                onClick={()=>PostData()}
                >
                    Login
                </button>
                <h5>
                    <Link to="/signin">Don't have an account ?</Link>
                </h5>
                <h6>
                    <Link to="/reset">Forgot Password ?</Link>
                </h6>

            </div>
        </div>)

}


export default SignIn