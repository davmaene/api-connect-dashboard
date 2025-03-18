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
import { useHistory } from "react-router-dom";
import { routes } from "../helpers/helper.routes";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export const SignInScreen = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const onFinish = (values) => {
    const key = "__handlesignin";
    setIsLoading(true);
    const toastID = toast.loading(" Traitement en cours ... ");
    onRunExternalRQST({
      url: "/users/user/signin",
      method: "POST",
      data: { ...values }
    }, (err, done) => {

      setIsLoading(false)
      if (done) {
        const { status, message, data } = done;
        switch (status) {
          case 200:
            const { user, token } = data;
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
            toast.error(" Désolé les informations que vous avez entrer sont incorrectes ! email ou mot de passe incorrecte !", {
              id: toastID
            });
            toast.error("Désolé les informations que vous avez entrer sont incorrectes ! email ou mot de passe incorrecte !", {
              position: "bottom-center",
              duration: 10
            });
            // message.open({
            //   key,
            //   content: "Désolé les informations que vous avez entrer sont incorrectes ! email ou mot de passe incorrecte !",
            //   type: "error",
            //   duration: 15
            // })
            break;
          case 400:
            toast.error("Désolé votre compte n'est pas encore vérifié, vous devez vérifier votre compte avant de vous connecter !", {
              position: "bottom-center",
              duration: 10
            });
            toast.error("Désolé votre compte n'est pas encore vérifié, vous devez vérifier votre compte avant de vous connecter !", {
              id: toastID
            });

            history.push({
              pathname: routes['verify'],
              state: {
                current: { ...values }
              }
            })
            break;
          default:
            toast.error(" Une erreur vient de se produire ! lors de la connexion", {
              id: toastID
            });
            toast.error("Une erreur vient de se produire ! lors de la connexion", {
              position: "bottom-center",
              duration: 10
            });
            // message.open({
            //   key,
            //   content: "Une erreur vient de se produire ! lors de la connexion",
            //   type: "error",
            //   duration: 15
            // })
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

  const onChange = () => {

  }

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Connexion</Title>
              <p className="text-lg">
                Entrer vos informations pour pouvour continer avec {appname}, et profiter de toutes les fonctionnalités
              </p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            bordered="false"
          >
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >

              <Form.Item
                className="username"
                label="Numéro de téléphone ou Adresse eamil"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Entrer votre numéro de téléphone ou une adresse eamil",
                  },
                ]}
              >
                <Input placeholder="Email ou Téléphone" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Mot de passe"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Entrer votre mot de passe",
                  },
                ]}
              >
                <Input type="password" size="small" placeholder="*********" />
              </Form.Item>

              <Form.Item
                name="remember"
                className="aligin-center"
                valuePropName="checked"
              >
                <Switch defaultChecked onChange={onChange} />
                {"  "}Se souvenir de moi
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isLoading}
                  style={{ flexDirection: "row", width: "100%" }}
                >
                  {isLoading ? <LoaderComponent size={22} primaryColor={Colors.primaryColor} secondaryColor={Colors.secondaryColor} /> : <b style={{ fontSize: Dims.fontSizeBtn }}>Connexion</b>}
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Vous n'avez pas encore un compte ?{" "}
                {/* mailto:contact@mukulima.com */}
                <Link to={routes['signup']} className="text-dark font-bold">
                  Enregistrement
                </Link>
              </p>
            </Form>
          </Card>
        </Content>
      </div>
      <FooterComponent />
    </>
  );
}
