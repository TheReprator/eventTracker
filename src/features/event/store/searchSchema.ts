import * as Yup from "yup";

export const EVEN_SEARCH_MIN_LENGTH = 3;

export const createSearchSchema = (errorMessage: string) =>
  Yup.object({
    keyword: Yup.string().default(""),
    search: Yup.string().default(""),
  })
    .test("keyword-or-search", errorMessage, (values) => {
      const keyword = values.keyword?.trim() ?? "";
      const search = values.search?.trim() ?? "";

      return keyword.length >= EVEN_SEARCH_MIN_LENGTH || search.length >= EVEN_SEARCH_MIN_LENGTH;
    })
    .required();

