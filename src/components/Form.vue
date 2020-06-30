<template lang="pug">
	div
		v-row(style="margin-top: 35px; z-index: 100")
			v-col(v-if="loading" cols='9', style="width: 88%; margin-left: 6vw" class="analyse-loader" v-for="j in 6" :key="j")
				v-skeleton-loader(type="card-heading")
				v-skeleton-loader(type="sentences")
			v-form(ref="form" small v-model="valid" lazy-validation @submit.prevent="sendNewBlank" class="mb-0 pb-0" style="width: 100%")
				v-col(cols='9' v-for="(value, i) in questions" :key="i")
					div(v-if="value.type === 'textfield' && (value.requires === '' || form[value.requires] === 'Да')")
						span(class="question") {{ value.question }}
						v-text-field(class="question-textfield" label='', :placeholder="value.hint", v-model='form[value.name]', :disabled="value.disabled", :required="value.required", :rules="getRules(value.required, value.rules)", :hint='value.required ? "Обязательное поле" : ""', persistent-hint, filled)
					div(v-if="value.type === 'textarea' && (value.requires === '' || form[value.requires] === 'Да')")
						span(class="question") {{ value.question }}
						v-textarea(class="question-textfield" auto-grow label='', :placeholder="value.hint", v-model='form[value.name]', :required="value.required", :rules="value.required ? requiredRules : undefined", :hint='value.required ? "Обязательное поле" : ""', persistent-hint, filled)
					div(v-if="value.type === 'choose_one' && (value.requires === '' || form[value.requires] === 'Да')")
						span(class="question") {{ value.question }}
						v-select(v-model="form[value.name]" style="z-index: 100;" :mandatory="value.required" :items="checkboxes[value.name]", :required="value.required", :rules="value.required ? requiredRules : undefined" outlined class="select" menu-props="rounded='0'")
							template(v-slot:item="{ item, attrs }")
								span(class="question-select")
									span(class="ml-6") {{item}}
						span(v-if="form[value.name] === 'другое'")
							v-text-field(class="question-textfield" label='', v-model='other[value.name]', :rules="value.required ? requiredRules : undefined", filled, :required="value.required")
						span(v-if="value.required" class="caption") Обязательное поле
					div(v-if="value.type === 'choose_multiply' && (value.requires === '' || form[value.requires] === 'Да')")
						span(class="question") {{ value.question }}
						v-item-group(v-model="form[value.name]" :mandatory="value.required" :multiple="value.type === 'choose_multiply'")
							div(v-for="(n, j) in checkboxes[value.name]" :key="j")
								v-item(v-slot:default="{ active, toggle }")
									span(class="question-checkbox" @click="toggle")
										z-checkbox(:checked="active" style="transform: scale(1.5);" class="ml-1") {{ n }}
										span(class="ml-6") {{n}}
							span(v-show="isOtherChoosed(value.name)")
								v-text-field(class="question-textfield" label='', v-model='other[value.name]', filled)
							span(v-if="value.required" class="caption") Обязательное поле
					div(v-if="value.type === 'html'")
						span(class="question") {{ value.question }}
						div(v-html="value.button" style="background: transparent; width: 183px; height: 45px;" class="iframe-holder")

			v-btn(color='black', @click='sendNewBlank()', tile, light large outlined block :loading="loadingbtn" :disabled="sent" class="btn mt-0 pt-0") Отправить
</template>

<script lang="ts">
    import Vue from "vue";
    import Vuetify from 'vuetify';

    Vue.use(Vuetify);
    import {Component, Prop, Watch} from "vue-property-decorator";
    import * as store from "../plugins/store";
    import * as api from "@/utils/api";
    import {i18n} from "../plugins/i18n";

    @Component
    export default class Form extends Vue {

        @Prop({required: true})
        questionsOrigin!: string;

        // 0 means store, 1 means server
        @Prop({required: true})
        originType!: string;

        // e.g. /form
        @Prop({required: true})
        to!: string;

        @Prop({default: ""})
        place_id!: string;

        sent: boolean = false;
        loadingbtn: boolean = false;
        questions: object[] = [];
        checkboxes: object[] = []; //checkbox values
        other: object[] = []; //other values
        form = {};
        valid = true;
        loading = true;
        requiredRules = [
            v => !!v || 'Это поле нужно заполнить'
        ];

        getRules(required: any, rules: any) {
            if ( rules != undefined ) return rules;
            if ( required != undefined ) return this.requiredRules;
            return undefined;
        }

        isOtherChoosed(name) {
            //only for checkboxes
            let ans = false;
            if ( this.form[name] === undefined || this.form[name].toString() === "" ) return false;
            this.form[name].forEach(i => {
                if ( this.checkboxes[name][i] === "другое" ) ans = true
            });
            return ans;
        }

        setCheckboxes() {
            this.questions.forEach(value => {
                if ( (value as any).type !== "textfield" && (value as any).type !== "textarea" ) {
                    this.checkboxes[(value as any).name] = (value as any).values;
                    return (value as any).values;
                }
            })
        }

        checkPlaceId() {
            if ( this.place_id != "" ) {
                this.form["place_id"] = this.place_id;
                this.questions.push({name: "place_id"});
                this.questions.forEach(q => {
                        // @ts-ignore
                        if ( (q.name == "fsin_organization" || q.name == "name_of_fsin") && store.place(this.place_id) != undefined ) {
                            // @ts-ignore
                            q.disabled = true;
                            // @ts-ignore
                            if ( q.name == "fsin_organization" ) {
                                // @ts-ignore
                                this.form["fsin_organization"] = store.place(this.place_id).name;
                            }
                            // @ts-ignore
                            else if (q.name == "name_of_fsin"){
                                // @ts-ignore
                                this.form["name_of_fsin"] = store.place(this.place_id).name;
                            }

                        }
                    }
                );
                //console.log(this.questions);
            }
        }

        async getQuestions() {
            if ( parseInt(this.originType) ) {
                api.getQuestions(this.questionsOrigin).then((response) => {
                    //console.log("questions", response.status);
                    //console.log(response.data);
                    this.questions = response.data;
                    //console.log(this.questions);
                    this.setCheckboxes();
                    this.checkPlaceId();
                    this.loading = false;
                })
                    .catch(err => {
                        console.log(err);
                        store.setSnackbar({
                            message: err.message,
                            color: "error",
                            active: true
                        });
                    })
            } else {
                //console.log(this.questionsOrigin);
                //console.log(store.forms());
                this.questions = store.forms()[parseInt(this.questionsOrigin)];
                this.setCheckboxes();
                this.checkPlaceId();
                this.loading = false;
            }
        }

        mounted(): void {
            this.getQuestions();
        }

        async sendNewBlank() {
            // @ts-ignore
            if ( this.$refs.form.validate() ) {
                let b = {};
                // @ts-ignore
                for (let i = 0; i < this.questions.length; i++) {
                    // @ts-ignore
                    b[this.questions[i].name] = (this.form as any)[this.questions[i].name] == undefined ? "" : (this.form as any)[this.questions[i].name];
                    // check requires parameter
                    // @ts-ignore
                    if ( this.questions[i].name.slice(-5, this.questions[i].name.length) === "_sure" ) {
                        // @ts-ignore
                        if ( b[this.questions[i].name] !== "Да" ) {
                            // @ts-ignore
                            (this.form as any)[this.questions[i].name.slice(0, -5)] = "";
                            // @ts-ignore
                            b[this.questions[i].name.slice(0, -5)] = "";
                        }
                        // @ts-ignore
                        delete b[this.questions[i].name];
                    }
                    // @ts-ignore
                    let ans = b[this.questions[i].name];
                    //console.log(ans);
                    //console.log(typeof ans);
                    if ( ans == 'другое' ) {
                        //convert checkbox answers (0, 1, 2) to Strings (Да, Нет)
                        // @ts-ignore
                        if ( ans === 'другое' ) {
                            //if checkbox select is Other, take its value
                            // @ts-ignore
                            b[this.questions[i].name] = this.other[this.questions[i].name];
                        }
                        // @ts-ignore
                        else b[this.questions[i].name] = this.checkboxes[this.questions[i].name];

                    } else if ( typeof ans == 'object' ) {
                        //same as above, but for arrays
                        let ans = "";
                        // @ts-ignore
                        (this.form as any)[this.questions[i].name].forEach(j => {
                            // @ts-ignore
                            if ( this.checkboxes[this.questions[i].name][j] === 'другое' ) {
                                if ( ans == "" )
                                // @ts-ignore
                                    ans = ans.concat(this.other[this.questions[i].name]);
                                // @ts-ignore
                                else ans = ans.concat(", " + this.other[this.questions[i].name]);
                            } else {
                                if ( ans == "" )
                                // @ts-ignore
                                    ans = ans.concat(this.checkboxes[this.questions[i].name][j]);
                                // @ts-ignore
                                else ans = ans.concat(", " + this.checkboxes[this.questions[i].name][j]);
                            }
                        });
                        // @ts-ignore
                        b[this.questions[i].name] = ans;
                    }
                }
                //console.log(b);
                this.loadingbtn = true;
                //console.log(b);
                api.sendForm(b, this.to).then(response => {
                    console.log("success ", response.status == 200);
                    if ( response.status == 200 ) {
                        this.loadingbtn = false;
                        this.sent = true;
                        this.$emit('sent', true);
                        store.setSnackbar({
                            message: "Спасибо. Ваша заявка теперь находится в обработке.",
                            color: "success",
                            active: true
                        });
                    }
                })
                    .catch(err => {
                        store.setSnackbar({
                            message: "Ошибка отправки. Повторите попытку",
                            color: "error",
                            active: true
                        });
                        this.loading = false;
                    })
            } else {
                store.setSnackbar({
                    message: "Вы заполнили не все обязательные поля",
                    color: "error",
                    active: true
                });
            }
        };

        @Watch('place_id')
        onChange() {
            // @ts-ignore
            this.$refs.form.reset();
            this.sent = false;
            this.getQuestions();
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
	@import '../assets/styles/main.css';

	.headlinetxt {
		font-family: 'Akrobat' !important;
		font-weight: 900;
		font-style: normal;
	}

	@media screen and (min-width: 960px) {
		.headlinetxt {
			font-size: 7rem;
			line-height: 6rem;
		}
	}

	@media screen and (min-width: 600px) and (max-width: 960px) {
		.headlinetxt {
			font-size: 5rem;
			line-height: 5rem;
			margin-left: 30px;
		}
	}

	@media screen and (max-width: 600px) {
		.headlinetxt {
			font-size: 3rem;
			line-height: 4rem;
			margin-left: 30px
		}
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
		font-family: 'Akrobat' !important;
		color: #000;
		font-size: 1.22rem;
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
		user-select: none;
		display: flex;
		align-items: center;
	}

	.question-checkbox > span:first-letter {
		text-transform: uppercase;
	}

	.v-btn--outlined.btn {
		border: 2px solid #000000;
		border-radius: 1px;
	}

	.v-btn--outlined.btn > .v-btn__content {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: bold;
		font-size: 15px;
		line-height: 17px;
		display: flex;
		align-items: center;
		margin-left: 10px;

		color: #000000;
	}

	/*mega.nz style*/
	.iframe-holder > iframe {
		/*width: 190px !important;
		height: 45px !important;*/
	}

	/*--------*/

</style>