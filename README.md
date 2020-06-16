# Знай край
Фронтенд социального и некоммерческого проекта Руси Сидящей - Знай Край. Проект был начат [на хакатоне Новой Газеты](https://projector2020.te-st.ru/).

<img src="https://github.com/semyon-dev/znai-krai/blob/master/img.png" alt="drawing" width="500"/>

## Сайт

* https://znaikrai.herokuapp.com/
* https://znai-krai.zekovnet.ru/

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
