<template lang="pug">
	v-layout(column)
		v-card(style="margin-top: -65px")
			v-img( src="https://russeated-f.herokuapp.com/static/img/home1.9606d6cd.jpg")
				v-card-text
					v-layout(fill-height='', style='width: 90%; margin-left: 5%; margin-top: 10%')
							v-flex(xs5='', style="text-align: left") Согласно статистике ФСИН, в российских местах лишения свободы сейчас находитсяоколо 520 тысяч человек: 455,5 тысяч — в колониях, 96,7 тысяч — в СИЗО, 1,2 тысячи —в тюрьмах и тысяча человек в воспитательных колониях для несовершеннолетних.За последние несколько лет стало больше известно о случаях нарушения прав осужденных — с 2016 по 2018 года Следственный комитет зарегистрировал 6,5 тысяч заявлени о насилии в тюрьмах. При этом лишь 2% жалоб закончились уголовными делами
							v-flex(xs7='')
								div(style='text-align: right; max-width: 50vw; padding: 10px; border-radius: 10px')
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

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
