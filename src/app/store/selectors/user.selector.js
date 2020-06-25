export const isAuthenticated = (state) => {
    return !!state.user.currentUser;
};

export const isLoading = (state) => {
    return state.user.loading;
};

export const userSelector = (state) => {
    return state.user.currentUser;
};
