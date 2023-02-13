import types from "./actionTypes";

export const useActions = (
  state: any,
  dispatch: (arg0: { type: any; payload: any }) => void
) => {
  const setUserLoginDATA = (data: string) => {
    dispatch({ type: types.SET_USER_LOGIN_DATA, payload: data });
  };
  const setUserName = (data: string) => {
    dispatch({ type: types.SET_USER_NAME, payload: data });
  };
  const setUserID = (data: string) => {
    dispatch({ type: types.SET_USER_ID, payload: data });
  };
  const setMobile = (data: string) => {
    dispatch({ type: types.SET_MOBILE, payload: data });
  };
  const setUserEmail = (data: string) => {
    dispatch({ type: types.SET_USER_EMAIL, payload: data });
  };
  const setUserToken = (data: string) => {
    dispatch({ type: types.SET_USER_TOKEN, payload: data });
  };
  const setUserProfileFields = (data: string) => {
    dispatch({ type: types.SET_USER_PROFILE_FIELDS, payload: data });
  };
  const setIsLogin = (data: boolean) => {
    dispatch({ type: types.SET_IS_LOGIN, payload: data });
  };
  const setTotalReferralAmt = (data: number) => {
    dispatch({ type: types.SET_TOTAL_REFERRAL_AMT, payload: data });
  };
  const setDematReferralCount = (data: number) => {
    dispatch({ type: types.SET_DEMAT_REFERRAL_COUNT, payload: data });
  };
  return{
    setUserLoginDATA,
    setUserName,
    setUserID,
    setMobile,
    setUserEmail,
    setUserToken,
    setUserProfileFields,
    setIsLogin,
    setTotalReferralAmt,
    setDematReferralCount
  }  
};
