const { homeownerLogin } = require("./auth");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
const {readJSON} = require('./readJson');

const envPath = path.join(__dirname, '../', 'env.json');

async function execFetch(url){
  const env = readJSON(envPath);

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.accessToken}`
    }
  });

  return await response.json();
}

async function authenticatatedGet(url){
  let json = await execFetch(url);

  if(json.error || json.code === 401){
    await homeownerLogin();
    json = await execFetch(url);

    if(json.error || json.code === 401) {
      throw new Error(`json.error: ${json.error}`);
    }
  }

  return json;
}

module.exports = {
  authenticatatedGet
}