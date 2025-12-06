import { useAppSelector, useAppDispatch } from "@/appConfiguration/store/hooks";
import { createSearchSchema, EVEN_SEARCH_MIN_LENGTH } from "../store/searchSchema";
import { setError } from "../store/homeSlice";
import { useSearchEventsQuery } from "../api/eventApi";
import { mapEventContainer } from "../mapper/eventMapper";
import { useEffect, useState, useMemo } from "react";
import { debounce } from "@/utils/debounce";
import { getServerErrorMessage } from "@/appConfiguration/service/axiosClient";
import { DebouncedValues, EventHomeScreenState, HomeState } from "../types/types";
import { useAppLocale } from "@/appConfiguration/localization/LocaleContext";
import { ObjectSchema } from "yup";
import { getAppLocaleTag } from "@/appConfiguration/store/slices/localizationSlice";

const useDebouncedSearch = ({ search, keyword }: DebouncedValues) => {
  const [debounced, setDebounced] = useState({
    search,
    keyword,
  });

  const debouncer = useMemo(
    () =>
      debounce((s: string, k: string) => {
        setDebounced({ search: s, keyword: k });
      }),
    []
  );

  useEffect(() => {
    debouncer(search, keyword);
  }, [search, keyword]);

  return debounced;
};

const useSearchValidation = (searchSchema: ObjectSchema<DebouncedValues>, setError: (msg: string | null) => void) => {

  const validate = async ({ search, keyword }: DebouncedValues) => {
    try {
      await searchSchema.validate({ search, keyword });
      setError(null);
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    }
  };

  return validate;
};

export const useClearErrorOnTyping = ({ error, search, keyword }: HomeState) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) dispatch(setError(null));
  }, [search, keyword]);
};

export const useHome = (): EventHomeScreenState => {
  const dispatch = useAppDispatch();

  const { search, keyword, error } = useAppSelector((s) => s.home);
  const favoriteIds = useAppSelector((s) => s.favorites.ids);

  const { t } = useAppLocale();
  const searchSchema = useMemo(
    () => createSearchSchema(t("homeScreen.searchError", { length: EVEN_SEARCH_MIN_LENGTH })),
    [t]
  );

  useClearErrorOnTyping({ error, search, keyword });

  const { search: debouncedSearch, keyword: debouncedKeyword } =
    useDebouncedSearch({ search, keyword });

  const setValidationError = (msg: string | null) => {
    dispatch(setError(msg));
  };

  const validate = useSearchValidation(searchSchema, setValidationError);

  const shouldFetch = searchSchema.isValidSync({
    search: debouncedSearch,
    keyword: debouncedKeyword,
  });

  const language = useAppLocale().language
  const locale = getAppLocaleTag(language)

  const {
    data,
    error: rawServerError,
    isFetching,
    refetch,
  } = useSearchEventsQuery(
    { search: debouncedSearch, keyword: debouncedKeyword, locale: locale},
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
    validate: () => validate({ search, keyword }),
    retry: refetch,
  };
};