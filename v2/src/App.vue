<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, RouterView } from 'vue-router'
import MyNav from './components/Nav.vue'
const router = useRouter();

const home = ref<HTMLDivElement>();
const about = ref<HTMLDivElement>();

const navigatorTo = (path: string) => {
  router.push(path)
  if (path === '/') {
    home.value!.classList.remove('inactive')
    home.value!.classList.add('active')
    about.value!.classList.remove('active')
    about.value!.classList.add('inactive')
  }
  else {
    about.value!.classList.remove('inactive')
    about.value!.classList.add('active')
    home.value!.classList.remove('active')
    home.value!.classList.add('inactive')
  }

}

onMounted(() => {
  home.value!.classList.add('active')
  about.value!.classList.add('inactive')
})

</script>

<template>
  <div class="container">
    <MyNav>
      <template #nav-item>
        <div ref="home" @click="navigatorTo('/')"><img class="nav-icon" src="./assets/home.svg" alt="" srcset="">Home
        </div>
        <div ref="about" @click="navigatorTo('/about')"><img class="nav-icon" src="./assets/about.svg" alt=""
            srcset="">About</div>
      </template>
    </MyNav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style lang="less">
::selection,
::-moz-selection {
  background: #3949B8;
  color: #fff;
}

.container {
  background-color: rgb(148, 148, 148);
  height: 100dvh;
  background-image: url("./assets/star.jpg");
  background-size: cover;
}

@media screen and (max-width: 768px) {
  .container {
    background-position: center;
  }
}

.active {

  &::after {
    display: block;
    content: url("./assets/star_icon.svg");
    margin: 0 auto;
  }
}

.inactive {

  &::after {
    display: block;
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #3949B8;
    margin: 0 auto;
  }
}

.nav-icon {
  display: inline-block;
  margin-right: 10px;
}

@media screen and (max-width: 768px) {
  .nav-icon {
    display: none;
  }
}
</style>