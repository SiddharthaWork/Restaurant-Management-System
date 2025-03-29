import { useLazyGetMyProfileQuery } from "@/redux/api/authApi";
import { setToken, setUser } from "@/redux/slices/configUser";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.configUser);
  const [getProfile] = useLazyGetMyProfileQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const cookie = Cookies.get("RSM");
        if (cookie) {
          dispatch(setToken(cookie));
          const res = await getProfile().unwrap();
          if (res?.success) {
            dispatch(setUser(res?.data));
          }
        }
      } catch (error) {
        console.error("Authentication error:", error);
        dispatch(setToken(null));
        Cookies.remove("RSM");
      } finally {
        console.log("loding finally");
        setIsLoading(false);
      }
    };
    authenticate();
  }, []);

  return { isAuthenticated: !!token && !!user, isLoading };
};
