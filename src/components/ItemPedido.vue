<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// Função auxiliar para formatar preço (opcional, mas bom para UX)
const formatarPreco = (preco) => {
  return `§${parseFloat(preco).toFixed(2).replace('.', ',')}` // Ex: §10,00
}
</script>

<template>
  <div class="pedido-item-row">
    <div class="item-detalhes">
      <img :src="item.imagem" :alt="item.nome_produto" class="item-imagem" />
      <div>
        <span class="item-nome">{{ item.nome_produto }}</span>
      </div>
    </div>

    <div class="item-quantidade">{{ item.quantidade }}x</div>

    <div class="item-preco-unitario">
      {{ formatarPreco(item.preco_unitario) }}
    </div>

    <div class="item-subtotal">
      <span class="label">Subtotal:</span>
      <span class="valor-subtotal">{{ formatarPreco(item.preco_unitario * item.quantidade) }}</span>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adaptados do seu componente de produto, mas com layout de linha */
.pedido-item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #333; /* Linha divisória */
  color: #c0c0c0;
}

.item-detalhes {
  display: flex;
  align-items: center;
  width: 40%;
}

.item-imagem {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
  border: 1px solid #5a5a60;
}

.item-nome {
  font-weight: bold;
  color: #fff;
  font-family: 'HollowFonte', serif;
  font-size: 1.1rem;
}

.item-quantidade,
.item-preco-unitario,
.item-subtotal {
  text-align: right;
  width: 15%;
}

.item-subtotal {
  font-weight: bold;
  color: #a9d1d1; /* Cor de destaque (Alma) */
}

/* Estilos para o Status */
.status-badge {
  font-size: 0.75rem;
  padding: 3px 6px;
  border-radius: 3px;
  display: inline-block;
  margin-top: 5px;
  font-weight: normal;
}
.status-P {
  background-color: #88721c;
  color: #fff;
} /* Pendente (Amarelo/Ouro) */
.status-A {
  background-color: #38761d;
  color: #fff;
} /* Aprovado (Verde) */
.status-E {
  background-color: #1c4587;
  color: #fff;
} /* Enviado (Azul) */
.status-C {
  background-color: #cc0000;
  color: #fff;
} /* Cancelado (Vermelho) */
</style>
