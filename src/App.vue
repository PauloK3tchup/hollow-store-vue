<script setup></script>

<template>
  <body>
    <header>
      <div>
        <h1>Teste</h1>
      </div>
    </header>
    <main>
      <div class="carousel">
        <div id="demo" class="carousel slide" data-ride="carousel">
          <!-- Indicadores -->
          <ul class="carousel-indicators">
            <li data-target="#demo" data-slide-to="0" class="active"></li>
            <li data-target="#demo" data-slide-to="1"></li>
            <li data-target="#demo" data-slide-to="2"></li>
          </ul>

          <!-- Slides -->
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="./assets/img/palco-trobbio.jpg" alt="Batatas" width="1100" height="500" />
              <div class="carousel-caption">
                <h3>Ingressos para O Palco da Cidadela</h3>
                <p>Teatro da Lamentação</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="./assets/img/Venom.jpg" alt="Venom" width="1100" height="500" />
              <div class="carousel-caption">
                <h3>Não Venom</h3>
                <p>Não coma as batatas!!!!</p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="./assets/img/Venom batata.png"
                alt="Venom come as batatas"
                width="1100"
                height="500"
              />
              <div class="carousel-caption">
                <h3>Nossa</h3>
                <p>Mas que desgraçado</p>
              </div>
            </div>
          </div>

          <!-- Avançar e retornar slide -->
          <a class="carousel-control-prev" href="#demo" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </a>
          <a class="carousel-control-next" href="#demo" data-slide="next">
            <span class="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>
    </main>
    <footer></footer>
  </body>
</template>

<style scoped>
@font-face {
  font-family: HollowFonte;
  src: url(assets/Trajan\ Pro\ Regular.ttf);
}
@import url('https://fonts.googleapis.com/css2?family=Baskervville:ital,wght@0,400..700;1,400..700&display=swap');
body {
  font-family: 'Baskervville', serif;
  background-color: #252525;
  margin: 0;
  padding: 0;
  height: 100vh;
}

header {
  background-color: #121212;
  padding: 20px;
  text-align: center;
}

div.carousel-caption {
  color: #ffffff;
  text-shadow:
    0 0 10px #fff,
    0 0 20px #fff;
  font-family: HollowFonte;
}

h1 {
  color: #ffffff;
  text-shadow:
    0 0 10px #fff,
    0 0 20px #fff;
  font-family: HollowFonte;
}
.carousel-inner img {
  width: 100%;
  height: 70%;
  background-size: contain;
}
</style>
