import { environment } from "@env/environment";

const BASE_ENVIRONMENT = `${environment.baseURL}/`;

const API_VERSION_1 = "v1";

export const API = {
  URL: {
    AUTHENTICATE: {
      AUTHENTICATE: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/authentication/authenticate`,
      REFRESH_TOKEN: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/authentication/refresh-token`,
      GET_ACCESS_TOKEN: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/authentication/get-access-token`,
    },
    ACCOUNTS: {
      GET_ACCOUNT_INFO: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/get-account-info`,
      GET_ACCOUNT_BY_ID_FOR_SA: `${BASE_ENVIRONMENT}/core/${API_VERSION_1}/account/get-account-for-management/`,
      UPDATE_USER: `${BASE_ENVIRONMENT}/core/${API_VERSION_1}/account/update`,
      UPDATE: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/update`,
      FORGOT_PASSWORD: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/forgot-password/`,
      SALE_MAN: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/account/sale-man`,
      SIGN_OUT: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/sign-out`,
    },
    COMPANY: {
      GET_ALL: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/company/getall`,
      SEARCH: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/company/search`,
      UPDATE: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/company/update`,
      INSERT: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/company/insert`,
      GET_BY_ID: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/company/getbyid`,
      DELETE: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/company/delete/`,
      UPLOAD_LOGO: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/company/upload-logo`,
      UPLOAD_MINI_LOGO: `${BASE_ENVIRONMENT}/afc/${API_VERSION_1}/company/upload-mini-logo`,
    },
    USER: {
      ACCOUNT_INFO: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/account-info`,
      ACCOUNT_UPLOAD_AVATAR: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/upload-avatar`,
      CHANGE_PASSWORD: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/change-password`,
      UPDATE_ACCOUNT_INFO: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/update-profile`,
      MENU_ACCESS: `${BASE_ENVIRONMENT}/api/${API_VERSION_1}/account/access-menu-permission`,
    },
  }
}




