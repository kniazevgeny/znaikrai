<template lang="pug">
	nav(style="background-color: transparent; z-index: 100")
		v-app-bar(flat :app=`$router.currentRoute.path == "/"`, justify="space-between",
		:dark='$store.state.dark', prominent, :style=`$store.state.infowindow || 0 ? "width: 45%; right: 6.85%; left: auto": "width: 90%; margin-left: 5%;"`)
			// Title//span {{$t('title')}}
			v-row(justify="start", style="width: 30%; max-width: 45%; z-index: 1", v-if="!$store.state.infowindow || 0")
				v-btn(tile text class="navbar-text" :class="$router.currentRoute.path === '/' ? 'map-underline' : 'aaaa'", :to="'/'" x-large) КАРТА
				v-btn(tile text class="navbar-text", x-large) АНАЛИТИКА
				v-btn(tile text class="navbar-text", :to="'stories'" x-large) ИСТОРИИ
				v-btn(tile text class="navbar-text", :to="'about'" x-large) О ПРОЕКТЕ
			// Dark mode
			//<v-btn(text icon color='grey' @click='toggleMode')>//<v-icon(small) brightness_2>
			// Language picker//v-row(justify='center')
			v-spacer
			v-btn(tile, outlined, style="margin-right: 4%; padding: 0 16px!important", class="navbar-text", :to="'/tell'", x-large, id="tellus") СООБЩИТЬ О НАРУШЕНИИ
				div(id="letter", :style='$store.state.dark ? "color: white" : "color: black"') ///      ///      ///
		div(:style=`$router.currentRoute.path === "/" ? "position: fixed": "position: absolute;"` style='justify-content: center; top: 15px; left: 0; right: 0; margin: auto; position: absolute')
			img(src="../assets/logo.svg", width=70, height=70, :style='$store.state.dark ? "filter: none" : "filter: invert()"' style="position: absolute; top: 100px; bottom: 0; left: 0; right: 0; margin: auto; animation: fadeIn 1.5s;")


</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import * as store from "../plugins/store";
    import {i18n} from "../plugins/i18n";
    import axios from "axios";
    import * as api from "../utils/api";

	 @Component
    export default class Navbar extends Vue {

        get locales() {
            return [{icon: "🇺🇸", code: "en"}, {icon: "🇷🇺", code: "ru"}];
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
            document.title = i18n.t("Znaikrai") as string;
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

	.navbar-text.v-btn--active:not(#tellus):not(.map-underline) > .v-btn__content {
	  color: #D50000!important;
	}

	.v-btn:before{
		background-color: transparent!important;
	}
	.v-btn:not(.v-btn--round).v-size--default {
		padding: 0 8px!important;
	}
	.v-btn--outlined {
		border: 1.5px solid!important;
	}

	.v-toolbar--prominent .v-toolbar__content {
		align-items: center!important;
	}

	#letter
	{
		position:absolute;
		top: 0;
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
</style>

