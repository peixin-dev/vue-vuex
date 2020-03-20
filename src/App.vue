<template>
  <div id="app">
    {{this.$store.state.name}}
    <h1>{{this.$store.getters.myString}}</h1>
    <h2>{{this.$store.state.num}}</h2>
    <button @click="add">同步增加10</button>
    <button @click="asyncMinus">异步减5</button>
    <h3>模块的数据: {{this.$store.state.b.y}}</h3>
  </div>
</template>


<script>
export default {
  name: 'app',
  methods: {
    add() {
      this.$store.commit('syncAdd', 10)
    },
    asyncMinus(){
      this.$store.dispatch('asyncMinus', 5)
    }
  },
  mounted(){
    setTimeout(() => {
      console.log(this.$store.a)
      this.$store.state.name = 'peixin'
    }, 3000)
  }
}
</script>