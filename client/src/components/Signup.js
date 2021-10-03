import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';


const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",email:"", phone: "", password: "", cpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value}) //[name] is dynamic data as name will already be a key in ...user
     }

     const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, password, cpassword } = user;

        const res = await fetch("/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({                             //as browser does not understand JSON so converting to strings
                name, email, phone, password, cpassword
            })
        });

        const data = await res.json();

        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Rregistration");
        } else {
            window.alert("Registration Successfull");
            console.log("Successfull Registration")

            history.push("/login");
        }

     }

    return (
        <>
        <div class="signup-form">
        <form method="POST">
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr />
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <span class="fa fa-user"></span>
                    </span>
                </div>
                <input type="text" class="form-control" name="name" autocomplete="off" 
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Name" 
                    required="required" 
                />
            
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fa fa-paper-plane"></i>
                    </span>
                </div>
                <input type="email" class="form-control" name="email" autocomplete="off"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Email" 
                    required="required"
                />
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                    <i class="fa fa-phone"></i>
                    </span>
                </div>
                <input type="number" class="form-control" name="phone" autocomplete="off"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Phone Number" 
                    required="required" 
                />
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                    </span>
                </div>
                <input type="password" class="form-control" name="password" autocomplete="off"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Password" 
                    required="required" 
                />
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <i class="fa fa-lock"></i>
                        <i class="fa fa-check"></i>
                    </span>
                </div>
                <input type="password" class="form-control" name="cpassword" autocomplete="off"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Password" 
                    required="required" 
                />
            </div>
        </div>
        
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-lg" onClick={PostData}>Sign Up</button>
        </div>

        <div class="text-center">Already have an account? <NavLink to="/login">Login here</NavLink></div>

        </form>

    </div>
        </>
    )
}

export default Signup;