export class UserProfile {

    getUserStatus = () => {
        return this._isLogged;
    };

    getAdresse = () => {
        return this._adresse;
    };

    getExtras = () => {
        return this._extras;
    };

    getRoles = () => {
        return this._roles;
    };

    getAvatar = () => {
        return this._avatar;
    };

    getID = () => {
        return this._id;
    };

    getNom = () => {
        return this._nom;
    };

    getPostnom = () => {
        return this._postnom;
    };

    getPrenom = () => {
        return this._prenom;
    };

    getEmail = () => {
        return this._email;
    };

    getPhone = () => {
        return this._phone;
    };

    getLevel = () => {
        return this._level;
    };

    getCreatedon = () => {
        return this._createdon;
    };

    getToken = () => {
        return this._token;
    };

    getGenre = () => {
        return this._genre;
    };

    setNom = ({ nom }) => {
        this._nom = nom;
    };

    setPostnom = ({ postnom }) => {
        this._postnom = postnom;
    };

    setPrenom = ({ prenom }) => {
        this._prenom = prenom;
    };

    setEmail = ({ email }) => {
        this._email = email;
    };

    setPhone = ({ phone }) => {
        this._phone = phone;
    };

    setAdresse = ({ adresse }) => {
        this._adresse = adresse;
    };

    setGenre = ({ genre }) => {
        this._genre = genre;
    };

    setExtras = ({ extras }) => {
        this._extras = extras;
    };

    setLevel = ({ level }) => {
        this._level = level;
    };

    setCreatedon = ({ createdon }) => {
        this._createdon = createdon;
    };

    setID = ({ ID }) => {
        this._id = ID;
    };

    setToken = ({ token }) => {
        this._token = token;
    };

    setAvatar = ({ avatar }) => {
        this._avatar = avatar;
    };

    setRoles = ({ roles }) => {
        this._roles = roles;
    }

    setUserStatus = ({ isLogged }) => {
        this._isLogged = isLogged;
    };

    constructor() { }

    __constructor = ({ nom, postnom, prenom, email, level, id, createdon, token, roles, avatar, phone, adresse, genre, extras }) => {

        this.setNom({ nom });
        this.setPostnom({ postnom });
        this.setPrenom({ prenom });
        this.setEmail({ email });
        this.setLevel({ level });
        this.setID({ ID: id });
        this.setCreatedon({ createdon });
        this.setUserStatus({ isLogged: true });
        this.setToken({ token });
        this.setRoles({ roles });
        this.setAvatar({ avatar });
        this.setPhone({ phone });
        this.setAdresse({ adresse });
        this.setGenre({ genre });
        this.setExtras({ extras });

    }
}

export const __globalID = 987654321
