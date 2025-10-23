import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTiposStore = defineStore('tipos', () => {
  const tipoAtual = ref('')
  const categoriaAtual = ref('')
  const pesquisaAtual = ref('')

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
  }
})
