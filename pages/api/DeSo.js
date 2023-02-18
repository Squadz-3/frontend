import Deso from "deso-protocol";

class DesoApi {
  constructor() {
    this.client = null;
  }
  /* ============ Login ========= */
  async login(request) {
    if (!request) {
      console.log("Request level required");
      return;
    }
    try {
      const response = await this.getClient().identity.login(request);
      return response;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  /* ===== Get User data ===== */
  async getUserData(user) {
    if (!user) {
      console.log("User must be defined to get user data.");
      return;
    }
    try {
      const request = {
        PublicKeyBase58Check: user,
      };
      const response = await this.getClient().user.getSingleProfile(request);
      return response.Profile;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  /* ===== Get Username ===== */
  async getUsername(user) {
    if (!user) {
      console.log("User must be defined to get username.");
      return;
    }
    try {
      const request = {
        PublicKeyBase58Check: user,
      };
      const response = await this.getClient().user.getSingleProfile(request);
      return response.Profile.Username;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  /* ===== Check if user owns NFT ===== */
  async doesOwnNft(id, nftId, holding) {
    const response = await this.getUserNFT(id);
    let owns = false;
    if (nftId == "all") {
      Object.values(response).forEach((nft) => {
        if (
          nft["PostEntryResponse"]["PosterPublicKeyBase58Check"] === holding
        ) {
          owns = true;
        }
      });
    } else {
      Object.values(response).forEach((nft) => {
        if (nft["PostEntryResponse"]["PostHashHex"] === nftId) {
          owns = true;
        }
      });
    }

    return owns;
  }

  /* ===== Check if user owns Dao ===== */
  async doesOwnDao(id, dao, daoType, holding) {
    try {
      const request = {
        PublicKeyBase58Check: id,
        IsHodlingPublicKeyBase58Check: holding,
        IsDAOCoin: true,
      };
      const response = await this.getClient().social.isHodlingPublicKey(
        request
      );

      if (response.IsHodling) {
        const BalanceNanosUint256 = parseInt(
          response.BalanceEntry.BalanceNanosUint256,
          16
        );
        const BalanceTokens = BalanceNanosUint256 / 1000000000000000000;
        const BalanceUSD =
          BalanceTokens *
          response.BalanceEntry.ProfileEntryResponse
            .BestExchangeRateDESOPerDAOCoin *
          10;
        const DesoValue = await this.getClient().metaData.getExchangeRate();

        const BalanceDeso = BalanceUSD / DesoValue.USDCentsPerDeSoCoinbase;

        if (daoType == "deso") {
          if (BalanceDeso >= dao) {
            return true;
          } else {
            return BalanceDeso + " DESO";
          }
        } else {
          if (BalanceUSD >= dao) {
            return true;
          } else {
            return BalanceUSD + " USD";
          }
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  /* ===== Verify Gate ===== */
  async verifyGate(type, user, nft, dao, daoType, holding) {
    if (!user) {
      console.log("User must be defined to verify gate");
      return;
    }
    if (!type) {
      console.log("Type must be defined to verify gate");
      return;
    }
    try {
      if (type == "nft") {
        return await this.doesOwnNft(user, nft, holding);
      }
      if (type == "dao") {
        return await this.doesOwnDao(user, dao, daoType, holding);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  /* ===== Get User profile picture ===== */
  async getUserProfile(user) {
    if (!user) {
      console.log("User must be defined to get user data.");
      return;
    }
    try {
      const request = user;
      const response = await this.getClient().user.getSingleProfilePicture(
        request
      );
      return response;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  /* ===== Get User NFT ===== */
  async getUserNFT(user) {
    if (!user) {
      console.log("User must be defined to get user data.");
      return;
    }
    try {
      const request = {
        UserPublicKeyBase58Check: user,
      };
      const response = await this.getClient().nft.getNftsForUser(request);
      return response.NFTsMap;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  /* ===== Get current user's JWT ===== */

  async getJwt(user) {
    if (!user) {
      console.log("User needed");
      return;
    }
    try {
      const request = user;
      const response = await this.getClient().identity.getJwt(request);
      return response;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async uploadImage(user, JWT, result) {
    if (!result) {
      console.log("Image file needed to upload image using DeSo.");
      return;
    }
    if (!user) {
      console.log("User needed to upload image using DeSo.");
      return;
    }
    if (!JWT) {
      console.log("JWT needed to upload image using DeSo.");
      return;
    }
    try {
      const request = {
        UserPublicKeyBase58Check: user,
        JWT: JWT,
        file: result,
      };
      const response = await this.getClient().media.uploadImage(request);
      return response.ImageURL;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  /* ======== Get Client ======= */
  getClient() {
    if (this.client) return this.client;
    this.client = new Deso();
    return this.client;
  }
}
export default DesoApi;
