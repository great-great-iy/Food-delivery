import * as TYPE from '../constants/constants';
export const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    userData: null,
    listUser: null,
    isSignIn: false,
    isSignUp: false,
    isAddCard: false,
    isDeleteCard: false,
    isEditProfile: false,
    isChangePass: false,
}
const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case TYPE.SET_LIST_USER:
            {
                let newState = {
                    ...prevState,
                    listUser: [...action.payload],
                };
                prevState = newState;
                return prevState;
            }
            break;
        case TYPE.SET_USER_DATA:
            {
                let newState = {
                    ...prevState,
                    userData: { ...action.payload },
                };
                prevState = newState;
                return prevState;
            }
            break;
        case TYPE.RESTORE_TOKEN:
            {
                let newState = {
                    ...prevState,
                    userToken: { ...action.payload },
                    isLoading: false,
                };
                prevState = newState;
                return prevState;
            }
            break;
        case TYPE.SIGN_IN:
            {
                let newState = {
                    ...prevState,
                    isSignout: false,
                    isSignIn: action.payload,
                };
                prevState = newState;
                return prevState;
            }
            break;
        case TYPE.SIGN_UP:
            {
                let newState = {
                    ...prevState,
                    isSignUp: !prevState.isSignUp,
                };
                prevState = newState;
                return prevState;
            }
            break;
        case TYPE.SIGN_OUT:
            {
                let newState = {
                    ...prevState,
                    isSignIn: false,
                    isSignout: action.payload,
                };
                prevState = newState;
                return prevState;
            }
            break;
        case TYPE.ADD_CARD:
            {
                let newState = {
                    ...prevState,
                    isAddCard: !prevState.isAddCard,
                };
                prevState = newState;
                return prevState;
            }
            break;
        case TYPE.DELETE_CARD:
            {
                let newState = {
                    ...prevState,
                    isDeleteCard: !prevState.isDeleteCard,
                };
                prevState = newState;
                return prevState;
            }
            break;
        case TYPE.EDIT_PROFILE:
            {
                let newState = {
                    ...prevState,
                    isEditProfile: !prevState.isEditProfile,
                };
                prevState = newState;
                return prevState;
            }
            break;

        case TYPE.CHANGE_PASS:
            {
                let newState = {
                    ...prevState,
                    isChangePass: !prevState.isChangePass,
                };
                prevState = newState;
                return prevState;
            }
            break;

    }
}

export default reducer;