<template lang="html">
	<v-layout wrap>
		<v-layout style="width: 100vw;">
			<div id="modePicker">
				<v-btn-toggle v-model="mapMode" mandatory tile>
					<v-btn active-class="v-btn--disabled">
						<v-icon>adjust</v-icon>
					</v-btn>
					<v-btn  active-class="v-btn--disabled">
						<v-icon>blur_on</v-icon>
					</v-btn>
				</v-btn-toggle>
			</div>
			<google-map :center="{lat: 61.52401, lng: 105.318756}" :zoom="3"
			            style="height: 100vh; width: 100vw; clear: left; z-index: 1; bottom: 0;" :options="mapStyle">
				<gmap-info-window :position="infoWindowPos" :opened="infoWinOpen"
				                  @closeclick="infoWinOpen=false" :options="infoOptions"><!--:-->
				</gmap-info-window>
				<GmapCluster v-if="!mapMode">
					<gmap-marker v-if="markers1" v-for="(m,i) in markers1" :key="i" :position="m.position" :clickable="true"
					             @click="toggleInfoWindow(m,i)" :icon="i % 2 ? icong : iconr"></gmap-marker>
				</GmapCluster>
				<gmap-marker v-if="mapMode && markers1" v-for="(m,i) in markers1" :key="i" :position="m.position"
				             :clickable="true"
				             @click="toggleInfoWindow(m,i)" :icon="i % 2 ? icong : iconr"></gmap-marker>
				<!--<gmap-marker :position="{
								lat: 47.376332,
								lng: 8.547511
							 }" :clickable="true"
							@click="toggleInfoWindow({
							 position: {
								lat: 47.376332,
								lng: 8.547511
							 },
							 infoText: '<strong>Marker 1</strong>'
						 },1)"></gmap-marker>-->
				<!--				<ground-overlay source="./overlay.png" :bounds="{
								north: 1.502,
								south: 1.185,
								east: 104.0262,
								west: 103.5998,
						  }" :opacity="0.5">
								</ground-overlay>-->
			</google-map>
		</v-layout>
		<transition name="slide-fade" mode="in-out" style="z-index: 99">
			<div v-show="infoWinOpenMine" class="fade-transition inform">
				<InfoViewer :info="currentInfo" @closes="closes()"></InfoViewer>
			</div>
		</transition>
		<!--v-btn @click="getplaces">get</v-btn-->

		<!--a v-if="markers1" v-text="markers1"></a-->
	</v-layout>
</template>

<script lang="js">
    import Vue from "vue";
    import axios from "axios";
    import * as store from "../plugins/store";
    import * as VueGoogleMaps from "vue2-google-maps";
    import iconred from "../assets/r2.svg";
    import icongreen from "../assets/g.svg";
    import InfoViewer from "../components/InfoViewer";
    import GmapCluster from 'vue2-google-maps/dist/components/cluster';


    Vue.use(VueGoogleMaps, {
        load: {
            key: process.env.VUE_APP_GMAPSKEY, //or paste your api key here
            //to create local env vars, create .env.local file in root folder, then add VUE_APP_*=value
            //libraries: Geocoder,
            v: '3.39',
        },
        // Demonstrating how we can customize the name of the components
        installComponents: false,
    });
    /*
        Vue.component('iconr', iconred);
    */
    Vue.component('google-map', VueGoogleMaps.Map);
    Vue.component('map-card', {
        template: ''
    });
    Vue.component('gmap-marker', VueGoogleMaps.Marker);
    Vue.component('InfoViewer', InfoViewer);
    Vue.component('GmapCluster', GmapCluster);
    Vue.component('gmap-info-window', VueGoogleMaps.InfoWindow);
    Vue.component('ground-overlay', VueGoogleMaps.MapElementFactory({
        mappedProps: {
            'opacity': {}
        },
        props: {
            'source': {type: String},
            'bounds': {type: Object},
        },
        events: ['click', 'dblclick'],
        name: 'groundOverlay',
        ctr: () => google.maps.GroundOverlay,
        ctrArgs: (options, {source, bounds}) => [source, bounds, options],
    }));


    export default {
        name: "Gmaps",
        data: () => ({
            mapMode: 0,
            iconr: '',
            icong: '',
            place: '',
            infoWindowPos: null,
            infoWinOpenMine: false,
            infoWinOpen: false,
            currentMidx: null,
            currentInfo: undefined,
            infoOptions: undefined,
            infoOptionsM: {
                content: '',
                //optional: offset infowindow so it visually sits nicely on top of our marker
            },
            mapStyle: {
                styles: [
                    {
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#242f3e"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "saturation": 45
                            },
                            {
                                "lightness": -60
                            },
                            {
                                "visibility": "on"
                            },
                            {
                                "weight": 3.5
                            }
                        ]
                    },
                    {
                        "featureType": "landscape.man_made",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#627fbb"
                            },
                            {
                                "saturation": -50
                            },
                            {
                                "lightness": 75
                            },
                            {
                                "visibility": "on"
                            },
                            {
                                "weight": 8
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#746855"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#242f3e"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#d59563"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#d59563"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.business",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#263c3f"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#6b9a76"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#38414e"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#212a37"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9ca5b3"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#746855"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#1f2835"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#f3d19c"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#2f3948"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#d59563"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#17263c"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#515c6d"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#17263c"
                            }
                        ]
                    }
                ]
            },
            markers1: 0

        }),
        computed: {
            google: VueGoogleMaps
        },
        components: {
            InfoViewer: InfoViewer
        },
        methods: {
            getplaces() {
                //console.log(gmapskey.key);
                this.iconr = iconred;
                this.icong = icongreen;
                //let el = document.getElementsByClassName('gm-style')[0].childNodes[0].childNodes[2].childNodes[0];
                //el.setAttribute("style", "position: fixed; right: 20%; margin-top: 90%; height: 500px; max-height: none")//


                try {
                    //console.log(store.apibase());
                    axios.get(store.apibase() + '/places').then(response => {
                        this.markers1 = response.data.places;
                        console.log(this.markers1);
                    });
                    //this.$router.replace("cabinet");
                } catch (err) {
                    console.log(err);
                    store.setSnackbar({
                        message: err.message,
                        color: "error",
                        active: true
                    });
                }
            },
            closes() {
                this.infoWinOpenMine = false;
                store.setInfowindow(false);
            },
            addrmaps() {
                console.log(this.place);
            },
            toggleInfoWindow(marker, idx) {
                //this.infoWindowPos = marker.position;
                //this.infoOptionsM.content = marker.notes;
                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx === idx) {
                    this.infoWinOpenMine = !this.infoWinOpenMine;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.currentMidx = idx;
                    this.currentInfo = marker;
                    this.infoWinOpenMine = true;
                }
                store.setInfowindow(this.infoWinOpenMine);
                //console.log(this.currentInfo);

            }
        },
        created() {
            this.getplaces();
        },

    };
</script>


<style>
	.gm-style-iw.gm-style-iw-c {
		position: fixed;
		width: 250px;
		height: 300px;
	}

	/*   .gm-style-iw-t::after{
		width: 0px!important;
		height: 0px!important;
	  }*/
	.gmnoprint {
		display: none;
	}

	.slide-fade-enter-active {
		transition: all .2s ease-out;
	}

	.slide-fade-leave-active {
		transition: all .2s ease-in;
	}

	.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active до версии 2.1.8 */
	{
		transform: translateY(100vh);
	}

	#modePicker {
		position: absolute;
		bottom: 40px;
		right: 0;
		clear: right;
		z-index: 10;
		transform: rotate(90deg);
	}
</style>
