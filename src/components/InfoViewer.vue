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
					<v-btn md1 xs1 flat depressed text x-large style="margin-top: 20px"><v-icon>mdi-share</v-icon></v-btn>
					<v-btn md1 xs1 flat depressed text x-large style="margin-top: 20px"
									@click="$emit('closes')"><v-icon>mdi-window-close</v-icon></v-btn>
				</v-card-actions>
				<v-card-text>
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
					<br><br><br>Далее те же данные, а я показываю возможность скроллить<br><br><br>
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
		z-index: 11;
		left: 1vh;
		width: 40vw;
		bottom: 7vh;
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
	}


</style>
