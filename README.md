## Game Beating Project

Este projeto fornece uma API RESTful para gerenciar informações relacionadas ao jogos que um jogador já finalizou. Abaixo estão as rotas disponíveis e o que se espera em cada uma delas.

Futuramente irá ter também telas para o usuário adicionar seus jogos zerados e posteriormente terá alterações para que o usuário possa ver os jogos zerados de outros jogadores.

## O que precisa para executar este projeto

Você precisará de ter em sua máquina:
- Go (na versão 1.23.3) e;
- Executar o comando `go mod tidy` para instalar todas as dependências do projeto.

Para ver as rotas da aplicação, o README.md dela estará na pasta back-end.

## Considerações

Este é um projeto simples de código aberto. A idéia dele é automatizar o processo de uma lista de jogos zerados que eu tenho, deixando visualmente mais responsivo e fácil de adicionar um item para depois manipular essas informações.

Também é para trabalhar o conceito de ter vários usuários adicionando seus itens em uma lista e puxando essas informações posteriormente, sem ter dados de outro usuário misturado.

Por fim, sempre foi um desejo meu criar uma pequena aplicação para essa finalidade, mesmo que existam outras soluções que fazem isso de uma maneira melhor (de exemplo, Backloggd).

## Roadmap

Eu tenho algumas coisas que eu gostaria de ir implementando aos poucos, como por exemplo:

- Integração com a API do VGDB ou HLTB;
- Visualização do perfil alheio (setado se é público ou privado);
- Uma dashboard robusta, mostrando informações primárias sobre qual jogo foi zerado por último, ou quantos jogos por ano de lançamento foram zerados, entre outras informações que eu ou o usuário julgar pertinente e fazer sentido e;
- Sou honesto, gostaria de ganhar com esse projeto algum dinheiro, então implementar algum sistema de anúncios que valha a pena, sem atrapalhar a usabilidade do usuário ou então manter a aplicação via donate.

### - Modo desenvolvimento -