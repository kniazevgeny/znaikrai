<template lang="pug">
	v-container(fluid)
		h4(style="color: #D50000; font-family: 'Akrobat'!important; font-size: 2rem!important; font-weight: bold;"
		primary-title) Подпишитесь на рассылку
		v-form( ref="form" v-model="valid" lazy-validation @submit.prevent="Registration")
			span(class="question") Имя
			v-text-field(class="question-textfield" label='', v-model="name" required, hint="Обязательное поле", persistent-hint, filled :rules="nameRules")
			br
			span(class="question") Email
			v-text-field(class="question-textfield" label='', v-model="email" required, hint="Обязательное поле", persistent-hint, filled :rules="emailRules" @keyup.enter="sendMailing()")
			v-btn(outlined class="btn" @click="sendMailing()") Подписаться
</template>

<script lang="ts">
    import Vue from 'vue';
    import axios from 'axios';
    import * as store from "../plugins/store";

    export default class EmailSubscription extends Vue {
        name = "";
        email = "";
        valid = true;
        nameRules = [
            v => !!v || 'Это поле обязательно к заполнению',
            v => v.length > 2 || 'Минимум 3 символа латиницей',
            v => v.length < 30 || 'Максимум 30 символов',
            v => /^[a-zA-Zа-яА-Я0-9_]+$/.test(v) || 'Имя не должно включать в себя спецсимволы'];
        emailRules = [
            v => !!v || 'Это поле обязательно к заполнению', // /^\w*@\w+$/.test(v)
            v => v.length < 50 || 'Максимум 50 символов',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(v) || 'Проверьте корректность написания'
        ];
				sendMailing() {
				    if (this.valid){
				        axios.post(store.apibase() + "/mailing", {
				            name: this.name,
										email: this.email
				        }).then(response => {
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