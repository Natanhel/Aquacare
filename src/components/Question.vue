<template>
  <div class="Question">
    <h1>Question #{{ index }}</h1>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Question',
  props: {
      index: 0,
  },
  data: ()=>({
    
  }),

}
</script>

<style>

</style>