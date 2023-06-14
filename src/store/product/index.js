import productMutations from './mutations'
import productActions from './actions'
import productGetters from './getters'
export default{
    namespaced: true,
    state:{
        
    },
    getters: productGetters,
    mutations: productMutations,
    actions: productActions,
}