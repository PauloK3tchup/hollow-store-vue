<script>
import HeaderComp from './components/HeaderComp.vue'
import { RouterView } from 'vue-router'

export default {
  data() {
    return {
      produtos: [],
      destaques: [],
      categorias: [],
      tipos: [],
      pagina: 1,
    }
  },
  components: {
    HeaderComp,
    RouterView,
  },
}
</script>

<template>
  <body>
    <HeaderComp :buscarProdutos="buscarProdutos" :tipos="this.tipos" :categorias="categorias" />
    <RouterView />
    <footer></footer>
  </body>
</template>

<style>
@font-face {
  font-family: HollowFonte;
  src: url(assets/Trajan\ Pro\ Regular.ttf);
}
@import url('https://fonts.googleapis.com/css2?family=Baskervville:ital,wght@0,400..700;1,400..700&display=swap');

body {
  font-family: 'Baskervville', serif;
  background-color: #252525;
  margin: 0;
  padding: 0;
  height: 100vh;
}

div.lista-destaques {
  width: 100%;
  padding: 0 15%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

div.outros-produtos {
  width: 100%;
  padding: 2% 15%;
  text-align: center;
  text-align: center;
  background-color: #252525;
}

div.produtos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

div.slides-destaques {
  width: 100%;
  height: auto;
  background-color: #121212;
}

div.destaques {
  padding: 60px;
  text-align: center;
}

button {
  background-color: #121212;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  font-family: 'HollowFonte';
  transition: 0.15s;
}

button:hover {
  text-shadow:
    0 0 10px #fff,
    0 0 20px #fff;
  box-shadow:
    0 0 10px #fff,
    inset 0 0 10px #fff;
}

div.pesquisa input {
  width: 400px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ffffff;
  font-family: 'Baskervville', serif;
  color: #ffffff;
  background-color: #121212;
}

h1 {
  color: #ffffff;
  text-shadow:
    0 0 10px #fff,
    0 0 20px #fff;
  font-family: HollowFonte;
}

.pag-click:hover {
  text-shadow:
    0 0 10px #fff,
    0 0 20px #fff;
  cursor: pointer;
}

.pag-atual {
  font-weight: bolder;
  text-decoration: underline;
}

div.paginacao {
  text-align: center;
  margin: 20px 0 60px 0;
}
div.paginacao p {
  display: inline-block;
  color: white;
  font-family: 'HollowFonte';
  font-size: 20px;
  margin: 0 15px 0 15px;
  text-align: center;
}
div.container {
  display: flex;
  justify-content: right;
  padding: 0 8%;
}
</style>
