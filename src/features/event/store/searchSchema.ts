import * as Yup from "yup";

export const searchSchema = Yup.object().shape({
  keyword: Yup.string(),
  city: Yup.string(),
}).test(
  "keyword-or-city",
  "Enter keyword or city to search",
  (values: any) => !!values && (!!values.keyword?.trim() || !!values.city?.trim())
);
