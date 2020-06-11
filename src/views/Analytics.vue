<template lang="pug">
	v-card(:dark='$store.state.dark' style=" background: #F3F3F3;" flat)
		v-container(style="margin-top: 5rem;")
			v-row(wrap)
				span(class="headlinetxt") Скоро
		//v-layout(style="width: 88%; margin-left: 6%")
			v-col(cols="2" class="num") 01
			v-col(cols="8" class="story") В 20
</template>

<script lang="ts">
	import Vue from 'vue';

    export default class Analytics extends Vue{
        name: "Analytics"
    }
</script>

<style scoped>

</style>