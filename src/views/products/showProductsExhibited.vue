<template>
    <div id="app">
    <div class="main-wrapper main-wrapper-1">
        <div class="navbar-bg"></div>
        <NavbarApp/>

        <SideBarApp/>

        <!-- Main Content -->
    <div class="main-content">
      <section class="section">
        <!-- <div class="card">
            <div class="card-header headName">
                <h3>Produits A Exposer</h3>
            </div>
        </div> -->
        <div class="row">
          <div v-if="showModifForm" class="col-8">
            <div class="card">
            <div class="card-header">Modifier Produit</div>
            <div class="card-body">
                <form @submit.prevent="updateProduct">
                    <div class="row">
                        <input type="hidden" v-model="product.id">
                        <div class="col-4">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input v-model="product.name" type="text" id="name" class="form-control" :class="v$.product.name.$error ? 'is-invalid' : ''">
                                <span class="text-danger" v-if="v$.product.name.$error">
                                    {{v$.product.name.$errors[0].$message}}
                                </span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="color_id">Color</label>
                                <select v-model="product.colorId" id="color_id" class="form-control" :class="v$.product.colorId.$error ? 'is-invalid' : ''">
                                  <option value="">Select</option>
                                  <option :value="color.id" v-for="color in colors" :key="color.id">{{ color.color }}</option>
                                </select>
                                <span class="text-danger" v-if="v$.product.colorId.$error">
                                    {{v$.product.colorId.$errors[0].$message}}
                                </span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="type_id">Type</label>
                                <select v-model="product.typeId" id="type_id" class="form-control" :class="v$.product.typeId.$error ? 'is-invalid' : ''">
                                  <option value="">Select</option>
                                  <option :value="typ.id" v-for="typ in types" :key="typ.id">{{ typ.name }}</option>
                                </select>
                                <span class="text-danger" v-if="v$.product.typeId.$error">
                                    {{v$.product.typeId.$errors[0].$message}}
                                </span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="gender">Genre</label>
                                <select class="form-control" v-model="product.gender" id="gender" :class="v$.product.gender.$error ? 'is-invalid' : ''">
                                  <option value="">Select</option>
                                  <option value="Homme">Homme</option>
                                  <option value="Femme">Femme</option>
                                  <option value="Enfant">Enfant</option>
                                </select>
                                <span class="text-danger" v-if="v$.product.gender.$error">
                                    {{v$.product.gender.$errors[0].$message}}
                                </span>
                            </div>
                        </div>
                        <div v-if="categoryId != 1" class="col-4">
                            <div class="form-group">
                                <label for="type_id">Marque</label>
                                <select v-model="product.markId" id="type_id" class="form-control" :class="v$.product.markId.$error ? 'is-invalid' : ''">
                                <option value="">Select</option>
                                <option :value="mark.id" v-for="mark in marks" :key="mark.id">{{ mark.name }}</option>
                                </select>
                                <span class="text-danger" v-if="v$.product.markId.$error">
                                    {{v$.product.markId.$errors[0].$message}}
                                </span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="type_id">Pointure</label>
                                <select v-model="product.sizeId" id="type_id" class="form-control" :class="v$.product.sizeId.$error ? 'is-invalid' : ''">
                                <option value="">Select</option>
                                <option :value="size.id" v-for="size in sizes" :key="size.id">{{ size.size }}</option>
                                </select>
                                <span class="text-danger" v-if="v$.product.sizeId.$error">
                                    {{v$.product.sizeId.$errors[0].$message}}
                                </span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="real_qte">Quantité Réel</label>
                                <input v-model="product.realQuantity" type="number" id="real_qte" class="form-control" :class="v$.product.realQuantity.$error ? 'is-invalid' : ''">
                                <span class="text-danger" v-if="v$.product.realQuantity.$error">
                                    {{v$.product.realQuantity.$errors[0].$message}}
                                </span>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label for="vir_qte">Quantité Virtuelle</label>
                                <input v-model="product.virtualQuantity" type="number" id="vir_qte" class="form-control" :class="v$.product.virtualQuantity.$error ? 'is-invalid' : ''">
                                <span class="text-danger" v-if="v$.product.virtualQuantity.$error">
                                  {{v$.product.virtualQuantity.$errors[0].$message}}
                                </span>
                            </div>
                        </div>
                        <div class="col-8">
                            <file-pond
                                name="picture"
                                ref="pond"
                                class-name=""
                                label-idle="Déposer une photo ici..."
                                allowFileSizeValidation=true
                                maxFileSize=5000000
                                labelMaxFileSizeExceeded='Image trop grante'
                                accepted-file-types="image/jpeg, image/png, image/jpg"
                                server="http://127.0.0.1:8000/api/product/media"
                                v-on:processfile="handleProcessFile"
                                @addfile="onAddFile"
                            />
                        </div>
                    </div>
                    <button style="float:right" class="btn btn-primary">Modifier</button>
                </form>
            </div>
          </div>
          </div>
          <div class="col-12">
            <div class="card">
                <div class="card-header" style="justify-content: space-between;">
                    <h3>Produits A Exposer</h3>
                    <!-- <div>
                        <button @click="displayForm" class="btn btn-primary"><i v-if="!showForm" class="fa fa-plus"></i> <i v-if="showForm" class="fa fa-minus"></i></button>
                    </div> -->
                </div>
                <div class="card-body">
                  <input type="text" style="width: 23%;" class="form-control mb-3" v-model="searchQuery" placeholder="Chercher...">
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
                      <template #item-img="item">
                        <img width="50" :src="url+item.image">
                      </template>
                      
                      <template #item-colorId="item">
                        {{ item.color ? item.color.color : '' }}
                      </template>

                      <template #item-typeId="item">
                        {{ item.typeId ? item.type.name : '' }}
                      </template>

                      <template #item-markId="item">
                        {{ item.mark ? item.mark.name : '' }}
                      </template>
                      
                      <template #item-sizeId="item">
                        {{ item.size ? item.size.size : ''}}
                      </template>
                      <template #item-operation="item">
                      <div class="operation-wrapper">
                          <!-- <router-link :to="{name:'Show',params:{id:item.id}}" class="btn btn-info btn-sm mr-1">
                              <i class="fas fa-eye"></i>
                            </router-link> -->
                          <router-link :to="{name: 'showOneProduct',params:{id:item.id}}" class="btn btn-info btn-sm mr-1" @click="Product(item.id)">
                              <i class="fas fa-eye"></i>
                          </router-link>
                          <!-- <button class="btn btn-warning btn-sm mr-1" @click="modifProduct(item)">
                              <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-danger btn-sm mr-1" @click="deleteProduct(item.id)">
                              <i class="fas fa-trash"></i>
                          </button> -->
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
import EditProductForm from '@/components/product/editProduct'

import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
const FilePond = vueFilePond(FilePondPluginFileValidateType,FilePondPluginFileValidateSize);

import { useVuelidate } from '@vuelidate/core'
import { required,maxLength } from '@vuelidate/validators'
export default {
    components: {
        NavbarApp,
        SideBarApp,
        navHome,
        EditProductForm,
        FilePond,
    },
    data() {
      return {
          v$: useVuelidate(),
          searchQuery: '',
          itm: null,
          loading: true,
          showModifForm: false,
          categoryId : null,
          colors: [],
          sizes: [],
          marks: [],
          types: [],
          url: '',
          headers : [
            { text: "SKU", value: "sku", sortable: true},
            { text: "Nom Produit", value: "name" , sortable: true},
            // { text: "Image", value: "img"},
            // { text: "Color", value: "colorId", sortable: true},
            // { text: "Genre", value: "gender", sortable: true},
            // { text: "Size", value: "sizeId", sortable: true},
            // { text: "Type", value: "typeId" , sortable: true},
            { text: "Quantité réelle", value: "realQuantity" , sortable: true},
            // { text: "Quantité Virtuelle", value: "virtualQuantity" , sortable: true},
            { text: "Capital total", value: "totalCapital", sortable: true},
            { text: "Actions", value: "operation"},
          ],

          items : [
              
          ],
          // filterOptions: {
          //   enabled: true,
          //   trigger: 'enter'
          // },
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

  methods: {
    modifProduct(item){
      this.product = item
      this.showModifForm = true
    },
    updateProduct(){
      this.v$.$validate()
      if(this.v$.$error){
          return;
      }
      this.product.image = $("input[name='picture']").val()
      this.$vs.loading()
      this.$store.dispatch('productModul/updateProduct',this.product)
      .then((res) => {
        this.$vs.loading.close()
        this.showModifForm = false
        this.items[this.items.findIndex(pr => pr.id === res.data.id)] = res.data;
        this.$toast.show("Vous avec modifier ce produit avec succées", {
             type: 'success',
           });

      })
      .catch((err) => {
          this.$toast.show("Faire cette action aprés", {
             type: 'error',
           });
      })
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
    
    
    this.$toast.show("Veuillez patienter un instant, y'a une connexion avec les sites WooCommerce et Shopify.", {
      type: 'success',
    });

    this.$store.dispatch('productModul/getExhibitedProducts',this.categoryId).then((res) => {
      console.log(res)
      this.loading = false
      this.items = res.data.products
      this.sizes =  res.data.sizes
      this.types =  res.data.category.types
      this.marks =  res.data.category.marks
      this.colors = res.data.colors
    })
  }
}
</script>
<style>
.imge{
  width: 37% !important;
}

  .headName{
        display: flex;
        justify-content: center;
    }

</style>