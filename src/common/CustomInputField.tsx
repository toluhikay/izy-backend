import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface InputFieldProps {
  label?: string;
  type: string;
  helpertext: string;
  placeholder?: string;
  password?: boolean;
}

const CustomInputField: React.FC<InputFieldProps> = (props) => {
  const { label, type, password, placeholder } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [passwordState, setPasswordState] = useState(true);
  const [typePassword, setTypePassword] = useState("password");

  return (
    <div className="w-full">
      <label className="capitalize" htmlFor={label}>
        {label}
      </label>{" "}
      <br />
      <div className={`border outline-none flex items-center rounded w-full bg-inherit  mt-1  ${!isFocus ? "border-natural-1" : props?.helpertext ? "border-red-700" : " border-primary-1 shadow-3xl"}`}>
        <input
          className={`outline-none bg-inherit rounded w-full p-3  mt-1`}
          {...props}
          type={type === "password" ? typePassword : type}
          onFocus={(e) => {
            setIsFocus(true);
          }}
          onBlur={(e) => {
            setIsFocus(false);
          }}
          placeholder={placeholder}
        />
        {password ? (
          <div
            className="px-2 cursor-pointer"
            onClick={() => {
              setPasswordState(!passwordState);
              typePassword === "password" ? setTypePassword("text") : setTypePassword("password");
            }}
          >
            <div>{passwordState ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</div>
          </div>
        ) : null}
      </div>
      {props?.helpertext ? (
        <>
          <label className="text-[10px] text-primary-1">{props?.helpertext}</label> <br />
        </>
      ) : null}
    </div>
  );
};

export default CustomInputField;
