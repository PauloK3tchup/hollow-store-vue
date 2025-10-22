<template>
  <header>
    <div class="logo">
      <img src="../assets/img/hollow-store-logo.png" alt="Logo Hollow Store" />
    </div>
    <div class="pesquisa">
      <input type="text" placeholder="O que você procura?" />
      <button><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    <div class="botoes">
      <button><i class="fa-solid fa-cart-shopping"></i></button>
      <button>Login</button>
      <button>Cadastro</button>
    </div>
  </header>
</template>
<style scoped>
header .logo img {
  width: 150px;
  height: auto;
}
header {
  background-color: #121212;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 15%;
}
</style>
