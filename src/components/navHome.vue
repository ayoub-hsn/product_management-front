<template>
    <div class="col-6"> 
           <div class="card card-facture">
             <div class="card-statistic-4">
               <div class="align-items-center justify-content-between">
                 <div class="row ">
                   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                     <div class="card-content">
                       <h5 class="font-15 mt-1" style="color:#c4c7bb;">Facture impayé
                         
                       </h5>
                       <h2 class="mb-3 font-18"></h2>
                       <p class="mb-0"><span class="col-green"></span></p>
                       
                     </div>
                   </div>
                   <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                     <div class="float-right ">
                       <vue-feather class="ml-2" type="bell"></vue-feather>
                         <span class="badge bg-danger text-white p-2 mb-5">
                           {{nbFactureImpaye}} </span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
        <div class="col-6">
            <div class="card card-demande">
              <div class="card-statistic-4">
                <div class="align-items-center justify-content-between">
                  <div class="row ">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                      <div class="card-content">
                        <h5 class="font-15 mt-1" style="color:#c4c7bb;"> Demandes Accepter</h5>
                        <h2 class="mb-3 font-18"></h2>
                        <p class="mb-0"><span class="col-orange"></span></p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                      <div class="float-right ">
                          <vue-feather class="ml-2" type="bell"></vue-feather>
                            <span class="badge bg-danger text-white p-2 mb-5 ">
                              {{nbDemandeRecu}} </span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            nbFactureImpaye: 0,
            nbDemandeRecu: 0,
        }
    },

    mounted() {
       
    },
}
</script>
<style>
.notifi{
    border: solid white;
    
    background-color: white;
  }

  .counting{
    border: solid 1px white;
    background-color: white;
    padding-left: 5%;

    border-radius: 80%;
  }
</style>