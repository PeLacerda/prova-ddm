# O que você prefere?

Aplicativo mobile em **React Native (Expo)** no estilo *Would you rather?*. A pessoa vê duas opções e escolhe inclinando o celular:

- inclinando para a **esquerda**, seleciona a opção da esquerda
- inclinando para a **direita**, seleciona a opção da direita

As perguntas vêm da API aberta [Would-you-rather-api](https://github.com/abaanshanid/Would-you-rather-api.git).

## Objetivo

Demonstrar, de forma simples:

1. Telas em React Native (tela inicial e tela do jogo)
2. Consumo de API com **Axios**
3. Uso do **acelerômetro** com `expo-sensors`
4. Geração de um arquivo **.apk** para instalar no Android

Transfira esse arquivo para o Android e abra-o para instalar (permita “fontes desconhecidas” se o sistema pedir).

## Bibliotecas usadas

- [Expo](https://docs.expo.dev/) e React Native
- [expo-sensors](https://docs.expo.dev/versions/v54.0.0/sdk/accelerometer/) — acelerômetro
- [Axios](https://axios-http.com/) — chamadas HTTP
