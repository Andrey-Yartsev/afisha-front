import BrowserStore from "store";

const password = BrowserStore.get('password');

export default async (apiPath, options) => {
  if (!options) {
    options = {};
  }
  if (options.data) {
    options.body = JSON.stringify(options.data);
  }
  options.headers = {"Content-Type":  "application/json"};
  if (!password) {
    console.log('No password in storage');
  }
  return await fetch(import.meta.env.VUE_APP_API_URL + '/' + apiPath
    + '?access_token=' + password, options);
};
