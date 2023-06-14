<template>
    <div class="card">
        <div class="card-header">Create Product</div>
        <div class="card-body">
            <form @submit.prevent="createProduct">
                <div class="row">
                    <input type="hidden" v-model="product.id">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input v-model="product.name" type="text" id="name" class="form-control" :class="v$.product.name.$error ? 'is-invalid' : ''">
                            <span class="text-danger" v-if="v$.product.name.$error">
                                {{v$.product.name.$errors[0].$message}}
                            </span>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="type_id">Category</label>
                            <select v-model="product.categorie" id="type_id" class="form-control" :class="v$.product.categorie.$error ? 'is-invalid' : ''">
                            <option value="">Select</option>
                            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                            </select>
                            <span class="text-danger" v-if="v$.product.categorie.$error">
                                {{v$.product.categorie.$errors[0].$message}}
                            </span>
                        </div>
                    </div>
                   
                   
                    <div class="col-6">
                        <div class="form-group">
                          <label for="">Picture</label>
                          <file-pond
                            name="file"
                            ref="pond"
                            class-name=""
                            label-idle="Drop Picture..."
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
                    <div class="col-6">
                        <label for="">Description</label>
                        <textarea v-model="product.description" name="" id="" class="form-control"></textarea>
                    </div>
                </div>
                <button style="width: 100%;" class="btn btn-primary">Create</button>
            </form>
        </div>
    </div>
</template>
<script>
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
        FilePond
    },
    data() {
        return {
            v$: useVuelidate(),
            product: {
                name: '',
                description: '',
                picture: '',
                categorie: ''
            },
            categories: [
                {id: 1,name: 'Category 1'},
                {id: 2,name: 'Category 2'},
                {id: 3,name: 'Category 3'},
            ]
        }
    },
    validations () {
        return {
        product:{
            name: { required, maxLength: maxLength(30) }, 
            description: { required },
            picture: { required },
            categorie: { required }
        }
        }
    },
  methods: {
    createProduct(){
        this.product.picture = $("input[name='file']").val()
        this.v$.$validate()
        if(this.v$.$error){
            return;
        }
      this.$vs.loading()
      this.$store.dispatch('productModul/createProduct',this.product)
      .then((res) => {
        this.$vs.loading.close()
        this.$emit('productCreated',res.data)
        this.$toast.show("Vous avec créer ce produit avec succées", {
          type: 'success',
        });

      })
      .catch((err) => {
          this.$toast.show("Faire cette action aprés", {
             type: 'error',
           });
      })
    }
  },
    
}
</script>
<style>
    
</style>