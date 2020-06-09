<template>
	<v-layout wrap style="margin-top: 0px">
		<h4>{{title}}</h4>
		<v-layout style="width: 100%;">
			<div class="stats-digit" :style="'background-color:' + color"><p style="align-items: center">{{count}}</p></div>
			<v-progress-linear background-color="white" :color="color" :value="value"
			                   height="20"></v-progress-linear>
		</v-layout>
		<br>
		<p style="width: 100%;">
			<span style="margin-bottom: 20px;" v-for="(comment, j) in comments" :key="j">
				<span style="">{{j + 1}}: {{comment}}</span>
				<br>
			</span>
			<v-divider style="width: 100%;"></v-divider>
		</p>
	</v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class ViolationChart extends Vue {
        @Prop({required: true})
        public title!: string;

        @Prop({required: true})
        public comments!: object[];

        @Prop({required: true})
        public count!: number;

        value: number = 0;
        color: string = "";

        mounted(): void {
            this.value = this.count * 7;
            if ( this.count <= 2 ) {
                this.color = "#1F870E"
            } else if ( this.count <= 5 ) {
                this.color = "#FFB800"
            } else if ( this.count > 5 ) {
                this.color = "#D50000"
            }
            //console.log(this.value, this.color, this.count);
            if ( this.value > 100 ) this.value = 100;
        }
    }
</script>

<style scoped>
	.stats-digit {
		width: 33px;
		height: 22px;
		color: #fff;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 150%;
		margin-right: 20px;
		display: flex;
		align-content: flex-start;
		align-items: flex-start;
		justify-content: center;

	}

	.stats-digit > p {
		margin-top: -1px !important;
	}

	hr {
		margin-top: 20px;
	}
</style>