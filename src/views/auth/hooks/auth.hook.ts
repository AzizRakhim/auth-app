import { useCallback, useState } from "react";
import { setToken } from "@auth/store/auth.slice";
import { useAppDispatch } from "@store/store-hooks";
import { SignInFieldType } from "@auth/types/auth.types";
import { authService } from "@auth/service/auth.services";
import { message } from "antd";

const useAuthHook = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const onSignInHandle = useCallback(
    async (data: SignInFieldType) => {
      try {
        setLoading(true);
        const res = await authService.login(data);

        if (res.token) {
          message.success("You have successfully logged in.");
          dispatch(setToken(res?.token));
        }

        return res;
      } catch {
        message.error("Wrong credentials");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { onSignInHandle, loading };
};

export default useAuthHook;
