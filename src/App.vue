<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    saveState(){
      sessionStorage.setItem('state',JSON.stringify(this.$store.state));
    }
  },
  mounted(){
    this.saveState()
  }
}
</script>

<style>

</style>
