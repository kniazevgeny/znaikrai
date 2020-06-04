<template lang="pug">
	v-card(:dark='$store.state.dark' style=" background: #E9E9E9;")
		v-container(style="margin-top: 5rem;")
			v-row
				span(class="headlinetxt") РАССКАЖИТЕ
		v-card-text
			v-container
				div(style="width: 50vw")
					span(class="subtitle1") Ваше свидетельство поможет пролить свет на происходящее в российских тюрьмах. Мы помогаем людям, чьи права были нарушены. Спасибо, что делаете это вместе с нами.
				br
				v-row(style="margin-top: 35px")
					v-col(cols='9' v-for="(value, i) in questions" :key="i")
						span(class="question") {{ value.question }}
						v-text-field(v-if="value.required", label='', v-model='form[value.name]', required, hint='Обязательное поле', persistent-hint, filled)
						v-text-field(v-else, label='', v-model='form[value.name]', filled)
				v-btn(color='black', @click='sendNewBlank()', tile, light large outlined block :loading="loadingbtn" :disabled="sent") Отправить

		//v-menu(offset-y)
						template(v-slot:activator='{ on }')
						 v-btn(text icon color='grey' v-on='on') {{currentLocale.icon}}
								v-list
										v-list-item(v-for='locale in locales' @click='changeLanguage(locale.code)' :key="locale.code")

</template>

<script lang="ts">
    import Vue from "vue";
    import Vuetify from 'vuetify';
    Vue.use(Vuetify);
    import Component from "vue-class-component";
    import * as store from "../plugins/store";
    import {i18n} from "../plugins/i18n";
    import axios from "axios";

    @Component
    export default class Tell extends Vue {

        sent: boolean = false;
        loadingbtn: boolean = false;
        questions: object = [];
        form = {};

        getQuestions() {
            axios.get(store.apibase() + "/formQuestions").then((response) => {
                console.log(response.status);
                this.questions = response.data;
            })
                .catch(err => {
                    console.log(err);
                    store.setSnackbar({
                        message: err.message,
                        color: "error",
                        active: true
                    });
                })
        }

        mounted(): void {
            this.getQuestions();
        }

        checkField(value: string) {
            return value != '' && value != undefined;
        }

        sendNewBlank() {
            console.log((this.form as any).status);
            if ( this.checkField((this.form as any).status) && this.checkField((this.form as any).region) && this.checkField((this.form as any).fsin_organization) ) {
                let b = {};
                // @ts-ignore
                for (let i = 0; i < this.questions.length; i++) {
                    // @ts-ignore
                    b[this.questions[i].name] = (this.form as any)[this.questions[i].name] == undefined ? "" : (this.form as any)[this.questions[i].name];
                }
                //console.log(b);
                this.loadingbtn = true;
                axios.post(store.apibase() + "/form",
                    b
                ).then(response => {
                    console.log(response);
                    if ( response.data.message == "ok" ) {
                        this.loadingbtn = false;
                        this.sent = true;
                        store.setSnackbar({
                            message: "Успех! Ваша заявка теперь находится в обработке.",
                            color: "success",
                            active: true
                        });
                    }
                })
                    .catch(err => {
                        store.setSnackbar({
                            message: err.message,
                            color: "error",
                            active: true
                        });
                    })
            } else {
                store.setSnackbar({
                    message: "Вы заполнили не все обязательные поля",
                    color: "error",
                    active: true
                });
            }
        }
    }
</script>

<style>
	.v-input__slot {
		border: 2px solid !important;
		border-right: 1px;
	}
</style>
<style>
	.headlinetxt {
		font-family: 'Akrobat' !important;
		font-weight: 900;
		font-style: normal;
		font-size: 7rem !important;
		line-height: 6rem;
	}

	.question {
		font-family: 'Akrobat' !important;
		color: #000;
		font-weight: bold;
		text-transform: uppercase;
		font-style: normal;
		font-size: 1.35rem !important;
		line-height: 1.2rem;
		padding-bottom: 100px;
	}

	.v-input__control > .v-input__slot {
		background-color: white !important;
	}

	.col-9 {
		padding-bottom: 2rem !important;
	}

	.subtitle1 {
		text-transform: uppercase;
		font-family: 'Akrobat' !important;
		color: #000;
		font-size: 1.2rem;
		width: 60vw;
		margin-top: 20px;
	}
</style>