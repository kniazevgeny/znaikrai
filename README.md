# Знайкрай
Фронтенд социального и некоммерческого проекта Руси Сидящей - Знай Край. Проект был начат [на хакатоне Новой Газеты](https://projector2020.te-st.ru/).

## Сайт

* https://znai-krai.zekovnet.ru/
* https://znaikrai.herokuapp.com/

### Использую
* Vue.js
* Vuetify
* Vuex
* Vue router для создания SPA
* TypeScript
* Node.js server
* Google Maps API
* vue2-google-maps

#### Бэкенд
* https://github.com/semyon-dev/znai-krai

Информация и метки берутся с бекенда

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
Для отображения карты нужен google maps API key. Вставьте свой ключ в компонент Gmaps.vue, туда, где берется process.env.VUE_APP_GMAPSKEY
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Лицензия
znaikrai is licensed under the Creative Commons Attribution NonCommercial ShareAlike (CC-NC-SA)

Лицензия позволяет другим перерабатывать, исправлять и развивать проект на некоммерческой основе, до тех пор пока они упоминают оригинальное авторство и лицензируют производные работы на аналогичных лицензионных условиях. Все новые работы, основанные на этом проекте, должны иметь эту же лицензию, поэтому все производные работы также должны носить некоммерческий характер.