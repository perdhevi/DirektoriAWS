import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    console.log(process.env.REACT_APP_AUTH0_DOMAIN);
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,

      responseType: "token id_token",
      scope: "openid profile email",
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    this.clearSession();
    this.auth0.logout();
    this.history.push("/");
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}`);
        console.log(err);
      }
    });
  };

  setSession = (authResult) => {
    console.log(authResult);
    const expiredAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiredAt);
  };

  clearSession() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  isAuthenticated() {
    if (!localStorage.getItem("expires_at")) {
      return false;
    } else {
      const expiredAt = JSON.parse(localStorage.getItem("expires_at"));

      return new Date().getTime() < expiredAt;
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("no Access Token");
    }
    return accessToken;
  }
}
