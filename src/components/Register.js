import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');

    const register = (event) => {
        event.preventDefault();
        if (password === confirmpassword) {
            axios.post('api.example.com/register', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                confirmpassword: confirmpassword,
                phonenumber: phonenumber
            }).then(res => {
                console.log(res.data);
                alert("Registeration successful");
            }).catch(error => {
                console.log(error.response)
            });
        } else {
            alert("Confirm password and password not matched!");
        }
    }

    return (
        <div>
            <form onSubmit={(event) => register(event)}>
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder="first name"
                        required
                        value={firstname}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>

                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        placeholder="last name"
                        required
                        value={lastname}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="password(min 8 characters)"
                        required
                        minLength="8"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <div class="form-group">
                    <label for="password">Confirm Password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="confirmPassword"
                        placeholder="confirm password"
                        required
                        minLength="8"
                        value={confirmpassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>

                <div class="form-group">
                    <label for="phoneNumber">Phone Number</label>
                    <input
                        type="phone"
                        class="form-control"
                        id="phoneNumber"
                        placeholder="phone number"
                        pattern="^[8-9][0-9]{7}$"
                        required
                        value={phonenumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                </div>

                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </div >

    );

}

export default Register;