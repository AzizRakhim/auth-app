import { useSearchParams } from "react-router-dom";

const useSearchparams = () => {
  const [a, b] = useSearchParams();
  const searchParams = Object.fromEntries([...a]);
  const deleteParams = (_key: string) => {
    a.delete(_key);
    b(a);
  };
  const deleteGroup = (_key: string[]) => {
    for (let i = 0; i < _key.length; i++) {
      const keyPar = `${_key[i]}`;
      a.delete(keyPar);
      b(a);
    }
  };
  const setSearchParams = (_key: string, value: number | string | boolean) => {
    a.set(String(_key), String(value));
    b(a);
  };

  const setMultipleSearchParams = (
    _key: string,
    value: number[] | string[]
  ) => {
    const _vlues = value.join(",");
    a.set(String(_key), _vlues);
    b(a);
  };

  const setGroup = (groups: { [k: string]: string }) => {
    for (const key in groups) {
      a.set(String(key), String(groups[key]));
      b(a);
    }
  };

  return {
    searchParams,
    setSearchParams,
    deleteParams,
    setGroup,
    deleteGroup,
    setMultipleSearchParams,
  };
};

const useListenParams = (arr: string[]) => {
  const { searchParams } = useSearchparams();
  const params: (string | undefined)[] = arr.map(
    (elem: string) => searchParams[elem]
  );
  return params;
};

export { useSearchparams, useListenParams };
