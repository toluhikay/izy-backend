import React from "react";
import CustomInputField from "../../../common/CustomInputField";
import { getTextFieldFormikProps } from "../../../utilities/utils";
import { useFormik } from "formik";
import { IzyAdminApis } from "../../../api/Query";
import ButtonLoader from "../../../common/ButtonLoader";
import * as Yup from "yup";

const AccountSetting = () => {
  const [updatePasswordMutation, updatePAsswordMutationResults] = IzyAdminApis.useAdminUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: {
      new_password: "",
    },
    validationSchema: Yup.object().shape({
      new_password: Yup.string().required("password is required"),
    }),
    onSubmit: async (values, formikHelpers) => {
      try {
        const result = await updatePasswordMutation(values).unwrap();
      } catch (error) {}
    },
  });

  return (
    <div className="p-8 w-full">
      <h2 className="text-[28px] font-medium mb-2">Account Settings</h2>
      <div className="flex justify-between mb-8 items-center w-full">
        <p className="text-natural-1">Update Account Settings</p>
        {/* <button className="bg-primary-1 text-white rounded-[4px] py-[10px] px-4" onClick={HandleCreatePage}>
      NEW PAGE +
    </button> */}
      </div>
      <h2 className="text-base font-medium">Admin Update Password</h2>
      <form onSubmit={formik.handleSubmit} action="" className="py-5 bg-white w-[400px] my-6 max-w-full p-4 rounded-lg">
        <CustomInputField label="new Password" type="password" placeholder="Update password" password={true} {...getTextFieldFormikProps(formik, "new_password")} />
        <button className="my-3 bg-primary-1 rounded p-3 text-white" type="submit">
          {updatePAsswordMutationResults.isLoading ? <ButtonLoader /> : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default AccountSetting;
