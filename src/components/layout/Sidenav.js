import * as React from 'react';
import { Menu, Button, Modal, Divider } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { routes } from "../../helpers/helper.routes";
import { PoweroffOutlined } from "@ant-design/icons";
import { Colors } from "../../assets/colors/colors";
import { detroySession, retrieveOnLocalStorageAsString, retrieveSession } from '../../helpers/helper.session';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { appKey, appname } from '../../appconstants/app.constants';
import { Dims } from '../../appconstants/app.dimensions';
import { canThisBeShowForThisUser, features } from '../../helpers/helper.menus';
import { initialRoles, randomLongNumber } from '../../helpers/helper.all';
import { IoIosCog, IoIosNotifications } from "react-icons/io";
import { MdList, MdLocalActivity, MdOutlineLocalActivity } from "react-icons/md";
import { FaChartBar, FaCogs, FaList } from "react-icons/fa";
import { BuildMenusApp } from './Menus';

function Sidenav({ color }) {

  const { pathname } = useLocation();
  const history = useHistory();
  const page = pathname.substring(pathname.lastIndexOf("/") + 1) // || pathname.replace("/", "");
  const SubMenu = Menu.SubMenu;
  const [visible, setVisible] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [isloading, setisloading] = React.useState(false);
  const [___APPID, set___APPID] = React.useState(8498)

  const ____handleLogout = async () => {
    const __toastID = toast.loading(" Déconnexion en cours ... ")
    await detroySession({
      callBack: (rejected, resolved) => {
        if (resolved) {
          toast.success(" La déconnexion a réussie ...", {
            id: __toastID
          });
          history.replace(routes['signin'])
        } else {
          // history.replace("/auth/signin")
          window.location.replace(routes['signin'])
        }
      }
    })
  };

  const _____loadCurrentUser = async () => {
    retrieveSession({
      callBack: (err, _user) => {
        if (_user) {
          retrieveOnLocalStorageAsString({
            options: {
              key: appKey
            }
          })
            .then(app => {
              set___APPID(app['_appID'])
            })
            .catch(err => {
              console.log("App error ==> ", err);
            })
          setUser(_user)
        } else history.replace(routes['signin'])
      }
    })
  };

  React.useEffect(() => {
    _____loadCurrentUser();
  }, []);

  return (
    <>
      <div className="brand">
        <strong style={{ fontSize: Dims.titleFontSize, color: Colors.primaryColor }}>
          {appname} |
          Dashboard
        </strong>
      </div>
      <Divider />
      <BuildMenusApp appkey={___APPID} user={user} />
      <Menu>
        <Menu.Item
          key="1"
          style={{ display: canThisBeShowForThisUser({ roles: user, block: initialRoles['1'] }) ? 'block' : 'none' }}
        >
          <NavLink to={routes['configurations']}>
            <span
              className="icon"
              style={{
                background: page === "configurations" ? color : "",
              }}
            >
              <IoIosCog color={color} />
            </span>
            <span className="label">Configutations</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key={randomLongNumber({ length: 6 })}>
          <NavLink onClick={e => {
            e.preventDefault();
            setVisible(true);
          }}
            to={routes['maskdeconnexion']} >
            <span
              className="icon"
              style={{
                background: page === "deconnexion" ? color : ""
              }}
            >
              <PoweroffOutlined />
            </span>
            <span className="label" style={{ color: Colors.dangerColor }}>Déconnexion</span>
          </NavLink>
        </Menu.Item>
      </Menu>

      <Modal
        visible={visible}
        title="Déconnexion"
        destroyOnClose={true}
        centered
        onCancel={() => {
          setVisible(false)
        }}
        onOk={() => {
          ____handleLogout()
        }}
        confirmLoading={isloading}
        okText="Oui, me déconnecter"
        cancelText="Annuler"
      >
        <span>Vous ête sur le point de vous déconnecter; Voulez-vous vraiement continuer ?</span>
      </Modal>

    </>
  );
}

export default Sidenav;
