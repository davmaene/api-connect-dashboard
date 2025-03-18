import React, { Component } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Switch,
  message
} from "antd";
import { Link } from "react-router-dom";
import { LoaderComponent } from "../components/loader/loader";
import { Colors } from "../assets/colors/colors";
import { Dims } from "../appconstants/app.dimensions";
import { appcompanyname, appname } from "../appconstants/app.constants";
import { FooterComponent } from "../components/footer/footer";
import { onFinishFailed } from "../helpers/helper.all";
import { onRunExternalRQST } from "../helpers/helper.communication";
import toast from "react-hot-toast";
import { retrieveSession, saveSession } from "../helpers/helper.session";
import { useHistory, useLocation } from "react-router-dom";
import { routes } from "../helpers/helper.routes";
import VerificationInput from "react-verification-input"

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export const VerifyScreen = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const location = useLocation();
  const [value, setvalue] = React.useState("")
  let current = {};

  if (location && location.state) {
    current = (location['state']['current']);
  } else {
    history.goBack()
  }

  const onFinish = (values) => {
    const key = "__handlesignin";
    setIsLoading(true);
    const toastID = toast.loading(" Traitement en cours ... ");
    onRunExternalRQST({
      url: "/users/user/verify",
      method: "POST",
      data: { phone: current && current['phone'], code: values }
    }, (err, done) => {

      setIsLoading(false)
      if (done) {
        const { status, message, data } = done;
        switch (status) {
          case 200:
            const { user, token } = data
            saveSession({
              currentUser: { ...user, token },
              rememberMe: true,
              callBack: (e, d) => {
                if (d) {
                  toast.success(" Connexion réussie ...", {
                    id: toastID
                  });

                  retrieveSession({
                    callBack: (eR, dR) => {
                      if (dR) {
                        history.replace(routes['home']);
                      } else {

                        toast.error(" Une erreur de connexion vient de se produire, réessayer un peu plus tard !", {
                          id: toastID
                        });

                        toast.error("Une erreur de connexion vient de se produire, réessayer un peu plus tard !", {
                          position: "bottom-center",
                          duration: 10
                        });

                      }
                    }
                  })

                } else {

                  toast.error(" Une erreur de connexion vient de se produire ", {
                    id: toastID
                  });

                  toast.error("Une erreur de connexion vient de se produire ", {
                    position: "bottom-center",
                    duration: 10
                  });
                }
              }
            })
            break;
          case 203:
            toast.error(" Désolé le code entré est incorrect !", {
              id: toastID
            });
            toast.error(" Désolé le code entré est incorrect !", {
              position: "bottom-center",
              duration: 10
            });
            setvalue("")
            break;
          case 400:
            toast.error("Désolé votre compte est déjà vérifié", {
              position: "bottom-center",
              duration: 10
            });
            toast.error("Désolé votre compte est déjà vérifié, continuer avec la connexion", {
              id: toastID
            });
            history.replace(routes['signin'])
            break;
          default:
            toast.error(" Une erreur vient de se produire ! lors de la connexion", {
              id: toastID
            });
            toast.error("Une erreur vient de se produire ! lors de la connexion", {
              position: "bottom-center",
              duration: 10
            });
            break;
        }
      } else {
        toast.error(" Une erreur vient de se produire ! lors de la connexion", {
          id: toastID
        });
        toast.error("Une erreur vient de se produire ! lors de la connexion", {
          position: "bottom-center",
          duration: 10
        });
      }
    })
  };

  const onResendCode = async () => {
    setIsLoading(true);
    const toastID = toast.loading(" Traitement en cours ... ");
    onRunExternalRQST({
      url: `/users/user/resendcode`,
      method: "POST",
      data: { phone: current && current['phone'] }
    }, (err, done) => {
      setIsLoading(false)
      if (done) {
        const { status, message, data } = done;
        switch (status) {
          case 200:
            toast.success("Code renvoyé avec succès !", {
              id: toastID
            });
            break;
          case 400:
            toast.error("Votre compte est déjà vérifier", {
              id: toastID
            });
            break;
          default:
            toast.error("Une erreur vient de se produire lors de l'envoi du code, réessayer un peu plus tard !", {
              id: toastID
            });
            break;
        }
      } else {
        toast.error("Une erreur vient de se produire lors de l'envoi du code, réessayer un peu plus tard !", {
          id: toastID
        });
      }
    })
  };

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Vérification</Title>
              <p className="text-lg">
                Nous avons envoyer un mail et un message contenant un code de vérication; Utilisez ce code pour activer votre compte
              </p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            bordered="false"
          >
            <div className="my-3">
              <VerificationInput
                autoFocus
                length={6}
                value={value}
                onChange={(value) => setvalue(value)}
                onComplete={onFinish}
                classNames={{
                  container: "container-v",
                  character: "character-v",
                  characterInactive: "character--inactive",
                  characterSelected: "character--selected",
                }}
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isLoading}
              style={{ flexDirection: "row", width: "100%" }}
              onClick={() => onResendCode()}
            >
              {isLoading ? <LoaderComponent size={22} primaryColor={Colors.primaryColor} secondaryColor={Colors.secondaryColor} /> : <b style={{ fontSize: Dims.fontSizeBtn }}>code non reçu ? renvoyer le code</b>}
            </Button>

            <p className="font-semibold text-muted">
              Vous avez un problème de connexion ?{" "}
              {/* mailto:contact@mukulima.com */}
              <Link to="#" className="text-dark font-bold">
                Service Client
              </Link>
            </p>
          </Card>
        </Content>
      </div>
      <FooterComponent />
    </>
  );
}
