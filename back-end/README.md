# API Game Beating Project

Este projeto fornece uma API RESTful para gerenciar informações relacionadas a jogos, jogadores, fabricantes e consoles. Abaixo estão as rotas disponíveis e o que se espera em cada uma delas.

## Rotas

### Game (Jogo)

- Registrar um jogo:

    Rota: `POST /api/v1/game`

    Descrição: Registra um novo jogo com as informações fornecidas.

Exemplo do corpo:
```
json:
{
  "name_game": "sonic battle",
  "developer": "SEGA",
  "genre_id": 4,
  "console_id": 3,
  "date_beating": "2024-11-26",
  "time_beating": 4.5,
  "release_year": "1999",
  "player_id": 1
}
```

# Em construção 