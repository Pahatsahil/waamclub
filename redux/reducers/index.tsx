import types from "../actions/actionTypes";

const initialState = {
  userLoginData: [],
  userID: '',
  userName: '',
  userMobile: '',
  userEmail: '',
  userToken: '',
  userProfileFields: [],
  profilePicture: [],
  totalReferralAmt: 0,
  dematReferralCount: 0,
};

const reducer = (state = initialState, action: { type: any; payload: any }) => {
  switch(action.type){
    case types.SET_USER_LOGIN_DATA:
      return { ...state, userLoginData: action.payload };    
    case types.SET_USER_ID:
      return { ...state, userID: action.payload };    
    case types.SET_USER_NAME:
      return { ...state, userName: action.payload };    
    case types.SET_MOBILE:
      return { ...state, userMobile: action.payload }; 
    case types.SET_USER_EMAIL:
      return { ...state, userEmail: action.payload }; 
    case types.SET_USER_TOKEN:
      return { ...state, userToken: action.payload }; 
    case types.SET_USER_PROFILE_FIELDS:
        return { ...state, userProfileFields: action.payload };   
      case types.SET_IS_LOGIN:
        return { ...state, isLogin: action.payload };   
      case types.SET_PROFILE_PICTURE:
        return { ...state, profilePicture: action.payload };   
      case types.SET_TOTAL_REFERRAL_AMT:
        return { ...state, totalReferralAmt: action.payload };   
      case types.SET_DEMAT_REFERRAL_COUNT:
        return { ...state, dematReferralCount: action.payload };   
        default:
          throw new Error("Unexpected action");
      //   const setFormChildren0m_6mField = (data: string) => {
      //     dispatch({ type: types.SET_FORM_CHILDREN_0M_6M_FIELD, payload: data });
      //   };
  }
};
export { initialState, types, reducer };
