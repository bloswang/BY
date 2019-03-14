<template>
  <div id="by">
   	<top class="toper"></top>
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import top from "@/components/public/top.vue"
export default {
  components:{top:top}
}
</script>

<style lang="scss">
.toper{
  position: fixed;

}
.content{
  padding-top: 80px;
}
</style>
