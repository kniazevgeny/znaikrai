<template lang="pug">
	v-layout(column height="100vh")
		Gmaps(id="map" style=" position: fixed;")
</template>

<script lang="ts">
    import Vue from "vue";
    import Vuetify from 'vuetify';
    import Component from "vue-class-component";
    import Gmaps from "../components/Gmaps.vue";

    Vue.use(Vuetify);
    Vue.component('Gmaps', Gmaps);

    @Component
    export default class Home extends Vue {
    }
</script>

<style>

</style>
