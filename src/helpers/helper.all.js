import moment from 'moment-with-locales-es6';
import { defaultAvatar } from '../appconstants/app.constants';

moment.locale('fr')

export const ______crud = {
    CREATE: 'c',
    READ: 'r',
    UPDATE: 'u',
    DELETE: 'd'
}

export const genders = [
    {
        id: 1,
        value: "M",
        label: "Masculin ( M )"
    },
    {
        id: 2,
        value: "F",
        label: "Feminin ( F )"
    }
];

export const currencies = [
    {
        id: 1,
        value: "CDF",
        label: "Francs Congolais | CDF"
    },
    {
        id: 2,
        value: "USD",
        label: "Dollars Americains | USD"
    }
];

export const accessLevelsAsAttributes = {
    1: {
        id: 1,
        value: "admin",
        actions: [______crud['CREATE'], ______crud['READ']]
    },
    2: {
        id: 2,
        value: "normal",
        actions: [______crud['CREATE'], ______crud['READ']]
    },
    3: {
        id: 3,
        value: "super admin",
        actions: [______crud['CREATE'], ______crud['READ'], ______crud['DELETE'], ______crud['UPDATE']]
    },
    4: {
        id: 4,
        value: "visiteur",
        actions: [______crud['READ']]
    },
    5: {
        id: 5,
        value: "partenaire",
        actions: [______crud['READ']]
    }
};

export const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

export const limitCharacters = ({ string, needlength }) => {
    string = string.toString();
    return string.length < needlength ? string : `${string.substring(0, needlength - 3)} ...`;
};

export const generatePathNmaeAsString = ({ pathname }) => {

    let name = pathname;
    const __prefix = name.toString().substring(0, name.indexOf("/"));
    let __suffix = name.toString().substring(name.lastIndexOf("/"));

    name = name.replace(/\//g, `  /  `);
    return name//__prefix.concat(__suffix) || ""
};

export const initialRoles = {
    1: {
        name: "Sensitives blocks",
        allowedto: [6]
    },
    2: {
        name: "Mukulima Investement",
        allowedto: [4, 6]
    },
    3: {
        name: "Mukulima Soko",
        allowedto: [5, 6]
    },
    4: {
        name: "Mukulima Lab",
        allowedto: [2, 6]
    },
    5: {
        name: "Visiteurs",
        allowedto: [5, 2, 1, 3, 4, 6]
    }
};

export const differenceBetweenArrays = ({ array1, array2 }) => {
    const set1 = new Set(array1);
    const set2 = new Set(array2);

    const differenceArray1MinusArray2 = [...new Set([...set1].filter(x => !set2.has(x)))];
    const differenceArray2MinusArray1 = [...new Set([...set2].filter(x => !set1.has(x)))];

    return {
        array1MinusArray2: differenceArray1MinusArray2,
        array2MinusArray1: differenceArray2MinusArray1,
    };
}

export const toastOptions = {

};

export const emailValidator = (_, value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || regex.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject('Entre une adresse email valide !');
};

export const passwordValidator = (_, value) => {
    console.log(value);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value || regex.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject('Le mot de passe doit avoir 8 caractères, constitués de lettres (majuscules et minuscules), de chiffres et des caractères spéciaux');
};

export const returnCurrentUserName = ({ userProfile }) => {
    const user = userProfile;
    try {
        return `${user && user !== null && user !== undefined && user.hasOwnProperty('getNom') ? user.getNom() : "---"} ${user && user.hasOwnProperty('getNom') ? user.getPostnom() : "---"}`
    } catch (error) {
        return "---".concat("---")
    }
};

export const returnCurrentAvatar = ({ userProfile }) => {
    const user = userProfile;
    try {
        return `${user && user !== null && user !== undefined && user.hasOwnProperty('getAvatar') ? user.getAvatar() : defaultAvatar}`
    } catch (error) {
        return "---".concat("---")
    }
};

export const returnCurrentRoles = ({ userProfile }) => {
    const user = userProfile;
    const _roles = user && user !== null && user !== undefined && user.hasOwnProperty('getRoles') ? user.getRoles() : [];
    const output = []
    const roles = [
        { "id": "1", "role": "Agriculteur", "createdon": "12:54:31, 25\/10\/2023", "status": "1" },
        { "id": "2", "role": "Chercheur", "createdon": "12:54:31, 25\/10\/2023", "status": "1" },
        { "id": "3", "role": "Visiteur", "createdon": "12:54:31, 25\/10\/2023", "status": "1" },
        { "id": "4", "role": "Investisseur", "createdon": "09:19:17, 31\/10\/2023", "status": "1" },
        { "id": "5", "role": "Marchand", "createdon": "13:11:10, 28\/01\/2024", "status": "1" },
        { "id": "6", "role": "Super Admin", "createdon": "13:11:10, 28\/01\/2024", "status": "1" }
    ]

    Array.from(_roles).map(_r => {
        roles.map(r => {
            const { id, role } = r;
            if (parseInt(id) === parseInt(_r)) output.push(capitalizeWords({ text: role }))
        })
    })

    return output.join(" | ")
};

export const intersection = ({ array1, array2 }) => {
    const set1 = new Set(array1);
    const set2 = new Set(array2);
    return [...set1].filter(element => set2.has(element));
};

export const randomLongNumber = ({ length }) => {
    const len = length && !isNaN(parseInt(length)) ? length : 6;
    const ret = [];

    for (let k = 0; k < len; k++) ret.push(
        Math.floor(Math.random() * 10)
    );

    let m = ret.join().toString();
    m = m.replace(/,/g, "");
    return m.trim();
};

export const compteCaracteresSMS = ({ message }) => {
    const inputString = message;
    var limiteCaracteres = 160;

    // var caracteresSpeciaux = message.match(/[\u0080-\uFFFF]/g);
    // var caracteresSpeciauxCount = caracteresSpeciaux ? caracteresSpeciaux.length : 0;
    // var longueurMessage = message.length + caracteresSpeciauxCount;

    // console.log("Caracters speciaux ==> ", caracteresSpeciaux);

    let size = 0;
    for (let i = 0; i < inputString.length; i++) {
        const charCode = inputString.charCodeAt(i);

        if (charCode <= 0x7F) {
            size += 1; // Les caractères ASCII simples sont encodés sur 1 octet.
        } else if (charCode <= 0x7FF) {
            size += 2; // Les caractères spéciaux sont encodés sur 2 octets.
        } else if (charCode <= 0xFFFF) {
            size += 3; // Les caractères plus rares sont encodés sur 3 octets.
        } else if (charCode <= 0x10FFFF) {
            size += 4; // Les caractères très rares sont encodés sur 4 octets.
        }
        // Les caractères non valides sont ignorés.
    }
    // return size;

    return {
        length: size,//longueurMessage,
        nbpages: Math.ceil(parseInt(size) / limiteCaracteres)//Math.ceil(parseInt(longueurMessage) / limiteCaracteres)
    }
};

export const formmatDate = ({ date }) => {
    return moment(date).format('LTS, L');
};

export const rooms = {
    8495: "Mukulima Invest",
    8496: "Mukulima Soko",
    8497: "Mukulima Lab",
    8498: "Mukulima Dashboard",
};

export const formmatDateWith = ({ date, format }) => {
    return moment(date).format(format);
};

export const formmatDateWithToUNIX = ({ date, format }) => {
    return moment(date).unix();
};

export const unixToDate = ({ unix }) => moment.unix(unix).format('L');

export const groupedByTelecom = ({ list, prefixtelecoms }) => {
    const groupedbytelecom = {}

    const sommes = [];
    const taken = {};
    const takens = [];

    prefixtelecoms.map(telecoms => {
        Object.keys(telecoms).map((telecom) => {
            const prefixes = telecoms[telecom];
            const membres = [];
            telecom = telecom;
            list.map(l => {
                const { phone, prefix: asprefix } = l;
                const prefix = asprefix || String(phone).substring(0, 3);
                if (prefixes.includes(prefix)) {
                    membres.push(l)
                    taken[phone] = { ...l }
                }
            })
            sommes.push(membres.length)
            groupedbytelecom[telecom] = {
                nbmembre: membres.length,
                membres: membres,
                prefixes
            }
        })
    })

    const {
        array1MinusArray2,
        array2MinusArray1
    } = differenceBetweenArrays({
        array1: Array.from(list).map(k => k['phone']),
        array2: Object.keys(taken).map(k => k)
    })

    const _ = []
    array1MinusArray2.map(p => {
        list.map(f => {
            if (f['phone'] === p) _.push(f)
        })
    })

    return {
        // length: list.length,
        ...{
            ...groupedbytelecom,
            autres: {
                "nbmembre": array1MinusArray2.length,
                // "nbmembre_": array1MinusArray2.length,
                "membres": [..._],
                "prefixes": []
            }
        }
    }
};

export const capitalizeWords = ({ text }) => {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const returnStatusAccount = ({ status }) => {
    switch (status) {
        case 1:
            return "Activé"
        case 0:
            return "Désactivé"
        default:
            return "Non spécifié"
            break;
    }
};

export const formatLinesFromFormHTML = ({ line }) => {
    return line = line.substring(0, line.indexOf("|"));
};

export const now = () => moment().format("L");

export const onSelectMultipleChange = ({ inputs, rows, callBack }) => {
    const outputs = [];
    for (let i of inputs) {
        rows.map(row => {
            if (row['key'] === i) outputs.push(row)
        })
    }
    return callBack(outputs)
};

export const completeCodeCountryToPhoneNumber = ({ phone }) => {
    phone = phone ? phone.toString() : '0';
    const cdcode = '243'
    switch (phone.charAt(0)) {
        case '0':
            return String(`${cdcode}${phone.substring(1)}`);
            break;
        case '+':
            return String(`${cdcode}${phone.substring(4)}`);
            break;
        case '2':
            return String(`${cdcode}${phone.substring(3)}`);
            break;
        default:
            return String(`${cdcode}${phone.substring(1)}`);
            break;
    }
};

export const groupArrayElementByColumn = ({ arr, columnName }) => {

    const groups = new Map();

    arr.forEach((item) => {
        const columnValue = item[columnName];
        if (groups.has(columnValue)) {
            groups.get(columnValue).push(item);
        } else {
            groups.set(columnValue, [item]);
        }
    });
    return Object.fromEntries(groups);
};

export const onGetUserLocation = async ({ callBack }) => {
    const successCallback = (coords) => {
        return callBack(undefined, coords)
    }

    const errorCallback = async (err) => {
        return callBack(err, undefined)
    }

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        return callBack({ code: 403, message: "This navigator doesn't support the geolocation API", data: {} }, undefined)
    }

};

export const returndefaultVlalue = ({ table, column, columnName, defaultValue }) => {

    let value = undefined
    table && table.length > 0 && table.forEach(t => {
        if (t[column].toString() === defaultValue.toString()) value = `${t[column]}|${t[columnName]}`; // ${t[column]}|
    })
    // console.log(column, columnName, defaultValue);
    return value
}
