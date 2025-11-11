<script>
import { useTiposStore } from '../stores/tipos'
import { mapState } from 'pinia'
export default {
  data() {
    return {
      produto: null,
    }
  },
  computed: {
    ...mapState(useTiposStore, ['produtoAtual', 'produtoData']),
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
            <li>
              <span class="stat-label">Dano</span>
              <span class="stat-value">{{ produtoData.dano }}</span>
            </li>
            <li>
              <span class="stat-label">Durabilidade</span>
              <span class="stat-value">{{ produtoData.durabilidade }}</span>
            </li>
            <li>
              <span class="stat-label">Custo de Encaixe</span>
              <span class="stat-value slot-cost">
                {{ '●'.repeat(produtoData.slot_custo) }}
              </span>
            </li>
          </ul>
        </div>

        <div class="purchase-box">
          <div class="product-price">
            <img src="../assets/img/rosario.png" alt="Ícone Rosário" class="rosario-icon" />
            {{ formatPrice(produtoData.preco) }}
          </div>

          <button class="buy-button">Adquirir</button>
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

.page-background {
  background-color: #1a1a1d;
  min-height: 100vh;
  padding: 40px;
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
