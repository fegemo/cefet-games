<!-- { "layout": "title" } -->
# Colisão
## Determinando colisões de objetos
---
<!-- { "layout": "centered-horizontal" } -->
# Roteiro

1. Problema da colisão
1. Primitivas de colisão
   1. Círculo (2D) e esfera (3D)
   1. Retângulo (2D) e AABB (3D)
   1. OBB

*[AABB]: Axis-aligned bounding box*
*[OBB]: Oriented bounding box*

<!--
1. Colisão com raios
1. Otimizações
   1. Sweep and prune
   1. Hierarquia de objetos
   1. Divisão do espaço
-->

---
<!-- { "layout": "regular" } -->
# Colisão: Detecção e Resposta

- Queremos saber:
  1. Se objetos entraram em contato
     - Esta é a **detecção de colisão**
  1. O que fazer com eles devido à colisão
     - Determinação da **resposta da colisão**
- Nesta aula, vamos falar sobre detecção da colisão

---
<!-- { "layout": "regular" } -->
## Entidades colidíveis

- Além da **representação visual** dos objetos, atribuímos a eles uma
  **representação de colisão** - como ele se comporta no mundo físico
- Normalmente, usamos a forma mais simples possível (== barata)

  ![](../../images/bounding-volumes.png) <!-- {.centered style="max-width: 520px;"} -->
- Toda entidade no jogo possui (a) nenhum colisor, (b) 01 colisor ou (c )
  vários colisores, um para cada parte

---
<!-- { "layout": "section-header" } -->
# Primitivas de Colisão

---
<!-- { "layout": "regular" } -->
# Círculo (2D) e Esfera (3D)

- Podem ser representados por sua posição e raio (3 ou 4 valores)
  - É o colisor mais simples e barato
- Círculo <span class="math">(C, r)</span> _vs_
  ponto <span class="math">P</span>: <span class="math">\lVert\vec{P - C}\rVert \leq r</span>
  - A distância entre o ponto e o círculo deve ser menor que o raio
- Círculo _vs_ círculo:

<iframe scrolling="no" title="Circle-Circle Intersection" src="https://www.geogebra.org/material/iframe/id/dGfFnRpk/width/1346/height/584/border/888888/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/true/rc/false/ld/false/sdz/true/ctl/false" width="100%" height="300" style="border:0px;"> </iframe>

---
<!-- { "layout": "regular" } -->
# Retângulo MBR (2D) e Caixa AABB (3D)

![](../../images/mbr-aabb.png) <!-- {p:.centered style="margin-top: 0; margin-bottom: 0;"} --> <!-- {style="height: 140px;"} -->

- Representamos com 1 ponto e <span class="math">n</span> escalares (4 ou 6 valores) <!-- {ul:.full-width} -->
  - Ou por 2 ou 3 pontos (equivalente, mas mais caro) <!-- {li:.bullet} -->
- Segmento <span class="math">A(a\_{min}, a\_{max})</span> _vs_ segmento <span class="math">B(b\_{min}, b\_{max})</span>: <!-- {li:.bullet} -->
  ![](../../images/intersecao-segmentos-alinhados.png) <!-- {.centered} -->
  - Interseção ocorre se: <span class="math">a\_{max} \geq b\_{min}</span> e
    <span class="math">a\_{min} \leq b\_{max}</span> <!-- {li:.bullet} -->
- Retângulo _vs_ retângulo: _(próximo slide)_ <!-- {li:.bullet} -->

*[MBR]: Minimum bounding rectangle*
*[AABB]: Axis-aligned bounding box*
*[OBB]: Oriented bounding box*

---
<!-- { "layout": "regular" } -->
# Retângulo MBR (2D) e Caixa AABB (3D) (cont.)

![](../../images/intersecao-segmentos-alinhados.png) <!-- {p:.centered style="margin-top: 0; margin-bottom: 0;"} -->

- Retângulo _vs_ retângulo: <!-- {ul:.full-width} -->
  - A interseção dos segmentos deve acontecer nos dois eixos <!-- {li:.bullet} -->
    ![](../../images/rectangles-intersection.png) <!-- {.centered style="height: 220px;"} -->
- AABB _vs_ AABB: <!-- {li:.bullet} -->
  - A interseção dos segmentos deve acontecer nos três eixos :3 <!-- {li:.bullet} -->

*[MBR]: Minimum bounding rectangle*
*[AABB]: Axis-aligned bounding box*
*[OBB]: Oriented bounding box*

---
<!-- { "layout": "regular" } -->
## Retângulo _vs_ Círculo


- <iframe width="570" height="300" src="//jsfiddle.net/fegemo/rpd1z4L2/embedded/result/" allowfullscreen="allowfullscreen" frameborder="0" style="float: right;"></iframe>

  Passos: <!-- {ul:.full-width.bullet} -->
  1. Encontrar o ponto do retângulo mais próximo do círculo
  1. Encontrar a distância entre o centro do círculo e o ponto
     - Se a distância &leq; raio, colidiu

Mas como achar o ponto do retângulo mais próximo do círculo?? <!-- {.bullet.centered} -->

---
<!-- { "layout": "regular" } -->
# Ponto mais próximo do círculo ao retângulo

![](../../images/collision-rectangle-circle.png) <!-- {p:.centered} -->


---
<!-- { "layout": "regular" } -->
# OBB

- <iframe width="230" height="230" src="../../attachments/aabb-obb/index.html" frameborder="0" class="push-right"></iframe>

  Às vezes precisamos de retângulos ou caixas com uma orientação diferente
  daquela do sistema de coordenadas do mundo
  - Usamos **_Oriented bounding box_**
    - Gerado da mesma forma que um AABB
    - Mas rotaciona junto com a entidade
  - Vantagens:
    - Mais "justo" que um AABB
    - Rotacionar tem custo zero
  - Desvantagem:
    - Detecção de colisão é mais cara

*[OBB]: Oriented bounding box*
*[AABB]: Axis-aligned bounding box*

---
<!-- { "layout": "centered-horizontal" } -->
#OBB em 3D

<iframe width="560" height="315" src="https://www.youtube.com/embed/WmybRroLLu4?rel=0" frameborder="0" allowfullscreen class="bullet"></iframe>

...Mas como verificar se houve colisão? <!-- {.bullet} --> **Com o SAT** <!-- {.bullet} -->

---
<!-- { "layout": "regular" } -->
# [Separating Axis Theorem][sat-video] (SAT)

::: figure .picture-steps max-height: 500px;
![](../../images/sat-example-1.png) <!-- {.bullet.bespoke-bullet-active.full-width} -->
![](../../images/sat-example-2.png) <!-- {.bullet.bespoke-bullet-active.full-width} -->
![](../../images/sat-example-3.png) <!-- {.bullet.bespoke-bullet-active.full-width} -->
![](../../images/sat-example-4.png) <!-- {.bullet.bespoke-bullet-active.full-width} -->
:::

[sat-video]: https://www.youtube.com/watch?v=Ap5eBYKlGDo

---
# Referências

- Livro _Game Engine Architecture, Second Edition_
  - Capítulo 12: _Collision and Rigid Body Dynamics_


  <!-- 1. Game Eng. Arch: 666
  2. Maxim: 07-collisions (slides 41+)
  3. Sushil: Physics.pdf (14-29)
  4. Dave Mount: chapt11-physics.pdf (slides 13,14) -->
