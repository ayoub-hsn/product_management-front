import axios from 'axios'
export default{
    async login({dispatch,commit},payload){
        
            const res = await axios.post('login',payload)
            if(res.status == 200){
                console.log(res.data.token)
                dispatch('attempt',res.data.token)
            }
            return res;
        
    },
    async attempt({commit, state},token){
        try {
            if(token){
                commit('setToken',token)
            }
            if(!state.token){
                return;
            }
            console.log('hi')
            const res = await axios.get('profile')
            console.log(res)
            commit('setUser',res.data)

        } catch (error) {
            commit('setToken',null)
            commit('setUser',null)
        }
    },
    async logout({commit}){
        try {
            const res = await axios.post('logout')
            commit('setToken',null)
            commit('setUser',null)
            localStorage.removeItem('token')
            return res;
        } catch (error) {
            
        }
    }
}