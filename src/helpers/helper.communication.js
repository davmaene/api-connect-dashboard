import axios from "axios";
import { appname, endpoint, headers, timeout } from "../appconstants/app.constants";
import { checkLifeSession, retrieveSession } from "./helper.session";
import { routes } from "./helper.routes";
import toast from "react-hot-toast";

axios.interceptors.request.use(
    (config) => {
        const controller = new AbortController();
        let bearer = '';
        const session = retrieveSession({ callBack: (err, done) => { } });
        const { code, message, data } = session;

        if (session && code === 200) {
            const { getToken } = data;
            bearer = getToken();

            checkLifeSession({
                token: bearer,
                callBack: (err, done) => {
                    if (done) {
                        const { code, message, data } = done;
                        if (code !== 200) {
                            const { hash, href, host } = window.location;
                            if ([
                                // routes['sessionreset'],
                                routes['signup'],
                                routes['signin'],
                            ].indexOf(href.substring(href.lastIndexOf('#'))) !== -1
                            ) {
                                controller.abort();
                            } else {
                                window.location.replace(`#${routes['signin']}`);
                            }
                        }
                    }
                },
            });
        }

        config.headers.apikey = '$2b$10$AS6GbX37SkQS6skhMOYjveDOuUUgvGz9dvsrCbeylWl/SwMkDDp2G';
        config.headers.apikeyaccess = appname + '@api2022';
        config.headers['x-connexion-mukulima'] = 'Bearer ' + bearer;
        return { ...config, signal: controller.signal };
    },
    (rejected) => {
        return new Promise.reject(rejected);
    }
);

axios.interceptors.response.use(
    (resposne) => {
        return resposne;
    }
    , error => {
        if (error.hasOwnProperty('message') && error['message'] === 'canceled') {
            console.log('The request was canceled ==> ', error);
        } else {
            const { response, message } = error;
            const { data, statusText } = response;
            const { status } = data;

            if (status === 403) {
                toast.error('Désolé votre session a éxpiré; vous allez bientôt être deconnecté');
                window.location.replace(`#${routes['signin']}`);
            }
            return response
        }
    }
);

export const onRunExternalRQST = async ({ url, data, method, params, multer }, cb) => {
    let data_ = data;
    let headers_ = {
        ...headers
    }
    if (multer == true) {
        headers_ = {
            ...headers_,
            'content-type': 'multipart/form-data'
        }
        const formdata = new FormData()
        Object.keys(data).map(d => {
            formdata.append(d, data[d])
        })
        data_ = formdata
    }
    try {
        await axios({
            timeout: timeout,
            method: method ? method : "GET",
            params,
            data: data_ ? data_ : null,
            url: `${endpoint}${url}`,
            headers_
        })
            .then(res => {
                return cb(undefined, res['data'])
            })
            .catch(err => {
                return cb(err, undefined)
            })
    } catch (error) {
        return cb(error, undefined)
    }
};