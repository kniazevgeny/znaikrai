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
					Form(originType="1" questionsOrigin="/formQuestions" to="/form" :place_id="place_id")
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
        place_id = "";
        loadingbtn: boolean = false;
        questions: object[] = [];
        checkboxes: object[] = []; //checkbox values
        other: object[] = []; //other values
        form = {};

        mounted(): void {
            if ( this.$route.query.place_id !== undefined ) {
                this.place_id = this.$route.query.place_id as string;
                //console.log(this.place_id)
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
		font-weight: 400;
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