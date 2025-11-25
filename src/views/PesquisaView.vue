<script>
import ProdutoComp from '../components/ProdutoComp.vue'
import http from '../../http'

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
      num_pags: 20,
      maxVisiveis: 5,
    }
  },
  components: {
    ProdutoComp,
  },
  computed: {
    ...mapState(useTiposStore, ['tipoAtual', 'pesquisaAtual', 'categoriaAtual']),
    paginasVisiveis() {
      let inicio = this.pagina - 2
      let fim = this.pagina + 2
      if (inicio < 1) {
        inicio = 1
        fim = Math.min(this.num_pags, this.maxVisiveis)
      }
      if (fim > this.num_pags) {
        fim = this.num_pags
        inicio = Math.max(1, fim - (this.maxVisiveis - 1))
      }
      let paginas = []
      for (let i = inicio; i <= fim; i++) {
        paginas.push(i)
      }
      return paginas
    },
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
    async buscarProdutos() {
      try {
        this.filtrandoTipo = null
        const resposta = await http.get(
          '/produtos/?page=' +
            this.pagina +
            this.tipoAtual +
            this.categoriaAtual +
            this.pesquisaAtual,
        )
        this.produtos = resposta.data.results
        this.num_pags = resposta.data.total_pages
        console.log(this.produtos)
      } catch (error) {
        console.log(error)
      }
    },
    selecionarPagina(novaPagina) {
      if (novaPagina >= 1 && novaPagina <= this.num_pags) {
        this.pagina = novaPagina
        this.buscarProdutos()
      }
    },
  },
  mounted() {
    this.buscarProdutos()
  },
}
</script>
<template>
  <main>
    <div class="slides-destaques">
      <div class="outros-produtos">
        <h1>Resultados da Pesquisa</h1>
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
        <div class="paginacao" v-if="num_pags > 0">
          <button @click="selecionarPagina(pagina - 1)" class="btn-pag" :disabled="pagina === 1">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button
            v-for="p in paginasVisiveis"
            :key="p"
            @click="selecionarPagina(p)"
            class="btn-pag"
            :class="{ 'pag-atual': p === pagina }"
          >
            {{ p }}
          </button>
          <button
            @click="selecionarPagina(pagina + 1)"
            class="btn-pag"
            :disabled="pagina === num_pags"
          >
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
div.slides-destaques {
  padding: 5% 0 0 0;
}
</style>
