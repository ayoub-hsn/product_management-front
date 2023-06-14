<template >
    <div class="loader"></div>
    <div id="app">
        <div class="main-wrapper main-wrapper-1">
            <div class="navbar-bg"></div>
            <NavbarApp/>

            <SideBarApp/>

            <!-- Main Content -->
            <div class="main-content">
                <section class="section">
                    <slot></slot>
                </section>
            </div>

        </div>
    </div>
</template>
<script>
import NavbarApp from '../components/NavBar.vue'
import SideBarApp from '../components/SideBar.vue'

export default {
    components:{
        NavbarApp,
        SideBarApp,
    }
}
</script>
<style>
   
</style>