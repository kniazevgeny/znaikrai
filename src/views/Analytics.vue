<template lang="pug">
	v-card(:dark='$store.state.dark' style=" background: #F3F3F3;" flat)
		v-layout( wrap style="margin-top: 5rem;")
			v-col()
				v-card-title(class="headlinetxt" id="analytics-headline" )
					div
						span(style="color: #D50000") {{totalCount}}
						div(id="analytics-headline-letter")
							span ---///----///----///----///----//
						span  свидетельств
						span {{ headlineEnding }}
						br
						span()  о нарушениях
					div(style="width: 100%; word-wrap: break-word;")
						span(style="color: #D50000") {{totalCountCovid}}
						span(style="word-wrap: normal; white-space: nowrap;")  сообщени
						span {{ headlineCovidEnding }}
						span(style="word-wrap: normal; white-space: nowrap;")  о COVID-19 в тюрьмах


		v-layout()
			div(id="analytics-subtitle")
				span(class="subtitle1") С 2018 благотворительный фонд «Русь сидящая» проводит мониторинг условий в учреждениях фсин. Сообщения о различных нарушениях присылали как сами осужденные, так и их близкие, адвокаты или журналисты.
		div(id="analytics-letter" class="mt-8 mb-12")
			span ---///----///----///----///----//
			span ---///----///----///----///----//
			span(style="color: #D50000") ---///--
		v-layout(v-if="loading" column, style="width: 88%; margin-left: 6vw" class="mt-12 analyse-loader" v-for="v in 3" :key="v")
			v-skeleton-loader(type="article")
			v-skeleton-loader(type="sentences@2")
			v-skeleton-loader(type="card-heading")
			v-skeleton-loader(type="sentences")
			v-skeleton-loader(type="card-heading")
			v-skeleton-loader(type="sentences" class="mb-12")
		v-layout(v-for="(value, name, j) in analytics" :key='j' column style="width: 88%; margin-left: 6vw" class="mt-12" v-if='$t("analytics." + name + ".title").toString() !== ("analytics." + name + ".title")')
			p(class="analyse-headline mt-8") {{$t("analytics." + name + ".title")}}
			span(class="analyse-subtitle mt-2 mb-2") {{$t("analytics." + name + ".subtitle")}}
			div(v-for="(value1, name1, v) in value")
				v-layout(v-if="typeof value1 === 'object'" column, class="mt-4")
					h4(class="ml-0") {{ $t("violation_types."  + name1) }}
					v-layout(v-if="typeof value1 === 'object'" row, class="ml-0", :style="'width:' + getWidth(getTotalCount(value1)) + '%'")
						div(class="stats-digit" style="margin-left: -45px" :style="'background-color:' + getColor(getTotalCount(value1))")
							p(style="align-items: center") {{ getTotalCount(value1) }}
						v-layout( v-for="(value2, u) in value1", :key="u" column v-if="value2.name !== 'total_count' && value2.name !== 'total_count_appeals'" :style="'width:' + value2.value / (getTotalCount(value1)) * 100 + '%'")
							v-progress-linear(
							value="99"
							buffer-value="99"
							color="#4F5250"
							height="25"
							class="progress-bar")
								template
									span(style="color: white") {{ value2.value }}
							span(class="analyse-explainer") {{ value2.name }}
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
        totalCountAppeals: number = 0;
        totalCountCovid: number = 100;
        loading = true;
        headlineEnding: string = "о";
        headlineCovidEnding: string = "й";

        getWidth(val) {
            let max_ = this.totalCountAppeals;
            if ( val < max_ / 20 ) return 57;
            if ( val < max_ / 14 ) return 87;
            return 100;
        }

        getColor(val) {
            let max_ = this.totalCountAppeals;
            if ( val < max_ / 20 ) return "#e9e706";
            if ( val < max_ / 14 ) return "#ff9e00";
            else return "#D50000";
        }

        getKeyByValue(object, value) {
            //JSON to compare objects
            return Object.keys(object).find(key => JSON.stringify(object[key]) === JSON.stringify(value));
        }

        getTotalCount(object) {
            if (object[0].name === "total_count") return object[0].value;
            if (object[1].name === "total_count") return object[1].value;
        }

        getAnalytics() {
            axios.get(store.apibase() + '/analytics').then(response => {
                //console.log(response.data.violations_stats);
                this.analytics = response.data.violations_stats;
                // preprocessing: removes elements <=10 and rare ones
		            // then object → array
                // @ts-ignore
                Object.keys(this.analytics).forEach(key => {
                    // @ts-ignore
                    Object.values(this.analytics[key]).forEach(val => {
                        let values = [];
                        let valuesToDelete = [];
                        let sorted = [];
                        let sortedKeys = [];
                        // @ts-ignore
                        if ( typeof val == 'object' ) Object.keys(val).forEach(_name => {
                            // delete rare values
                            // @ts-ignore
                            if ( _name != 'total_count' && _name != 'total_count_appeals' && val[_name] != undefined ) {
                                // @ts-ignore
                                if ( val[_name] <= 10 ) delete val[_name];
                                // @ts-ignore
                                else values.push(val[_name]);
                            }
                        });
                        let isMobile = window.innerWidth < 600;
                        // if mobile, shows only 4 elements. unless 6 elements
                        if ( values.length != 0 ) {
                            // delete values if there's more than 6 on desktop or more then 4 on mobiles
                            if ( values.length > (isMobile ? 4 : 6) ) {
                                values.sort((a, b) => {
                                    return a - b;
                                });
                                let i = 0;
                                for (i; i < values.length; i++) {
                                    if ( i < values.length - (isMobile ? 4 : 6) )
                                        valuesToDelete.push(values[i]);
                                }
                            }
                            // @ts-ignore
                            Object.keys(val).forEach(_name => {
                                // @ts-ignore
                                if ( valuesToDelete.includes(val[_name]) ) delete val[_name];
                            });
                        }
                        // @ts-ignore
                        if ( typeof val == 'object') {
                            // sort object "max → min" and transform into array
                            // @ts-ignore
                            sortedKeys = Object.keys(val).sort(function (a, b) {
                                // @ts-ignore
                                return val[b] - val[a]
                            });
                            sortedKeys.forEach(sKey => {
                                // @ts-ignore
                                sorted.push({name: sKey, value: val[sKey]});
                            });
                        }
                        if (typeof this.analytics[key][this.getKeyByValue(this.analytics[key], val)] == "object")
                          this.analytics[key][this.getKeyByValue(this.analytics[key], val)] = sorted;
                    })
                });

                this.totalCount = response.data.total_count_appeals;
                this.totalCountCovid = response.data.total_count_appeals_corona;
                console.log(this.analytics);
                // set headline ending: "о", "а"
                if ( this.totalCount % 10 === 1 ) this.headlineEnding = "о";
                else if ( this.totalCount % 10 >= 2 && this.totalCount % 10 <= 4 ) this.headlineEnding = "а";
                else this.headlineEnding = "";
                // set headline Covid ending headlineCovidEnding
                if ( this.totalCountCovid % 10 === 1 ) this.headlineCovidEnding = "е";
                else if ( this.totalCountCovid % 10 >= 2 && this.totalCountCovid % 10 <= 4 ) this.headlineCovidEnding = "я";
                // this.headlineEnding;
                this.totalCountAppeals = response.data.violations_stats.total_count;
                this.loading = false;
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
		display: flex;
		align-items: flex-end;
		text-transform: uppercase;
	}

	@media screen and (min-width: 1100px) {
		#analytics-headline {
			width: 50vw;
			font-size: 60px !important;
			line-height: 60px !important;
			margin-left: 6vw;
		}

		#analytics-subtitle {
			width: 45vw;
			margin-left: 6vw;
		}
	}

	@media screen and (max-width: 1100px) {
		#analytics-headline {
			width: 90vw;
			font-size: 35px !important;
			line-height: 40px !important;
			margin-left: 15px;
		}

		#analytics-subtitle {
			width: 75vw;
			margin-left: 45px;
		}
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

	.stats-digit {
		width: 35px;
		height: 25px;
		color: #fff;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 150%;
		margin-right: 10px;
		display: flex;
		align-content: flex-start;
		align-items: flex-start;
		justify-content: center;
	}

	.stats-digit > p {
		margin-top: -1px !important;
	}

	.analyse-loader > .v-skeleton-loader > .v-skeleton-loader__bone {
		background: transparent !important;
	}

	.analyse-explainer {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 16px;
		/* identical to box height */


		color: #070809;
	}

	@media screen and (max-width: 600px) {
		.analyse-explainer {
			font-size: 12px;
			line-height: 14px;
		}
	}
</style>