<!--
backdrop: collision
-->

# Colisão

---
# Roteiro

1. Problema da colisão
1. Primitivas de colisão
   1. Círculo e esfera
   1. Retângulo e <abbr title="Axis-aligned bounding box">AABB</abbr>
   1. <abbr title="Oriented bounding box">OBB</abbr>

<!-- 1. Colisão com raios
1. Otimizações
   1. Sweep and prune
   1. Hierarquia de objetos
   1. Divisão do espaço -->

---
# Colisão: Detecção e Resposta

- Queremos saber:
  1. Se objetos entraram em contato
     - Esta é a **detecção de colisão**
  1. O que fazer com eles devido à colisão
     - Determinação da **resposta da colisão**
- Nesta aula, vamos falar sobre detecção da colisão

---
## Entidades colidíveis

- Além da **representação visual** dos objetos, atribuímos a eles uma
  **representação de colisão** - como ele se comporta no mundo físico
- Normalmente, usamos a forma mais simples possível (== barata)

  ![](../../images/bounding-volumes-fit.png)
- Toda entidade no jogo possui (a) nenhum colisor, (b) 01 colisor ou (c)
  vários colisores, um para cada parte

---
# Primitivas de Colisão

---
## Círculo (2D) e Esfera (3D)

- Podem ser representados por sua posição e raio (3 ou 4 valores)
  - É o colisor mais simples e barato
- Círculo <span class="math">(C, r)</span> _vs_
  ponto <span class="math">P</span>: <span class="math">\lVert\vec{P - C}\rVert \leq r</span>
  - A distância entre o ponto e o círculo deve ser menor que o raio
- Círculo _vs_ círculo:

  <iframe scrolling="no" title="Circle-Circle Intersection" src="https://www.geogebra.org/material/iframe/id/dGfFnRpk/width/1346/height/584/border/888888/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/true/rc/false/ld/false/sdz/true/ctl/false" width="720" height="300" style="border:0px;"> </iframe>

---
## Retângulo <abbr title="Minimum bounding rectangle">MBR</abbr> (2D) e Caixa <abbr title="Axis-aligned bounding box">AABB</abbr> (3D)

![](../../images/mbr-aabb.png)

- Representamos com uma posição e n escalares (4 ou 6 valores)
  - Ou por 2 ou 3 pontos (equivalente, mas mais caro)
- Segmento <span class="math">A(a\_{min}, a\_{max})</span> _vs_ segmento <span class="math">B(b\_{min}, b\_{max})</span>:
  ![](../../images/intersecao-segmentos-alinhados.png)
  - Interseção ocorre se: <span class="math">a\_{max} \geq b\_{min}</span> e
    <span class="math">a\_{min} \leq b\_{max}</span>
- Retângulo _vs_ retângulo: _(próximo slide)_

---
## Retângulo <abbr title="Minimal bounding rectangle">MBR</abbr> (2D) e Caixa <abbr title="Axis-aligned bounding box">AABB</abbr> (3D) (cont.)

![](../../images/intersecao-segmentos-alinhados.png)

- Retângulo _vs_ retângulo:
  - A interseção dos segmentos deve acontecer nos dois eixos

    ![](../../images/rectangles-intersection.png)
- AABB _vs_ AABB:
  - A interseção dos segmentos deve acontecer nos três eixos :3

---
## Retângulo _vs_ Círculo

<iframe width="100%" height="300" src="//jsfiddle.net/fegemo/rpd1z4L2/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

- Passos:
  1. Encontrar o ponto do retângulo mais próximo do círculo (próximo slide)
  1. Encontrar a distância entre o centro do círculo e o ponto
     - Se a distância &leq; raio, colidiu

---
## Ponto mais próximo do círculo ao retângulo

![](../../images/collision-rectangle-circle.png)


---
<iframe width="560" height="315" src="https://www.youtube.com/embed/WmybRroLLu4?rel=0" frameborder="0" allowfullscreen></iframe>

---
## <abbr title="Oriented bounding box">OBB</abbr>

- Às vezes precisamos de retângulos ou caixas com uma orientação diferente
  daquela do sistema de coordenadas do mundo
  - _Oriented bounding box_
    - Gerado da mesma forma que um AABB
    - Mas rotaciona junto com a entidade
  - Vantagens:
    - Mais "justo" que um AABB
    - Rotacionar tem custo zero
  - Desvantagem:
    - Detecção de colisão é mais cara

---
## [Separating Axis Theorem][sat-video] (SAT)

<figure class="picture-steps" style="max-height: 500px">
  <img src="../../images/sat-example-1.png" class="bullet bespoke-bullet-active full-width">
  <img src="../../images/sat-example-2.png" class="bullet full-width">
  <img src="../../images/sat-example-3.png" class="bullet full-width">
  <img src="../../images/sat-example-4.png" class="bullet full-width">
</figure>

[sat-video]: https://www.youtube.com/watch?v=Ap5eBYKlGDo

---
# Referências

- Livro _Game Engine Architecture, Second Edition_
  - Capítulo 12: _Collision and Rigid Body Dynamics_


  <!-- 1. Game Eng. Arch: 666
  2. Maxim: 07-collisions (slides 41+)
  3. Sushil: Physics.pdf (14-29)
  4. Dave Mount: chapt11-physics.pdf (slides 13,14) -->
