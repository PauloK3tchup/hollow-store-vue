<script setup>
import { ref, onMounted } from 'vue' // Importe onMounted
import http from '../../http'
const email = ref('')
const password = ref('')
const loginError = ref(false)
const isLoggedIn = ref(false) // Novo: Estado de Login
const username = ref('') // Novo: Para armazenar o nome de usuário (para testes)

// Função para verificar o estado de login
const checkLoginStatus = () => {
  const token = localStorage.getItem('user_token')
  if (token) {
    isLoggedIn.value = true
    // Para testes, vamos simular que o nome de usuário está disponível
    // Na vida real, você faria uma requisição GET para /api/user/ para buscar o nome.
    username.value = 'Viajante Fantasma'
  } else {
    isLoggedIn.value = false
    username.value = ''
  }
}

// Executa a verificação assim que o componente é montado
onMounted(() => {
  checkLoginStatus()
})

const mudatela = () => {
  this.$router.push('/pedidos')
}

const handleLogin = async () => {
  loginError.value = false

  try {
    const response = await http.post('/token/', {
      username: email.value,
      password: password.value,
    })

    const token = response.data.access

    if (token) {
      localStorage.setItem('user_token', token)
      checkLoginStatus() // Atualiza o estado de login após o sucesso

      // Opcional: Redireciona, mas para testes pode ficar na mesma página
      // router.push('/produtos')
    } else {
      loginError.value = true
    }
  } catch (error) {
    console.error('Erro de Login:', error)
    if (error.response && error.response.status === 401) {
      loginError.value = 'Vazio não aceita viajantes desconhecidos. Verifique seu email e senha.'
    } else {
      loginError.value = 'Falha ao conectar-se ao Reino. Tente novamente mais tarde.'
    }
  }
}

// Novo: Função para deslogar (para fins de teste)
const handleLogout = () => {
  localStorage.removeItem('user_token')
  checkLoginStatus() // Atualiza o estado para "deslogado"
}
</script>
<template>
  <div class="login-background">
    <div class="login-card logged-in-card" v-if="isLoggedIn">
      <div class="login-header">
        <div class="icon-container">
          <img src="../assets/img/rosario.png" alt="Logo Rosário" class="login-logo large-rosary" />
        </div>
        <h1 class="login-title">Bem-vindo(a) de volta!</h1>
        <!-- <p class="login-subtitle greeting-text">Usuário: {{ username }}</p> -->
      </div>

      <div class="logged-in-actions">
        <button @click="mudatela" class="login-button logout-button">Pedidos</button>
        <button @click="handleLogout" class="login-button logout-button">Sair do Vazio</button>
      </div>
    </div>

    <div class="login-card" v-else>
      <div class="login-header">
        <div class="icon-container">
          <img src="../assets/img/rosario.png" alt="Logo Rosário" class="login-logo" />
        </div>
        <h1 class="login-title">Acessar Loja</h1>
        <p class="login-subtitle">Entre para negociar seus Rosários</p>
      </div>

      <div v-if="loginError" class="error-message">
        {{ loginError }}
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Nome de Usuário</label>
          <input
            type="text"
            id="email"
            v-model="email"
            placeholder="Viajante de Hallownest"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="login-button">Entrar no Vazio</button>

        <div class="login-footer">
          <a href="#" class="forgot-link">Esqueceu a senha?</a>
          <span class="separator">|</span>
          <a class="register-link"><RouterLink to="/criarconta">Criar Conta</RouterLink></a>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
/* Estilos existentes... */

/* Adicione estilo para a mensagem de erro */
.error-message {
  background-color: #883333; /* Vermelho escuro */
  color: #ffffff;
  border: 1px solid #ff6666;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
  font-style: italic;
}

/* O restante do seu CSS... */
/* Fonte Temática */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&display=swap');

/* Fundo da Página */
.login-background {
  background-color: #1a1a1d; /* Escuridão */
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px, 20px, 20px, 20px;
  font-family: 'Lora', 'Georgia', serif;

  /* Um efeito sutil de vinheta no fundo (opcional) */
  background-image: radial-gradient(circle at center, #2c2c34 0%, #1a1a1d 70%);
}

/* Card de Login */
.login-card {
  width: 100%;
  max-width: 400px;
  background-color: #2c2c34;
  border: 3px solid #7a7a80;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
}

/* Detalhe decorativo no topo do card */
.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #a9d1d1; /* Cor da Alma */
}

/* Cabeçalho */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.icon-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background-color: #1a1a1d;
  border: 2px solid #5a5a60;
  border-radius: 50%;
  margin-bottom: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.login-logo {
  width: 40px;
  height: auto;
  image-rendering: pixelated; /* Mantém o estilo pixel art nítido */
}

.login-title {
  color: #ffffff;
  font-size: 2rem;
  margin: 0;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
}

.login-subtitle {
  color: #a0a0a0;
  font-style: italic;
  font-size: 0.95rem;
  margin-top: 5px;
}

/* Formulário */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  color: #c0c0c0;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

input {
  background-color: #1a1a1d;
  border: 2px solid #5a5a60;
  border-radius: 4px;
  padding: 12px 15px;
  color: #ffffff;
  font-family: 'Lora', serif;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

input::placeholder {
  color: #5a5a60;
  font-style: italic;
}

/* Efeito de foco inspirado na Alma (brilho azul) */
input:focus {
  border-color: #a9d1d1;
  box-shadow: 0 0 8px rgba(169, 209, 209, 0.3);
}

/* Botão */
.login-button {
  margin-top: 10px;
  background-color: #a9d1d1;
  color: #1a1a1d;
  border: 2px solid #e0e0e0;
  padding: 14px;
  font-family: 'Lora', serif;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.login-button:hover {
  background-color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(169, 209, 209, 0.6);
}

.login-button:active {
  transform: translateY(0);
}

/* Footer (Links) */
.login-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 0.9rem;
}

.login-footer a {
  color: #808080;
  text-decoration: none;
  transition: color 0.2s;
}

.login-footer a:hover {
  color: #a9d1d1;
  text-decoration: underline;
}

.separator {
  color: #40404a;
}

.logged-in-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 450px; /* Garante que o card logado tenha tamanho similar */
}

.large-rosary {
  width: 60px; /* Aumenta o tamanho da imagem do Rosário na tela logada */
}

.greeting-text {
  font-size: 1.1rem;
  font-style: normal;
  color: #a9d1d1;
  margin-top: 15px;
}

.logged-in-actions {
  margin-top: 30px;
  text-align: center;
  width: 100%;
}

.logout-button {
  background-color: #7a7a80; /* Cor diferente para o botão Sair */
}

.logout-button:hover {
  background-color: #c0c0c0;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.test-info {
  font-size: 0.8rem;
  color: #5a5a60;
  margin-top: 15px;
}
</style>
