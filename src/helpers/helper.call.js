import toast from "react-hot-toast";
import { onRunExternalRQST } from "./helper.communication"

export const onLoadAllRoles = ({ options: { pushoutmessage }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/roles/list`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllUsers = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/users/list`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllLabos = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/laboratories/list`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllProducts = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/produits/listall`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllProject = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/projects/listall`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllProjectsByOwner = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/projects/list`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllUsersPerCategory = async ({ options: { pushoutmessage, limit, offset, idrole }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/users/list/byrole/${idrole}`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllUsersVsisits = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/stats/visits/list`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllPharmacies = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/pharmacies/listall`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllCooperatives = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/cooperatives/list`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllChamps = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/farms/listall`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllMarkets = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/marches/list`
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onLoadAllUsersAlerts = async ({ options: { pushoutmessage, limit, offset }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "GET",
        url: `/alertes/list`,
        params: { limit, offset }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data && data['list'])
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de chargement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onDeleteItem = async ({ options: { url, item, pushoutmessage }, callback }) => {
    let __toastID = null;
    url = String(url).concat("/").concat(item)
    if (pushoutmessage) {
        __toastID = toast.loading("Traitement en cours ...", {})
    }

    onRunExternalRQST({
        method: "DELETE",
        url
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Traitement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de Traitement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de Traitement ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de Traitement ...", { id: __toastID });
            }
            return callback(err, undefined)
        }
    })
}

export const onAddItem = async ({ options: { url, pushoutmessage, data }, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Traitement en cours ...", {})
    }

    onRunExternalRQST({
        method: "POST",
        url: url || `/users/user/add`,
        data: { ...data }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                case 503:
                    if (pushoutmessage) {
                        toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !", { id: __toastID });
                    }
                    toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !")
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement  ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            console.log('====================================');
            console.log(err, done);
            console.log('====================================');
            return callback(true, undefined)
        }
    })
}

export const onEditItem = async ({ options: { url, pushoutmessage, data, item }, callback }) => {
    let __toastID = null;
    url = String(url).concat("/").concat(item)
    if (pushoutmessage) {
        __toastID = toast.loading("Traitement en cours ...", {})
    }

    onRunExternalRQST({
        method: "PUT",
        url: url || `/users/user/add`,
        data: { ...data }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                case 503:
                    if (pushoutmessage) {
                        toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !", { id: __toastID });
                    }
                    toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !")
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement  ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(true, undefined)
        }
    })
}

export const onLoadAllProvinces = async ({ options: { }, callBack }) => {
    const __toastID = toast.loading(' Chargement en cours ... ');

    onRunExternalRQST(
        {
            url: `/provinces/list`,
            method: 'GET',
        },
        (err, done) => {
            if (done) {
                //   setisloading(false)
                const _status = done && done['status'];
                switch (_status) {
                    case 200:
                        //   setpackage_(done && done['data'][0])
                        toast.success(' Chargement réussi avec succès ... ', {
                            id: __toastID,
                        });
                        callBack(
                            undefined,
                            (done && done['data']['rows']) || done['data']['list']
                        );
                        break;
                    default:
                        toast.error(
                            ' Erreur de connexion au server ressayer un peu plus tard ... ',
                            {
                                id: __toastID,
                            }
                        );
                        callBack(true, undefined);
                        break;
                }
            } else {
                //   setisloading(false)
                toast.error(
                    ' Erreur de connexion au server ressayer un peu plus tard ... ',
                    {
                        id: __toastID,
                    }
                );
                callBack(true, undefined);
            }
        }
    );
};

export const onLoadAllCategories = async ({ options: { }, callBack }) => {
    const __toastID = toast.loading(' Chargement en cours ... ');

    onRunExternalRQST(
        {
            url: `/categories/list`,
            method: 'GET',
        },
        (err, done) => {
            if (done) {
                //   setisloading(false)
                const _status = done && done['status'];
                switch (_status) {
                    case 200:
                        //   setpackage_(done && done['data'][0])
                        toast.success(' Chargement réussi avec succès ... ', {
                            id: __toastID,
                        });
                        callBack(
                            undefined,
                            (done && done['data']['rows']) || done['data']['list']
                        );
                        break;
                    default:
                        toast.error(
                            ' Erreur de connexion au server ressayer un peu plus tard ... ',
                            {
                                id: __toastID,
                            }
                        );
                        callBack(true, undefined);
                        break;
                }
            } else {
                //   setisloading(false)
                toast.error(
                    ' Erreur de connexion au server ressayer un peu plus tard ... ',
                    {
                        id: __toastID,
                    }
                );
                callBack(true, undefined);
            }
        }
    );
};

export const onLoadAllUnities = async ({ options: { }, callBack }) => {
    const __toastID = toast.loading(' Chargement en cours ... ');

    onRunExternalRQST(
        {
            url: `/mesures/list`,
            method: 'GET',
        },
        (err, done) => {
            if (done) {
                //   setisloading(false)
                const _status = done && done['status'];
                switch (_status) {
                    case 200:
                        //   setpackage_(done && done['data'][0])
                        toast.success(' Chargement réussi avec succès ... ', {
                            id: __toastID,
                        });
                        callBack(
                            undefined,
                            (done && done['data']['rows']) || done['data']['list']
                        );
                        break;
                    default:
                        toast.error(
                            ' Erreur de connexion au server ressayer un peu plus tard ... ',
                            {
                                id: __toastID,
                            }
                        );
                        callBack(true, undefined);
                        break;
                }
            } else {
                //   setisloading(false)
                toast.error(
                    ' Erreur de connexion au server ressayer un peu plus tard ... ',
                    {
                        id: __toastID,
                    }
                );
                callBack(true, undefined);
            }
        }
    );
};

export const onLoadAllTerritoriesByProvinces = async ({
    options: { },
    index,
    callBack,
}) => {
    const __toastID = toast.loading(' Chargement en cours ... ');

    onRunExternalRQST(
        {
            url: `/territoires/list/by/${index}`,
            method: 'GET',
        },
        (err, done) => {
            if (done) {
                //   setisloading(false)
                const _status = done && done['status'];
                switch (_status) {
                    case 200:
                        //   setpackage_(done && done['data'][0])
                        toast.success(' Chargement réussi avec succès ... ', {
                            id: __toastID,
                        });
                        callBack(
                            undefined,
                            (done && done['data']['rows']) || done['data']['list']
                        );
                        break;
                    default:
                        toast.error(
                            ' Erreur de connexion au server ressayer un peu plus tard ... ',
                            {
                                id: __toastID,
                            }
                        );
                        callBack(true, undefined);
                        break;
                }
            } else {
                //   setisloading(false)
                toast.error(
                    ' Erreur de connexion au server ressayer un peu plus tard ... ',
                    {
                        id: __toastID,
                    }
                );
                callBack(true, undefined);
            }
        }
    );
};

export const onLoadAllTerritories = async ({ options: { }, callBack }) => {
    const __toastID = toast.loading(' Chargement en cours ... ');

    onRunExternalRQST(
        {
            url: `/territoires/liste/`,
            method: 'GET',
        },
        (err, done) => {
            if (done) {
                //   setisloading(false)
                const _status = done && done['status'];
                switch (_status) {
                    case 200:
                        toast.success(' Chargement réussi avec succès ... ', {
                            id: __toastID,
                        });
                        callBack(
                            undefined,
                            (done && done['data']['rows']) || done['data']['liste']
                        );
                        break;
                    default:
                        toast.error(
                            ' Erreur de connexion au server ressayer un peu plus tard ... ',
                            {
                                id: __toastID,
                            }
                        );
                        callBack(true, undefined);
                        break;
                }
            } else {
                //   setisloading(false)
                toast.error(
                    ' Erreur de connexion au server ressayer un peu plus tard ... ',
                    {
                        id: __toastID,
                    }
                );
                callBack(true, undefined);
            }
        }
    );
};

export const onLoadAllVillagesByTerritoire = async ({
    options: { },
    index,
    callBack,
}) => {
    const __toastID = toast.loading(' Chargement en cours ... ');

    onRunExternalRQST(
        {
            url: `/villages/liste/byterritory/${index}`,
            method: 'GET',
        },
        (err, done) => {
            if (done) {
                //   setisloading(false)
                const _status = done && done['status'];
                switch (_status) {
                    case 200:
                        //   setpackage_(done && done['data'][0])
                        toast.success(' Chargement réussi avec succès ... ', {
                            id: __toastID,
                        });
                        callBack(
                            undefined,
                            (done && done['data']['rows']) || done['data']['liste']
                        );
                        break;
                    default:
                        toast.error(
                            ' Erreur de connexion au server ressayer un peu plus tard ... ',
                            {
                                id: __toastID,
                            }
                        );
                        callBack(true, undefined);
                        break;
                }
            } else {
                //   setisloading(false)
                toast.error(
                    ' Erreur de connexion au server ressayer un peu plus tard ... ',
                    {
                        id: __toastID,
                    }
                );
                callBack(true, undefined);
            }
        }
    );
};

export const onLoadAllVillagesByTerritoirePaginated = async ({
    options: { },
    index,
    callBack,
}) => {
    const __toastID = toast.loading(' Chargement en cours ... ');

    onRunExternalRQST(
        {
            url: `/villages/liste/byterritory/${index}`,
            method: 'GET',
        },
        (err, done) => {
            if (done) {
                //   setisloading(false)
                const _status = done && done['status'];
                switch (_status) {
                    case 200:
                        //   setpackage_(done && done['data'][0])
                        toast.success(' Chargement réussi avec succès ... ', {
                            id: __toastID,
                        });
                        callBack(undefined, done && done['data']);
                        break;
                    default:
                        toast.error(
                            ' Erreur de connexion au server ressayer un peu plus tard ... ',
                            {
                                id: __toastID,
                            }
                        );
                        callBack(true, undefined);
                        break;
                }
            } else {
                //   setisloading(false)
                toast.error(
                    ' Erreur de connexion au server ressayer un peu plus tard ... ',
                    {
                        id: __toastID,
                    }
                );
                callBack(true, undefined);
            }
        }
    );
};

export const onLoadAllVillages = async ({
    options: { },
    callBack,
}) => {
    const __toastID = toast.loading(' Chargement en cours ... ');

    onRunExternalRQST(
        {
            url: `/villages/liste`,
            method: 'GET',
        },
        (err, done) => {
            if (done) {
                //   setisloading(false)
                const _status = done && done['status'];
                switch (_status) {
                    case 200:
                        //   setpackage_(done && done['data'][0])
                        toast.success(' Chargement réussi avec succès ... ', {
                            id: __toastID,
                        });
                        callBack(undefined, done && done['data']);
                        break;
                    default:
                        toast.error(
                            ' Erreur de connexion au server ressayer un peu plus tard ... ',
                            {
                                id: __toastID,
                            }
                        );
                        callBack(true, undefined);
                        break;
                }
            } else {
                //   setisloading(false)
                toast.error(
                    ' Erreur de connexion au server ressayer un peu plus tard ... ',
                    {
                        id: __toastID,
                    }
                );
                callBack(true, undefined);
            }
        }
    );
};

export const onAddNewUser = async ({ options: { pushoutmessage }, data, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "POST",
        url: `/users/user/add`,
        data: { ...data }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                case 503:
                    if (pushoutmessage) {
                        toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !", { id: __toastID });
                    }
                    toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !")
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement  ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            console.log('====================================');
            console.log(err, done);
            console.log('====================================');
            return callback(true, undefined)
        }
    })
};

export const onAddNewLabo = async ({ options: { pushoutmessage }, data, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "POST",
        url: `/laboratories/laboratory/add`,
        data: { ...data }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Traitement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                case 503:
                    if (pushoutmessage) {
                        toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !", { id: __toastID });
                    }
                    toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !")
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement  ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            console.log('====================================');
            console.log(err, done);
            console.log('====================================');
            return callback(true, undefined)
        }
    })
};

export const onAddNewProject = async ({ options: { pushoutmessage }, data, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Chargement en cours ...", {})
    }

    onRunExternalRQST({
        method: "POST",
        url: `/projects/project/add`,
        data: { ...data }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Traitement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                case 503:
                    if (pushoutmessage) {
                        toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !", { id: __toastID });
                    }
                    toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !")
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement  ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(true, undefined)
        }
    })
};

export const onAddNewProducts = async ({ options: { pushoutmessage }, data, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Traitement en cours ...", {})
    }

    onRunExternalRQST({
        multer: true,
        method: "POST",
        url: `/produits/produit/add`,
        data: { ...data }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Traitement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                case 503:
                    if (pushoutmessage) {
                        toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !", { id: __toastID });
                    }
                    toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !")
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement  ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            console.log('====================================');
            console.log(err, done);
            console.log('====================================');
            return callback(true, undefined)
        }
    })
};

export const onEditUser = async ({ options: { pushoutmessage, item }, data, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Traitement en cours ...", {})
    }

    onRunExternalRQST({
        method: "PUT",
        url: `/users/user/${item}`,
        data: { ...data }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                case 503:
                    if (pushoutmessage) {
                        toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !", { id: __toastID });
                    }
                    toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !")
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement  ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(true, undefined)
        }
    })
};

export const onEditLaboratory = async ({ options: { pushoutmessage, item }, data, callback }) => {
    let __toastID = null;
    if (pushoutmessage) {
        __toastID = toast.loading("Traitement en cours ...", {})
    }

    onRunExternalRQST({
        method: "PUT",
        url: `/laboratories/laboratory/${item}`,
        data: { ...data }
    }, (err, done) => {
        if (done) {
            const { status, message, data } = done;
            switch (status) {
                case 200:
                    if (pushoutmessage) {
                        toast.success("Chargement réussi ...", { id: __toastID });
                    }
                    return callback(undefined, data)
                    break;
                case 500:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
                case 503:
                    if (pushoutmessage) {
                        toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !", { id: __toastID });
                    }
                    toast.error("Le numéro de téléphone ou l'adresse mail est déjà utilisé par un autre utilisateur !")
                    return callback(true, undefined)
                    break;
                default:
                    if (pushoutmessage) {
                        toast.error("Erreur de traitement  ...", { id: __toastID });
                    }
                    return callback(true, undefined)
                    break;
            }
        } else {
            if (pushoutmessage) {
                toast.error("Erreur de chargement ...", { id: __toastID });
            }
            return callback(true, undefined)
        }
    })
};