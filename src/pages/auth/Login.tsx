import React from "react";
import * as Yup from "yup";
import Logo from "../../assets/images/Logo.svg";

import { useFormik } from "formik";
import CustomInputField from "../../common/CustomInputField";
import { getTextFieldFormikProps } from "../../utilities/utils";
import { Navigate, useNavigate } from "react-router-dom";
import GeneralButton from "../../common/GeneralButton";
import { IzyAdminApis } from "../../api/Query";
import toast from "react-hot-toast";
import ButtonLoader from "../../common/ButtonLoader";
import useAuthToken from "../../hooks/useAuthToken";

const Login = () => {
  const [loginMutation, loginMutationResults] = IzyAdminApis.useAdminLoginMutation();
  const token = useAuthToken();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Enter a valid email"),
      password: Yup.string().required("Enter your password"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await loginMutation(values).unwrap();
      } catch (error: any) {
        toast.error(error?.data?.message);
      }
    },
  });

  const loginData = [
    { id: 1, placeholder: "Email address", props: "email", icon: "", type: "text" },
    { id: 1, placeholder: "Password", props: "password", icon: "", type: "password", password: true },
  ];

  return token ? (
    <Navigate to={"/dashboard"} replace={true} />
  ) : (
    <div className="w-screen h-screen bg-authBg bg-no-repeat bg-cover bg-blend-darken bg-[rgba(41,2,2)]/50 flex justify-center items-center">
      <div className="bg-white w-[448px] rounded-[4px] py-[38px] px-[32px] flex flex-col items-center max-w-full">
        <img src={Logo} className="w-20 h-20" alt="" />
        <div className="text-center my-6">
          <h2 className="font-semibold text-2xl">Welcome Back!</h2>
          <p className="text-[#706067] text-base">Sign in your account to gain access</p>
        </div>
        <form className="w-full" onSubmit={formik.handleSubmit} action="">
          <div className="w-full">
            {loginData.map((item, index) => {
              return (
                <div className="w-full" key={index}>
                  <CustomInputField type={item.type} placeholder={item.placeholder} password={item.password} {...getTextFieldFormikProps(formik, item.props)} />
                </div>
              );
            })}
            <p className="py-3 flex justify-end text-primary-1 cursor-pointer">{/* Reset Password */}</p>
          </div>
          <GeneralButton loaderComponent={<ButtonLoader />} loading={loginMutationResults.isLoading} text="Sign In" />
        </form>
      </div>
    </div>
  );
};

export default Login;
