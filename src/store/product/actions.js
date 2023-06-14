import axios from 'axios'
export default{
    async getListProducts(){
        try {    
            const res = await axios.get(`products`)
            return res;
        } catch (error) {
            
        }
    },
    async createProduct(_,payload){
        try {
            const res = await axios.post('product/create',payload)
            return res;
        } catch (error) {
            
        }
    },
    async updateProduct(_,payload){
        try {
            const res = await axios.put(`product/edit/${payload.id}`,payload)
            return res;
        } catch (error) {
            
        }
    },
    async deleteProduct(_,payload){
        try {
            const res = await axios.delete(`product/delete/${payload}`)
            return res;
        } catch (error) {
            
        }
    },
}