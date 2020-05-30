<template lang="pug">
	v-card(:dark='$store.state.dark' style=" background: #E5E5E5" flat)
		v-container(style="margin-top: 5rem;")
			v-row(wrap)
				span(class="headlinetxt", id="about-headline") ЗНАЙ КРАЙ
		v-card-text
			v-container
				div(style="width: 45vw")
					span(class="subtitle1") «Знай край» — это проект благотворительного фонда «Русь сидящая». С 2018 года в рамках гранта Европейской комиссии фонд проводил мониторинг условий содержания в местах лишения свободы России. Сообщения о различных нарушениях присылали как сами осужденные, так и их близкие, адвокаты или журналисты. <br><br>С помощью этих данных была создана карта, на которой можно посмотреть, какие нарушения совершаются в любом исправительном учреждении, и рейтинг самых опасных мест лишения свободы России. Также в проекте собраны истории заключенных, столкнувшихся с нарушением их прав.
				br
			v-container(style="margin-top: 100px")
				v-layout(wrap)
					div(style="width: 25vw")
						v-select(:items="ways" outlined v-model="current" label="" background-color="grey_e5" color="black" style="")
					div(style="width: 6vw; margin-left: 15px")
						v-text-field(filled, v-model="amount", background-color="gray_e5")
					div(style="width: 20vw; margin-left: 15px")
						v-text-field(filled, placeholder="Ваш email", background-color="gray_e5")
					div(style="margin-left: 15px")
						v-btn(tile, flat, color="red_main", style="margin-right: 4%;", class="btn-text", x-large, id="send", elevetion="0") Отправить
		v-footer(absolute dark padless)
			v-card(flat tile width="100%").text-center.pa-6
				v-card-text.pt-0
					span Данный проект имеет открытый исходный код:
					br
					a(href="https://github.com/kniazevgeny/znaikrai/" style="color: #3fcff6") Фронтенд
					br
					a(href="https://github.com/semyon-dev/znai-krai" style="color: #3fcff6") Бекенд

</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import * as store from "../plugins/store";
    import {i18n} from "../plugins/i18n";
    import axios from "axios";

    @Component
    export default class About extends Vue {
        ways: [string] = ['Банковская карта'];
        current: string = 'Банковская карта';
        amount = '100 ₽';

        mounted(): void {
            let el = document.getElementsByClassName("grey_e5")[0] as HTMLElement;
            el.classList.add("select");
            el.classList.remove("v-input__slot");
            el.classList.remove("grey_e5");
            (el.firstChild as any).remove();
            console.log(el);
        }
    }
</script>

<style>
	@media screen and (min-width: 600px) {
		.headlinetxt#about-headline::before {
			content: url("../assets/about.svg");
			transform: scale(1.1) !important;
			margin-left: 20.5rem;
			margin-top: -1.6rem;
			width: 5vw;
			position: absolute;
			font-family: 'Source Sans Pro';
			font-style: normal;
			font-weight: 600;
			font-size: 38px;
			line-height: 48px;
			align-items: center;
			text-align: center;
			text-transform: uppercase;

			color: #000000;

			transform: rotate(-3deg);
		}
	}

	.v-input__control>.gray_e5{
		height: 62px;
		border: 2px solid #000000 !important;
		box-sizing: border-box !important;
		border-radius: 1px !important;
	}
	.select {
		border: 2px solid #000000 !important;
		box-sizing: border-box !important;
		border-radius: 1px !important;
	}

	.v-select__slot {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 19px;
		display: flex;
		align-items: center;
		margin: 5px;
		margin-left: 15px;

		color: #000000;
	}

	i.mdi-menu-down {
		margin-right: 45px;
		font-size: 34px !important;
		color: #000;
	}

	i.mdi-menu-down:before {
		font-size: 34px !important;
		color: #000;
	}

	fieldset {
		border: none
	}
	#send{
		font-family: Akrobat;
		font-style: normal;
		font-weight: bold;
		font-size: 18px;
		line-height: 20px;
		display: flex;
		align-items: center;
		text-align: center;
		text-transform: uppercase;

		letter-spacing: 0.07rem;
		color: #FFFFFF;
		height: 62px;
	}
</style>