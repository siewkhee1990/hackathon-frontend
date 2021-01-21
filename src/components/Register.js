import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const register = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            axios.post('api.example.com/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                phoneNumber: phoneNumber
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
                        value={firstName}
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
                        value={lastName}
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
                        value={confirmPassword}
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
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                </div>

                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </div >

    );

}

export default Register;