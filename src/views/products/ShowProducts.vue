<template>
    <div id="app">
    <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>
        <NavbarApp/>

        <SideBarApp :stockActive="true"/>

        <!-- Main Content -->
    <div class="main-content">
      <section class="section">
        <div class="row">
          <div class="col-12">
                <CreateProduct v-if="showAddForm" @productCreated="prdtCreated($event)"/>
                <UpdateProduct v-if="showModifForm" :prdt="prdct" @productUpdated="prdtUpdated($event)"/>
          </div>
          <div class="col-12">
            <div class="card">
              <div class="card-header" style="justify-content: space-between;">
                  <h3>Products</h3>
                  <button v-if="!showAddForm" @click="showCreateForm" class="btn btn-primary"><i class="fa fa-plus"></i></button>
                  <button v-if="showAddForm" @click="showAddForm = false" class="btn btn-primary"><i class="fa fa-minus"></i></button>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-2">
                    <label for="">Chercher</label>
                    <input type="text" class="form-control mb-3" v-model="searchQuery" placeholder="Chercher...">
                  </div>
                  <div class="col-2">
                      <label for="">Categorie</label>
                      <select class="form-control" name="" id="">
                        <option value="">Select</option>
                        <option v-for="(category,index) in categories" :value="category.name" :key="index">{{ category.name }}</option>
                      </select>
                  </div>
                  
                  
                </div>
                <EasyDataTable
                    buttons-pagination
                    :rows-per-page="10"
                    :headers="headers"
                    :items="filteredItems"
                    class="table table-striped"
                    :loading="loading"
                >
                <template #loading>
                    <img
                    src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                    style="width: 100px; height: 80px;"
                    />
                    </template>
                    
                    
                    <template #item-categorie="item">
                      {{ categories.find(category => category.id === item.categorie).name }}
                    </template>

                    <template #item-picture="item">
                      <img :src="url+item.picture" width="40" alt="">
                    </template>

                    <template #item-operation="item">
                    <div class="operation-wrapper">
                      <div class="dropdown d-inline">
                        <button @click="modifProduct(item)" class="btn btn-warning btn-sm mr-1"><i class="far fa-edit"></i></button>
                        <button @click="deleteProduct(item.id)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                      </div>
          
                    </div>
                    </template>
                    
                </EasyDataTable>
              </div>
            </div>
          </div>
        </div>
        <div class="card" v-if="showProductByName">
            <div class="card-body">
                <showOneProductByName :name="nameProduct"/>
            </div>
        </div>
        </section>
        </div>
      </div>
    </div>
</template>
<script>
import NavbarApp from '@/components/NavBar.vue'
import SideBarApp from '@/components/SideBar.vue'
import navHome from '@/components/navHome.vue'
import CreateProduct from '@/components/product/CreateProduct'
import UpdateProduct from '@/components/product/editProduct'
export default {
    components: {
        NavbarApp,
        SideBarApp,
        navHome,
        CreateProduct,
        UpdateProduct
    },
    data() {
        return {
            searchQuery: '',
            showModifForm: false,
            showAddForm: false,
            prdct: null,
            headers : [
                { text: "Name", value: "name", sortable: true},
                { text: "Picture", value: "picture" , sortable: true},
                { text: "Categorie", value: "categorie" , sortable: true},
                { text: "Actions", value: "operation"},
            ],
            items : [],
            items2: [],
            categories: [],
        }
    },
    computed: {
        filteredItems() {
        const query = this.searchQuery.toLowerCase();
        return this.items.filter(item => {
            return (
            (item.name ? item.name.toString().toLowerCase().includes(query) : '')
            );
        });
        }
    },
    methods: {
        showCreateForm(){
            this.showAddForm = true
            this.showModifForm = false
        },
        prdtCreated(prdt){
            this.items.push(prdt)
            this.showAddForm = false
            this.showModifForm = false
        },
        modifProduct(item){
            this.prdct = item
            this.showModifForm = true
            this.showAddForm = false
        },
       
        prdtUpdated(prdt){
            this.items[this.items.findIndex(pr => pr.id === prdt.id)] = prdt;
            this.showModifForm = false
            this.showAddForm = false
        },
        deleteProduct(id){
            this.$swal({
                title: "Supprimer ce Produit?",
                text: "Est vous sûr? Vous ne pourrez pas revenir en arrière!",
                type: "warning",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Oui, Supprimer!"
            }).then((result) => { 
                if (result.value) {
                    this.$vs.loading()
                    this.$store.dispatch('productModul/deleteProduct',id)
                    .then((res) => {
                    this.$vs.loading.close()
                    this.$toast.show("Produit est supprimé avec succées", {
                        type: 'success',
                    });
                    this.items = this.items.filter((item) => {
                        return item.id !== id
                    })
                    })
                    .catch((err) => {
                    this.$vs.loading.close()
                    this.$toast.show("Faire cette action aprés", {
                        type: 'error',
                    });
                    })
                }
            });
        }
    },
    mounted() {
        this.url = this.$store.state.url
        this.categories = this.$store.state.categories
        this.$store.dispatch('productModul/getListProducts').then((res) => {
        console.log(res)
        this.loading = false
        this.items = res.data
    })
    },
}
</script>
<style lang="">
    
</style>