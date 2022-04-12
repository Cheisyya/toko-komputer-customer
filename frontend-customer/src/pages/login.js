import React from 'react';
import './login.css'
import axios from 'axios';
export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username : "",
            password : "",
            message: "",
            logged: true

        }
    }

    Login = (event) => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password
        }
 
        let url = "http://localhost:8080/customer/auth"
        
 
        axios.post(url, sendData)
        .then(response => {
            this.setState({logged: response.data.logged})
            if (this.state.logged) {
                let customer = response.data.data
                let token = response.data.token
                localStorage.setItem("customer", JSON.stringify(customer))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: response.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="wrapper">
                <div className="logo"><img src="https://img.icons8.com/ios-filled/100/000000/gender-neutral-user.png"/></div>
                <div className="text-center mt-4 name"> Customer Server </div>
                { !this.state.logged ? 
                (
                    <div className="alert alert-danger mt-1">
                        { this.state.message }
                    </div>
                ) : null }
                <form className="p-3 mt-3" onSubmit={ev => this.Login(ev)}>
                    <div className="form-field d-flex align-items-center"> <span className="far fa-user" /> 
                        <input type="text" name="username" id="userName" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} /> </div>
                    <div className="form-field d-flex align-items-center"> <span className="fas fa-key" /> 
                        <input type="password" name="password" id="pwd" placeholder="Password" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})}/> </div> 
                        <button className="btn mt-3" type="submit">Login</button>
                </form>
            </div>
        )
    }
}