import '../App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit =async (event) => {
    event.preventDefault();
    const credentials = { username, password };

    if(await props.login(credentials)) {

      navigate('/my-portal');
    }
  };

  return (
    <div className='login-container2'>
      <div className='login-heading'>Please enter your e-mail and password to login.</div>
      <div className='login-container1'>
        <Form className='login-form' onSubmit={handleSubmit}>
          <Form.Group className='use' controlId='username'>
            <Form.Label className='label'>E-mail</Form.Label>
            <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
          </Form.Group>

          <Form.Group className='pass' controlId='password'>
            <Form.Label className='label'>Password</Form.Label>
            <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={6} />
          </Form.Group>

          <Button className='login-button mt-3' type="submit">Login</Button>
        </Form>
      </div>
    </div>
  )
};


export default LoginForm; 