# Workshop Unity

Este é um roteiro de workshop que ilustra o uso da Unity para a criação de um jogo de navinha com mecânica 2D e renderização 3D.
Ele é baseado no [Space Shooter Tutorial][sst] da própria Unity.

## Roteiro

1. Configurando o projeto ([:globe_with_meridians:][sst-part1])
   1. Criar um projeto 3D
   1. Inserir os assets da loja: buscar por "space shooter tutorial"
   1. Configurar o build player para desktop (talvez já esteja assim)
   1. Mudar a resolução do jogo nas configurações do player para 600x900
   1. Configurar o layout da Unity
1. O GameObject do jogador ([:globe_with_meridians:][sst-part2])
   1. Criar um GO da navinha e renomeá-lo para "Player"
   1. Resetar sua transform (para ficar na origem e sem rotação)
   1. Analisar os seus componentes
   1. Inserir um componente Rigidbody (desabilitando gravidade)
   1. Inserir um componente Capsule Collider
   1. Substituir collider por Mesh Collider (apenas trigger, convexa)
   1. Usar malha simplicada da nave para collider
   1. Inserir o prefab (Prefabs/VFX/Engines/engines_player) como filho da nave
1. Câmera e iluminação ([:globe_with_meridians:][sst-part3])
   1. Mostrar a câmera padrão
   1. Configurá-la como ortogonal
   1. Definir seu tamanho para algo próximo de 10
   1. Ajustar far para algo mais próximo (eg, 15)
   1. Movimentar câmera para possibilitar que a navinha fique no (0,0,0)
   1. Atualizar configurações de renderização para deixar o fundo preto
   1. Inserir uma fonte de luz direcional branca com ângulos (20, -115, 0) e intensidade 0.75
   1. Inserir uma fonte de luz direcional azulada com ângulos (5, 125, 0) e intensidade 0.5
   1. Inserir uma fonte de luz direcional branca com ângulos (-15, 65, 0) e intensidade 0.25
   1. Juntar as fontes de luz em um GO (para organizar)
1. Colocando um fundo ([:globe_with_meridians:][sst-part4])
   1. Criar um GO quad na cena, com nome de Background
   1. Rotacioná-lo 90º em X e dimensioná-lo em X/Y para ocupar toda a câmera
   1. Aplicar textura tile_nebula_green
   1. Alterar shader da textura para que não responda às fontes de luz (unlit/texture)
   1. Ajustar posição Y do fundo para não ficar no meio da navinha
1. Movimentando o jogador ([:globe_with_meridians:][sst-part5])
   1. Criar o script `PlayerController`:
      ```csharp
        using UnityEngine;
        using System.Collections;

        [System.Serializable]                                                           //v3
        public class Boundary                                                           //v3
        {                                                                               //v3
            public float xMin, xMax, zMin, zMax;                                        //v3
        }                                                                               //v3

        public class PlayerController : MonoBehaviour
        {
            public float speed;                                                         //v2
            public float tilt;                                                          //v4
            public Boundary boundary;                                                   //v3

            void FixedUpdate ()                                                         //v1
            {                                                                           //v1
                float moveHorizontal = Input.GetAxis ("Horizontal");                    //v1
                float moveVertical = Input.GetAxis ("Vertical");                        //v1

                Vector3 movement = new Vector3 (moveHorizontal, 0.0f, moveVertical);    //v1
                rigidbody.velocity = movement * speed;                                  //v2

                rigidbody.position = new Vector3                                        //v3
                (                                                                       //v3
                    Mathf.Clamp (rigidbody.position.x, boundary.xMin, boundary.xMax),   //v3
                    0.0f,                                                               //v3
                    Mathf.Clamp (rigidbody.position.z, boundary.zMin, boundary.zMax)    //v3
                );

                rigidbody.rotation = Quaternion.Euler (0.0f, 0.0f, rigidbody.velocity.x * -tilt);   //v4
            }                                                                           //v1
        }
      ```
1. Criando um tiro ([:globe_with_meridians:][sst-part6])
   1. Criar um GO vazio e dar o nome de Bolt
   1. Criar um quad VFX dentro dele e aplicar textura fx_laser_orange
   1. Alterar shader para aditivo
   1. Criar um capsule collider no Bolt que se ajuste
   1. Criar o componente Mover e adicoiná-lo ao Bolt (speed 5):
      ```csharp
        using UnityEngine;
        using System.Collections;

        public class Mover : MonoBehaviour
        {
            public float speed;

            void Start ()
            {
                rigidbody.velocity = transform.forward * speed;
            }
        }
      ```
   1. Criar um prefab do Bolt arrastando-o para os assets
1. Jogador atirando ([:globe_with_meridians:][sst-part7])
   1. Atualizar o código PlayerController para ter:
      ```csharp
        public GameObject shot;         // prefab do tiro
        public Transform shotSpawn;     // gameobject filho do player
        public float fireRate;          // 0.25

        private float nextFire; 
    
        void Update ()
        {
            if (Input.GetButton("Fire1") && Time.time > nextFire)
            {
                nextFire = Time.time + fireRate;
                Instantiate(shot, shotSpawn.position, shotSpawn.rotation);
            }
        }
      ```
   1. Verificar a poluição de GOs da cena (tiros nunca morrem)
1. Limites para tiros ([:globe_with_meridians:][sst-part8])
   1. Criar um 
1. Criando asteróides ([:globe_with_meridians:][sst-part9])
1. Explosões ([:globe_with_meridians:][sst-part10])
1. Controlador do jogo ([:globe_with_meridians:][sst-part11])
1. Ondas de asteróides ([:globe_with_meridians:][sst-part12])
1. Colocando áudio ([:globe_with_meridians:][sst-part13])


[sst]: https://unity3d.com/pt/learn/tutorials/s/space-shooter-tutorial
[sst-part1]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter/setting-up-the-project?playlist=17147
[sst-part2]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter/the-player-gameobject?playlist=17147
[sst-part3]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter-tutorial/camera-and-lighting?playlist=17147
[sst-part4]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter/adding-a-background?playlist=17147
[sst-part5]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter-tutorial/moving-player?playlist=17147
[sst-part6]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter-tutorial/creating-shots?playlist=17147
[sst-part7]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter/shooting-shots?playlist=17147
[sst-part8]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter-tutorial/boundary?playlist=17147
[sst-part9]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter-tutorial/creating-hazards?playlist=17147
[sst-part10]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter-tutorial/explosions?playlist=17147
[sst-part11]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter-tutorial/game-controller?playlist=17147
[sst-part12]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter/spawning-waves?playlist=17147
[sst-part13]: https://unity3d.com/pt/learn/tutorials/projects/space-shooter-tutorial/audio?playlist=17147
