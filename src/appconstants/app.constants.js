export const baseURL = 'http://127.0.0.1:4001';
// export const baseURL = 'https://backend.mukulima.com'
export const defaultAvatar = 'assets/as_assets/image-efHEesPlFkfUYruMh1K4wBL3vZ7h1j0b.jpg';

export const timeout = 25000;
export const X_timingdismiss = 4500;
export const M_timingdismiss = 6000;
export const L_timingdismiss = 7500;
export const appprefix = "/api"; // /guard/g
export const appname = "Mukulima ";
export const appcompanyname = "Mukulima ETS.";
export const sessionKey = "_usermk";
export const appKey = "_appID";
export const googleAPIKey = "AIzaSyBPD1EXpbRQ4V2DegVn5OIa76FyY5JchPU";
export const headers = new Headers();

headers.append("Content-Type", "application/json");
headers.append("Access-Control-Allow-Origin", "*");
headers.append("Access-Control-Allow-Methods", "POST, GET, PUT");
headers.append("Accept", "application/json");

export const endpoint = `${baseURL}${appprefix}`;