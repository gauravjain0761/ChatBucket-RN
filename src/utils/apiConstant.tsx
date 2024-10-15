export const API = {
  BASE_URL: "http://161.35.37.230:4000/api/web",

  login: "/users/auth/login",
  register: "/users/auth/register",
  verifyOtp: "/users/auth/verify-otp",
  verifyUsername: "/users/auth/verify-username",
  setupProfile: "/users/auth/setup-profile",

  forgetPassword: "/users/auth/forgot-password",
  resetPassword: "/users/auth/reset-password",

  setContacts: "/users/auth/add-contacts",
  getContacts: "/users/auth/get-contacts",

  FORMAT_DATE: "DD/MM/YYYY",
  FORMAT_TIME: "hh:mm a",
  FORMAT_DATE_TIME: "DD/MM/YYYY hh:mm a",
  FORMAT_DAY_TIME: "dddd hh:mm a",
};

export const POST = "POST";
export const GET = "GET";
export const PATCH = "PATCH";
export const DELETE = "DELETE";
export const PUT = "PUT";
