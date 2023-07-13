import { FormikValues } from "formik";

export const getTextFieldFormikProps = (formik: FormikValues, key: string) => {
  const fieldProps = formik.getFieldProps(key);
  return {
    id: key,
    name: key,
    value: fieldProps?.value || "",
    helpertext: !!formik.touched && formik.errors[key],
    ...fieldProps,
  };
};
