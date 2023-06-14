export default{
    authenticated(state){
        return state.token && state.user
    },
    getToken(state){
        return state.token
    },
    getUser(state){
        return state.user
    }
}