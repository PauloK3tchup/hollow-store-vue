<template>
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
          <img src="../assets/img/palco-trobbio.jpg" alt="Batatas" width="1100" height="500" />
          <div class="carousel-caption">
            <h3>Ingressos para O Palco da Cidadela</h3>
            <p>Teatro da Lamentação</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/img/trupe-grimm.jpg" alt="Venom" width="1100" height="500" />
          <div class="carousel-caption">
            <h3>A Trupe do Grimm chegou em Hallownest!</h3>
            <p>Compre seus ingressos agora mesmo!</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../assets/img/mãe seda.jpg"
            alt="Venom come as batatas"
            width="1100"
            height="500"
          />
          <div class="carousel-caption">
            <h3>A GRANDE MÃE SEDA PRECISA DE VOCÊ!</h3>
            <p>Junte-se agora à força de trabalho da cidadela!</p>
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
</template>
<style scoped>
div.carousel-caption {
  color: #ffffff;
  text-shadow:
    0 0 10px #fff,
    0 0 20px #fff;
  font-family: HollowFonte;
}

div.carousel-caption p {
  font-family: 'Baskervville', serif;
}

.carousel-item {
  position: relative;
}

.carousel-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80%;
  background: linear-gradient(to top, #121212, transparent);
  /* radial-gradient(circle, rgba(63, 94, 251, 0) 0%, rgba(18, 18, 18, 1) 100%); */
  pointer-events: none;
}
</style>
