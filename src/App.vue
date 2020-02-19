<template lang="pug">
	v-app(@load="loaded()" :dark='true' :class='"grey darken-4"' v-scroll="loaded()")
		cookie-law(theme='blood-orange'
		:buttonText='"Ок"'
		:message='"Мы используем куки"')
		Navbar
		v-content
			Home
			//router-view
			Gmaps(v-if="mount" id="map")
		Snackbar
</template>

<script lang="ts">
    import Navbar from "./components/Navbar.vue";
    import Snackbar from "./components/Snackbar.vue";
    import Home from "./views/Home.vue";
    import Gmaps from "./components/Gmaps.vue";
    import * as store from "./plugins/store";

    const CookieLaw = require("vue-cookie-law");

    export default {
        components: {Navbar, Snackbar, CookieLaw, Gmaps, Home},
        data: () => ({
            mount: false
        }),
        methods: {
            loaded() {
                console.log("loaded");
                if (!(this as any).mount) {
                    store.setDark(!store.dark());
                    ((this as any).$vuetify.theme as any).dark = store.dark();
                }
                (this as any).mount = true;
            }

        }
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
