# ☀️ Weather App
App climatempo desenvolvido como etapa do desafio técnico [Platform Builders]().

## Features
- Desenvolvido com React Native com suporte à Android e iOS

- Acesso a localização do usuário - latitude e longitude -, e exibe a cidade do mesmo

- Busca de dados utilizando API OpenWeather

- Previsão do tempo dentro dos próximos 5 dias

- Informações extras como: velocidade do vento e umidade do ar

- Botão de atualização das informações de clima

## Preview

![RPReplay-Final1593763436-online](https://user-images.githubusercontent.com/33915907/86447683-15aa2f80-bcec-11ea-945a-a8fb3ad1cc49.gif)

## Plugins utilizados
A lista de plugins pode conter alguns outros não listados aqui por serem dependência direta destes abaixo:

- `@react-native-community/async-storage`
- `@react-native-community/geolocation`
- `@react-navigation/native`
- `lottie-react-native`

## Bibliotecas utilizadas

- `moment.js`
- `polished`
- `styled-components`
- `redux`
- `react-redux`
- `react-native-dotenv`

## Instalação
```bash
git clone https://github.com/ffrm/weather-app.git

cd weather-app && npm install
```

## Configuração
- `OPENWEATHER_APP_ID` <b>required</b> - App Id para acesso à OpenWeather API

## Executando
Para executar o app em modo desenvolvimento, basta:

```bash
# subir servidor local
npm start

# executar no dispostivo ou emulador padrão de acordo com a plataforma
npm run android
# ou
npm run ios
```

## Build android
Pode ser buildado um release - que não depende do servidor web para obter o bundle - através do comando:

```bash
cd weather-app

react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res

cd android && ./gradlew assembleRelease
```

O arquivo será gerado em `android/app/build/outputs/apk/release/app-release.apk`.

## Build iOS
Para build do app deve-se usar o Xcode.

## 
Desenvolvido por [Fernando Rama](https://github.com/ffrm).