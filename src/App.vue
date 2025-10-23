<script>
import HeaderComp from './components/HeaderComp.vue'
import CarouselComp from './components/CarouselComp.vue'
import ProdutoComp from './components/ProdutoComp.vue'
import axios from 'axios'
import { useTiposStore } from './stores/tipos'
import { mapActions, mapState } from 'pinia'

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
    CarouselComp,
    ProdutoComp,
  },
  computed: {
    ...mapState(useTiposStore, ['tipoAtual', 'pesquisaAtual', 'categoriaAtual']),
  },
  watch: {
    tipoAtual() {
      this.pagina = 1
      this.buscarProdutos()
    },
    pesquisaAtual() {
      this.pagina = 1
      this.buscarProdutos()
    },
    categoriaAtual() {
      this.pagina = 1
      this.buscarProdutos()
    },
  },
  methods: {
    ...mapActions(useTiposStore, ['pegaTipo']),
    clamp(value, min, max) {
      return Math.max(min, Math.min(value, max))
    },
    async buscarCategoria() {
      try {
        const resposta = await axios.get('http://127.0.0.1:8000/api/categorias/')
        this.categorias = resposta.data.results
        console.log(this.categorias)
      } catch (error) {
        console.log(error)
      }
    },
    async buscarTipos() {
      try {
        const resposta = await axios.get('http://127.0.0.1:8000/api/tipos/')
        this.tipos = resposta.data.results
        console.log(this.tipos)
      } catch (error) {
        console.log(error)
      }
    },
    async buscarDestaques() {
      try {
        const resposta = await axios.get('http://127.0.0.1:8000/api/produtos/?page=1')
        this.destaques = resposta.data.results.slice(0, 5)
        console.log(this.destaques)
      } catch (error) {
        console.log(error)
      }
    },
    async buscarProdutos() {
      try {
        this.filtrandoTipo = null
        const resposta = await axios.get(
          'http://127.0.0.1:8000/api/produtos/?page=' +
            this.pagina +
            this.tipoAtual +
            this.categoriaAtual +
            this.pesquisaAtual,
        )
        this.produtos = resposta.data.results
        console.log(this.produtos)
      } catch (error) {
        console.log(error)
      }
    },
    selecionarPagina(pagina) {
      this.pagina = pagina
      this.clamp(this.pagina, 1, 9)
      this.buscarProdutos()
    },
  },
  mounted() {
    this.buscarProdutos()
    this.buscarDestaques()
    this.buscarCategoria()
    this.buscarTipos()
  },
}
</script>

<template>
  <body>
    <HeaderComp :buscarProdutos="buscarProdutos" :tipos="this.tipos" :categorias="categorias" />
    <!-- <div class="categorias">
      <button v-for="categoria in categorias" :key="categoria.id">{{ categoria.nome }}</button>
    </div> -->
    <main>
      <div class="slides-destaques">
        <CarouselComp />
        <div class="destaques">
          <h1>Destaques da semana</h1>
          <div class="lista-destaques">
            <ProdutoComp
              v-for="produto in destaques"
              :id="produto.id"
              :key="produto.id"
              :nome="produto.nome"
              :preco="produto.preco"
              :imagemURL="produto.imagem"
              :tipo="produto.tipo.nome"
            />
          </div>
        </div>
        <div class="outros-produtos">
          <h1>Outros Produtos</h1>
          <div class="produtos">
            <ProdutoComp
              v-for="produto in produtos"
              :id="produto.id"
              :key="produto.id"
              :nome="produto.nome"
              :preco="produto.preco"
              :imagemURL="produto.imagem"
              :tipo="produto.tipo.nome"
            />
          </div>
        </div>
        <div class="container">
          <div class="paginacao">
            <button @click="selecionarPagina(pagina - 1)">
              <i class="fa-solid fa-arrow-left"></i>
            </button>
            <p @click="selecionarPagina(pagina)" class="pag-click pag-atual">{{ pagina }}</p>
            <p @click="selecionarPagina(pagina + 1)" class="pag-click">{{ pagina + 1 }}</p>
            <p @click="selecionarPagina(pagina + 2)" class="pag-click">{{ pagina + 2 }}</p>
            <p @click="selecionarPagina(pagina + 3)" class="pag-click">{{ pagina + 3 }}</p>
            <p @click="selecionarPagina(pagina + 4)" class="pag-click">{{ pagina + 4 }}</p>
            <button @click="selecionarPagina(pagina + 1)">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </main>
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
