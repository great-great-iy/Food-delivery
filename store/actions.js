import * as TYPE from '../constants/constants';

export const setListUser = payload => ({
    type: TYPE.SET_LIST_USER,
    payload
})

export const setUserData = payload => ({
    type: TYPE.SET_USER_DATA,
    payload
})

export const setToken = payload => ({
    type: TYPE.RESTORE_TOKEN,
    payload
})

export const signIn = payload => ({
    type: TYPE.SIGN_IN,
    payload
})

export const signUp = () => ({
    type: TYPE.SIGN_UP
})

export const signOut = payload => ({
    type: TYPE.SIGN_OUT,
    payload
})

export const isAddCard = payload => ({
    type: TYPE.ADD_CARD,
    payload
})

export const isDeleteCard = payload => ({
    type: TYPE.DELETE_CARD,
    payload
})

export const isEditProfile = payload => ({
    type: TYPE.EDIT_PROFILE,
    payload
})

export const isChangePass = payload => ({
    type: TYPE.CHANGE_PASS,
    payload
})