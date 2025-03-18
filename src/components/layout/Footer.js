import { Layout, Row, Col, message } from "antd";
import { appcompanyname, appname } from "../../appconstants/app.constants";
import { Colors } from "../../assets/colors/colors";
import { onChangeRoom } from "../../helpers/helper.menus";

function Footer() {

  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: Colors.secondaryColor }} className="p-2 pl-4">
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © {new Date().getFullYear()}, App Dashboard
            by
            <a href="https://privancy.mukulima.com" className="font-weight-bold" target="_blank">
              {appname}
            </a>
            | {appcompanyname}.
          </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
          <div className="footer-menu">
            <ul>
              <li className="nav-item">
                <a
                  onClick={(e) => onChangeRoom({ e: 8495, event: e })}
                  href="#"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Mukulima Invest
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={(e) => onChangeRoom({ e: 8496, event: e })}
                  href="#"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Mukulima Soko
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={(e) => onChangeRoom({ e: 8497, event: e })}
                  href="#"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Mukulima Lab
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={(e) => onChangeRoom({ e: 8498, event: e })}
                  href="#"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Mukulima Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://privancy.mukulima.com"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  Licenses et policies
                </a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
