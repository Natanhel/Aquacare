<template>
  <div class="categorizer">
    <h1 class="header">Categorizer</h1>

    <question index="1"/>

  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue'
// import DeseasesTable from 'Deseases.vue'
export default {
  name: 'categorizer',
  components:{
    Question,
    // DeseasesTable,
  },
}
</script>

<style>
.header{
  align-content: center;
  align-self: center;
  
}
</style>