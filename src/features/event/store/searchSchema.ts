import * as Yup from "yup";

const MIN_LENGTH = 3;

export const searchSchema = Yup.object()
  .shape({
    keyword: Yup.string().nullable(),
    search: Yup.string().nullable(),
  })
  .test(
    "keyword-or-search",
    `Enter keyword or search (min ${MIN_LENGTH} characters)`,
    (values) => {
      if (!values) return false;

      const keywordLen = values.keyword?.trim().length ?? 0;
      const searchLen = values.search?.trim().length ?? 0;

      return keywordLen >= MIN_LENGTH || searchLen >= MIN_LENGTH;
    }
  );
