export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const ATTEMPT = 'ATTEMPT';
export const REMEMBER = 'REMEMBER';
export const DONTREMEMBER = 'DONTREMEMBER';
export const UPDATEUSERNAME = 'UPDATEUSERNAME';
export const FAILEDATTEMPT = 'FAILEDATTEMPT';
export const LOGINSUCCESSFUL = 'LOGINSUCCESSFUL';
export const LOGINUNSUCCESSFUL = 'LOGINUNSUCCESSFUL';
export const HIDDEN = 'HIDDEN';
export const NOTHIDDEN = 'NOTHIDDEN';
export const LOADING = 'LOADING';
export const LOADINGCOMPLETE = 'LOADINGCOMPLETE';

export function loginAction(){
    return{
        type: LOGIN,
        newState: {
            authenticated: true,
        },
    };
};

export function logoutAction(){
    return{
        type: LOGIN,
        newState: {
            authenticated: false,
        },
    };
};

export function rememberMe(){
    return{
        type: REMEMBER,
        newState: {
            remember: true,
        },
    };
};

export function dontRememberMe(){
    return{
        type: DONTREMEMBER,
        newState: {
            remember: false,
        },
    };
};

export function updateUsername(user){
    return{
        type: UPDATEUSERNAME,
        newState: {
            username: user,
        },
    };
};

export function failedAttempt(attempt, cooldown){
    return{
        type: FAILEDATTEMPT,
        newState: {
            attempt: attempt,
            cooldown: cooldown,
        },
    };
};

export function successfulLogin(response, message){
    return{
        type: LOGINSUCCESSFUL,
        newState: {
            response: response,
            message: message,
        },
    };
};

export function unsuccessfulLogin(response, message){
    return{
        type: LOGINUNSUCCESSFUL,
        newState: {
            response: response,
            message: message,
        },
    };
};

export function showNotification(){
    return{
        type: NOTHIDDEN,
        newState: {
            visible: true,
        },
    };
};

export function closeNotification(){
    return{
        type: HIDDEN,
        newState: {
            visible: false,
        },
    };
};

export function loading(){
    return{
        type: LOADING,
        newState: {
            loading: true,
        },
    };
};

export function loadingComplete(){
    return{
        type: LOADINGCOMPLETE,
        newState: {
            loading: false,
        },
    };
};

export default loginAction;