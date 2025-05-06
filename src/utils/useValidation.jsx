/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signupHandler } from '../redux/slice/accountSlice'

const useValidation = () => {
    let nav = useNavigate()
    let {login, userObject, users} = useSelector((state) => state.account)
    let [formData, setFormData] = useState({ name: '', id:'', email: '', password: '', cpassword: '' })
    let [error, setError] = useState({ name: '', id: '', email: '', password: '', cpassword: '' })
    let dis = useDispatch()  

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        const newErrors = { ...error };
        let isValid = true

        switch (fieldName) {
            case 'email':
                if (!value) {
                    newErrors.email = 'Email is required.';
                    isValid = false;
                } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    newErrors.email = 'Please enter a valid email address.';
                    isValid = false;
                } else {
                    newErrors.email = ''; // Clear error if valid
                }
                break;
            case 'id':
                if (!value) {
                    newErrors.id = 'Id is required.';
                    isValid = false;
                } else if (value == 0 || value > 100) {
                    newErrors.id = 'Id is too Large'
                    isValid = false
                }   
                 else {
                    newErrors.id = ''; // Clear error if valid
                }
                break;

            case 'name':
                if (!value) {
                    newErrors.name = 'Name is required.';
                    isValid = false;
                } else {
                    newErrors.name = ''; // Clear error if valid
                }
                break;

            case 'password':
                if (!value) {
                    newErrors.password = 'Password is required.';
                    isValid = false;
                } else {
                    newErrors.password = ''; // Clear error if valid
                }
                break;

            case 'cpassword':
                if (!value) {
                    newErrors.cpassword = 'Confirm password is required.';
                    isValid = false;
                } else if (value !== formData.password) {
                    newErrors.cpassword = 'Passwords must match.';
                    isValid = false;
                } else {
                    newErrors.cpassword = ''; // Clear error if valid
                }
                break;

            default:
                break;
        }

        setError(newErrors); // Update error state dynamically
    };
    
    const validateForm = () => {
        let isValid = true;
        
        const newErrors = { name: '', id : '', email: '', password: '', cpassword: '' };
        // Validate email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validate username
        if (!formData.name) {
            newErrors.name = 'Username is required.';
            isValid = false;
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        }

        // Validate confirm password
        if (!formData.cpassword) {
            newErrors.cpassword = 'Confirm password is required.';
            isValid = false;
        } else if (formData.password !== formData.cpassword) {
            newErrors.cpassword = 'Passwords must match.';
            isValid = false;
        }

        setError(newErrors);
        return isValid;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const newErrors = { name: '', id : '', email: '', password: '', cpassword: '' };
        let exist = users.find((user) => user.id == formData.id)
        if(exist) 
        {
            newErrors.id = 'User Exist',
            setError(newErrors)
        }
        if (Object.values(error).every((error) => error === '') && validateForm() && !exist) {
            dis(signupHandler(formData))
            console.log('Form submitted', formData);
            nav('/account')
            let emptyData =
                setFormData({ name: '',id : '', email: '', password: '', cpassword: '' })

        } else {
            console.log('Form has errors');
        }
    };

    return { validateForm, submitHandler, formData, error, changeHandler }
}

export default useValidation