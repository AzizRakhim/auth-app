import { useCallback, useState } from "react";
import { setToken } from "@auth/store";
import { authService } from "@auth/service";
import { SignInFieldType } from "@auth/types";
import { useAppDispatch } from "@store/store-hooks";
import { setNotification } from "@store/slices/notification.slice";

const useAuthHook = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const onSignInHandle = useCallback(
    async (data: SignInFieldType) => {
      try {
        setLoading(true);
        const res = await authService.login(data);

        if (res.token) {
          dispatch(setToken(res?.token));
        }

        return res;
      } catch {
        dispatch(
          setNotification({
            notification: { type: "error", title: "Wrong credentials" },
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { onSignInHandle, loading };
};

export default useAuthHook;
