export const getUserName = (state) => state.auth.user.name;
export const getUserSurname = (state) => state.auth.user.surname;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;