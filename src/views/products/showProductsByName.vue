<template>
    <div id="app">
    <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>
        <NavbarApp/>

        <SideBarApp :stockActive="true"/>

        <!-- Main Content -->
    <div class="main-content">
      <section class="section">
        <!-- <div class="card">
            <div class="card-header headName">
                <h3>Consultation de Stock</h3>
            </div>
        </div> -->
        <div class="row">
          <div v-if="showModifForm" class="col-12">
            
          </div>
          <div class="col-12">
            <div class="card">
              <div class="card-header" style="justify-content: space-between;">
                  <h3>Consultation de Stock</h3>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-2">
                    <label for="">Chercher</label>
                    <input type="text" class="form-control mb-3" v-model="searchQuery" placeholder="Chercher...">
                  </div>
                  <div class="col-2">
                      <label for="">De</label>
                      <input type="date" @input="handleDateFromChange" class="form-control mb-3" v-model="dateFrom">
                  </div>
                  <div class="col-2">
                      <label for="">A</label>
                      <input type="date" @input="handleDateToChange" class="form-control mb-3" v-model="dateTo">
                  </div>
                  <div class="col-2">
                      <label for="">Qte(Min)</label>
                      <input type="number" @input="handleMinToChange" class="form-control mb-3" v-model="minQte">
                  </div>
                  <div class="col-2">
                      <label for="">Qte(Max)</label>
                      <input type="number" @input="handleMaxToChange" class="form-control mb-3" v-model="maxQte">
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
                    <template #item-typeId="item">
                      {{ item.typeId ? item.type.name : '' }}
                    </template>

                    <template #item-markId="item">
                      {{ item.mark ? item.mark.name : '' }}
                    </template>
                    
                    <template #item-categoryId="item">
                      {{ item.categoryId ? item.category.name : ''}}
                    </template>

                    <template #item-image="item">
                      <img :src="url+item.image" width="40" alt="">
                    </template>

                    <template #item-operation="item">
                    <div class="operation-wrapper">
                      <div class="dropdown d-inline">
                          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton2"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Actions
                          </button>
                          <div class="dropdown-menu">
                              <button @click="showProductDetailByName(item.name)" class="dropdown-item has-icon"><i class="far fa-eye"></i> Afficher</button>
                              <button @click="modifProduct(item.name)" class="dropdown-item has-icon"><i class="far fa-edit"></i> Modifier</button>
                        
                          </div>
                      </div>
          
                    </div>
                    </template>
                    
                </EasyDataTable>
              </div>
            </div>
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

export default {
    components: {
        NavbarApp,
        SideBarApp,
        navHome,
    },
    data() {
      return {
          showProductByName: false,
          nameProduct: null,
          v$: useVuelidate(),
          url: '',
          searchQuery: '',
          itm: null,
          loading: true,
          showModifForm: false,
          categoryId : null,
          maxQte: '',
          minQte: '',
          colors: [],
          sizes: [],
          marks: [],
          types: [],
          url: '',
          headers : [
            { text: "Sku", value: "sku" , sortable: true},
            { text: "Nom Produit", value: "name" ,width:130, sortable: true},
            { text: "Image", value: "image" , sortable: true},
            { text: "Type", value: "typeId" , sortable: true},
            { text: "Quantité Réelle", value: "realQuantity", sortable: true},
            { text: "Quantité Virtuelle", value: "virtualQuantity", sortable: true},
            { text: "Stock CMDs A Retourner", value: "quantityToReturn" , sortable: true},
            { text: "Fournisseur", value: "supplier" , sortable: true},
            { text: "Date", value: "date" , sortable: true},
            { text: "Quantité de site web", value: "webSiteQuantity", sortable: true},
            { text: "Capital total", value: "totalCapital", sortable: true},
            { text: "Actions", value: "operation"},
          ],

          items : [],
          items2: [],
          product:{
              id: '',
              name : '',
              image: null,
              categoryId: '',
              typeId: '',
              markId: '',
              gender: '',
              sizeId: '',
              colorId: '',
              realQuantity: '',
              virtualQuantity: '',
          }
      }
  },
  validations () {
    return {
      product:{
        name: { required, maxLength: maxLength(30) },
        categoryId:{ required },
        typeId: { required },
        gender: { required },
        markId: { },
        sizeId: { required },
        colorId: { required },
        realQuantity: { required },
        virtualQuantity: { required } 
      }
    }
  },
  computed: {
    // filteredItems() {
    //   const query = this.searchQuery.toLowerCase()
    //   return this.items.filter(item => {
    //     return Object.values(item).some(val => {
    //         return val !== null && val.toString().toLowerCase().includes(query)
    //     })
    //   })
    // }
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.items.filter(item => {
        return (
          (item.name ? item.name.toString().toLowerCase().includes(query) : '') ||
          (item.sku ? item.sku.toString().toLowerCase().includes(query) : '') ||
          (item.virtualQuantity ? item.virtualQuantity.toString().toLowerCase().includes(query) : '') ||
          (item.realQuantity ? item.realQuantity.toString().toLowerCase().includes(query) : '') ||
          (item.color ? item.color.color.toString().toLowerCase().includes(query) : '') ||
          (item.supplier ? item.supplier.toString().toLowerCase().includes(query) : '') ||
          (item.mark ? item.mark.name.toString().toLowerCase().includes(query) : '') ||
          (item.size ? item.size.size.toString().toLowerCase().includes(query) : '') ||
          (item.gender ? item.gender.toString().toLowerCase().includes(query) : '')
        );
      });
    }
  },
  methods: {
    showProductDetailByName(name){
      this.nameProduct = name
      this.showProductByName = true
    },
    handleDateFromChange(){
        this.items = this.items2
        if(this.dateTo){
            this.items = this.items.filter(item => {
                return item.date <= this.dateTo && item.date >= this.dateFrom
            })
        }
    },
    handleDateToChange(){
        this.items = this.items2
        if(this.dateFrom){
            this.items = this.items.filter(item => {
                return item.date <= this.dateTo && item.date >= this.dateFrom
            })
        }
    },
    handleMaxToChange(){
        this.items = this.items2
        if(this.minQte){
            this.items = this.items.filter(item => {
                return item.virtualQuantity <= this.maxQte && item.virtualQuantity >= this.minQte
            })
        }else{
            this.items = this.items.filter(item => {
                return item.virtualQuantity >= this.minQte
            })
        }
    },
    handleMinToChange(){
      this.items = this.items2
      if(this.maxQte){
          this.items = this.items.filter(item => {
              return item.virtualQuantity <= this.maxQte && item.virtualQuantity >= this.minQte
          })
      }else{
          this.items = this.items.filter(item => {
              return item.virtualQuantity >= this.minQte
          })
      }
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
  mounted(){
    this.url = this.$store.state.urlFile,
    this.categoryId = this.$store.state.categoryId
 

    this.$store.dispatch('productModul/getProductsByName',this.categoryId).then((res) => {
      console.log(res.data)
      this.loading = false
      this.items = res.data.products
      this.items2 = res.data.products
      this.sizes =  res.data.sizes
      this.types =  res.data.category.types
      this.marks =  res.data.category.marks
      this.colors = res.data.colors
    })
  },


}
</script>
<style>
.imge{
  width: 37% !important;
}
tbody tr td:nth-child(3) {
  width: 17% !important;
}
  .headName{
        display: flex;
        justify-content: center;
    }

</style>