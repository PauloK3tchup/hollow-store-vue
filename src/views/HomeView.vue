<script>
import CarouselComp from '../components/CarouselComp.vue'
import ProdutoComp from '../components/ProdutoComp.vue'
import axios from 'axios'
import { useTiposStore } from '../stores/tipos'
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
</template>
<style></style>
