<template lang="pug">
	v-card(:dark='$store.state.dark' style=" background: #F3F3F3;" flat)
		v-layout( wrap style="margin-top: 5rem; margin-left: 6vw")
			v-row(wrap)
				v-card-title(class="headlinetxt" id="analytics-headline")
					span(style="color: #D50000") {{totalCount}}
					div(id="analytics-headline-letter")
						span ---///----///----///----///----//
					span  свидетельств 
					br
					span  о нарушениях

		v-layout(style="margin-left: 6vw")
			div(style="width: 45vw")
				span(class="subtitle1") С 2018 благотворительный фонд «Русь сидящая» проводит мониторинг условий в учреждениях фсин. Сообщения о различных нарушениях присылали как сами осужденные, так и их близкие, адвокаты или журналисты.
		div(id="analytics-letter" class="mt-8 mb-12")
			span ---///----///----///----///----//
			span ---///----///----///----///----//
			span(style="color: #D50000") ---///--
		v-layout(v-for="(value, name, i) in analytics" :key='i' column style="width: 88%; margin-left: 6vw" class="mt-12" v-if='$t("analytics." + name + ".title").toString() !== ("analytics." + name + ".title")')
			p(class="analyse-headline") {{$t("analytics." + name + ".title")}}
			span(class="analyse-subtitle mt-4 mb-4") {{$t("analytics." + name + ".subtitle")}}
			div(v-for="(value1, name1) in value")
				v-layout(v-if="typeof value1 === 'object'" column, class="mt-4")
					h4(class="ml-0") {{ $t("violation_types." + name1) }}
					v-layout(v-if="typeof value1 === 'object'" row, class="ml-0")
						v-layout( v-for="(value2, name2, j) in value1", :key="j" column :style="'width:' + value2 / value1.total_count + '%'" v-if="name2 !== 'total_count' && value2 > 10")
							v-progress-linear(
							value="99"
							buffer-value="99"
							color="#4F5250"
							height="25"
							class="progress-bar")
								template
									span(style="color: white") {{ value2 }}
							span {{ name2 }}
		v-footer(height="162", color="white", padless, class="mt-12")
			v-layout(style="width: 90%; margin-left: 5%; margin-right: 5%" justify-space-around)
				v-btn(x-large, text, class="footerBtn", :to="'/'")
					span <-/   КАРТА
				v-spacer
				v-btn(x-large, text, class="footerBtn", :to="'stories'")
					span ИСТОРИИ
					span(style="transform: rotate(-180deg);")  <-/   
</template>

<script lang="ts">
    import Vue from 'vue';
    import axios from "axios";
    import Component from "vue-class-component";
    import * as store from "@/plugins/store";

    @Component
    export default class Analytics extends Vue {
        analyse: object[] = [
            {name: "physical_impact"},
            {name: "psychological_impact"},
            {name: "corruption"},
            {name: "medical_care"},
            {name: "job"},
        ];
        analytics: object = {};
        skill: number = 90;
        totalCount: number = 371;

        getAnalytics() {
            axios.get(store.apibase() + '/analytics').then(response => {
                console.log(response.data.violations_stats);
                this.analytics = response.data.violations_stats;
                let a = this.analytics;
                /*Object.keys(a).forEach(value => {
                    Object.values(a[value]).forEach(val => {
                      console.log(val)
                    })
                });*/
                this.totalCount = response.data.total_count_appeals;
            })
        };

        mounted(): void {
            this.getAnalytics();
        }
    }
</script>

<style>
	#analytics-letter {
		position: relative;
		width: 95%;
		height: 48px;
		left: 0.5%;
		margin-top: -30px;

		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		font-size: calc(100vw / 44);
		line-height: 48px;
		letter-spacing: -1px;
		/* identical to box height */

		text-align: right;
		text-transform: uppercase;

		color: #000000;
		transform: rotate(180deg);
	}

	#analytics-headline-letter {
		position: absolute;
		width: 25%;
		height: 48px;
		left: -3.5vw;
		margin-top: -40px;

		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		font-size: calc(100vw / 80);
		line-height: 48px;
		letter-spacing: -1px;
		/* identical to box height */

		text-align: right;
		text-transform: uppercase;

		color: #000000;
		transform: rotate(210deg);
	}

	#analytics-headline {
		font-family: 'Akrobat';
		font-style: normal;
		font-weight: 900;
		font-size: 60px !important;
		line-height: 60px !important;
		display: flex;
		align-items: flex-end;
		text-transform: uppercase;
		width: 40vw;

	}

	.analyse-headline {
		font-family: 'Akrobat';
		font-style: normal;
		font-weight: bold;
		font-size: 27px;
		line-height: 30px;
		/* identical to box height */

		display: flex;
		align-items: flex-end;
		text-transform: uppercase;

		color: #000000;
	}

	.analyse-subtitle {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: normal;
		font-size: 17px;
		line-height: 150%;
		width: 60vw;
		/* or 18px */


		color: #070809;

	}

	.progress-bar.v-progress-linear {
		width: auto;
	}

	.progress-bar.v-progress-linear > .v-progress-linear__content {
		text-align: left !important;
		justify-content: left !important;
		left: 10px;
	}

	.footerBtn {
		font-family: 'Akrobat';
		font-style: normal;
		font-weight: 600;
		font-size: 25px !important;
		line-height: 30px;
		/* identical to box height */

		display: flex;
		text-transform: uppercase;

		color: #000000;
	}
</style>