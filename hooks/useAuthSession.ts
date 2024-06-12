import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  //  implement the logic here to check user session
  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUser(response.data.user));
        } catch (error) {
          console.error("Failed to verify token:", error);
          localStorage.removeItem("token");
          dispatch(clearAuth());
        }
      } else {
        dispatch(clearAuth());
      }
    };

    checkUserSession();
  }, [dispatch]);

  return user;
};

export default useAuthSession;
