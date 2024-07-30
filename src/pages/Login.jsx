import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/slices/authSlice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'

const Login = () => {
  const { user, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const submitHandler = async (data) => {
    toast.error("Login failed. Please Register your credentials. For now, use these credentials: prasad@123  prasad@gmail.com");
    console.log('Submitting login data:', data); // Debugging line
    try {
      // Dispatch login action
      await dispatch(loginUser(data)).unwrap();
      console.log('Login successful');
      navigate("/dashboard");
      toast.success("Forwarding to dashboard")
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please Register your credentials. Or Else, use these credentials: prasad@123  prasad@gmail.com");
    }
  };
  const submitRegisterHandler = async (data) => {
    try {
      // Dispatch register action
      await dispatch(registerUser(data)).unwrap();
      navigate("/dashboard");
      toast.success("Forwarding to dashboard")
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("failed")
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='flip-container'>
        <div className={`flipper ${isFlipped ? 'flip' : ''}`}>
          {/* Login form */}
          <div className='front w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
              {/* left side */}
              <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
                  <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
                    Manage all your tasks in one place!
                  </span>
                  <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
                    <span>Cloud-Based</span>
                    <span>Task Manager</span>
                  </p>
                  <div className='cell'>
                    <div className='circle rotate-in-up-left'></div>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
                >
                  <div className=''>
                    <p className='text-blue-600 text-3xl font-bold text-center'>
                      Welcome back!
                    </p>
                    <p className='text-center text-base text-gray-700 '>
                      Keep all your credentials safe.
                    </p>
                  </div>
                  <div className='flex flex-col gap-y-5'>
                    <Textbox
                      placeholder='email@example.com'
                      type='email'
                      name='email'
                      label='Email Address'
                      className='w-full rounded-full'
                      register={register("email", {
                        required: "Email Address is required!",
                      })}
                      error={errors.email ? errors.email.message : ""}
                    />
                    <Textbox
                      placeholder='your password'
                      type='password'
                      name='password'
                      label='Password'
                      className='w-full rounded-full'
                      register={register("password", {
                        required: "Password is required!",
                      })}
                      error={errors.password ? errors.password.message : ""}
                    />
                    {status === 'failed' && error && (
                      <div className='text-red-500 text-center'>
                        {error.message || "Login failed, please try again."}
                      </div>
                    )}
                    <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
                      Forgot Password?
                    </span>
                    <Button
                      type='submit'
                      label='Submit'
                      className='w-full h-10 bg-blue-700 text-white rounded-full'
                    />
                    <span
                      className='text-sm text-blue-600 hover:underline cursor-pointer text-center mt-4'
                      onClick={() => setIsFlipped(true)}
                    >
                      Don't have an account? Register
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Register form */}
          <div className='back w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
              {/* left side */}
              <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
                  <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
                    Manage all your tasks in one place!
                  </span>
                  <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
                    <span>Cloud-Based</span>
                    <span>Task Manager</span>
                  </p>
                  <div className='cell'>
                    <div className='circle rotate-in-up-left'></div>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                <form
                  onSubmit={handleSubmit(submitRegisterHandler)}
                  className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
                >
                  <div className=''>
                    <p className='text-blue-600 text-3xl font-bold text-center'>
                      Create an account!
                    </p>
                    <p className='text-center text-base text-gray-700 '>
                      Keep all your credentials safe.
                    </p>
                  </div>
                  <div className='flex flex-col gap-y-5'>
                    <Textbox
                      placeholder='username'
                      type='text'
                      name='username'
                      label='Username'
                      className='w-full rounded-full'
                      register={register("username", {
                        required: "Username is required!",
                      })}
                      error={errors.username ? errors.username.message : ""}
                    />
                    <Textbox
                      placeholder='email@example.com'
                      type='email'
                      name='email'
                      label='Email Address'
                      className='w-full rounded-full'
                      register={register("email", {
                        required: "Email Address is required!",
                      })}
                      error={errors.email ? errors.email.message : ""}
                    />
                    <Textbox
                      placeholder='your password'
                      type='password'
                      name='password'
                      label='Password'
                      className='w-full rounded-full'
                      register={register("password", {
                        required: "Password is required!",
                      })}
                      error={errors.password ? errors.password.message : ""}
                    />
                    <Textbox
                        placeholder='Title'
                        type='text'
                        name='title'
                        label='Title'
                        className='w-full rounded-full'
                        register={register("title", {
                          required: "Title is required!",
                        })}
                        error={errors.title ? errors.title.message : ""}
                      />

                      <Textbox
                        placeholder='Role'
                        type='text'
                        name='role'
                        label='Role'
                        className='w-full rounded-full'
                        register={register("role", {
                          required: "Role is required!",
                        })}
                        error={errors.role ? errors.role.message : ""}
                      />
                    {status === 'failed' && error && (
                      <div className='text-red-500 text-center'>
                        {error.message || "Registration failed, please try again."}
                      </div>
                    )}
                    <Button
                      type='submit'
                      label='Submit'
                      className='w-full h-10 bg-blue-700 text-white rounded-full'
                    />
                    <span
                      className='text-sm text-blue-600 hover:underline cursor-pointer text-center mt-4'
                      onClick={() => setIsFlipped(false)}
                    >
                      Already have an account? Login
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;