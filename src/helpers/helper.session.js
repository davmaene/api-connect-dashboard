import { appKey, sessionKey } from "../appconstants/app.constants";
import { UserProfile } from "./helper.userprofile";
import { jwtDecode } from "jwt-decode";
import base64 from 'base-64';

export const saveSession = ({ currentUser, rememberMe, callBack }) => {
    const _user = new UserProfile();
    _user.__constructor({ ...currentUser, extras: JSON.stringify(currentUser) });
    window.localStorage.setItem(sessionKey, JSON.stringify(currentUser));
    if (rememberMe && rememberMe === true) localStorage.setItem(sessionKey, JSON.stringify(currentUser));
    else sessionStorage.setItem(sessionKey, JSON.stringify(currentUser));
    global._user = currentUser;
    callBack(undefined, currentUser)
};

export const saveOnLocalStorageAsString = async ({ options: { key, value } }) => {
    return new Promise((resolve, reject) => {
        if (window.localStorage.setItem(key, value) === undefined) resolve({ [key]: value });
        else reject(` Error on saving ${key} ${value} `)
    })
};

export const retrieveOnLocalStorageAsString = async ({ options: { key } }) => {
    const value = window.localStorage.getItem(key) || localStorage.getItem(key)
    return new Promise((resolved, rejected) => {
        if (value) resolved({ [key]: value })
        else rejected({ [key]: value })
    })
};

export const retrieveSession = ({ callBack }) => {
    const session = window.localStorage.getItem(sessionKey) || localStorage.getItem(sessionKey) || sessionStorage.getItem(sessionKey)
    try {
        if (session) {
            const _session = JSON.parse(session)
            const _user = new UserProfile();
            _user.__constructor({ ..._session });
            global._user = _session;
            callBack(undefined, _user)
            return {
                code: 200,
                message: "Session alive",
                data: {
                    ..._user
                }
            }
        } else {
            callBack(true, undefined)
            return {
                code: 403,
                message: "Sessioln died",
                data: {}
            }
        }
    } catch (error) {
        callBack(true, undefined)
        return {
            code: 403,
            message: "Sessioln died",
            data: error
        }
    }
};

export const detroySession = async ({ callBack }) => {
    const session = window.localStorage.getItem(sessionKey) || localStorage.getItem(sessionKey)
    if (session) {
        window.localStorage.removeItem(sessionKey);
        window.localStorage.removeItem(sessionKey);
        window.localStorage.removeItem(appKey)
        global._user = null

        callBack(undefined, 'resolved')
    } else {
        callBack('rejected', undefined)
    }
};

export const checkLifeSession = ({ token, callBack }) => {
    token = base64.decode(base64.decode(token))
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            return callBack(undefined, { code: 301, message: "Session epired !", data: null })
        } else {
            return callBack(undefined, { code: 200, message: "Session is still alive !", data: token })
        }
    } else {
        return callBack(undefined, { code: 301, message: "Session epired !", data: null })
    }
};