import { useAppSelector } from "./reduxHooks";

const useAuthToken = () => {
  return useAppSelector((store) => store.admin.token);
};

export default useAuthToken;
