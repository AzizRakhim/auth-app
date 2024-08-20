import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo } from "react";
import { SORT_TYPES } from "@types";
import { dateFormat } from "@carts/constants";
import { fetchCarts } from "@carts/store/carts.slice";
import { fetchUsers } from "@users/store/users.slice";
import { useSearchparams } from "@utils/user-search-params";
import { useAppDispatch, useAppSelector } from "@store/store-hooks";

const useCartsHook = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    searchParams: { sort = SORT_TYPES.ASC, startdate, enddate },
    setSearchParams,
    deleteParams,
  } = useSearchparams();
  const { carts, loading, users, usersLoading } = useAppSelector((state) => ({
    carts: state.cartsSlice.carts,
    users: state.usersSlice.users,
    loading: state.cartsSlice.loading,
    usersLoading: state.usersSlice.loading,
  }));

  const fetchCartsHandler = useCallback(
    () =>
      dispatch(fetchCarts({ sort: sort as SORT_TYPES, startdate, enddate })),
    [dispatch, enddate, sort, startdate]
  );

  const fetchUsersHandler = useCallback(
    () => dispatch(fetchUsers({})),
    [dispatch]
  );

  useEffect(() => {
    fetchCartsHandler();
    fetchUsersHandler();
  }, [fetchCartsHandler, fetchUsersHandler]);

  const sortCarts = useCallback(
    () =>
      setSearchParams(
        "sort",
        sort === SORT_TYPES.ASC ? SORT_TYPES.DESC : SORT_TYPES.ASC
      ),
    [setSearchParams, sort]
  );

  const navigateToAddPage = useCallback(
    () => navigate("/carts/cart"),
    [navigate]
  );

  const onDateChange: (
    dates: unknown,
    dateStrings: [string, string]
  ) => void = (_, dateStrings) => {
    if (dateStrings[0] && dateStrings[1]) {
      setSearchParams("startdate", dateStrings[0]);
      setSearchParams("enddate", dateStrings[1]);
    } else {
      deleteParams("startdate");
      deleteParams("enddate");
    }
  };

  const dateValue: [Dayjs | null, Dayjs | null] = useMemo(() => {
    return [
      startdate ? dayjs(startdate, dateFormat) : null,
      enddate ? dayjs(enddate, dateFormat) : null,
    ];
  }, [enddate, startdate]);

  return {
    sort,
    carts,
    users,
    loading,
    enddate,
    sortCarts,
    dateValue,
    startdate,
    usersLoading,
    onDateChange,
    fetchCartsHandler,
    navigateToAddPage,
  };
};

export default useCartsHook;
