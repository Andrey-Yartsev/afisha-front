import queryString from "query-string";
import Store from "@/store";
import request from "./request";

export default async (apiPath, options) => {
  if (!options) {
    options = {};
  }

  const query = {
    ...options.query
  };

  if (Store.state.adminAuth.token) {
    query["access-token"] = Store.state.adminAuth.token;
  }

  const params = queryString.stringify(query);
  delete options.query;

  return request(`${apiPath}?${params}`, options);
};
