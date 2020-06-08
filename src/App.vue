<template lang="pug">
	v-app(@load="loaded()" :dark='$store.state.dark' :class='$store.state.dark ? "grey darken-4" : "grey lighten-4"' :v-scroll="!mount ? loaded(): a()")
		cookie-law(theme='blood-orange'
		:buttonText='"Ок"'
		:message='"Мы используем куки"')
		Navbar(style="z-index: 100")
		v-content
			v-layout(column)
				//Home(style="z-index: 1; position: initial")
				router-view(style="z-index: 99; position: initial" :dark='$store.state.dark')
				//abs, z-ind height width
								//↓fix
			//Gmaps(v-if="mount" id="map" style="z-index: 0; position: fixed;")
		Snackbar
</template>

<script lang="ts">
    import Navbar from "./components/Navbar.vue";
    import Snackbar from "./components/Snackbar.vue";
    import Home from "./views/Home.vue";
    import Gmaps from "./components/Gmaps.vue";
    import * as store from "./plugins/store";
    import {Watch} from "vue-property-decorator";

    const CookieLaw = require("vue-cookie-law");

    export default {
        components: {Navbar, Snackbar, CookieLaw, Gmaps, Home},
        data: () => ({
            mount: false
        }),
        methods: {
            loaded() {
                console.log("loaded");
                store.setInfowindow(false);

                /*if (!(this as any).mount) {
                    store.setDark(!store.dark());
                    ((this as any).$vuetify.theme as any).dark = store.dark();
                }*/
                (this as any).mount = true;
            },
		        a(){

		        }

        },
    };
</script>
<style>

	#map {
		bottom: 3px;
		padding-bottom: 5px;
	}

	header {
		background-color: transparent !important;
	}
</style>
