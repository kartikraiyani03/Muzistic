/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import logo from '../../public/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import useValidation from '../utils/useValidation';

const Signup = ({login, setLogin}) => 
{
 
  let {submitHandler, formData, changeHandler, error} = useValidation()

  return (
    <div className='pt-[30px]'>
  <div className="flex min-h-full  bg-black overflow-hidden text-white flex-col justify-start mt-10 px-6 h-[100vh] lg:px-8">
    <div className="sm:mx-auto relative sm:w-full sm:max-w-sm">

    <div className="absolute top-40 -left-4 w-64 h-64 rounded-full bg-radial-gradient from-red to-transparent blur-[80px] pointer-events-none"></div>

      {/* <img
        alt="Your Company"
        src={logo}
        className="mx-auto h-[100px] rounded-full w-auto"
      /> */}
      <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Create account
      </h2>
    </div>

    <div className="mt-5 z-20 sm:mx-auto sm:w-full sm:max-w-sm">
      <form method="" onSubmit={submitHandler} className="space-y-3">
        <div className="flex justify-between items-start space-x-4">
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              value={formData.name}
              onChange={changeHandler}
              name="name"
              type="string"
              autoComplete=""
              className="block w-full rounded-md bg-zinc-900 outline-none px-3 py-2 text-base text-gray-900 border-b-2 border-zinc-600 placeholder:text-gray focus:outline focus:outline-2  focus:border-b-red sm:text-sm/6"
              />
              <span>
                { error.name && <span className='text-red text-[13px] text-start'>{error.name}</span> }
              </span>
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Id
          </label>
          <div className="mt-2">
            <input
              id="id"
              value={formData.id}
              onChange={changeHandler}
              name="id"
              type="number"
              autoComplete=""
              className="block w-full rounded-md bg-zinc-900 outline-none px-3 py-2 text-base text-gray-900 border-b-2 border-zinc-600 placeholder:text-gray focus:outline focus:outline-2  focus:border-b-red sm:text-sm/6"
              />
              <span>
                { error.id && <span className='text-red text-[13px] text-start'>{error.id}</span> }
              </span>
          </div>
        </div>
        
        </div>
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              value={formData.email}
              onChange={changeHandler}
              id="email"
              name="email"
              autoComplete="email"
              className="block w-full rounded-md bg-zinc-900 outline-none  px-3 py-2 text-base text-gray-900 border-b-2 border-zinc-600 placeholder:text-gray focus:outline focus:outline-2  focus:border-b-red sm:text-sm/6"
              />
            { error.email && <span className='text-red text-[13px] text-start'>{error.email}</span> }

          </div>
        </div>

       <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm/6 font-medium text-gray-900">
               Password
            </label>
          </div>
          <div className="mt-2">
            <input
              value={formData.password}
              onChange={changeHandler}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md bg-zinc-900 outline-none px-3 py-2 text-base text-gray-900 border-zinc-600  placeholder:text-gray-400 focus:outline focus:outline-2 border-b-2 focus:border-b-red sm:text-sm/6"
              />
                { error.password && <span className='text-red text-[13px] text-start'>{error.password}</span> }

          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm/6 font-medium text-gray-900">
             Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              value={formData.cpassword}
              onChange={changeHandler}
              id="cpassword"
              name="cpassword"
              type="password"
              autoComplete="confirm-password"
              className="block w-full rounded-md bg-zinc-900 outline-none px-3 py-2 text-base text-gray-900 border-zinc-600  placeholder:text-gray-400 focus:outline focus:outline-2 border-b-2 focus:border-b-red sm:text-sm/6"
            />
                { error.cpassword && <span className='text-red text-[13px] text-start'>{error.cpassword}</span> }

          </div>
        </div>


        <div className='pt-3'>
          <button
            className="flex w-full justify-center border-2 border-red rounded-md 
            bg-transparent px-3 py-1.5 text-sm/6 font-semibold text-red shadow-sm  hover:border-red hover:bg-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            Create Account
          </button>
        </div>
      </form>

      <p className="mt-3 text-center text-sm/6 text-gray-500">
        Already have an account ?{' '}
        <NavLink to="/login" className="font-semibold text-red ">
          Login
        </NavLink>
      </p>
    </div>
  </div>
</div>

  );
};

export default Signup;

