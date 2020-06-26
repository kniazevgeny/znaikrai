<template lang="pug">
	v-dialog( v-model="dialog" width="700")
		template(v-slot:activator="{ on: dialog }")
			v-tooltip(bottom)
				template(v-slot:activator="{ on: tooltip, attrs }")
					v-btn(tile light icon color="black" md1 xs1 depressed text large v-on="{...tooltip, ...dialog}")
						v-icon(medium) warning
				span {{$t('reportMistake')}}
		v-card()
			v-card-title(style="color: #D50000; font-family: 'Akrobat'!important; font-size: 2rem!important; font-weight: bold;") Сообщить об ошибке
			v-card-text(width="700" style="width: 100%")
				Form(originType="0" questionsOrigin="2" to="/report" :place_id="id" )
</template>

<script lang="ts">
    import Vue from 'vue';
    import Vuetify from 'vuetify';

    Vue.use(Vuetify);
    import axios from 'axios';
    import * as store from "../plugins/store";
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class MistakeReport extends Vue {
        @Prop({required: false, default: ""})
        id!: string;

        dialog = false
    }
</script>

<style scoped>

</style>