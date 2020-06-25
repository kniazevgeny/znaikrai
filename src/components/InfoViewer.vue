<template>
	<v-card
		class="inform"
		max-width="50vw"
		light
		style="color:#000; overflow-y: auto; overflow-x: hidden"
		v-if="info"
		tile
	>
		<v-row>
			<v-col id="info-main">
				<v-card-actions style="align-items: start">
					<v-container md10 xs2 class="inf-name">
						{{info.name}}
						<v-skeleton-loader
							v-if="loading"
							type="card-heading"
							min-width="200%"
						></v-skeleton-loader>
					</v-container>
					<v-spacer></v-spacer>
					<v-btn @click="share" md1 xs1 text depressed text x-large style="margin-top: 20px">
						<v-icon>mdi-share</v-icon>
					</v-btn>
					<v-btn md1 xs1 text depressed text x-large style="margin-top: 20px"
					       @click="$emit('closes')">
						<v-icon>mdi-window-close</v-icon>
					</v-btn>
				</v-card-actions>
				<v-card-text>
					<v-layout justify-space-around class="ml-0 pl-0"
					          style="width: calc(100% / 4)">
						<v-btn-toggle v-model="activeBtn" tile mandatory color="white" class="info-navigation" small>
							<v-btn block :outlined="activeBtn !== 0" :dark="activeBtn === 0" :ripple="false" :depressed="false"
							       style="border-color: black!important" color="#D50000">
								COVID-19
							</v-btn>
							<v-btn block :outlined="activeBtn !== 1" :dark="activeBtn === 1" :ripple="false" :depressed="false"
							       style="border-color: black!important">
								Нарушения
							</v-btn>
							<v-btn block :outlined="activeBtn !== 2" :dark="activeBtn === 2" :ripple="false" :depressed="false"
							       style="border-color: black!important">
								Информация
							</v-btn>
							<v-btn block :outlined="activeBtn !== 3" :dark="activeBtn === 3" :ripple="false" :depressed="false"
							       style="border-color: black!important">
								Свидетельства
							</v-btn>

						</v-btn-toggle>
					</v-layout>
					<br>
					<v-layout v-if="info.warning" style="padding-right: 4%;">
						<v-btn large disabled block outlined color="orange">{{ info.warning }}</v-btn>
					</v-layout>
					<v-layout v-if="info.coronavirus" class="mt-0">
					</v-layout>
					<v-window v-model="activeBtn" class="mt-5">
						<v-window-item>
							<div class="mb-12 ml-1">
								<h1 style="color: #D50000; font-family: Akrobat" class="mb-4">Мониторинг ситуации с коронавирусом</h1>
								<v-dialog
									v-model="covidDialog"
									width="700"
								>
									<template v-slot:activator="{ on }">
										<v-btn tile light large outlined block color="black" class="btn-thin" v-on="on">Узнать о
											коронавирусе в
											тюрьмах
										</v-btn>
									</template>
									<v-card>
										<v-card-title
											style="color: #D50000; font-family: 'Akrobat'!important; font-size: 2rem!important; font-weight: bold;"
											primary-title>
											Коронавирус в тюрьмах
										</v-card-title>
										<v-card-text>
											Заключенные в России — одна из самых незащищенных групп граждан. Колонии становятся крупными
											очагов распространения коронавируса.
											Эти вспышки тяжело остановить. У большей части заключенных сниженный иммунитет и масса
											сопутствующих заболеваний, в том числе ВИЧ.
											Еще один фактор — скученность осужденных в бараках. В одном бараке
											содержится 150-200 человек.
											Распространение вируса в таких условиях — моментальное. Как изолировать заболевших и тех, кто с
											ними
											контактировал, в условиях колонии не ясно.
											Качество медицинской помощи в МЛС тоже оставляет желать лучшего.
											Нехватка медикаментов, отсутствие квалифицированных врачей и отсутствие необходимого количества
											коек в санчасти - это приведет к огромному количеству смертей.
											<br>
											<br>
											Поэтому важно, чтобы происходящее внутри исправительных учреждений не оставалось за
											закрытыми стенами, а как можно больше освещалось в СМИ и среди правозащитных организаций.
											<br>
											<br>
											“Русь сидящая” ведет собственный регулярный мониторинг ситуации в млс со 02.04.2020.
											Собираем и систематизируем данные о ситуациях в различных учреждениях ФСИН с помощью сообщений,
											которые получаем от родственников осужденных в обращениях к фонду и комментариев в социальных
											сетях
											“Руси сидящей”.
											Проводим внутреннюю проверку по каждому сообщению. По грубейшим нарушениям юристы фонда готовят и
											отправляют жалобы в Генеральную прокуратуру.
											Данные, полученные в ходе мониторинга, наносим на карту. Призываем журналистов, правозащитников,
											осужденных и их родственников участвовать в нашем мониторинге и сообщать
											о ситуации с коронавирусом в колониях.
										</v-card-text>
									</v-card>
								</v-dialog>
								<p style="background: #f3f3f3; border-radius: 3px" class="mt-2 mb-2 pa-6">
									{{$t('infoViewer.responsibilityWarning')}}
								</p>
								<v-card style="width: 95%;" wrap tile flat v-for="(cases, i) in covidViolations" :key="i">
									<h3 style="width: 100%; margin-top: 10px; margin-bottom: 0px; font-family: 'Roboto';">
										{{cases.name_of_fsin}},
										{{cases.region}}, {{cases.date}}</h3>
									<p class="mb-2">«{{cases.info}}»
										<a v-if="cases.site" :href="cases.site" rel="noreferrer" target="_blank">{{cases.site}}</a>
									</p>
									<!--p>Официальное подтверждение со стороны ФСИН:
										<span v-if="cases.comment_fsin !== ''">{{cases.comment_fsin}}</span>
										<span v-else>отсутствует</span>
										<a v-if="cases.sitefsin" :href="cases.sitefsin" target="_blank">{{cases.sitefsin}}</a>
									</p-->
									<v-divider></v-divider>
								</v-card>
								<v-btn v-if="!tellCovid" tile light large outlined block color="black" class="btn-thin" @click="tellCovid = true">Сообщить о COVID-19</v-btn>
								<Form v-if="tellCovid && !sentTellCovid" originType="0" questionsOrigin="0" to="/form_corona" :place_id="info._id" @sent="sentTellCovid = true"></Form>
								<v-btn v-if="sentTellCovid" tile light large outlined block color="black" class="btn-thin" :to="'tell?place_id=' + info._id">Cообщить о других нарушениях</v-btn>
								<span v-if="!info.coronavirus">Нет информации по covid-19</span>
							</div>
						</v-window-item>
						<v-window-item>
							<p style="background: #f3f3f3; border-radius: 3px" class="mb-2 pa-6">
								{{$t('infoViewer.violationDescription')}}
							</p>
							<violationChart
								v-if="violations.size && $t('violation_types.' + violation[0]).toString() !== ('violation_types.' + violation[0])"
								v-for="(violation, i) in violations" :key="i"
								:title="$t('violation_types.' + violation[0])" :comments="violation[1].comments"
								:count="violation[1].counter"></violationChart>
							<p v-if="!loading && !violations.size">Нарушения не зафиксированы</p>
							<v-skeleton-loader
								v-if="loading"
								type="article"
								v-for="j in 2"
								:key="j"
							></v-skeleton-loader>
						</v-window-item>
						<v-window-item>
							<div class="text--primary" style="color:#000!important; width: 100%; padding-top: 30px">
								<v-row cols="12" class="ml-1">

									<v-layout style="width: 90%;" wrap v-for="(value, i) in info" :key="i"
									          v-if="i !== 'name' && i !== 'warning' && i !== 'coronavirus' && $t('infoViewer.' + i).toString() !== ('infoViewer.' + i)">
										<!-- Special parameters↑                                                if localisation.ts contains this name↑ -->
										<v-flex xs12 sm4 class="info-table-name">{{ $t('infoViewer.' + i).toString() }}</v-flex>
										<!-- Default: -->
										<v-flex v-if="i !== 'phones' && i !== 'website'" xs8 class="info-table-value">
											{{ value }}
										</v-flex>
										<!-- Special cases: phones, websites... -->
										<v-flex xs12 sm8 v-else wrap style="width: 100%;">
											<v-layout v-if="i === 'phones'" v-for="value2 in info.phones" :key="value2" style="width: 100%;">
												<v-flex class="info-table-value"><a :href="'tel:' + value2">{{ value2 }}</a></v-flex>
											</v-layout>
											<v-flex v-if="i === 'website'" xs12 sm8>
												<a :href="value" target="_blank" rel="noreferrer">{{ value }}</a>
											</v-flex>
										</v-flex>

										<v-flex xs12 class="divide">
											<v-divider></v-divider>
										</v-flex>
									</v-layout>
								</v-row>

								<v-row cols="12" v-if="loading">
									<v-layout style="width: 100%;" wrap v-for="j in 4" :key="j">
										<v-flex xs6 class="info-table-name">
											<v-skeleton-loader
												type="card-heading"
											></v-skeleton-loader>
										</v-flex>
										<v-flex xs6 class="info-table-value">
											<v-skeleton-loader
												type="list-item-two-line"
											></v-skeleton-loader>
										</v-flex>
										<br>
									</v-layout>
								</v-row>
							</div>
						</v-window-item>

						<v-window-item>
							<p style="background: #f3f3f3; border-radius: 3px" class="mt-2 mb-2 pa-6">
								{{$t('infoViewer.responsibilityWarning')}}
							</p>
							<v-layout v-for="(proof, u) in proofs" :key="u" wrap style="margin-top: 10px">
								<!--h4>{{proof.title}}</h4-->
								<v-layout>
									<div><p style="align-items: center; margin-left: 5px;">
										<b>{{proof.time}}:</b>
										<br>
										«{{proof.text}}»</p>
										<v-divider style="width: 100%;"></v-divider>
									</div>
								</v-layout>
								<br>
							</v-layout>
							<p v-if="!loading && !proofs.length">Свидетельства отсутствуют</p>
							<v-skeleton-loader
								v-if="loading"
								type="paragraph"
								v-for="j in 4"
								:key="j"
							></v-skeleton-loader>
						</v-window-item>
					</v-window>
					<v-btn class="btn" @click="showEmailSub()" v-if="!emailClick" tile text background-color="transparent"
					       style="float: right;">
						<v-icon>mail_outline</v-icon>
						<span>Подписаться на рассылку</span>
					</v-btn>
					<EmailSubscription v-if="emailClick"></EmailSubscription>
				</v-card-text>
			</v-col>
		</v-row>
	</v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Vuetify from 'vuetify';

    Vue.use(Vuetify);
    import * as store from "../plugins/store";
    import axios from "axios";
    import {Component, Prop, Watch} from "vue-property-decorator";
    import ViolationChart from "@/components/ViolationChart.vue"
    import EmailSubscription from "@/components/EmailSubscription.vue"
    import Form from "@/components/Form.vue";
    Vue.component('Form', Form);

    Vue.component('violationChart', ViolationChart);
    Vue.component('EmailSubscription', EmailSubscription);

    @Component
    export default class InfoViewer extends Vue {
        @Prop({required: true})
        public _info!: object;

        activeBtn: number = 2;
        info: Array<any> = [];
        proofs: Array<object> = [];
        violations = new Map();
        covidViolations: Array<object> = [];
        covidDialog = false;
        loading = true;

        emailClick = false;
        tellCovid = false;
        sentTellCovid = false;

        //getWord()
        showEmailSub() {
            this.emailClick = true;
            this.$vuetify.goTo(0, {duration: 500, offset: 0, easing: 'easeInOutCubic',})
        }

        share() {
            // warning: this works only over https
            // on localhost it has no effect
            navigator.clipboard.writeText(window.location.host + '/?id=' + (this.info as any)._id);
            store.setSnackbar({
                message: "Ссылка скопирована",
                color: "success",
                active: true
            });
        }

        deleteEmpty() {
            for (let propName in this.info) {
                if ( (propName !== "warning") && (this.info[propName] === null || this.info[propName].toString() === "" || this.info[propName] === undefined) ) {
                    // deletes empty props
                    delete this.info[propName];
                }
            }
        }

        checkCovidViolations() {
            if ( (this.info as any).coronavirus ) {
                this.activeBtn = 0; //focus on covid window
                let _v = (this.info as any).corona_violations; //raw data
                let v = this.covidViolations;
                if ( _v != undefined ) {
                    // get links from strings
                    _v.forEach((val) => {
                        if ( val.info != "" ) {
                            let i = val.info.indexOf("http");
                            val.site = val.info.slice(i, -1);
                            val.info = val.info.slice(0, i);

                        }
                        if ( val.comment_fsin != "" ) {
                            let j = val.comment_fsin.indexOf("http");
                            val.sitefsin = val.comment_fsin.slice(j, -1);
                            val.comment_fsin = val.comment_fsin.slice(0, j);

                        }
                        v.push(val);
                    })
                }
            }
        }

        checkViolations() {
            let _v = (this.info as any).violations; //raw data
            let v = this.violations;
            if ( _v != undefined ) {
                _v.forEach((val) => {
                    Object.keys(val).forEach(value => {
                        //console.log(value, typeof(val[value]));
                        if ( val[value] != undefined && typeof (val[value]) == "string"
                            && val[value] != "" && val[value].toLowerCase().slice(0, 2) != "не" ) {
                            if ( v.get(value) != undefined )
                                v.set(value, {
                                    counter: v.get(value).counter + 1,
                                    comments: v.get(value).comments.concat(val[value])
                                });
                            else v.set(value, {counter: 1, comments: [val[value]]});
                            if ( value == "additional_information" ) {
                                this.proofs.push({text: val[value], time: val["time_of_offence"]});
                            }
                            //console.log(value);
                            //this.maxViolations = v.get(value).counter > this.maxViolations ? v.get(value).counter : this.maxViolations;
                        }
                    });
                })
            }
            //console.log(v);
            //console.log(this.proofs);
        }

        checkPlace() {
            let id = (this._info as any)._id;
            console.log(id);
            // console.log(id);
            // console.log(store.isPlace((this._info as any)._id));
            if ( (this._info as any) !== undefined && (this._info as any)._id !== undefined )
            // if it's in the storage
                if ( store.isPlace(id) ) {
                    // @ts-ignore
                    this.info = store.place((this._info as any)._id);
                    this.checkViolations();
                    this.checkCovidViolations();
                    this.loading = false;
                } else
                    axios.get(store.apibase() + '/places/' + (this._info as any)._id).then(response => {
                        console.log(response.data.place);
                        let resp = response.data.place;
                        resp.name = resp.name.slice(resp.name.indexOf("«") + 1, resp.name.indexOf("»"));
                        // removes space after №
                        if ( resp.name.indexOf("№") !== -1 )
                            resp.name = resp.name.slice(0, resp.name.indexOf("№") + 1) + resp.name.slice(resp.name.indexOf("№") + 2, resp.name.length);

                        this.info = resp;
                        this.deleteEmpty();
                        store.setPlace(resp);
                        this.checkViolations();
                        this.checkCovidViolations();
                        this.loading = false;
                    });
            //console.log(this.$t('infoViewer.type').toString() !== ('infoViewer.ty'));
        }

        @Watch('_info')
        onInfoChange(value: object) {
            //console.log(value);
            // erase previous information
            this.info = [];
            this.violations = new Map();
            this.loading = true;
            this.covidViolations = [];
            this.proofs = [];
            this.emailClick = false;
            this.tellCovid = false;
            this.sentTellCovid = false;
            this.checkPlace();
        }

        @Watch('activeBtn')
        onActiveBtnChange() {
            this.emailClick = false;
        }
    }
</script>

<style>
	@import url('../assets/styles/main.css');

	/*.off {
			!*display: none;

			visibility: hidden;
			width: 0;
			height: 0;
			position: fixed!important;*!
			z-index: -1;
			margin-bottom: -1000px;
			!*
							animation: fade-in-move-up 0.7s;
			*!
	}

	.on {
			position: relative !important;
			top: 15%;
			left: 2%;
			height: 80%;
			width: 40%;
			!*transform: translateY(100%);
			transition: all 500ms;*!
	}*/
	.inform {
		position: absolute !important;
		z-index: 91;
		left: 1vh;
		width: 40vw;
		bottom: -4vh !important;
		height: 85vh;
		border-radius: 2px;
	}

	.inform::-webkit-scrollbar {
		display: none;
	}

	.inf-name {
		width: 90%;
		font-size: 40px;
		line-height: 48px;
		display: flex;
		align-items: flex-end;
		text-transform: uppercase;
		color: #D50000 !important;
		font-family: 'Akrobat' !important;
		font-weight: 900;
	}

	.v-item-group > .theme--light > span {
		color: #000 !important;
		font-family: 'Akrobat';
		font-weight: 800;
		font-size: 1rem;
	}

	.v-item-group > .theme--dark > span {
		font-family: 'Akrobat';
		font-weight: 800;
		font-size: 1rem;
	}

	#info-main {
		width: 94%;
		margin-left: 3%;
		margin-right: 3%;
	}

	@media screen and (max-width: 960px) {
		.v-item-group > .v-btn > span {
			font-size: 0.8rem !important;
		}

		.inf-name {
			width: 55% !important;
			font-size: 30px !important;
			line-height: 38px;
		}

		#info-main {
			width: 100vw;
			margin: 0;
		}

		.inform {
			left: 0;
			right: 0;
		}
	}

	@media screen and (max-width: 600px) {
		.v-item-group > .v-btn > span {
			font-size: 0.75rem !important;
			letter-spacing: .05rem !important;
		}

		.v-item-group > .v-btn {
			padding: 0 6px !important;
		}
	}

	.divide {
		padding: 17px;
	}

	.info-table-name {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: bold;
		font-size: 14px;
		line-height: 150%;
		/* or 21px */
		text-transform: uppercase;
		color: #070809;
	}

	.info-table-value {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 150%;
		/* or 21px */
		color: #070809;
	}

	.v-window-item > .layout > h4 {
		padding-bottom: 9px;
	}

	.v-window-item > .layout > p {
		padding-top: 14px;
		padding-bottom: 10px;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		line-height: 150%;
	}

	.info-table-value:first-letter {
		text-transform: uppercase;
	}
</style>