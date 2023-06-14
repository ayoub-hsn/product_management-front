<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <router-link :to="{name: 'Home'}" class="btn btn-primary">Back Home</router-link>
    </template>
  </a-result>
</template>


<script>
// @ is an alias to /src

export default {
  
  components: {
    
  }
}
</script>
<style>
  
</style>
