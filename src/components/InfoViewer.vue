<template>
	<!-- TODO: v-skeleton-->
	<v-card
		class="inform"
		max-width="50vw"
		light
		style="color:#000; overflow-y: auto; overflow-x: hidden"
		v-if="info"
		tile
	>
		<v-row>
			<v-col style="width: 94%; margin-left: 3%;">
				<v-card-actions style="align-items: start">
					<v-container md10 xs10 class="inf-name">
						{{info.name}}
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
					<v-layout justify-space-around style="width: 32%; margin-left: 0%;">
						<v-btn-toggle v-model="activeBtn" tile mandatory color="white">
							<v-btn block :outlined="activeBtn !== 0" :dark="activeBtn === 0" :ripple="false" :depressed="false"
							       style="border-color: black!important">
								Нарушения
							</v-btn>
							<v-btn block :outlined="activeBtn !== 1" :dark="activeBtn === 1" :ripple="false" :depressed="false"
							       style="border-color: black!important">
								Информация
							</v-btn>
							<v-btn block :outlined="activeBtn !== 2" :dark="activeBtn === 2" :ripple="false" :depressed="false"
							       style="border-color: black!important">
								Свидетельства
							</v-btn>
						</v-btn-toggle>
					</v-layout>
					<br>
					<v-layout v-if="info.warning" style="padding-right: 4%;">
						<v-btn large disabled block outlined color="orange">{{ info.warning }}</v-btn>
					</v-layout>
					<v-window v-model="activeBtn">
						<v-window-item>
							<violationChart v-if="violations.size && $t('violation_types.' + violation[0]).toString() !== ('violation_types.' + violation[0])" v-for="(violation, i) in violations" :key="i"
							                :title="$t('violation_types.' + violation[0])" :comments="violation[1].comments"
							                :count="violation[1].counter"></violationChart>
						</v-window-item>
						<v-window-item>
							<div class="text--primary" style="color:#000!important; width: 90%; margin-left: 3%; padding-top: 30px">
								<v-row cols="12">

									<v-layout style="width: 100%;" wrap v-for="(value, i) in info" :key="i"
									          v-if="i !== 'name' && i !== 'warning' && i !== 'coronavirus' && $t('infoViewer.' + i).toString() !== ('infoViewer.' + i)">
										<!-- Special parameters↑                                                if localisation.ts contains this name↑ -->
										<v-flex xs4 class="info-table-name">{{ $t('infoViewer.' + i).toString() }}</v-flex>
										<!-- Default: -->
										<v-flex v-if="i !== 'phones' && i !== 'website'" xs8 class="info-table-value">
											{{ value }}
										</v-flex>
										<!-- Special cases: phones, websites... -->
										<v-flex xs8 v-else wrap style="width: 100%;">
											<v-layout v-if="i === 'phones'" v-for="value2 in info.phones" :key="value2" style="width: 100%;">
												<v-flex class="info-table-value"><a :href="'tel:' + value2">{{ value2 }}</a></v-flex>
											</v-layout>
											<v-flex v-if="i === 'website'" xs8>
												<a :href="value">{{ value }}</a>
											</v-flex>
										</v-flex>

										<v-flex xs12 class="divide">
											<v-divider></v-divider>
										</v-flex>
									</v-layout>

								</v-row>
							</div>
						</v-window-item>
						<v-window-item>
							Скоро появятся
						</v-window-item>
					</v-window>
				</v-card-text>

			</v-col>
		</v-row>
	</v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import * as store from "../plugins/store";
    //import BarChart from '../components/LinearCh'
    import ViolationChart from "@/components/ViolationChart.vue"
    import axios from "axios";
    import {Component, Prop, Watch} from "vue-property-decorator";

    Vue.component('violationChart', ViolationChart);

    @Component
    export default class InfoViewer extends Vue {
        @Prop({required: true})
        public _info!: object;

        activeBtn: number = 1;
        info: Array<any> = [];
        violations = new Map();
        violationt: Array<any> = [];
        maxViolations: number = 0;
        loading = true;

        //getWord()
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

        checkViolations() {
            let _v = (this.info as any).violations; //raw data
            let v = this.violations;
            console.log(_v);
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
                            //console.log(val[value]);
                            this.violationt.push(value);
                            this.maxViolations = v.get(value).counter > this.maxViolations ? v.get(value).counter : this.maxViolations;
                        }
                    });
                    console.log(this.violationt);
                })
            }
            console.log(v);
            console.log(this.maxViolations);
        }

        checkPlace() {
            let id = (this._info as any)._id;
            // console.log(id);
            // console.log(store.isPlace((this._info as any)._id));
            if ( (this._info as any) !== undefined && (this._info as any)._id !== undefined )
            // if it's in the storage
                if ( store.isPlace(id) ) {
                    // @ts-ignore
                    this.info = store.place((this._info as any)._id);
                    this.checkViolations();
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
                    });
            console.log(this.$t('infoViewer.type').toString() !== ('infoViewer.ty'));
        }

        @Watch('_info')
        onInfoChange(value: object) {
            console.log(value);
            this.info = [];
            this.checkPlace();
        }

    }
</script>

<style>
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
		bottom: 1vh !important;
		height: 75vh;
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
		font-family: 'Akrobat';
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