<!--
  backdrop: little-big-planet-3
-->

# Renderização em Tempo Real (parte 2)
---
## Roteiro

1. [Efeitos Visuais](http://fegemo.github.io/cefet-cg/classes/visual-effects/) (aula de CG)
1. Árvores e Vegetação
1. _Forward vs Deferred Rendering_

---
<!--
  backdrop: crysis3-foliage
-->

# Árvores e Vegetação

---
## Árvores e Vegetação

- ![right](../../images/trees1.png)
  A complexidade visual de grama, arbustos, árvores etc. é frequentemente
  renderizada usando um ou mais _billboards_ ou _sprites_

  ![](../../images/grass-dry.png)
- [Renderização de grama no Crysis 3](https://www.youtube.com/watch?v=Uh2Lv97OhMg)

---
## **Grama**

- ![right](../../images/grass-alpha-texture.png)
  ![cright](../../images/grass-scheme1.png)
  Grama é normalmente renderizada usando _sprites_ intersectantes, renderizados
  usando transparência
- As _sprites_ são cruzadas para que haja qualidade visual independente do
  ponto de vista
  - As normais devem apontar para cima
  - _Backface culling_ deve ser desabilitado

---
## Grama (2)

- ![right](../../images/grass-scheme2.png)
  Para dar sensação de alta densidade, as "moitinhas" devem ser colocadas
  próximas umas às outras
- Para renderizar, os testes alfa e de profundidade devem ser ativados

![](../../images/grass-dense.jpg)

---
## Grama: respondendo ao **vento**

- ![right](../../images/grass-scheme3.png)
  ![cright](../../images/grass-scheme4.png)
  Uma transformação (_shearing_) pode ser feita nas moitas, cuja intensidade
  é determinada pela quantidade de vento e o momento (tempo) corrente
- Pode ser feito em um _vertex shader_, usando funções envolvendo `sin`/`cos`
  para dar efeito de movimento ondular

---
## **Árvores**

- ![right](../../images/tree-distant.jpg)
  ![cright](../../images/tree-near.jpg)
  Quando **distante**, uma árvore pode ser **renderizada como _billboard_
  ou _impostor_**
- Quando **próxima**, separamos em:
  1. Região sólida usando malha poligonal (tronco e galhos mais grossos)
  2. Folhagem usando _sprites_

---
![](../../images/tree-wire.png)

---
![](../../images/tree-wire-bold.png)

---
<!--
  deferred-lighting
-->

# Renderização Tardia (_Deferred_)

---
## Um problema com a Renderização "tradicional"

- Na renderização tradicional (_"forward"_), a geometria é enviada
  ao _pipeline_, que (a) calcula suas posições e (b) a colore
- Um potencial problema é o **alto custo**
  (<span class="math">O(geometria * luzes)</span>) associado à porção
  relacionada à **iluminação (b)**, combinado à possibilidade
  de se **desenhar geometria** que será **posteriormente sobrescrita**
  por outra mais próxima da câmera

![](../../images/deferred-rendering-overdraw.png)

---
## Renderização Tardia (_Deferred Rendering_)

- Renderização (ou Iluminação, ou Sombreamento) Tardia é a ideia de **separar
  a renderização da geometria de sua colorização** (iluminação)
  - É um _hack_ inteligentão do _pipeline_
- Acontece em 2 passos:
  - Renderização (sem cálculo de iluminação) da cena "em texturas"
  - Colorização da textura e combinação para gerar a imagem final
- Exemplo de cena com 1000 vértices:
  - (1) 1000 vértices vão para o _pipeline_ e a geometria é rasterizada,
    cálculo de iluminação, para uma textura (na verdade, umas 4+)
    - Esse _frame buffer_ profundo se chama _g-buffer_
  - (2) as texturas são enviadas ao _pipeline_ e o _fragment shader_
    as combina, gerando a imagem final

---
## Exemplo: _Engine_ [Leadwerks](http://www.leadwerks.com/werkspace/page/home?shownav=0)

<figure style="position: relative; width: 100%; height: 585px;">
  <img src="../../images/deferred-rendering-leadwerks1.png" class="bullet bullet-no-anim" style="position: absolute; top: 0; left: 0;">
  <img src="../../images/deferred-rendering-leadwerks2.jpg" class="bullet bullet-no-anim" style="position: absolute; top: 0; left: 0;">
  <img src="../../images/deferred-rendering-leadwerks3.jpg" class="bullet bullet-no-anim" style="position: absolute; top: 0; left: 0;">
  <img src="../../images/deferred-rendering-leadwerks4.jpg" class="bullet bullet-no-anim" style="position: absolute; top: 0; left: 0;">
  <img src="../../images/deferred-rendering-leadwerks5.jpg" class="bullet bullet-no-anim" style="position: absolute; top: 0; left: 0;">
  <img src="../../images/deferred-rendering-leadwerks6.jpg" class="bullet bullet-no-anim" style="position: absolute; top: 0; left: 0;">
  <img src="../../images/deferred-rendering-leadwerks7.jpg" class="bullet bullet-no-anim" style="position: absolute; top: 0; left: 0;">
</figure>

---
## Vantagens e Desvantagens

- ![right](../../images/deferred-rendering-multiple-lights.jpg)
  Uma grande vantagem é a possibilidade de usar um **número muito maior de
  fontes de luz**
  - A complexidade é <span class="math">O(geometria + luzes)</span>
  - Apenas os pixels afetadas por uma fonte de luz precisam ter sua iluminação
    calculada para ela
- Desvantagens:
  - Difícil lidar com objetos transparentes

---
# Referências

- Livro _Game Engine Architecture, Second Edition_
  - Capítulo 10: _The Rendering Engine_
- Livro _Real-Time Rendering, Third Edition_
  - Capítulo 10: _Image-Based Rendering_
- Livro _GPU Gems_:
  - Artigo _Rendering Countless Blades of Waving Grass_
