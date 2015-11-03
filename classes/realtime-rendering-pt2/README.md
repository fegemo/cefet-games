<!--
  backdrop: aaa
-->

# Renderização em Tempo Real (parte 2)
---
## Roteiro

1. Iluminação Baseada em Imagens
1. _Forward vs Deferred Rendering_
1. _Billboarding_
1. Árvores e Vegetação
1. Efeitos (sistemas) de Partículas

---
# Renderização

---
## Características

Features/techniques associated with rendering include:
shading — how the colour and brightness of a surface varies with lighting
texture-mapping —applying detail to surfaces of a 3d mesh
bump-mapping —simulating small-scale bumpiness on surfaces
shadows — the effect of obstructing light
soft shadows — varying darkness caused by partially obscured light sources
reflection — mirror-like or highly glossy reflection
transparency — transmission of light through solid objects
translucency — highly scattered transmission of light through solid objects
indirect illumination — surface illumination by light reflected off other
       surfaces, rather than directly from a light source (global illumination)
depth of field — objects appear blurry when distance from the focal object
motion blur — objects appear blurry due to high-speed relative motion
non-photorealistic rendering — rendering of scenes in an artistic style,
       intended to look like a painting or drawing

---
# Um problema com a Renderização "tradicional"

In traditional ‘forward’ rendering, input geometry is passed through a shader program that suitably manages the geometry and provides an output (lit) colour.
A potential disadvantage of forward rendering is the often high cost associated with the lighting portion of the shader combined with the likelihood of drawing geometry which is later ‘replaced’ by closer geometry.


---
# Referências

- Livro _Game Engine Architecture, Second Edition_
  - Capítulo 10: _The Rendering Engine_
- Livro _Real-Time Rendering, Third Edition_
  - Capítulo 14: _Acceleration Algorithms_
