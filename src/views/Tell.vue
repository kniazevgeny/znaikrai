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
						div(v-if="value.type === 'text'")
							span(class="question") {{ value.question }}
							v-text-field(class="question-textfield" v-if="value.required", label='', v-model='form[value.name]', required, hint='Обязательное поле', persistent-hint, filled)
							v-text-field(class="question-textfield" v-else, label='', v-model='form[value.name]', filled)
						div(v-if="value.type === 'choose_one'")
							span(class="question") {{ value.question }}
							v-item-group(v-model="form[value.name]" :mandatory="value.required")
								div(v-for="(n, i) in checkboxes[value.name]" :key="i" )
									v-item(v-slot:default="{ active, toggle }")
										span(class="question-checkbox" @click="toggle")
											z-checkbox(:checked="active" style="transform: scale(1.5);" class="ml-1") {{ n }}
											span(class="ml-6") {{n}}
								span(v-if="checkboxes[value.name][form[value.name]] === 'Другое'")
									v-text-field(class="question-textfield" label='', v-model='other[value.name]', filled)
								span(v-if="value.required" class="caption") Обязательное поле
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
        questions: object[] = [];
        checkboxes: object[] = []; //checkbox values
        other: object[] = []; //other values
        form = {};


        setCheckboxes() {
            this.questions.forEach(value => {
                if ( "text" !== (value as any).type ) {
                    this.checkboxes[(value as any).name] = (value as any).values;
                    return (value as any).values;
                }
            })
        }

        getQuestions() {
            axios.get(store.apibase() + "/formQuestions").then((response) => {
                console.log("questions", response.status);
                //console.log(response.data);
                this.questions = response.data;
                console.log(this.questions);
                this.setCheckboxes();
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

        checkField(value) {
            console.log(value);
            return value != undefined && value.toString() != "";
        }

        checkRequired() {
            //console.log((this.form as any)['public_disclosure']);
            let ans = true;
            this.questions.forEach(value => {
                if ( (value as any).required ) {
                    if ( (value as any).type === 'text' ) {
                        //console.log(this.checkField((this.form as any)[(value as any).name]) == false, (value as any).name);
                        if ( this.checkField((this.form as any)[(value as any).name]) == false) ans = false;
                    }
                    //checkboxes processing is below
                }
            });
            return ans;
        }

        sendNewBlank() {
            console.log((this.form as any).status);
            console.log("checkRequired", this.checkRequired());
            if ( this.checkRequired() ) {
                let b = {};
                // @ts-ignore
                for (let i = 0; i < this.questions.length; i++) {
                    // @ts-ignore
                    b[this.questions[i].name] = (this.form as any)[this.questions[i].name] == undefined ? "" : (this.form as any)[this.questions[i].name];
                    // @ts-ignore
                    let ans = b[this.questions[i].name];
                    if ( typeof ans == 'number' ) {
                        //convert checkbox answers (0, 1, 2) to Strings (Да, Нет)
                        // @ts-ignore
                        if ( this.checkboxes[this.questions[i].name][(this.form as any)[this.questions[i].name]] === 'Другое' ) {
                            //if checkbox select is Other, take its value
                            // @ts-ignore
                            b[this.questions[i].name] = this.other[this.questions[i].name];
                            // @ts-ignore
                            console.log(b[this.questions[i].name]);
                        }
                        // @ts-ignore
                        else b[this.questions[i].name] = this.checkboxes[this.questions[i].name][(this.form as any)[this.questions[i].name]];

                    }
                    //TODO: checkbox processing
                }
                //console.log(b);
                this.loadingbtn = true;
                console.log(b);
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
                            message: "Ошибка отправки. Повторите попытку позже",
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
	.question-textfield > .v-input__control > .v-input__slot {
		border: 2px solid !important;
		border-right: 1px;
	}
</style>
<style>
	.headlinetxt {
		font-family: 'Akrobat' !important;
		font-weight: 900;
		font-style: normal;
	}
	@media screen and (min-width: 960px) {
		.headlinetxt { font-size: 7rem; line-height: 6rem; }
	}
	@media screen and (min-width: 600px) and (max-width: 960px) {
		.headlinetxt { font-size: 5rem; line-height: 5rem; margin-left: 30px; }
	}
	@media screen and (max-width: 600px) {
		.headlinetxt { font-size: 3rem; line-height: 4rem; margin-left: 30px }
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

	.question-textfield > .v-input__control > .v-input__slot {
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

	.question-checkbox {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: normal;
		font-size: 17px;
		line-height: 200%;
		/* or 32px */

		display: flex;
		align-items: center;
	}

</style>