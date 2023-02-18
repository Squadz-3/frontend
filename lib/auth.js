import DesoApi from "../pages/api/DeSo";

class Auth {
  constructor() {
    this.google = null;
  }
  /* ======= Login ======= */

  /* ===== Login with DeSo ===== */
  async loginWithDeSo() {
    try {
      const deso = new DesoApi();
      const request = await deso.login(2);
      if (request && localStorage.getItem("deso_user_key")) {
        return localStorage.getItem("deso_user_key");
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  /* ===== Login with Metamask ===== */
  async loginWithMetamask() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        return account;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  /* ===== Login with Phantom ===== */
  async loginWithPhantom() {
    try {
      const isPhantomInstalled = window.phantom?.solana?.isPhantom;

      const getProvider = () => {
        if ("phantom" in window) {
          const provider = window.phantom?.solana;

          if (provider?.isPhantom) {
            return provider;
          }
        }

        window.open("https://phantom.app/", "_blank");
      };

      if (isPhantomInstalled) {
        const provider = getProvider();
        const resp = await provider.connect();
        const publicKey = resp.publicKey.toString();
        return publicKey;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  async loginWithMicrosoft() {
    //Coming soon
  }

  /* ======= Signup ======= */

  /* ===== Signup with DeSo ===== */
  async signupWithDeSo() {
    try {
      const deso = new DesoApi();
      const request = await deso.login(2);
      const user = localStorage.getItem("deso_user_key");
      if (request && user) {
        const userData = await deso.getUserData(user);
        const { Username, Description } = userData;
        const profile = await deso.getUserProfile(user);
        const data = {
          _id: user, //Unique id for our document (required)
          displayName: Username, //User display name (required)
          profilePicture: profile, //User profile picture (required)
          description: Description,
          email: "", //User email (optional)
          deso: user, //User DeSo key (optional)
          metamask: "", //User Metamask key (optional)
          phantom: "", //User phantom key (optional)
        };
        return data;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  /* ===== Signup with Metamask ===== */
  async signupWithMetamask() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        const data = {
          _id: account, //Unique id for our document (required)
          displayName: "Account 1", //User display name (required)
          profilePicture: "https://api.dicebear.com/5.x/identicon/svg", //User profile picture (required)
          description: "",
          email: "", //User email (optional)
          deso: "", //User DeSo key (optional)
          metamask: account, //User Metamask key (optional)
          phantom: "", //User phantom key (optional)
        };
        return data;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
  /* ===== Signup with Phantom ===== */
  async signupWithPhantom() {
    try {
      const isPhantomInstalled = window.phantom?.solana?.isPhantom;

      const getProvider = () => {
        if ("phantom" in window) {
          const provider = window.phantom?.solana;

          if (provider?.isPhantom) {
            return provider;
          }
        }

        window.open("https://phantom.app/", "_blank");
      };

      if (isPhantomInstalled) {
        const provider = getProvider();
        const resp = await provider.connect();
        const publicKey = resp.publicKey.toString();
        const data = {
          _id: publicKey, //Unique id for our document (required)
          displayName: "Account 1", //User display name (required)
          profilePicture: "https://api.dicebear.com/5.x/identicon/svg", //User profile picture (required)
          description: "",
          email: "", //User email (optional)
          deso: "", //User DeSo key (optional)
          metamask: "", //User Metamask key (optional)
          phantom: publicKey, //User phantom key (optional)
        };
        return data;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async signupWithMicrosoft() {
    //Coming soon
  }

  async getDesoAccount() {
    const deso = new DesoApi();
    await deso.login(2);
    const user = localStorage.getItem("deso_user_key");
    return user;
  }

  async signout() {
    try {
      localStorage.removeItem("SquadData");
      localStorage.removeItem("deso_user_key");
      return true;
    } catch (error) {
      return false;
    }
  }
}
export default Auth;
