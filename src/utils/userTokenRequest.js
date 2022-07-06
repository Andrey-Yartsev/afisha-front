import BrowserStore from "store";

const token = BrowserStore.get("vk-token");

export default async (apiPath, options) => {
  if (!token) {
    console.trace("XXX");
    console.log("no token defined for " + apiPath);
  }
  if (!options) {
    options = {};
  }
  options.headers = {
    "Authorization": token,
    "Content-Type":  "application/json"
  };
  if (options.data) {
    options.body = JSON.stringify(options.data);
  }
  console.log(options);
  return await fetch(process.env.VUE_APP_API_URL + "/" + apiPath, options);
};
