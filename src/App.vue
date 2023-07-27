<template>
  <Cloud></Cloud>
  <City></City>
</template>

<script >
import {  defineComponent } from 'vue';
import Cloud from "@/components/cloud.vue"
import City from "@/components/City.vue"


export default defineComponent({
 
  components: {Cloud,City},
  props: {},
  setup() {
    
  }
});
</script>

<style>

</style>
