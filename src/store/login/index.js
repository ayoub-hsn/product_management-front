import loginMutations from './mutations'
import loginActions from './actions'
import loginGetters from './getters'
export default{
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    getters: loginGetters,
    mutations: loginMutations,
    actions: loginActions
}