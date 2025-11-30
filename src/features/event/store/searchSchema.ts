import * as Yup from "yup";
import { DebouncedValues } from "../types/types";

const MIN_LENGTH = 3;

export const searchSchema: Yup.ObjectSchema<DebouncedValues> = Yup.object({
  keyword: Yup.string().default(""),
  search: Yup.string().default(""),
})
  .test(
    "keyword-or-search",
    `Enter keyword or search (min ${MIN_LENGTH} characters)`,
    (values) => {
      const keyword = values.keyword?.trim() ?? "";
      const search = values.search?.trim() ?? "";

      return keyword.length >= MIN_LENGTH || search.length >= MIN_LENGTH;
    }
  )
  .required();

