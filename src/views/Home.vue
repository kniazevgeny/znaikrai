<template lang="pug">
	v-layout(column height="100vh")
		Gmaps(id="map" style=" position: fixed;")
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
