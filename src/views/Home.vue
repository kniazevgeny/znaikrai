<template lang="pug">
	v-layout(column)
		v-card(style="margin-top: -125px; box-shadow: 0px 90px 90px 0px rgba(0,0,0,0.75); z-index: 1; position: initial" :dark='$store.state.dark')
			v-img( :src="require('../assets/home1.jpg')", style="height: 100vh")
				v-card-text
					v-layout(fill-height='', style='width: 90%; margin-left: 5%; margin-top: 10%')
						v-flex(xs5='', style="text-align: left; font-family: 'Akrobat'; font-weight: 400; font-size: 1.5rem; line-height: 2rem") Согласно статистике ФСИН, в российских местах лишения свободы сейчас находитсяоколо 520 тысяч человек: 455,5 тысяч — в колониях, 96,7 тысяч — в СИЗО, 1,2 тысячи —в тюрьмах и тысяча человек в воспитательных колониях для несовершеннолетних.За последние несколько лет стало больше известно о случаях нарушения прав осужденных — с 2016 по 2018 года Следственный комитет зарегистрировал 6,5 тысяч заявлени о насилии в тюрьмах. При этом лишь 2% жалоб закончились уголовными делами
						v-flex(xs7='')
							div(style='text-align: right; max-width: 50vw; padding: 10px; border-radius: 10px')
		Gmaps(id="map" style="z-index: 0; position: fixed;")
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Gmaps from "../components/Gmaps.vue";

    Vue.component('Gmaps', Gmaps);
    @Component
    export default class Home extends Vue {
    }
</script>

<style>
	.fb-signin-button {
		cursor: pointer;
		display: block;
		padding: 10px 46px;
		border-radius: 3px;
		background-color: #647daf;
		color: #fff;
		margin: 10px;
	}

	.g-signin-button {
		margin: 10px;
		cursor: pointer;
		display: block;
		padding: 10px 46px;
		border-radius: 3px;
		background-color: #ce5658;
		color: #fff;
	}

</style>
