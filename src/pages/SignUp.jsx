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
  Select,
  message,
  Radio
} from "antd";
import { Link, useHistory } from "react-router-dom";
import { LoaderComponent } from "../components/loader/loader";
import { Colors } from "../assets/colors/colors";
import { Dims } from "../appconstants/app.dimensions";
import { appcompanyname, appname } from "../appconstants/app.constants";
import { FooterComponent } from "../components/footer/footer";
import { routes } from "../helpers/helper.routes";
import { emailValidator, onFinishFailed, passwordValidator } from "../helpers/helper.all";
import { onLoadAllRoles } from "../helpers/helper.call";
import { onRunExternalRQST } from "../helpers/helper.communication";
import toast from "react-hot-toast";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export const SignUpScreen = () => {

  const [isLoading, setIsLoading] = React.useState(false);
  const [roles, setroles] = React.useState([]);
  const [privacy, setprivacy] = React.useState(false);
  const [showupemailfield, setshowupemailfield] = React.useState(false)
  const [password, setpassword] = React.useState("")
  const history = useHistory();

  const onFinish = (values) => {
    const { password, rpassword } = values;
    if (password.toString() === rpassword.toString()) {
      setIsLoading(true);
      const toastID = toast.loading("Enregistrement en cours ...")
      onRunExternalRQST({
        url: `/users/user/signup`,
        method: "POST",
        data: { ...values }
      }, (err, done) => {
        setIsLoading(false)
        if (done) {
          const { data, message, status } = done;
          switch (status) {
            case 200:
              toast.success("Votre compte vient d'être crée avec succès !", { id: toastID, duration: 10000 })
              toast.success("Un code de vérification vous a été envoyer")
              history.push({
                pathname: routes['verify'],
                state: {
                  current: { ...data['user'], code: data['code'] }
                }
              })
              break;
            case 503:
              const { name, error } = data
              toast.error("Une erreur vient de se produire lors de l'enregistrement", { id: toastID, duration: 10000 })
              toast.error(
                error.includes("phone")
                  ? "Le numéro de téléphone que vous avez entrer est déjà utiliser par un autre compte"
                  : "L'adresse mail que vous avez entrer est déjà utiliser par un autre compte"
              )
              break;
            default:
              toast.error("Une erreur vient de se produire lors de l'enregistrement, réessayer un peu plus tard !", { id: toastID, duration: 10000 })
              break;
          }
        } else {
          toast.error("Une erreur vient de se produire lors de l'enregistrement, réessayer un peu plus tard !", { id: toastID, duration: 10000 })
        }
      })
    } else {
      message.error("Les mot de passe que vous avez entrer ne sont pas identiques, ces deux mot de passes doivent être identiques !", 9)
    }
  };

  const __onLoadInfos = async () => {
    setIsLoading(true)
    onLoadAllRoles({
      options: {
        pushoutmessage: false
      },
      callback: (err, done) => {
        setIsLoading(false)
        if (done) {
          setroles(done)
        } else {
          setroles([])
        }
      }
    })
  }

  const onChange = (e) => {
    const _ = [2, 4]
    if (_.indexOf(parseInt(e)) !== -1) setshowupemailfield(true);
    else setshowupemailfield(false)
  }

  React.useEffect(() => {
    __onLoadInfos()
  }, [])

  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Enregistrement</Title>
              <p className="text-lg">
                Entrer vos informations pour créer un compte, et beneficier de tous les services de {appname}
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
                label="Nom"
                name="nom"
                rules={[
                  {
                    required: true,
                    message: "Entrer votre nom",
                  },
                ]}
              >
                <Input placeholder="Nom" />
              </Form.Item>

              <Form.Item
                className="username"
                label="Postnom"
                name="postnom"
                rules={[
                  {
                    required: true,
                    message: "Entrer votre postnom",
                  },
                ]}
              >
                <Input placeholder="Postnom" />
              </Form.Item>


              <Form.Item
                className="username"
                label="Sexe"
                name="genre"
                rules={[
                  {
                    required: true,
                    message: "Sélécrioner le sexe",
                  },
                ]}
              >

                <Radio.Group name="genre" defaultValue={1}>
                  <Radio value={"M"}>Masculin</Radio>
                  <Radio value={"F"}>Feminin</Radio>
                </Radio.Group>
              </Form.Item>


              <Form.Item
                className="username"
                label="Numéro de téléphone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Entrer votre numéro de téléphone",
                  },
                ]}
              >
                <Input placeholder="Numéro de téléphone" />
              </Form.Item>

              {showupemailfield && (
                <Form.Item
                  className="username"
                  label="Adresse email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Entrer votre adresse mail",
                    },
                    {
                      validator: emailValidator,
                    }
                  ]}
                >
                  <Input placeholder="Adresse email" />
                </Form.Item>
              )}

              <Form.Item
                className="username"
                label="Catégorie de votre profile"
                name="idrole"
                rules={[
                  {
                    required: true,
                    message: "Séléctionner une catégorie de votre profile",
                  },
                ]}
              >
                <Select size="large" placeholder="Catégorie de profile" onChange={onChange} >
                  {roles.map(r => {
                    return (
                      <Select.Option value={r && r['id']} >
                        {r && r['role']}
                      </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                className="username"
                label="Mot de passe"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Tapper le mot de passe ici !",
                  },
                  {
                    validator: passwordValidator,
                  }
                ]}
              >
                <Input.Password size={"small"} placeholder="Mot de passe" type="password" onChange={(e) => { setpassword(e.target.value) }} />
              </Form.Item>

              <Form.Item
                className="username"
                label="Répétition de mot de passe"
                name="rpassword"
                rules={[
                  {
                    required: true,
                    message: "Entre à nouveua le mot de passe ici !",
                  },
                  {
                    validator: (_, v) => {
                      if (v.toString() === password.toString()) return Promise.resolve();
                      else return Promise.reject("Les mots de passes doivent être identiques !");
                    },
                  }
                ]}
              >
                <Input placeholder="Mot de passe" type="password" />
              </Form.Item>

              <Form.Item
                name="remember"
                className="aligin-center"
                valuePropName="checked"
              >
                <Switch
                  defaultChecked={false}
                  onChange={(e) => setprivacy(e)}
                />
                {"  "}En continuant j'accepte les <a href="https://privacy.mukulima.com" color={Colors.primaryColor} target="_blank"><b>conditions</b></a> d'utilisation
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isLoading || !privacy}
                  style={{ flexDirection: "row", width: "100%" }}
                >
                  {isLoading ? <LoaderComponent size={22} primaryColor={Colors.primaryColor} secondaryColor={Colors.secondaryColor} /> : <b style={{ fontSize: Dims.fontSizeBtn }}>Connexion</b>}
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Vous avez déjà un compte ?{" "}
                <Link to={routes['signin']} className="text-dark font-bold">
                  Connexion
                </Link>
              </p>
            </Form>
          </Card>
        </Content>
      </div>
    </>
  );
}
