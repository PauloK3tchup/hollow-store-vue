import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTiposStore = defineStore('tipos', () => {
  const tipoAtual = ref('')
  const categoriaAtual = ref('')
  const pesquisaAtual = ref('')
  const produtoAtual = ref(null)
  const produtoData = ref(null)

  async function pegaProduto(produto) {
    this.produtoAtual = produto

    try {
      const resposta = await axios.get(`http://127.0.0.1:8000/api/produtos/${this.produtoAtual}/`)
      this.produtoData = resposta.data
      console.log(this.produtoData)
    } catch (erro) {
      console.error('Erro ao buscar produto:', erro)
    }
  }

  function pegaTipo(tipo) {
    this.tipoAtual = '&tipo__nome=' + tipo.nome
  }
  function tiraTipo() {
    this.tipoAtual = ''
  }

  function pegaCategoria(categoria) {
    this.categoriaAtual = '&categoria__nome=' + categoria.nome
  }
  function tiraCategoria() {
    this.categoriaAtual = ''
  }

  function pesquisar(pesquisa) {
    this.pesquisaAtual = '&search=' + pesquisa
  }
  function tiraPesquisa() {
    this.pesquisaAtual = ''
  }

  return {
    tipoAtual,
    pegaTipo,
    tiraTipo,
    categoriaAtual,
    pegaCategoria,
    tiraCategoria,
    pesquisaAtual,
    pesquisar,
    tiraPesquisa,
    produtoAtual,
    pegaProduto,
    produtoData,
  }
})
