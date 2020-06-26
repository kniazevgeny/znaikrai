<template lang="pug">
	v-container(fluid class="pa-0")
		h4(class="mb-10" style="color: #D50000; font-family: 'Akrobat'!important; font-size: 1.8rem!important; font-weight: bold;") {{$t('navbar.subscribe')}}
		v-form(ref="form" small v-model="valid" lazy-validation @submit.prevent="sendMailing")
			span(class="question") Имя
			v-text-field(class="mt-0 mb-0" label='', v-model="name" required, persistent-hint, filled :rules="nameRules" style="max-width: 350px")
			span(class="question") Email
			v-text-field(class=" mt-0 mb-0" label='', v-model="email" required, persistent-hint, filled :rules="emailRules" style="max-width: 350px" @keyup.enter="sendMailing()")
			v-btn(class="btn" @click="sendMailing()" tile text background-color="transparent" block :disabled="sent") Подписаться
</template>

<script lang="ts">
    import Vue from 'vue';
    import Vuetify from 'vuetify';

    Vue.use(Vuetify);
    import axios from 'axios';
    import * as store from "../plugins/store";
    import {Component} from "vue-property-decorator";

    @Component
    export default class EmailSubscription extends Vue {
        name = "";
        email = "";
        valid = true;
        sent = false;
        nameRules = [
            v => !!v || 'Это поле обязательно к заполнению',
            v => v.length > 2 || 'Минимум 3 символа латиницей',
            v => v.length < 30 || 'Максимум 30 символов',
            v => /^[a-zA-Zа-яА-Я_ ]+$/.test(v) || 'Имя не должно включать в себя спецсимволы'];
        emailRules = [
            v => !!v || 'Это поле обязательно к заполнению', // /^\w*@\w+$/.test(v)
            v => v.length < 50 || 'Максимум 50 символов',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(v) || 'Проверьте корректность написания'
        ];

        sendMailing() {
            // @ts-ignore
            if ( this.$refs.form.validate() ) {
                axios.post(store.apibase() + "/mailing", {
                    name: this.name,
                    email: this.email
                }).then(response => {
                    this.sent = true;
                    store.setSnackbar({
                        message: "Спасибо. Теперь вы будете получать еженедельную рассылку",
                        color: "success",
                        active: true
                    });
                }).catch(err => {
                    store.setSnackbar({
                        message: "Что-то пошло не так. Повторите попытку",
                        color: "error",
                        active: true
                    });
                })
            }
        }

    }
</script>

<style scoped>

</style>