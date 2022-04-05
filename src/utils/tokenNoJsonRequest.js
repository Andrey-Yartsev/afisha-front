import BrowserStore from "store";

const password = BrowserStore.get('password');

export default async (apiPath, options) => {
  return await fetch(process.env.VUE_APP_API_URL + '/' + apiPath
    + '?access_token=' + password, options);
};
