<template lang="pug">
	v-card(:dark='$store.state.dark' style=" background: #F3F3F3;" flat)
		v-layout( wrap style="margin-top: 5rem;")
			v-col()
				v-card-title(class="headlinetxt" id="analytics-headline" )
					div
						span(style="color: #D50000") {{totalCountAppeals}}
						div(id="analytics-headline-letter")
							span ---///----///----///----///----//
						span(style="word-wrap: normal; white-space: pre;")  свидетельств
							span {{ headlineEnding }}
						br
						span()  о нарушениях
					div(style="width: 100%; word-wrap: break-word;")
						span(style="color: #D50000") {{totalCountCovid}}
						span(style="word-wrap: normal; white-space: pre;")  сообщени
						span {{ headlineCovidEnding }}
						span(style="word-wrap: normal; white-space: pre;")  о COVID-19 в тюрьмах


		v-layout()
			div(id="analytics-subtitle")
				span(class="subtitle1") Опрос по нарушениям в местах лишения свободы проводился в рамках проекта «Русь сидящая» — Благотворительного фонда помощи осужденным и их семьям с целью мониторинга нарушений в местах лишения свободы. В ходе исследования собирались мнения респондентов о наиболее острых и массовых нарушениях прав, с которыми сталкиваются заключенные в местах лишения свободы в России. На сегодняшний день в данном разделе представлена аналитика опроса проводившегося фондом в рамках Гранта Европейской комиссии с 2018 по 2019 год. В дальнейшем раздел будет обновляться данными собранными через форму на сайте.
				br
				br
				span(class="subtitle1") Мы изначально понимали, что полученные данные не будут репрезентативными, потому что невозможно получить доступ ко всем заключенным, что делает невыполнимым построение выборки репрезентативного опроса. Кроме того, далеко не все заключенные готовы говорить существующих проблемах в местах заключения (об этом свидетельствуют, в том числе, комментарии к вопросам исследования, полученные от родственников заключенных). Однако исследование позволяет понять хотя бы в первом приближении, нарушение каких прав тревожит заключенных и их родственников более всего. Именно в этом ценность полученных данных.
				br
				br
				span(class="subtitle1") Всего было получено 377 заполненных анкет. Респонденты в основном распределились на две равные группы:
					ul
						li() заключенные или бывшие заключенные (получено 185 анкет)
						li() родственники заключенных (получено 176 анкет)
				br
				span(class="subtitle1") Оставшиеся 16 анкет, или 2% от общей совокупности, составили адвокаты, общественные защитники, правозащитники и один журналист.
				br
				br
				span(class="subtitle1") На основе полученных данных можно выделить 4 блока проблем в зависимости от частоты их упоминания участниками исследования :
					ul
						li
							b Наиболее острые,
							span  широко распространенные проблемы, о которых говорит более 80% опрошенных. К этим проблемам относятся: нарушения при предоставлении медицинской помощи, нарушения питания и психологическое насилие со стороны сотрудников ФСИН. Несмотря на то, что исследованием является нерепрезентативным, упоминание этих проблем практически в каждой анкете позволяет предположить, что именно эти проблемы могут иметь тотальное распространение и причинять наибольшее страдание людям, находящимся в заключении.
						li
							b Острые проблемы,
							span  о существовании которых говорили порядка 60-70% опрошенных. К ним относятся: нарушения, связанные с обеспечением заключенных одеждой, физическое насилие к заключенным со стороны сотрудников ФСИН, нарушения представления свиданий заключенных с родными, а также нарушения при транспортировке заключенных.
						li
							b Распространенные проблемы,
							span  о существовании которых говорили порядка 40-50% опрошенных. К ним относятся случаи трудового рабства, вымогательство со стороны сотрудников ФСИН и других заключенных, нарушения при водворении в карцер и ШИЗО, нарушения при общении с защитником и адвокатом, отказ в телефонных звонках.
						li
							b Остальные проблемы,
							span  о существовании которых упоминали от четверти до трети опрошенных. К ним относятся психологическое и физическое насилие со стороны других заключенных (33-35%) и нарушения со стороны сотрудников ФСИН в связи с отправлением религиозных обрядов, а также отказ в почтовой связи (21-24%). Реже всего – в 10% случаев – упоминались нарушения в связи с отправлением религиозных обрядов со стороны других заключенных.


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
		v-layout(v-for="(category, name, j) in analytics" :key='j' column style="width: 88%; margin-left: 6vw" class="mt-12 mb-12 pb-12 pt-12" v-if='$t("analytics." + name + ".title").toString() !== ("analytics." + name + ".title")')
			v-lazy(v-model="isActive[j]" :options="j ? {threshold: 0.5, rootMargin: getRootMargin(j)} : {threshold: 0.5}"  transition="fade-transition")
				div(:id="'analyse' + j")
					p(class="analyse-headline mt-12") {{$t("analytics." + name + ".title")}}
					span(class="analyse-subtitle mt-2 mb-2") {{$t("analytics." + name + ".subtitle")}}
					h4(class="ml-0 mt-6 mb-3") Динамика изменения количества нарушений по годам
					span(class="analyse-subtitle mt-2 mb-6") Когда к нам обращаются, мы просим указать, когда происходили нарушения. На основе этих данных вы видите график
					v-container(fluid, style="max-width: 1000px")
						v-sparkline(:value="category.count_by_years.values" type="trend" smooth="4" stroke-linecap="round" :gradient="['red', 'orange', 'yellow']" gradientDirection="top" auto-draw auto-draw-easing="ease-in-out"
						show-labels label-size="5" :labels="category.count_by_years.years" )
							template(v-slot:label="item") {{item.value % 2 - 1 ? item.value : ''}}
					div(v-for="(subcategory, name1, v) in category.subcategories" :key="v" class="mb-6")
						v-layout(column, class="mt-4")
							h4(class="ml-0") {{ $t("violation_types."  + name1) }}
							v-layout(row, class="ml-0", :style="'width:' + getWidth(subcategory.total_count) + '%'")
								v-tooltip(bottom)
									template(v-slot:activator="{ on, attrs }")
										div(class="stats-digit" style="margin-left: -45px" :style="'background-color:' + getColor(subcategory.total_count)")
											p(style="align-items: center" v-bind="attrs" v-on="on") {{ subcategory.total_count }}
									span Общее количество нарушений в подкатегории
								v-layout( v-for="(value2, u) in subcategory.values", :key="u" column v-if="value2.name !== 'total_count' && value2.name !== 'total_count_appeals'" :style="'width:' + value2.value / (subcategory.total_count) * 100 + '%'")
									ProgressLinearAnimated(:value="value2.value" height="25" color="#4F5250" offset="-1")
									span(class="analyse-explainer") {{ value2.name }}
		v-container(fluid style="min-height: 200px")
		v-footer(height="162", color="white", padless, class="mt-12")
			v-layout(style="width: 90%; margin-left: 5%; margin-right: 5%" justify-space-around)
				v-btn(:x-large="!isMobile()", :small="isMobile()" text, class="footerBtn", :to="'/'")
					span <-/   КАРТА
				v-spacer
				v-btn(:x-large="!isMobile()", :small="isMobile()" text, class="footerBtn", :to="'stories'")
					span ИСТОРИИ
					span(style="transform: rotate(-180deg);")  <-/   
</template>

<script lang="ts">
    import Vue from 'vue';
    import axios from "axios";
    import Component from "vue-class-component";
    import * as store from "@/plugins/store";
    import {category, resp, subcategory} from "@/models/analytics";
    import * as api from "@/utils/api";
    import ProgressLinearAnimated from "@/components/ProgressLinearAnimated.vue";

    Vue.component('ProgressLinearAnimated', ProgressLinearAnimated);

    @Component
    export default class Analytics extends Vue {
        analytics: Map<string, category> = new Map();
        totalCount: number = 3000;
        totalCountAppeals: number = 371;
        totalCountCovid: number = 100;
        loading = true;
        headlineEnding: string = "о";
        headlineCovidEnding: string = "й";
        isActive: boolean[] = [];

        isMobile() {
            return window.innerWidth < 600
        }

        getRootMargin(i: number) {
            if ( i == 1 ) return "-100px";
            else return window.innerHeight / -5 + "px";
        }

        getWidth(val) {
            let max_ = this.totalCount;
            if ( val < max_ / 20 ) return 57;
            if ( val < max_ / 14 ) return 87;
            return 100;
        }

        getColor(val) {
            let max_ = this.totalCount;
            if ( val < max_ / 20 ) return "#e9e706";
            if ( val < max_ / 14 ) return "#ff9e00";
            else return "#D50000";
        }

        getKeyByValue(object, value) {
            //JSON to compare objects
            return Object.keys(object).find(key => JSON.stringify(object[key]) === JSON.stringify(value));
        }

        async getAnalytics() {
            await api.getAnalytics().then(response => {
                let resp = response.data as resp;
                this.analytics = resp.violations_stats as Map<string, category>;

                // preprocessing: removes elements <=10 and rare ones
                // then object → array
                Object.keys(this.analytics).forEach(category => {
                    Object.values(this.analytics[category].subcategories as subcategory[]).forEach(subcategory => {
                        this.isActive.push(false);
                        let values = [];
                        let valuesToDelete = [];
                        let sorted = [];
                        let sortedKeys = [];
                        Object.keys(subcategory.values).forEach(name => {
                            // delete rare values
                            if ( subcategory.values[name] != undefined ) {
                                if ( subcategory.values[name] <= 10 ) delete subcategory.values[name];
                                // @ts-ignore
                                else values.push(subcategory.values[name]);
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
                            Object.keys(subcategory.values).forEach(_name => {
                                // @ts-ignore
                                if ( valuesToDelete.includes(subcategory.values[_name]) ) delete subcategory.values[_name];
                            });
                        }
                        // sort object "max → min" and transform into array
                        // @ts-ignore
                        sortedKeys = Object.keys(subcategory.values).sort(function (a, b) {
                            return subcategory.values[b] - subcategory.values[a]
                        });
                        sortedKeys.forEach(key => {
                            // @ts-ignore
                            sorted.push({name: key, value: subcategory.values[key]});
                        });
                        this.analytics[category].subcategories[this.getKeyByValue(this.analytics[category].subcategories, subcategory)].values = sorted;
                    });
                    // preprocess data for bar chart
                    if ( this.analytics[category].count_by_years ) {
                        let years = [];
                        let values = [];
                        Object.keys(this.analytics[category].count_by_years).forEach(year => {
                            // @ts-ignore
                            years.push(year);
                            // @ts-ignore
                            values.push(this.analytics[category].count_by_years[year]);
                        });
                        delete this.analytics[category].count_by_years;
                        this.analytics[category].count_by_years = {years: [], values: []};
                        this.analytics[category].count_by_years.years = years;
                        this.analytics[category].count_by_years.values = values;
                    }
                });

                this.totalCount = resp.total_count;
                this.totalCountAppeals = resp.total_count_appeals;
                this.totalCountCovid = resp.total_count_appeals_corona;
                //console.log(this.analytics);
                // set headline ending: "о", "а"
                if ( this.totalCountAppeals % 10 === 1 ) this.headlineEnding = "о";
                else if ( this.totalCountAppeals % 10 >= 2 && this.totalCountAppeals % 10 <= 4 ) this.headlineEnding = "а";
                else this.headlineEnding = "";
                // set headline Covid ending headlineCovidEnding
                if ( this.totalCountCovid % 10 === 1 ) this.headlineCovidEnding = "е";
                else if ( this.totalCountCovid % 10 >= 2 && this.totalCountCovid % 10 <= 4 ) this.headlineCovidEnding = "я";
                this.loading = false;
            });
        };

        mounted(): void {
            this.getAnalytics();
        }
    }
</script>

<style>
	text {
		color: black;
		font-size: .5rem;
	}

	@media screen and (min-width: 960px) {
		text {
			font-size: .3rem;
		}
	}

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
		left: -5vw;
		margin-top: -30px;

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
			width: 67vw;
			font-size: 60px !important;
			line-height: 60px !important;
			margin-left: 4.5vw;
		}

		#analytics-subtitle {
			width: 65vw;
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
		white-space: pre-line;
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

	@media screen and (max-width: 600px) {
		.footerBtn {
			font-size: 18px !important;
		}
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