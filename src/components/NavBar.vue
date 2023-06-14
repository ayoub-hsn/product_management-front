<template lang="">
    <nav class="navbar navbar-expand-lg main-navbar sticky">
      <!-- text-center ml-auto -->
        <div class="form-inline mr-auto ">
          <ul class="navbar-nav mr-3">
            <li>
              <a href="#" data-toggle="sidebar" class="nav-link nav-link-lg
									collapse-btn"><vue-feather type="align-justify"></vue-feather></a>
            </li>
          </ul>
          <ul class="navbar-nav">
   
          </ul>
          
        </div>
        <ul class="navbar-nav navbar-right">
          <li class="">
            </li>
          <li class="dropdown dropdown-list-toggle"><a href="#" data-toggle="dropdown"
              class="nav-link nav-link-lg message-toggle"><vue-feather type="bell"></vue-feather>
              <span class="badge headerBadge1">
                0</span> </a>
            <div class="dropdown-menu dropdown-list dropdown-menu-right pullDown">
              <div class="dropdown-header">
                Notifications
                <!-- <div class="float-right">
                  <a href="#">Mark All As Read</a>
                </div> -->
              </div>
              <div class="dropdown-list-content dropdown-list-message">
                  
              </div>
              <!-- <div class="dropdown-footer text-center">
                <a href="#">View All <i class="fas fa-chevron-right"></i></a>
              </div> -->
            </div>
          </li>
          
          <li class="dropdown"><a href="#" data-toggle="dropdown"
              class="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img alt="image" src="../../public/img/user.png"
                class="user-img-radious-style"> <span class="d-sm-none d-lg-inline-block"></span></a>
            <div class="dropdown-menu dropdown-menu-right pullDown">
              <div class="dropdown-title">Hello {{user ? user.name : ''}}</div>
             
              <div class="dropdown-divider"></div>
              <button type="button" @click="signOut" class="dropdown-item has-icon text-danger"> <i class="fas fa-sign-out-alt mt-2"></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
</template>


<script>
    export default {
      components:{
      
      },
      data() {
        return {
          date: '',
          user: [],
        }
      },
      head() {
        return {
         
        }
      },
      methods: {
        signOut(){
          this.$vs.loading()
          this.$store.dispatch('authModul/logout')
          .then((res) => {
            this.$vs.loading.close()
            this.$router.push({name: 'Login'})
          })
          .catch((err) => {
            this.$vs.loading.close()
          })
        },
        
      },
      mounted() {
        this.user = this.$store.getters['authModul/getUser']

        const baseUrl = window.location.origin;
        const appScript = document.createElement('script');
        appScript.src = `${baseUrl}/js/app.min.js`;
        document.head.appendChild(appScript);
        const scriptsScript = document.createElement('script');
        scriptsScript.src = `${baseUrl}/js/scripts.js`;
        document.head.appendChild(scriptsScript);
        this.$nextTick(() => {
          var BaseUrl = window.location.origin
          this.$loadScript(BaseUrl+"/js/app.min.js")
          this.$loadScript(BaseUrl+"/js/scripts.js")
        });

        

      },
    created() {
        const baseUrl = window.location.origin;
        const appScript = document.createElement('script');
        appScript.src = `${baseUrl}/js/app.min.js`;
        document.head.appendChild(appScript);
        const scriptsScript = document.createElement('script');
        scriptsScript.src = `${baseUrl}/js/scripts.js`;
        document.head.appendChild(scriptsScript);
        this.$nextTick(() => {
          var BaseUrl = window.location.origin
          const recaptchaScript1 = document.createElement("script");

          recaptchaScript1.setAttribute(
            "src",
            BaseUrl+"/js/app.min.js"
          );
          document.body.appendChild(recaptchaScript1);

        });
      
    },
    watch: {

  },
  
    }
</script>
<style>
    .ml-4, .mx-4 {
      margin-left: 0.3rem !important;
    }
   .btn-statistic{
    background: white !important;
    border: 1px solid !important;
    color: blue !important;
   }
   .btn-statistic:hover{
    background-color: #30acff !important;
   }
   .btn .badge.badge-transparent {
      background-color: rgba(13, 16, 193, 0.25) !important;
      color: #fff;
    }
    .sticky{
      background-color: #fff !important;
    }

    .navbar .form-inline .btn {
      padding: 8px 10px 8px 10px !important;
    }

    


</style>