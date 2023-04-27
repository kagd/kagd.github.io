const fs = require('fs');
const path = require('path');
const {readJSON} = require('./readJson');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const configPath = path.join(__dirname, '../', 'config.json');
const envPath = path.join(__dirname, '../', 'env.json');

async function authenticate(path, {appId, appSecret}){
  const base64Auth = Buffer.from(`${appId}:${appSecret}`).toString('base64');
  const response = await fetch(path, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Auth}`
    }
  });

  return await response.json();
}

async function homeownerLogin() {
  console.info('Logging in...');
  const config = readJSON(configPath);
  const env = readJSON(envPath);

  let json = await authenticate(`${config.urls.token}${env.tokenCode}`, {appId: env.appId, appSecret: env.appSecret});

  if(json.error){
    console.info('Error logging in, refreshing token before trying again...');
    json = await refreshAccessToken({config, env});
  }

  if(json.error){
    throw new Error(`json.error: ${json.error}`);
  }

  // write access token to file
  const newEnv = {
    ...env,
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
  }
  fs.writeFileSync(envPath, JSON.stringify(newEnv, null, 2));

  console.info('Login successful');
}

async function refreshAccessToken({config, env}) {
  const json = await authenticate(`${config.urls.refreshToken}${env.refreshToken}`, {appId: env.appId, appSecret: env.appSecret});

  if(json.error){
    throw json.error;
  }

  return json;
}

module.exports = {
  homeownerLogin,
  refreshAccessToken,
}