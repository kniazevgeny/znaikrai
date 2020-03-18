<template>
	<v-card
		class="inform"
		max-width="50vw"
		light
		style="color:#000; overflow-y: auto; overflow-x: hidden"
		v-if="info"
	>
		<v-row>
			<v-col style="width: 94%; margin-left: 3%;">
				<v-card-actions style="align-items: start">
					<v-container md10 xs10 class="inf-name">
						{{info.name}}
					</v-container>
					<v-spacer></v-spacer>
					<v-btn md1 xs1 text depressed text x-large style="margin-top: 20px">
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
					<v-window v-model="activeBtn">
						<v-window-item>
							<div class="text--primary" style="color:#000!important">
								{{info.type}}<br>
								{{info.location}}<br>
								{{info.notes}}<br>
								{{info.position.lat}}
								{{info.position.lng}}
								{{info.number_of_violations}}<br>
								{{info.phone_number}}<br>
								{{info.google_maps_rating}}<br>
								{{info.website}}
							</div>
						</v-window-item>
						<v-window-item>
							<div class="text--primary" style="color:#000!important">
								{{info.type}}<br>
								{{info.location}}<br>
								{{info.notes}}<br>
								{{info.position.lat}}
								{{info.position.lng}}
								{{info.number_of_violations}}<br>
								{{info.phone_number}}<br>
								{{info.google_maps_rating}}<br>
								{{info.website}}
							</div>
							<div class="text--primary" style="color:#000!important">
								{{info.type}}<br>
								{{info.location}}<br>
								{{info.notes}}<br>
								{{info.position.lat}}
								{{info.position.lng}}
								{{info.number_of_violations}}<br>
								{{info.phone_number}}<br>
								{{info.google_maps_rating}}<br>
								{{info.website}}
							</div>
						</v-window-item>
						<v-window-item>
							<div class="text--primary" style="color:#000!important">
								{{info.type}}<br>
								{{info.location}}<br>
								{{info.notes}}<br>
								{{info.position.lat}}
								{{info.position.lng}}
								{{info.number_of_violations}}<br>
								{{info.phone_number}}<br>
								{{info.google_maps_rating}}<br>
								{{info.website}}
							</div>
						</v-window-item>
					</v-window>

					<div class="text--primary" style="color:#000!important">
						{{info.type}}<br>
						{{info.location}}<br>
						{{info.notes}}<br>
						{{info.position.lat}}
						{{info.position.lng}}
						{{info.number_of_violations}}<br>
						{{info.phone_number}}<br>
						{{info.google_maps_rating}}<br>
						{{info.website}}
					</div>
					<div class="text--primary" style="color:#000!important">
						{{info.type}}<br>
						{{info.location}}<br>
						{{info.notes}}<br>
						{{info.position.lat}}
						{{info.position.lng}}
						{{info.number_of_violations}}<br>
						{{info.phone_number}}<br>
						{{info.google_maps_rating}}<br>
						{{info.website}}
					</div>
				</v-card-text>

				<v-progress-linear
					background-color="white"
					color="red"
					value="35"
					height="20px"

				></v-progress-linear>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
    import BarChart from '../components/LinearCh'

    export default {
        name: "InfoViewer",
        props: ['info'],
        components: {
            BarChart: BarChart
        },
        data: () => ({
            activeBtn: 1
        })
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
		bottom: 3vh;
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

</style>
