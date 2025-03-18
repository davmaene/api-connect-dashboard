import '../src/App.less';
import { Switch, Route, Redirect } from "react-router-dom";
import Home, { HomeScreen } from "./pages/Home";
import Main from "./components/layout/Main";
import "./assets/bootstrap/bootstrap.css"
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ConfigProvider } from 'antd';
import { Colors } from "./assets/colors/colors";
import { SignUpScreen } from './pages/SignUp';
import { SignInScreen } from './pages/SignIn';
import { routes } from './helpers/helper.routes';
import { VerifyScreen } from './pages/Verify';
import { Profile, ProfileScreen } from './pages/Profile';
import { MapAreaScreen } from './pages/Mapalert';
import { ActivitiesScreen } from './pages/Activities';
import { ConfigurationsScreen } from './pages/Configurations';
import { UtilisateursScreen } from './pages/Utilisateurs';
import { StatistiquesScreen } from './pages/Statistiques';
import { NotificationsScreen } from './pages/Notifications';
import { LaboratoriesScreen } from './pages/Laboratories';
import { ProduitsScreen } from './pages/Produits';
import { ProjectsScreen } from './pages/Projects';
import { MarketScreen } from './pages/Marches';
import { CooperativesScreen } from './pages/Cooperatives';
import { ChampsScreen } from './pages/Champs';
import { PharmaciesScreen } from './pages/Pharmacies';
import { VillagesPage } from './pages/Villages';

function App() {
  return (
    <ConfigProvider
      theme={
        {
          token: {
            colorPrimary: Colors.primaryColor,
            colorSuccess: Colors.primaryColor
          }
        }
      }
    >
      <div className="App">
        <Switch>
          <Route path={routes['signup']} exact component={SignUpScreen} />
          <Route path={routes['signin']} exact component={SignInScreen} />
          <Route path={routes['verify']} exact component={VerifyScreen} />
          <Main>
            <Route exact path={routes['fallback']} component={HomeScreen} />
            <Route exact path={routes['dashboard']} component={HomeScreen} />
            <Route exact path={routes['profile']} component={ProfileScreen} />
            <Route exact path={routes['activites']} component={ActivitiesScreen} />
            <Route exact path={routes['configurations']} component={ConfigurationsScreen} />
            <Route exact path={routes['users']} component={UtilisateursScreen} />
            <Route exact path={routes['statistics']} component={StatistiquesScreen} />
            <Route exact path={routes['notifications']} component={NotificationsScreen} />
            <Route exact path={routes['labos']} component={LaboratoriesScreen} />
            <Route exact path={routes['products']} component={ProduitsScreen} />
            <Route exact path={routes['projects']} component={ProjectsScreen} />
            <Route exact path={routes['marches']} component={MarketScreen} />
            <Route exact path={routes['cooperatives']} component={CooperativesScreen} />
            <Route exact path={routes['champs']} component={ChampsScreen} />
            <Route exact path={routes['pharmacies']} component={PharmaciesScreen} />
            <Route exact path={routes['villages']} component={VillagesPage} />
            {/* <Redirect from="*" to="dashboard" /> */}
          </Main>
        </Switch>
      </div>
    </ConfigProvider>
  );
}

export default App;
