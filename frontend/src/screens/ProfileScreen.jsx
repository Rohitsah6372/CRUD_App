import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../comnponents/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/userApiSlice';


const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
  
    const [updateProfile] = useUpdateUserMutation()

    useEffect(() => {
        if (userInfo) {
          setName(userInfo.name);
          setEmail(userInfo.email);
        }
      }, [userInfo]);
  
    const submitHandler = async (e) => {
      e.preventDefault();
  
      // Validation for empty fields
      if (!name || !email  ) {
        toast.error('Please fill in all fields.');
      }else {
        // Implement your updateProfile function or API call here.
        // Example:
        try {
          const updatedUser = await updateProfile({
            _id: userInfo._id,
            name,
            email,
          }).unwrap();
          dispatch(setCredentials({...updatedUser}));
          toast.success('Profile updated successfully.');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
  
    return (
      <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
    
          <Button type='submit' variant='primary' className='mt-3'>
            Update
          </Button>
        </Form>
      </FormContainer>
    );
  };
  
  export default ProfileScreen;