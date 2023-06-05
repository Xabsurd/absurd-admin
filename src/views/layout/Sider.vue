<template>
  <el-menu
    :default-active="$route.path"
    router
    :collapse="menuCollapse"
    class="Sider absurd-menu"
  >
    <CreateMenu v-bind:menuMap="menuMap" :uiText="uiText" ></CreateMenu>
  </el-menu>
</template>

<script lang="ts">
import CreateMenu from "./components/CreateMenu.vue";
import menuMap from "../../router/menuMap";
import { MainStore } from "../../store";
import { useRoute } from "vue-router";
import { defineComponent } from "vue";
// const route = useRoute();
// console.log(route);

const mainState = MainStore();
// mainState.changeLeaguage("asd");
export default defineComponent({
  components: {
    CreateMenu,
  },
  computed: {
    menuCollapse() {
      return mainState.menuCollapse;
    },
    uiText() {
      return mainState?.uiText?.sider;
    },
  },
  data() {
    return {
      menuMap: menuMap,
    };
  },
  methods: {
    // itemClick(item) {
    //   // if (window.innerWidth <= 992) {
    //   //   if (!this.$store.state.menuCollapse) {
    //   //     this.$store.commit("menuCollapse", true);
    //   //   }
    //   // }
    // },
  },
  mounted() {
  },
});
</script>

<style lang="scss" scoped>
.Sider {
  width: 220px;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  border: none;
  background-color: var(--sider-color);
  color: var(--sider-text-color);
  z-index: 1;
}
.el-menu--collapse {
  width: 0px;
}
</style>
