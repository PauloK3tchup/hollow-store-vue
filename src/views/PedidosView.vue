<script setup>
import { ref, onMounted } from 'vue'
import http from '../../http' // Assumindo que seu axios wrapper está em @/http
import { useRouter } from 'vue-router'
import ItemDoPedido from '@/components/ItemPedido.vue' // Importa o componente adaptado

const router = useRouter()
const pedidos = ref([])
const isLoading = ref(true)
const erro = ref(null)

const carregarPedidos = async () => {
  const token = localStorage.getItem('user_token')

  if (!token) {
    // Se não há token, redireciona para o login
    router.push('/login')
    return
  }

  try {
    const response = await http.get('/pedidos/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    pedidos.value = response.data.results.filter((pedido) => pedido.status != 'C')
    isLoading.value = false
  } catch (err) {
    isLoading.value = false

    if (err.response && err.response.status === 401) {
      // Token expirou ou é inválido
      localStorage.removeItem('user_token')
      router.push('/login')
      erro.value = 'Sessão expirada. Faça login novamente.'
    } else {
      erro.value = 'Erro ao buscar pedidos do Reino. Tente mais tarde.'
    }
    console.error('Erro na API de pedidos:', err)
  }
}

// Quando o componente for montado, carregue os pedidos
onMounted(() => {
  carregarPedidos()
})

// Função auxiliar para calcular o total
const calcularTotalPedido = (pedido) => {
  // Esta função usa o campo total do modelo Django se estiver no serializer,
  // ou calcula a soma dos itens no frontend
  if (pedido.total) {
    return `§${parseFloat(pedido.total).toFixed(2).replace('.', ',')}`
  }

  // Cálculo de fallback no frontend
  const total = pedido.itens.reduce((acc, item) => {
    return acc + item.preco_unitario * item.quantidade
  }, 0)
  return `§${total.toFixed(2).replace('.', ',')}`
}
</script>

<template>
  <div class="pedidos-container">
    <h1 class="pedidos-titulo">Pedidos</h1>

    <div v-if="isLoading" class="loading-state">Carregando histórico do Vazio...</div>

    <div v-else-if="erro" class="error-state">
      {{ erro }}
    </div>

    <div v-else-if="pedidos.length === 0" class="empty-state">
      Você ainda não negociou Rosários.
      <router-link to="/" class="link-loja">Visite a Loja 🗝️</router-link>
    </div>

    <div v-else class="pedidos-lista">
      <div v-for="pedido in pedidos" :key="pedido.id" class="pedido-card">
        <div class="wrap" v-if="pedido.status != 'C'">
          <div class="pedido-header">
            <h3>
              Pedido #{{ pedido.id }} | Data:
              {{ new Date(pedido.data_criacao).toLocaleDateString('pt-BR') }}
            </h3>
            <h3 v-if="pedido.status != 'C'">Realizado</h3>
          </div>

          <div class="itens-header-row">
            <span style="width: 40%">Produto</span>
            <span style="width: 15%">Qtd</span>
            <span style="width: 15%; text-align: right">Preço Unit.</span>
            <span style="width: 15%; text-align: right; font-weight: bold">Subtotal</span>
          </div>

          <ItemDoPedido
            v-for="item in pedido.itens"
            :key="item.id"
            :item="item"
            :status-pedido="pedido.status"
          />

          <div class="pedido-footer">
            <span class="total-label">Total do Pedido:</span>
            <span class="total-valor">{{ calcularTotalPedido(pedido) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos Globais da Tela */
.pedidos-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a1d;
  border: 1px solid #5a5a60;
  border-radius: 10px;
  font-family: 'Lora', serif;
  padding-top: 120px;
}

.pedidos-titulo {
  color: #a9d1d1;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  text-shadow: 0 0 5px rgba(169, 209, 209, 0.5);
}

/* Estilo do Card de Pedido Individual */
.pedido-card {
  background-color: #2c2c34;
  border: 2px solid #5a5a60;
  border-radius: 8px;
  margin-bottom: 25px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.pedido-header h3 {
  color: #fff;
  border-bottom: 2px solid #444;
  padding-bottom: 10px;
  margin-top: 0;
  font-size: 1.2rem;
}

/* Header de Itens (Tabela) */
.itens-header-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  margin-top: 15px;
  font-weight: bold;
  color: #a0a0a0;
  border-bottom: 1px dashed #444;
}

/* Footer do Pedido (Total) */
.pedido-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 15px;
  margin-top: 15px;
  border-top: 2px solid #5a5a60;
}

.total-label {
  font-size: 1.1rem;
  color: #c0c0c0;
  margin-right: 15px;
}

.total-valor {
  font-size: 1.5rem;
  font-weight: bold;
  color: #a9d1d1; /* Alma */
}

/* Estados */
.loading-state,
.error-state,
.empty-state {
  color: #c0c0c0;
  text-align: center;
  padding: 50px;
  border: 1px dashed #5a5a60;
  border-radius: 8px;
  margin-top: 20px;
}

.error-state {
  color: #ff6666;
  background-color: #331a1a;
}
.link-loja {
  color: #a9d1d1;
  margin-top: 10px;
  display: block;
}
</style>
