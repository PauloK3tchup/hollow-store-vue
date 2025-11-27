<script>
import { useTiposStore } from '../stores/tipos'
import http from '../../http'
import { mapState } from 'pinia'
export default {
  data() {
    return {
      produto: null,
      item: {},
      quantidade: 1,
    }
  },
  computed: {
    ...mapState(useTiposStore, ['produtoAtual', 'produtoData']),
  },
  methods: {
    formatPrice(price) {
      const num = parseFloat(price)
      return new Intl.NumberFormat('pt-BR').format(num)
    },
    async addCarrinho() {
      this.item = {
        status: 'C',
        itens: [
          {
            produto: this.produtoAtual,
            imagem: this.produtoData.imagem,
            nome_produto: this.produtoData.nome,
            preco_unitario: this.produtoData.preco,
            quantidade: this.quantidade,
          },
        ],
      }
      const token = localStorage.getItem('user_token')

      if (!token) {
        this.$router.push('/login')
        return
      }

      try {
        await http.post('/pedidos/', this.item, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        alert('Item adicionado ao carrinho com sucesso!')
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Token expirou ou é inválido
          localStorage.removeItem('user_token')
          this.$router.push('/login')
          alert('Sessão expirada. Faça login novamente.')
        } else {
          alert('Erro ao adicionar item ao carrinho. Tente mais tarde.')
        }
        console.error('Erro na API de carrinho:', err)
      }
    },
  },
}
</script>

<template>
  <div class="page-background">
    <div class="product-page-container">
      <div class="page-left-column">
        <div class="image-showcase">
          <img :src="produtoData.imagem" :alt="produtoData.nome" class="product-image" />
        </div>
      </div>

      <div class="page-right-column">
        <div class="product-tags">
          <span class="tag">{{ produtoData.categoria.nome }}</span>
          <span class="tag">{{ produtoData.tipo.nome }}</span>
        </div>

        <h1 class="product-title">{{ produtoData.nome }}</h1>

        <p class="product-description">{{ produtoData.descricao }}</p>

        <div class="product-stats">
          <h2>Atributos</h2>
          <ul>
            <li v-if="produtoData.efeito != ''">
              <span class="stat-label">{{ produtoData.efeito }}</span>
            </li>
            <li v-if="produtoData.seda != null">
              <span class="stat-label">Seda</span>
              <span class="stat-value">{{ produtoData.seda }}</span>
            </li>
            <li v-if="produtoData.alma != null">
              <span class="stat-label">Alma</span>
              <span class="stat-value">{{ produtoData.alma }}</span>
            </li>
            <li v-if="produtoData.dano != null">
              <span class="stat-label">Dano</span>
              <span class="stat-value">{{ produtoData.dano }}</span>
            </li>
            <li v-if="produtoData.defesa != null">
              <span class="stat-label">Defesa</span>
              <span class="stat-value">{{ produtoData.defesa }}</span>
            </li>
            <li v-if="produtoData.durabilidade != null">
              <span class="stat-label">Durabilidade</span>
              <span class="stat-value">{{ produtoData.durabilidade }}</span>
            </li>
            <li v-if="produtoData.tipo.nome == 'Amuleto'">
              <span class="stat-label">Custo de Encaixe</span>
              <span class="stat-value slot-cost">
                {{ '●'.repeat(produtoData.slot_custo) }}
              </span>
            </li>
          </ul>
        </div>
        <div class="hollow-container">
          <label for="qnt">Quantidade</label>
          <button @click="quantidade--">-</button>
          <input v-model="quantidade" type="number" name="qnt" id="qnt" />
          <button @click="quantidade++">+</button>
        </div>

        <div class="purchase-box">
          <div class="product-price">
            <img src="../assets/img/rosario.png" alt="Ícone Rosário" class="rosario-icon" />
            {{ formatPrice(produtoData.preco) }}
          </div>
          <button @click="addCarrinho" class="buy-button">Adquirir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const formatPrice = (price) => {
  const num = parseFloat(price)
  return new Intl.NumberFormat('pt-BR').format(num)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap');

/* Fonte recomendada (opcional): Alegreya, Cinzel, Crimson Text */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');

.hollow-container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1a1a1d;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid #4c4f5a;
  box-shadow: 0 0 12px rgba(150, 150, 255, 0.1);
  width: fit-content;
}

.hollow-container label {
  font-family: 'Cinzel', serif;
  color: #e8e6f2;
  font-size: 14px;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.25);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}

.hollow-container input {
  width: 60px;
  padding: 6px;
  background: #0f0f11;
  border: 2px solid #3d3f47;
  border-radius: 6px;
  color: #e8e6f2;
  font-family: 'Cinzel', serif;
  font-size: 14px;
  text-align: center;
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.05);
  transition: 0.2s;
}

.hollow-container input:focus {
  border-color: #8a8df0;
  outline: none;
  box-shadow: 0 0 8px #7b7ef5;
}

.hollow-container button {
  background: #121215;
  border: 2px solid #3d3f47;
  color: #e8e6f2;
  padding: 4px 10px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.hollow-container button:hover {
  border-color: #8a8df0;
  color: #ffffff;
  box-shadow: 0 0 8px #7b7ef5;
}

.hollow-container button:active {
  transform: scale(0.92);
}

.page-background {
  background-color: #1a1a1d;
  min-height: 100vh;
  padding: 5% 40px 40px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lora', 'Georgia', serif;
}

.product-page-container {
  display: flex;
  max-width: 1200px;
  width: 100%;
  background-color: #2c2c34;
  border: 4px solid #7a7a80;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

.page-left-column {
  flex-basis: 45%;
  background-color: #40404a;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 3px solid #7a7a80;
}

.image-showcase {
  background: #1a1a1d;
  padding: 20px;
  border: 2px solid #5a5a60;
  border-radius: 6px;
}

.product-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  transform: scale(2);
}

.page-right-column {
  flex-basis: 55%;
  padding: 40px;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
}

.product-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.tag {
  background-color: #40404a;
  border: 1px solid #7a7a80;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #c0c0c0;
}

.product-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  margin-bottom: 16px;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
}

.product-description {
  font-size: 1.1rem;
  font-style: italic;
  color: #c0c0c0;
  line-height: 1.6;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 2px dashed #5a5a60;
}

.product-stats {
  margin-bottom: 30px;
}

.product-stats h2 {
  font-size: 1.5rem;
  color: #fff;
  border-bottom: 1px solid #7a7a80;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.product-stats ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-stats li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  padding: 15px;
  background-color: #1a1a1d;
  border: 1px solid #5a5a60;
  border-radius: 6px;
  margin-bottom: 10px;
}

.stat-label {
  color: #a0a0a0;
}

.stat-value {
  color: #ffffff;
  font-weight: 700;
}

.slot-cost {
  color: #a9d1d1;
  font-size: 1.8rem;
  line-height: 1;
}

.purchase-box {
  margin-top: auto;
  background-color: #1a1a1d;
  border: 2px solid #a9d1d1;
  border-radius: 8px;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px rgba(169, 209, 209, 0.2);
}

.product-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
}

.rosario-icon {
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.buy-button {
  background-color: #a9d1d1;
  color: #1a1a1d;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  padding: 15px 30px;
  font-family: 'Lora', serif;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.buy-button:hover {
  background-color: #ffffff;
  color: #1a1a1d;
  box-shadow: 0 0 15px #a9d1d1;
  transform: translateY(-2px);
}
</style>
