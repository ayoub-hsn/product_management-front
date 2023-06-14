<template >
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6 img_login">
          <img src="../../../public/img/marabLogoLogin.png"
            class="img-fluid" alt="marab logo" style="margin-left: -30%;">
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5">
  
              <div class="mb-md-5 mt-md-4 pb-5">
  
                <h2 class="fw-bold mb-2 text-uppercase text-center" style="color: white;">Login</h2>
                <p class="text-white-50 mb-5 text-center">S'il vous plaît entrez votre identifiant et votre mot de passe!</p>
                <div class="alert alert-danger" v-if="inccorectCredentials">Mot de passe ou password incorrecte</div>
                <form @submit.prevent="signin">
                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="typeEmailX">Email</label>
                  <input type="email" v-model="user.email" id="typeEmailX" class="form-control form-control-lg" style="background-color: black;color: white" :class="v$.user.email.$error ? 'is-invalid' : ''"/>
                  <span v-if="v$.user.email.$error" class="text-danger">{{ v$.user.email.$errors[0].$message }}</span>
                </div>
  
                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="typePasswordX">Password</label>
                  <input type="password" v-model="user.password" id="typePasswordX" class="form-control form-control-lg" style="background-color: black;color: white" :class="v$.user.password.$error ? 'is-invalid' : ''"/>
                  <span v-if="v$.user.password.$error" class="text-danger">{{ v$.user.password.$errors[0].$message }}</span>
                </div>
  
                <button class="btn btn-outline-light btn-lg btn-block px-5 text-center" type="submit">Login</button>
                </form>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </template>
  <script>
  import useVuelidate from '@vuelidate/core'
  import { required,email } from '@vuelidate/validators'
  export default {
      data() {
          return {
              v$: useVuelidate(),
              inccorectCredentials: false,
              user:{
                  email: '',
                  password: ''
              }
          }
      },
      validations(){
        return {
          user:{
              email: { required,email },
              password: { required }
          }
        }
      },
      methods: {
          signin(){
              this.v$.$validate()
              if(this.v$.$error){
                return;
              }
              this.$vs.loading()
              this.$store.dispatch('authModul/login',this.user)
              .then((res) => {
                  if(res.status === 200){
                    this.$router.replace({name: 'showProducts'})
                  }
                  this.$vs.loading.close()
              })
              .catch((err) => {
                this.$vs.loading.close()
                if(err.response.status === 401){
                  this.inccorectCredentials = true
                }else{
                  this.$toast.show("Refaire cette action aprés", {
                      type: 'error', 
                  });
                }
              })
          },
          mounted() {

          },
      },
  }
  </script>
  <style >
      .divider:after,
      .divider:before {
          content: "";
          flex: 1;
          height: 1px;
          background: #eee;
      }
      .img-fluid {
        max-width: 150% !important;
        height: auto;
    }
    @media screen and (max-width: 767px) {
      .img_login{
        display: none;
      }
    }
  </style>