<template lang="pug">
	v-card(:dark='$store.state.dark' style=" background: #E5E5E5" text)
		v-container(style="margin-top: 5rem;")
			v-row(wrap)
				span(class="headlinetxt", id="about-headline") ЗНАЙ КРАЙ
		v-card-text
			v-container
				div(class="about-us")
					span(class="subtitle1") «Знайкрай» — это проект благотворительного фонда «Русь сидящая». С 2018 года в рамках гранта Европейской комиссии фонд проводил мониторинг условий содержания в местах лишения свободы России. Сообщения о нарушениях присылали как сами осужденные, так и их близкие, адвокаты или журналисты.<br><br>С помощью этих данных была создана карта, на которой можно посмотреть, какие нарушения совершаются в любом исправительном учреждении, и рейтинг самых опасных мест лишения свободы России. Также в проекте собраны истории заключенных, столкнувшихся с нарушением своих прав.
					br
					br
					span(class="subtitle1") После начала пандемии коронавируса, добавили на карту данные мониторинга коронавируса в тюрьмах. Заключенные в России, одна из самых незащищенных групп граждан. Колонии становятся очагами распространения коронавируса. Эти вспышки, тяжело остановить. Большая часть заключенных имеет сниженный иммунитет и массу сопутствующих заболеваний, в том числе ВИЧ. Еще один фактор — скученность осужденных в бараках. В одном бараке содержится 150-200 человек. Распространение вируса в таких условиях — моментальное. Как изолировать заболевших и тех, кто с ними контактировал, в условиях колонии, не ясно. Качество медицинской помощи в МЛС тоже оставляет желать лучшего. Нехватка медикаментов, отсутствие квалифицированных врачей и отсутствие необходимого количества коек в санчасти приведет к огромному количеству смертей.
					br
					br
					span(class="subtitle1") Поэтому важно, чтобы происходящее внутри исправительных учреждений, не оставалось за закрытыми стенами, а как можно больше освещалось в СМИ и среди правозащитных организаций.
					br
					br
					span(class="subtitle1") “Русь сидящая” ведет собственный регулярный мониторинг ситуации в млс со 02.04.2020. Собираем и систематизируем данные о ситуациях в учреждениях ФСИН с помощью сообщений, которые получаем от родственников осужденных в обращениях к фонду и комментариев в социальных сетях “Руси сидящей”. Проверяем каждое сообщение. По грубейшим нарушениям юристы фонда готовят и отправляют жалобы в Генеральную прокуратуру. Данные полученные в ходе мониторинга, мы наносим на карту. Призываем журналистов, правозащитников, осужденных и их родственников участвовать в нашем мониторинге и сообщать о ситуации с коронавирусом в колониях.
				br
			v-container(style="margin-top: 100px")
				v-layout(wrap)
					a(href="https://zekovnet.ru/help-us/" target="_blank" rel="noreferrer" style="width: 100%; text-decoration: none")
						v-btn(block tile text class="navbar-text" outlined large ) Поддержать проект
					//div(style="width: 25vw")
																					v-select(:items="ways" outlined v-model="current" label="" background-color="grey_e5" color="black" style="" class="about-select")
					//div(style="width: 6vw; margin-left: 15px")
																					v-text-field(filled, v-model="amount", background-color="gray_e5")
					//div(style="width: 20vw; margin-left: 15px")
																					v-text-field(filled, placeholder="Ваш email", background-color="gray_e5")
					//div(style="margin-left: 15px")
																					v-btn(tile, flat, color="red_main", style="margin-right: 4%;", class="btn-text", x-large, id="send", elevetion="0") Отправить
		v-footer(dark padless)
			v-card(text tile width="100%").text-center.pa-6
				v-card-text.pt-0 Над проектом работали:
					br
					a(href="https://t.me/tataromanovaya" target="_blank" rel="noreferrer" style="color: #3fcff6") Татьяна Абгаджава - идея
					br
					a(href="https://t.me/kniazevgeny" target="_blank" rel="noreferrer" style="color: #3fcff6") Евгений Князев - фронтенд
					br
					a(href="https://t.me/semyon_dev" target="_blank" rel="noreferrer" style="color: #3fcff6") Семен Новиков - бэкенд
					br
					a(href="https://t.me/liseym" target="_blank" rel="noreferrer" style="color: #3fcff6") Алексей Шевцов - дизайн
					br
					a(href="https://t.me/vitaliachik" target="_blank" rel="noreferrer" style="color: #3fcff6") Вита Чикнаева - заполнение сайта
					br
					br
					v-card-text.pt-0 Данный проект имеет открытый исходный код:
						br
						a(href="https://github.com/kniazevgeny/znaikrai/" target="_blank" rel="noreferrer" style="color: #3fcff6") Фронтенд
						br
						a(href="https://github.com/semyon-dev/znai-krai" target="_blank" rel="noreferrer" style="color: #3fcff6") Бэкенд
					v-card-text.pt-0 Данный проект имеет публичное 
						a(href="https://github.com/semyon-dev/znai-krai#%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F-%D0%BA-api-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B0%D0%BC" target="_blank" rel="noreferrer" style="color: #3fcff6") API
					v-card-text.pt-0 Все материалы сайта доступны по лицензии: 
						a(href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer" style="color: #3fcff6") Creative Commons СС-BY-SA 3.0

</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component
    export default class About extends Vue {
        ways: [string] = ['Банковская карта'];
        current: string = 'Банковская карта';
        amount = '100 ₽';

    }
</script>

<style scoped>
	.about-us {
		width: 45vw
	}

	@media screen and (max-width: 960px) {
		.about-us {
			width: 75vw !important;
		}
	}

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

	.v-input__control > .gray_e5 {
		height: 62px;
		border: 2px solid #000000 !important;
		box-sizing: border-box !important;
		border-radius: 1px !important;
	}

	.about-select > .v-input__control > .select {
		border: 2px solid #000000 !important;
		box-sizing: border-box !important;
		border-radius: 1px !important;
	}

	.about-select > .v-input__control > .select > .v-select__slot {
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

	#send {
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