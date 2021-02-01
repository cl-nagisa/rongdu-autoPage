<template>
  <div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ECMAScript-6">
  export default {
    data() {
      return {
      };
    },
    computed: {
    },
    mounted() {
    }
  };
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "/assets/css/app.sass"
</style>
