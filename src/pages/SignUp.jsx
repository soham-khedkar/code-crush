import {
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import supabase from "../lib/supabase";

const commonStyles = {
  inputIcon:
    "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
  input:
    "block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600",
  button:
    "inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80",
  socialButton:
    "relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none",
  link: "font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline",
};

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await signUpNewUser(email, password);
    if (result.success) {
      toast.success("Sign up successful! Redirecting to sign-in page...");
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className="bg-white">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img
              className="object-cover w-full h-[100%]"
              src="https://i.pinimg.com/564x/e5/6f/8e/e56f8e8e7cc62aa094b33651f9f4d63d.jpg"
              alt="Girl working on laptop"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
              <h3 className="text-4xl font-bold text-white">
                Join 35k+ web professionals & <br className="hidden xl:block" />
                build your website
              </h3>
              <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  "Commercial License",
                  "Unlimited Exports",
                  "120+ Coded Blocks",
                  "Design Files Included",
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                      <FaCheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-lg font-medium text-white">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up to Celebration
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className={commonStyles.link}>
                SignIn
              </Link>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              <div>
                <label className="text-base font-medium text-gray-900">
                  First & Last name
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <div className={commonStyles.inputIcon}>
                    <FaUser className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("fullName")}
                    className={commonStyles.input}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <div className={commonStyles.inputIcon}>
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter email to get started"
                    {...register("email")}
                    className={commonStyles.input}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-base font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <div className={commonStyles.inputIcon}>
                    <FaLock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className={commonStyles.input}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button type="submit" className={commonStyles.button}>
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-5 text-sm text-gray-600">
              This site is protected by reCAPTCHA and the Google{" "}
              <Link to="#" className={commonStyles.link}>
                Privacy Policy
              </Link>{" "}
              &{" "}
              <Link to="#" className={commonStyles.link}>
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Error signing up:", error.message);
    return { success: false, message: error.message };
  } else {
    console.log("Sign up successful:", data);
    return { success: true };
  }
}