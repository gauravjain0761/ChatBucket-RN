export const API = {
    BASE_URL: 'http://161.35.37.230:4000/api/web',

    login: '/users/auth/login',
    register: '/users/auth/register',
    verifyOtp: '/users/auth/verify-otp',
    verifyUsername: '/users/auth/verify-username',
    setupProfile: '/users/auth/setup-profile',

    forgetPassword: '/users/auth/forgot-password',
    resetPassword: '/users/auth/reset-password'

}

export const POST = "POST";
export const GET = "GET";
export const PATCH = "PATCH";
export const DELETE = "DELETE";