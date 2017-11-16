const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/react-dojo-demo/us-central1/app' : 'https://us-central1-react-dojo-demo.cloudfunctions.net/app'

const siteConfig = {
  siteName: 'ReactDojo',
  siteIcon: 'ion-flash',
  footerText: 'React Dojo Demo Project created by Zentomic',
};

const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';
const AlgoliaSearchConfig = {
  appId: '',
  apiKey: '',
};
const Auth0Config = {
  domain: '',
  clientID: '', //
  options: {
    auth: {
      autoParseHash: true,
      redirect: false,
    },
    languageDictionary: {
      title: 'React Dojo Demo',
      emailInputPlaceholder: 'reactdojodemo@gmail.com',
      passwordInputPlaceholder: 'demodemo',
    },
    icon: '',
    theme: {
      labeledSubmitButton: true,
      logo: '',
      primaryColor: '#E14615',
      authButtons: {
        connectionName: {
          displayName: 'Log In',
          primaryColor: '#b7b7b7',
          foregroundColor: '#000000',
          icon: undefined,
        },
      },
    },
  },
};
const firebaseConfig = {
  apiKey: "AIzaSyDKwcofJqJodVbnOLZ5ONF_4sYBHepIkVE",
  authDomain: "react-dojo-demo.firebaseapp.com",
  databaseURL: "https://react-dojo-demo.firebaseio.com",
  projectId: "react-dojo-demo",
  storageBucket: "react-dojo-demo.appspot.com",
  messagingSenderId: "892805662679"
};
const googleConfig = {
  apiKey: '', //
};
const mapboxConfig = {
  tileLayer: '',
  accessToken: '',
  id: '',
  maxZoom: '',
  defaultZoom: '',
  center: [],
};
const youtubeSearchApi = '';
export {
  apiUrl as default,
  siteConfig,
  themeConfig,
  language,
  AlgoliaSearchConfig,
  Auth0Config,
  firebaseConfig,
  googleConfig,
  mapboxConfig,
  youtubeSearchApi,
};
