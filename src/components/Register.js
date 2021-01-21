import { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap/lib/Navbar';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = (event) => {
        event.preventDefault();
        console.log(event);
        console.log("email ", email);
        console.log("password", password);
        axios.post('api.example.com/register', {
            email: email,
            password: password
        }).then(res => {
            console.log(res.data);
            alert("Registeration successful");
        }).catch(error => {
            console.log(error.response)
        });
    }

    return (
        <Card className="bg-light mx-auto" style={{ width: '30rem' }}>
            <Card.Header>Register</Card.Header>
            <Form onSubmit={(event) => register(event)}>
                <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </Card>
    );

}

export default Register;