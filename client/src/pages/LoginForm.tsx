
// see SignupForm.js for comments
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import type { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
  });

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if the form is valid
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      // Assuming `login` is a mutation function from Apollo Client
      const { data } = await login({
        variables: { ...userFormData },
      });

      // If login is successful, store the token and navigate to '/search'
      Auth.login(data.login.token);
      setUserFormData({
        email: '',
        password: '',
      });

      // Navigate to the search page after successful login
      navigate('/search');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <>
      <div className="login-form-container w-50">
        <h2 className="login-form-title">Login</h2>

        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your login credentials!
          </Alert>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='text'
              placeholder='Your email'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email || ''}
              required
            />
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password || ''}
              required
            />
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              gap: '5px',
              textAlign: 'center',
              marginBottom: '20px',
              flexWrap: 'nowrap',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.8rem', md: '1rem' },
                display: 'inline-block',
              }}
            >
              Don't have an account?
            </Typography>
            <Typography
              component={Link}
              to="/signup"
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                fontSize: { xs: '0.8rem', md: '1rem' },
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Signup
            </Typography>
          </div>


          <Button
            className='login-form-button'
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
