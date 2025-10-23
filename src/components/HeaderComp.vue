<script>
import { useTiposStore } from '../stores/tipos'
import { mapActions } from 'pinia'

export default {
  name: 'HeaderComp',
  data() {
    return {
      drop: false,
      pesquisaTexto: '',
      view: {
        topOfPage: true,
      },
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  props: {
    tipos: {
      type: Array,
      required: true,
    },
    buscarProdutos: {
      type: Function,
      required: true,
    },
    categorias: {
      type: Array,
      required: false,
    },
  },
  methods: {
    ...mapActions(useTiposStore, [
      'pegaTipo',
      'tiraTipo',
      'pesquisar',
      'tiraPesquisa',
      'pegaCategoria',
      'tiraCategoria',
    ]),
    pesquisaAqui() {
      if (this.pesquisaTexto.trim() !== '') {
        this.pesquisar(this.pesquisaTexto.trim())
      } else {
        this.tiraPesquisa()
      }
    },
    handleScroll() {
      if (window.pageYOffset > 0) {
        if (this.view.topOfPage) this.view.topOfPage = false
      } else {
        if (!this.view.topOfPage) this.view.topOfPage = true
      }
    },
    dropar() {
      this.drop = !this.drop
    },
  },
}
</script>
<template>
  <header :class="{ onScroll: !view.topOfPage }">
    <div class="acima">
      <div class="logo">
        <img src="../assets/img/hollow-store-logo.png" alt="Logo Hollow Store" />
      </div>
      <div class="pesquisa">
        <input v-model="pesquisaTexto" type="text" placeholder="O que você procura?" />
        <button @click="pesquisaAqui()"><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <div class="botoes">
        <button><i class="fa-solid fa-cart-shopping"></i></button>
        <button @click="dropar">Filtrar</button>
        <button>Entrar</button>
      </div>
    </div>
    <div v-if="drop" class="abaixo">
      <div class="tipos linha">
        <button v-for="tipo in tipos" :key="tipo.id" @click="pegaTipo(tipo)">
          {{ tipo.nome }}
        </button>
        <button @click="tiraTipo()">Nenhum</button>
      </div>
      <div class="tipos">
        <button
          v-for="categoria in categorias"
          :key="categoria.id"
          @click="pegaCategoria(categoria)"
        >
          {{ categoria.nome }}
        </button>
        <button @click="tiraCategoria()">Nenhum</button>
      </div>
    </div>
  </header>
</template>
<style scoped>
header .logo img {
  width: 150px;
  height: auto;
}
header {
  background: linear-gradient(to bottom, #121212, transparent);
  width: 100%;
  padding: 10px 15%;
  position: fixed;
  z-index: 1000;
  transition: 0.25s;
}
div.acima {
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.linha {
  padding: 0 0 10px 0;
  border-bottom: 1px solid #ffffff;
}

div.abaixo {
  margin-top: 12px;
}
div.abaixo button {
  padding: 6px 6px;
}
header.onScroll {
  background-color: #121212;
}

button {
  background-color: #12121200;
  font-size: small;
}

input[type='text'] {
  background-color: #12121200;
}

h2 {
  color: white;
  font-family: 'HollowFonte';
  font-size: 20px;
  text-align: center;
}

div.tipos {
  display: flex;
  flex: wrap;
  margin-bottom: 10px;
}
</style>
