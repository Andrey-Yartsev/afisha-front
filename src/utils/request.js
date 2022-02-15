export default async (apiPath, options) => {
  if (options.data) {
    options.body = JSON.stringify(options.data);
  }
  if (!options.headers) {
    options.headers = {}
  }
  options.headers["Content-Type"] = "application/json" ;
  return fetch(process.env.VUE_APP_API_URL + "/" + apiPath, options);
};
