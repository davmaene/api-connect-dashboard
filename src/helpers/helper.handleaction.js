import { toast } from "react-hot-toast";
import { accessLevelsAsAttributes } from "../helpers/helper.all";
import { __routes } from "../helpers/helper.routes";
import { detroySession } from "../helpers/helper.session";

export const _________fw = ({ user, action }) => {
    const level = user && user.getLevel();
    const availableTo = accessLevelsAsAttributes && accessLevelsAsAttributes[level];
    if (availableTo) {
        const abilities = availableTo && availableTo['actions'];
        if (abilities) {
            if (abilities.includes(action)) {
                return true
            } else {
                toast.error(" Vous n'êtes pas autoriser à effectuer cette action ! contacter l'administrateur du système si le problème persiste", { position: "top-center" });
                return false
            }
        } else {
            toast.error(" Vous n'êtes pas autoriser à effectuer cette action ! contacter l'administrateur du système si le problème persiste", { position: "top-center" });
            detroySession({
                callBack: (err, done) => {
                    if (done) {
                        window.location.replace(__routes['signin']);
                    }
                }
            })
            return false
        }
    } else {
        toast.error(" Vous n'êtes pas autoriser à effectuer cette action ! contacter l'administrateur du système si le problème persiste", { position: "top-center" });
        detroySession({
            callBack: (err, done) => {
                if (done) {
                    window.location.replace(__routes['signin']);
                }
            }
        })
        return false
    }
}