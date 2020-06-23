<template lang="pug">
	nav(style="background-color: transparent; z-index: 100")
		v-app-bar(flat :app='$route.path === "/"', justify="space-between",
		:dark='$store.state.dark', prominent, :style=`$store.state.infowindow || 0 ? "width: 45%; right: 6.85%; left: auto": "width: 90%; margin-left: 5%;"`)
			// Title//span {{$t('title')}}
			v-row(justify="start", style="width: 30%; max-width: 45%; z-index: 1", v-if="!$store.state.infowindow || 0")
				v-btn(tile text class="navbar-text" :to="'/'" :x-large="buttonSize === 'x-large'" :large="buttonSize === 'large'" :medium="buttonSize === 'medium'") КАРТА
				v-btn(tile text class="navbar-text", :to="'analytics'" :x-large="buttonSize === 'x-large'" :large="buttonSize === 'large'" :medium="buttonSize === 'medium'") АНАЛИТИКА
				v-btn(tile text class="navbar-text", :to="'stories'"  :x-large="buttonSize === 'x-large'" :large="buttonSize === 'large'" :medium="buttonSize === 'medium'") ИСТОРИИ
				v-btn(tile text class="navbar-text", :to="'about'"  :x-large="buttonSize === 'x-large'" :large="buttonSize === 'large'" :medium="buttonSize === 'medium'") О ПРОЕКТЕ
			// Dark mode
			// v-btn(text icon color='grey' @click='toggleMode')
				v-icon(small) brightness_2
			// Language picker//v-row(justify='center')
			v-spacer
			v-btn(tile, outlined, style="margin-right: 4%; padding: 0 16px!important", class="navbar-text", :to="'/tell'",  :x-large="buttonSize === 'x-large'" :large="buttonSize === 'large'" :medium="buttonSize === 'medium'", id="tellus") СООБЩИТЬ О НАРУШЕНИИ
				div(id="letter", :style='$store.state.dark ? "color: white" : "color: black"') ///      ///      ///
		div(:style=`$route.path === "/" ? "position: fixed": "position: absolute;"` style='justify-content: center; top: 0px; left: 0; right: 0; margin: auto; z-index: 10')
			v-btn(:style='$store.state.dark ? "filter: none" : "filter: invert()"' style="position: absolute; bottom: 0; left: 0; right: 0; margin: auto; animation: fadeIn 1.5s;" id="navbar-logo" icon)
				a(href="https://zekovnet.ru" target="_blank" rel="noreferrer")
					v-img(:src="require('../assets/logo.svg')", width=60, height=60)
			div(:style=`$route.path === "/" ? "position: fixed": "position: absolute;"` id="navbar-logo-slogan" v-if="$vuetify.breakpoint.name !== 'xs' && $vuetify.breakpoint.name !== 'sm'" style="justify-content: center; top: 80px; left: 0; right: 0; margin: auto; position: absolute bottom: 0; left: 0; right: 0; margin: auto; animation: fadeIn 1.5s;")
				p(:style='$store.state.dark ? "filter: invert()" : "filter: none"') Знайкрай — мониторинг нарушений прав человека в тюрьмах


</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import * as store from "../plugins/store";
    import {i18n} from "../plugins/i18n";
    import axios from "axios";
    import * as api from "../utils/api";
    import router from "@/plugins/router";

	 @Component
    export default class Navbar extends Vue {

        get locales() {
            return [{icon: "🇺🇸", code: "en"}, {icon: "🇷🇺", code: "ru"}];
        }

        get buttonSize() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 'medium';
                case 'sm': return 'large';
                case 'md': return 'large';
                case 'lg': return 'x-large';
                case 'xl': return 'x-large'
            }
        }

        get currentLocale() {
            for (const locale of this.locales) {
                if (locale.code === i18n.locale) {
                    return locale;
                }
            }
        }

        toggleMode() {
            store.setDark(!store.dark());
            (this.$vuetify.theme as any).dark = store.dark();
        }

        changeLanguage(locale: string) {
            i18n.locale = locale;
            store.setLanguage(locale);
            document.title = i18n.t("Знай край") as string;
        }
        mounted(): void {
            store.setLanguage('ru');
        }

   }
</script>

<style>
	nav a:link {
		text-decoration: none;
	}

	nav a:visited {
		text-decoration: none;
	}


	header {
		background-color: transparent;
		transition: none!important;
	}
	.navbar-text{
		font-family: 'Akrobat'!important;
		font-weight: 700!important;
		font-size: 1.1rem!important;
	}
	@media screen and (min-width: 1100px) {
		.navbar-text{ font-size: 1.1rem!important; }
	}
	@media screen and (max-width: 1100px) {
		.navbar-text{ font-size: 0.9rem!important; }
	}
	@media screen and (max-width: 620px) {
		#navbar-logo {top: 310px}
	}
	@media screen and (min-width: 620px) {
		#navbar-logo {top: 100px}
	}
	.navbar-text.v-btn--active:not(#tellus):not(.map-underline) > .v-btn__content {
	  color: #D50000!important;
	}

	.navbar-text.v-btn:before{
		background-color: transparent!important;
	}
	.navbar-text.v-btn:not(.v-btn--round).v-size--default {
		padding: 0 8px!important;
	}
	.navbar-text.v-btn--outlined {
		border: 1.5px solid!important;
	}

	.v-toolbar--prominent .v-toolbar__content {
		align-items: center!important;
	}

	@media screen and (max-width: 1100px) {
		#letter {top: -10px}
	}
	@media screen and (min-width: 1100px) {
		#letter {top: 0px}
	}
	#letter
	{
		position:absolute;
		right: -8px;
		font-size: 20px;
		background-color:transparent;
		padding-top: 24px;
		letter-spacing: 0px;

		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		line-height: 25px;
		display: flex;
		text-align: right;
		text-transform: uppercase;
	}

	.map-underline > span {
		color: #fff!important;
		text-decoration: underline;
	}
	#navbar-logo-slogan {
		text-align: center;
		font-family: 'Akrobat';
		font-size: 1rem;
		line-height: 1.5rem;
		width: 18vw;
		font-weight: 800;
		color: #000;
	}
	#navbar-logo-slogan.theme--dark {
		color: #fff;
	}
	@media screen and (min-width: 1500px) {
		#navbar-logo-slogan {
			width: 15vw;
		}
	}
</style>

