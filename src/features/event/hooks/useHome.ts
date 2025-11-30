import { useAppSelector, useAppDispatch } from "@/appConfiguration/store/hooks";
import { searchSchema } from "../store/searchSchema";
import { setError } from "../store/homeSlice";
import { useSearchEventsQuery } from "../api/eventApi";
import { mapEventContainer } from "../mapper/eventMapper";
import { useEffect, useState, useMemo } from "react";
import { debounce } from "@/utils/debounce";
import { getServerErrorMessage } from "@/appConfiguration/service/axiosClient";

export const useHome = () => {
  const dispatch = useAppDispatch();
  const { search, keyword, error } = useAppSelector((s) => s.home);
  const favoriteIds = useAppSelector((s) => s.favorites.ids);

  useEffect(() => {
    if (error)
      dispatch(setError(null));
  }, [keyword, search]);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  const debouncer = useMemo(() =>
    debounce((search: string, keyword: string) => {
      setDebouncedSearch(search);
      setDebouncedKeyword(keyword);
    }),
    []
  );

  useEffect(() => {
    debouncer(search, keyword);
  }, [search, keyword]);


  const validate = async () => {
    try {
      await searchSchema.validate({
        search: search,
        keyword: keyword,
      });

      dispatch(setError(null));
      return true;
    } catch (e: any) {
      dispatch(setError(e.message));
      return false;
    }
  };

  const shouldFetch = searchSchema.isValidSync({
    search: debouncedSearch,
    keyword: debouncedKeyword,
  })

  const {
    data,
    error: rawServerError,
    isFetching,
    refetch,
  } = useSearchEventsQuery(
    { search: debouncedSearch, keyword: debouncedKeyword },
    { skip: !shouldFetch }
  );

  const events = mapEventContainer(favoriteIds, data);
  const serverError = getServerErrorMessage(rawServerError);

  return {
    search,
    keyword,
    error,
    serverError,
    isFetching,
    events,
    validate,
    retry: refetch,
  };
};