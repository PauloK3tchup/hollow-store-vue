<script>
export default {
  props: ['nome', 'preco', 'imagemURL', 'id', 'tipo'],
}
</script>
<template>
  <div class="produto">
    <div class="foto">
      <img :src="imagemURL" alt="Dashmaster" />
    </div>
    <div class="texto">
      <h2>{{ nome }}</h2>
      <p><img src="../assets/img/rosario.png" alt="" />{{ preco }}</p>
    </div>
  </div>
</template>

<style scoped>
div.produto {
  display: flex; /* Troque de inline-block para flex */
  flex-direction: column; /* Coloca elementos um em cima do outro */
  justify-content: space-between; /* Distribui: topo e fundo */
  color: white;
  margin: 20px;
  padding: 10px;
  background-color: #121212;
  border: 1px solid white;
  border-radius: 10px;
  width: 150px;
  text-align: center;
  transition: 0.15s;
  height: 250px;
}

div.produto:hover {
  box-shadow:
    0 0 10px #fff,
    inset 0 0 10px #fff;
  text-shadow:
    0 0 10px #fff,
    0 0 20px #fff;
  cursor: pointer;
}

div.produto h2 {
  font-family: 'HollowFonte';
  font-size: 18px;
  margin: 10px 0 5px 0;
}

div.produto img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
  margin: 10px 0 10px 0;
}
div.produto p img {
  width: 20px;
  height: auto;
  margin-right: 5px;
  vertical-align: middle;
}
</style>
