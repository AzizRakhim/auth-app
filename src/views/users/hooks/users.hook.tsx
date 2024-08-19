import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SORT_TYPES } from "@types";
import { fetchUsers } from "@users/store/users.slice";
import { useSearchparams } from "@utils/user-search-params";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const useUsersHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    searchParams: { sort = SORT_TYPES.ASC },
    setSearchParams,
  } = useSearchparams();
  const { loading, users } = useAppSelector((state) => ({
    loading: state.usersSlice.loading,
    users: state.usersSlice.users,
  }));

  const fetchUsersHandler = useCallback(
    () => dispatch(fetchUsers({ sort: sort as SORT_TYPES })),
    [dispatch, sort]
  );

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  const sortProducts = useCallback(
    () =>
      setSearchParams(
        "sort",
        sort === SORT_TYPES.ASC ? SORT_TYPES.DESC : SORT_TYPES.ASC
      ),
    [setSearchParams, sort]
  );

  const navigateToAddPage = useCallback(
    () => navigate("/users/user"),
    [navigate]
  );

  return {
    sort,
    users,
    loading,
    sortProducts,
    fetchUsersHandler,
    navigateToAddPage,
  };
};

export default useUsersHook;
