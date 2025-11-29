import { useAppSelector, useAppDispatch } from "@/appConfiguration/store/hooks";
import { searchSchema } from "../store/searchSchema";
import { setError } from "../store/homeSlice";
import { useSearchEventsQuery } from "../api/eventApi";
import { mapEventContainer } from "../mapper/eventMapper";

export const useHome = () => {
  const dispatch = useAppDispatch();
  const { search, keyword, error } = useAppSelector((s) => s.home);
  const favoriteIds = useAppSelector((s) => s.favorites.ids);

  const validate = async () => {
    try {
      await searchSchema.validate({ search, keyword });
      dispatch(setError(null));
      return true;
    } catch (e: any) {
      dispatch(setError(e.message));
      return false;
    }
  };

  const {
    data,
    error: serverError,
    isFetching,
    refetch,
  } = useSearchEventsQuery(
    { search, keyword },
    { skip: !keyword && !search }
  );

  // Mapping container → HomeModelItem[]
  const events = mapEventContainer(favoriteIds, data);

  return {
    search,
    keyword,
    error,               // Yup validation error
    serverError,         // RTK Query backend error object
    isFetching,
    events,
    validate,
    retry: refetch,
  };
};
