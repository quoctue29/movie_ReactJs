import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { userRouter } from "./Router/userRouter";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import SpinnerPage from "./Component/SpinnerPage/SpinnerPage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWvzp5-lt7IEPhJSur1m2L_4Eh4wjUdLk",
  authDomain: "movieproject-8af40.firebaseapp.com",
  projectId: "movieproject-8af40",
  storageBucket: "movieproject-8af40.appspot.com",
  messagingSenderId: "1095404667536",
  appId: "1:1095404667536:web:fd1798feb230b804dfce15",
  measurementId: "G-9X3BM3DLD6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="">
      <div className="absolute z-10">
        <SpinnerPage />
      </div>
      <BrowserRouter>
        <Switch>
          {userRouter.map((route, index) => {
            if (route.isUseLayout) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={() => {
                    return route.component;
                  }}
                />
              );
            } else {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              );
            }
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
