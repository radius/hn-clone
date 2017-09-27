import { sortBy } from "lodash";

// defaults
export const DEFAULT_QUERY = "react";
export const DEFAULT_PAGE = 0;
export const DEFAULT_HPP = "5";

// path data
export const PATH_BASE = "https://hn.algolia.com/api/v1";
export const PATH_SEARCH = "/search";
export const PARAM_SEARCH = "query=";
export const PARAM_PAGE = "page=";
export const PARAM_HPP = "hitsPerPage=";

export const SORT_KEYS = {
  none: "NONE",
  title: "TITLE",
  author: "AUTHOR",
  comments: "COMMENTS",
  points: "POINTS"
};

export const SORTS = {
  [SORT_KEYS.none]: list => list,
  [SORT_KEYS.title]: list => sortBy(list, "title"),
  [SORT_KEYS.author]: list => sortBy(list, "author"),
  [SORT_KEYS.comments]: list => sortBy(list, "num_comments").reverse(),
  [SORT_KEYS.points]: list => sortBy(list, "points").reverse()
};
