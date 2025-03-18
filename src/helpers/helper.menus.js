import * as React from 'react';
import { DashboardMenus, InvestementMenus, LaboratoiryMenus, SokoMenus } from '../components/layout/Menus';
import { initialRoles, intersection, rooms } from './helper.all';
import { retrieveOnLocalStorageAsString, retrieveSession, saveOnLocalStorageAsString } from './helper.session';
import { appKey } from '../appconstants/app.constants';
import { message } from 'antd';
import { routes } from './helper.routes';

export const features = ({ user, appKey }) => {
    const f = {
        8495: {
            appid: 8495,
            name: "Mukulima Investement",
            allowedto: [],
            menus: (<InvestementMenus appkey={appKey} user={user} />)
        },
        8496: {
            appid: 8496,
            name: "Mukulima Soko",
            allowedto: [],
            menus: (<SokoMenus appkey={appKey} user={user} />)
        },
        8497: {
            appid: 8497,
            name: "Mukulima Lab",
            allowedto: [],
            menus: (<LaboratoiryMenus appkey={appKey} user={user} />)
        },
        8498: {
            appid: 8498,
            name: "Mukulima Dashboard",
            allowedto: [],
            menus: (<DashboardMenus user={user} appkey={appKey} />)
        }
    }

    return f && f[appKey]
}

export const Menus = ({ swtch }) => {
    const f = [...Object.values(features)]
}

export const canThisBeShowForThisUser = ({ roles, block }) => {
    try {
        roles = roles ? roles.getRoles() : [];
        const allowedto = block && block.hasOwnProperty('allowedto') ? block['allowedto'] : [];
        if (Array.isArray(roles) && roles.length > 0) {
            const intersec = intersection({ array1: roles, array2: allowedto });
            if (intersec.length > 0) {
                return true;
            } else return false;
        } else return false;
    } catch (error) {
        return false;
    }
}

export const onChangeRoom = ({ e, event }) => {
    event.preventDefault()
    const room = rooms[e];
    document.title = room;
    let block = initialRoles['1'];

    switch (e) {
        case 8495:
            block = initialRoles['2']
            break;
        case 8496:
            block = initialRoles['3']
            break;
        case 8497:
            block = initialRoles['4']
            break
        case 8498:
            block = initialRoles['1']
            break;
        default:
            block = initialRoles['5']
            break;
    };

    retrieveSession({
        callBack: (err, user) => {
            if (user) {
                const allowed = canThisBeShowForThisUser({ roles: user, block })
                if (allowed === true) {
                    saveOnLocalStorageAsString({
                        options: {
                            key: appKey,
                            value: e
                        }
                    })
                        .then(res => {
                            message.warning(`Changement des menus pour ${room} en cours ...`)
                            setTimeout(() => {
                                window.location.reload()
                            }, 500);
                        })
                        .catch(error => {
                            message.error(`Impossible de changer les menus de services ${room}`)
                        })
                } else {
                    message.error(`Désolé vous n'avez pas les droits pour passer en mode ${room} !`)
                    message.error(`Contacter l'admin système pour ça`)
                }
            } else window.location.replace(String("#").concat(routes['signin']))
        }
    })
}