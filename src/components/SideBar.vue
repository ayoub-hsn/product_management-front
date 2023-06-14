<template lang="">
    <div class="main-sidebar sidebar-style-2 sdBar">
        <aside id="sidebar-wrapper">
          <div class="sidebar-brand">
            <a href="#"><span
                class="logo-name">Example</span>
            </a>
          </div>
          <ul class="sidebar-menu">
            <li class="menu-header">Main</li>
            <li class="dropdown">
              <router-link :to="{ name:'showProducts' }" class="nav-link"><img width="25" class="mr-2" src="../../public/icons/home.svg" alt=""><span>Products</span></router-link>
            </li>
          </ul>
        </aside>
      </div>
   
</template>

<script>

export default {

 
  
  components:{


  },

  props:['stockActive','orderActive','prepareOrders','menusDeroulant','prospection','menusHistorique'],
  data() {
    return {
      script: '',
      category: '',
      user: null,
    }
  },
  mounted() {
    this.category = this.$store.state.categoryId
    this.user = this.$store.getters['authModul/getUser']
    console.log(this.user)

    if(this.orderActive){
      $('#order').addClass('active')
    }
      if(this.stockActive){
        $('#stock').addClass('active')
      }

      if(this.prepareOrders){
        $('#prepareOrder').addClass('active')
      }

      if(this.menusDeroulant){
        $('#menusDeroulant').addClass('active')
      }

      if(this.prospection){
        $('#prospection').addClass('active')
      }

      if(this.menusHistorique){
        $('#menusHistorique').addClass('active')
      }

  },
  methods: {
   
  },
  

  created() {
    this.user = this.$store.getters['authModul/getUser']
    var BaseUrl = window.location.origin
    
    this.$loadScript(BaseUrl+"/js/app.min.js")
    this.$loadScript(BaseUrl+"/js/scripts.js")
  
    const recaptchaScript1 = document.createElement("script");

    recaptchaScript1.setAttribute(
      "src",
      BaseUrl+"/js/app.min.js"
    );

    document.body.appendChild(recaptchaScript1);

    const recaptchaScript2 = document.createElement("script");

    recaptchaScript2.setAttribute(
      "src",
      "/js/scripts.js"
    );


    document.body.appendChild(recaptchaScript2);
   
  },
    
}
</script>
<style>
  .sdBar{
    background-color: #fff !important;
  }
  /* .light-sidebar:not(.sidebar-mini) .sidebar-style-2 .sidebar-menu>li.active ul.dropdown-menu li a {
    background-color: #efefef !important;
  } */
   .router-link-active{
    background-color: #cbe6f7  ;
    color: #30acff !important;
    font-weight: bold;
   }
   .main-sidebar .sidebar-menu li a span {
    font-size: 90% !important;
    margin-top: 3px;
    width: 100%;
  }
   /* .router-link-exact-active{
      color: #2ecc71 ;
   }
   .active{
      color: black !important;
      background-color: #2ecc71 !important;
   }
   .main-sidebar .sidebar-menu li a:hover {
      color: black !important;
      background-color: #2ecc71 !important;
   }
  .light-sidebar .main-sidebar .sidebar-menu li.active a {
    background-color: #ddf5e7 !important;
  }
  body:not(.sidebar-mini) .sidebar-style-2 .sidebar-menu>li.active>a {
    color: #2ecc71;
  }
  .sub_menu:active{
    color: #2ecc71 !important;
  } */
</style>