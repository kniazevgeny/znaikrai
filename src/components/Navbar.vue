<template lang="pug">
	nav(style="background-color: transparent; z-index: 100")
		v-app-bar(flat :app=`$router.currentRoute.path == "/"`, justify="space-between" style="width: 90%; margin-left: 5%" :dark='$store.state.dark')
			// Title//span {{$t('title')}}
			v-row(justify="space-between", style="width: 30%; max-width: 45%")
				v-btn(tile text class="navbar-text" :to="'/'") КАРТА
				v-btn(tile text class="navbar-text") АНАЛИТИКА
				v-btn(tile text class="navbar-text") ИСТОРИИ
				v-btn(tile text class="navbar-text") О ПРОЕКТЕ
			// Dark mode
			//<v-btn(text icon color='grey' @click='toggleMode')>//<v-icon(small) brightness_2>
			// Language picker//v-row(justify='center')
			v-spacer
			v-btn(tile outlined style="margin-right: 4%; padding: 0 16px!important" class="navbar-text" :to="'/tell'") СООБЩИТЬ О НАРУШЕНИИ
		div(:style=`$router.currentRoute.path == "/"?"position: fixed":"position: absolute;"` style='justify-content: center; top: 10px; left: 49%; margin-right: -49%; position: inherit')
			img(src="../assets/logo.svg", width=50, height=50, :style='$store.state.dark ? "filter: none" : "filter: invert()"')


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
            document.title = i18n.t("Zekovnet") as string;
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
	}
	.navbar-text{
		font-family: 'Akrobat';
		font-weight: 700!important;
		font-size: 1.1rem!important;
	}

	.navbar-text.v-btn--active > .v-btn__content {
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
</style>

