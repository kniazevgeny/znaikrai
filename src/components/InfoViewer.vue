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
							<v-layout wrap style="padding-top: 30px">
								<h4>Физическое воздействие (ФСИН)</h4>
								<v-layout style="width: 100%;">
									<div class="stats-digit" style="background-color: #D50000;"><p style="align-items: center">5</p></div>
									<v-progress-linear background-color="white" color="#D50000" value="65"
									                   height="20"></v-progress-linear>
								</v-layout>
								<br>
								<p>
									Нахождение в неотапливаемом помещении без теплой одежды в холодное время года
								</p>
							</v-layout>
							<v-divider></v-divider>
							<v-layout wrap style="padding-top: 20px">
								<h4>Физическое воздействие (ФСИН)</h4>
								<v-layout style="width: 100%;">
									<div class="stats-digit" style="background-color: #FFB800;"><p style="align-items: center">3</p></div>
									<v-progress-linear background-color="white" color="#FFB800" value="35"
									                   height="20"></v-progress-linear>
								</v-layout>
								<br>
								<p>
									Нахождение в неотапливаемом помещении без теплой одежды в холодное время года
								</p>
							</v-layout>
							<v-divider></v-divider>
							<v-layout wrap style="padding-top: 20px">
								<h4>Физическое воздействие (ФСИН)</h4>
								<v-layout style="width: 100%;">
									<div class="stats-digit" style="background-color: #1F870E;"><p style="align-items: center">0</p></div>
									<v-progress-linear background-color="white" color="#1F870E" value="1"
									                   height="20"></v-progress-linear>
								</v-layout>
								<br>
								<p>
									Статистика пока не сформирована из табличных значений, поэтому данные везде одинаковые
								</p>
							</v-layout>

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

<script>
    import * as store from "../plugins/store";
    import BarChart from '../components/LinearCh'

    export default {
        name: "InfoViewer",
        props: ['info'],
        components: {
            BarChart: BarChart
        },
        data: () => ({
            activeBtn: 1,
        }),
        methods: {
            //getWord()
            share() {
                // warning: this works only over https
		            // on localhost it has no effect
                navigator.clipboard.writeText(window.location.host + '/?id=' + this.info._id);
                store.setSnackbar({
                    message: "Ссылка скопирована",
                    color: "success",
                    active: true
                });
            }
        },
        mounted() {
            console.log(this.$t('infoViewer.type').toString() !== ('infoViewer.ty'));
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
		position: absolute!important;
		z-index: 91;
		left: 1vh;
		width: 40vw;
		bottom: 1vh!important;
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

	.stats-digit {
		width: 29px;
		height: 20px;
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
