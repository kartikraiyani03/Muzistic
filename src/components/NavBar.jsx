/* eslint-disable no-unused-vars */
import React from 'react'
import logo from '../assets/logo.png'
import { HiMenu } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

const NavBar = () => {

    let [open, setOpen, login, setLogin] = useState(false)

    return (
        <div className='z-50 fixed w-full'>
            <nav className="bg-black  text-white h-[75px] md:h-[80px] lg:h-[85px] flex items-center justify-between">
                <div className="flex m-3 gap-1 lg:gap-2 justify-center items-center">
                    <img className='h-[40px] sm:h-[50px] md:[60px] lg:h-[60px]  rounded-full' src={logo} alt="" />
                    <p className='text-red sm:text-yellow-500 md:text-green-500 lg:text-white font-bold text-sm sm:text-lg sm:gap-3 lg:text-[30px]'>Muzistic</p>
                </div>

                <div className="hidden md:flex justify-center gap-4 lg:text-[20px] lg:gap-10 text-lg font-semibold items-center">
                    <div className="hover:border-b-2  hover:border-b-red">
                        <NavLink to="/" className="">Discvover</NavLink>
                    </div>
                    <div className="hover:border-b-2 hover:border-red">
                        <NavLink to="/">MyLibrary</NavLink>
                    </div>
                    <div className="hover:border-b-2 hover:border-red">
                        <NavLink to="/">Podcast</NavLink>
                    </div>

                </div>

                <div className="hidden md:flex md:justify-center md:items-center md:gap-3 md:m-3 lg:gap-4">

                    <div className="hidden lg:flex search  lg:justify-center lg:items-center border-2 gap-3 h-[45px] border-gray-500 bg-black rounded-[35px] bg-black-200 py-2 px-4 lg:gap-4">
                        <NavLink to='/explore'> <FiSearch className='text-3xl' /></NavLink>
                        <input type="text" className='bg-black border-none outline-none' placeholder='Search Here...' />
                    </div>
                    <div className="">

                    </div>
                    <div className="flex gap-3">
                        <div className="hidden md:block lg:hidden">
                            <NavLink to='/explore'><FiSearch className='text-3xl mt-1 mr-3' /></NavLink>
                        </div>
                        <NavLink to='/login'>
                            <button className='text-white border-2 bg-red font-semibold py-1 px-3 lg:px-4 lg:py-2 rounded-md border-red hover:text-red hover:border-red hover:bg-black'>Login</button>
                        </NavLink>
                        <NavLink to='signup'>
                            <button className='text-red border-2 border-red bg-black font-semibold rounded-md py-1 px-3 lg:py-2 lg:px-4 hover:text-white hover:bg-red hover:border-red'>SignUp</button>
                        </NavLink>
                    </div>

                </div>

                <div className="flex md:hidden justify-center items-center gap-4 m-3">
                    <NavLink to='/explore'><FiSearch className='text-2xl cursor-pointer' /></NavLink>
                    {
                        <NavLink to="/account">
                            <MdAccountCircle className='text-3xl'/>
                        </NavLink>
                    }
                    {
                        open ?
                            <IoCloseSharp onClick={() => setOpen(false)} className='text-3xl cursor-pointer' />
                            :
                            <HiMenu className="transition duration-700 text-3xl cursor-pointer" onClick={() => setOpen(true)} />
                    }

                </div>
                <div className={`text-white bg-zinc-900 z-100 w-[90%] rounded-xl mx-4 h-[200px] ${open ? 'block' : 'hidden'} absolute top-[70px]`}>
                    <div className="m-4 space-y-2">
                        <div className="">
                            <NavLink to="/" className="font-semibold">Discvover</NavLink>
                        </div>
                        <div className="">
                            <NavLink className='font-semibold' to="/">MyLibrary</NavLink>
                        </div>
                        <div className="hover:border-b-2">
                            <NavLink className='font-semibold' to="/">Podcast</NavLink>
                        </div>
                    </div>
                    <div className="flex justify-start mx-4 gap-3 items-center">
                        <NavLink to='/login'>
                            <button className='text-white border-2 bg-red font-semibold py-1 px-3 lg:px-4 lg:py-2 rounded-md border-red'>Login</button>
                        </NavLink>
                        <NavLink to='/signup'>
                            <button className='text-red border-2 border-red bg-zinc-900 font-semibold rounded-md py-1 px-3 lg:py-2 lg:px-4'>SignUp</button>
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar