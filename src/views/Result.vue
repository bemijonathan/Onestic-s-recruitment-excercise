<template>
  <div class="text-center mt-3 __result">
      <router-link to="meals">
          Calculate Ingredients again
      </router-link>
  <Banner :background-media="backgroundMedia" :text="ingredientResult"/>
  </div>
</template>

<script>
import Banner from '@/components/Banner/Banner'
export default {
  name: "Result.vue",
  data(){
    return {
      backgroundMedia:{
        src:'https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-catering-food-poster-background-image_152558.jpg',
        type:"image"
      }
    }
  },
  components:{
    Banner
  },
  computed:{
    ingredientResult(){
      const result  = this.$route.query.meal
      if(typeof  result !== 'undefined' && result !== ''){
        return `Our secret Formula shows you can cook ${result}  ${ +result > 1 ? 'meals' : 'meal'   } with your ingredients`;
      }else{
        return `Error Occurred Please try again `
      }
    }
  }
}
</script>

<style scoped>
.__result {
  margin-top: var(--space-m);
}
</style>