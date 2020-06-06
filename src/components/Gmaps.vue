<template lang="html">
	<v-layout wrap>
		<v-layout style="width: 100vw;">
			<v-layout dark id="search" height="60" raised tile style="z-index: 4;">
				<v-card dark height="60" raised tile style="z-index: 4;" wrap color="white">
					<v-layout style="vertical-align: center; align-content: center" height="60" class="pa-0 ma-0">
						<v-icon light height="56" class="pa-2 ma-0" id="search-icon" large style="height: 60px;">search</v-icon>
						<v-text-field @input="search" light height="60" class="pa-0 ma-0 search-textfield" style="width: 30vw"
						              label="Поиск по учреждениям ФСИН"></v-text-field>
					</v-layout>
				</v-card>
				<v-card dark height="60" raised tile style="z-index: 4;" wrap>
					<transition name="fade1" mode="out-in">
						<v-layout v-if="options" wrap style="max-width: 50vw">
							<v-select @input="search" dark height="60" class="pa-0 ma-0 search-select" v-model="searchType"
							          :items="searchTypes"
							          label="По типу учреждения" multiple menu-props="light, top, offsetY, eager"
							          style="z-index: 100; width: 20vw">
								<template v-slot:selection="{ item, index }" style="overflow-y: hidden">
									<span v-if="index === 0">
										<span>{{ item }}</span>
									</span>
									<span
										v-if="index === 1"
										class="grey--text caption"
									>(+{{ searchType.length - 1 }})</span>
								</template>
								<template v-slot:item="{ item, attrs }" style="overflow-y: hidden">
										<span class="search-select-menu">
											<z-checkbox :checked="attrs.inputValue"></z-checkbox>
											{{ item }}
										</span>
								</template>
							</v-select>
							<v-select @input="search" dark height="60" class="pa-0 ma-0 search-select" v-model="searchCount"
							          :items="searchCounts"
							          label="По количеству отзывов" menu-props="top, offsetY, light"
							          dense style="z-index: 100; width: 20vw"></v-select>
						</v-layout>
					</transition>
				</v-card>
				<v-btn height="60" @click="options = !options" tile fab meduim
				       :color="options ? 'white' : 'black'">
					<transition name="fade" mode="out-in">
						<tune-r v-if="options"/>
						<tune-b v-else/>
					</transition>
				</v-btn>
			</v-layout>

			<div id="modePicker">
				<v-btn-toggle v-model="mapMode" mandatory tile active-class="v-btn--disabled">
					<v-btn>
						<v-icon>adjust</v-icon>
					</v-btn>
					<v-btn>
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
					             @click="toggleInfoWindow(m,i)" :icon="m.coronavirus ? iconRedCovid : icong"></gmap-marker>
				</GmapCluster>
				<gmap-marker v-if="mapMode && markers1" v-for="(m,i) in markers1" :key="i" :position="m.position"
				             :clickable="true"
				             @click="toggleInfoWindow(m,i)" :icon="m.coronavirus ? iconRedCovid : icong"></gmap-marker>
			</google-map>
		</v-layout>
		<transition name="slide-fade" mode="in-out" style="z-index: 101">
			<v-layout v-show="infoWinOpenMine" class="inform" style="position: absolute !important; margin-bottom: 20vh">
				<InfoViewer :info="currentInfo" @closes="closes()"></InfoViewer>
			</v-layout>
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
    import iconRedCovid from "../assets/r2-covid.svg";
    import tune_r from "./tuneSVG_r";
    import tune_b from "./tuneSVG_b";
    import zcheckbox from "./Z-checkbox"
    // !WARNING
    // before adding new svg, edit it and add to svg attribute height and width parameters
    // e.g. <svg width="60" height="60" ...
    import icongreen from "../assets/g2.svg";
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
    Vue.component('tune-r', tune_r);
    Vue.component('tune-b', tune_b);
    Vue.component('z-checkbox', zcheckbox);
    Vue.component('GmapCluster', GmapCluster);
    Vue.component('gmap-info-window', VueGoogleMaps.InfoWindow);


    export default {
        name: "Gmaps",
        data: () => ({
            mapMode: 0,
            iconr: '',
            iconRedCovid: '',
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
            searchTypes: ["Исправительная колония", "Воспитательная колония", "Следственный изолятор", "Лечебно-исправительное учреждение", "Колония-поселение", "Исправительный центр", "Тюрьма", "Больница", "Объединение исправительных колоний", "Лечебно-профилактическое учреждение", "Лечебное исправительное учреждение", "Колония-поселения", "Объединение колоний"],
            searchType: ["Исправительная колония", "Воспитательная колония", "Следственный изолятор", "Лечебно-исправительное учреждение", "Колония-поселение", "Исправительный центр", "Тюрьма", "Больница", "Объединение исправительных колоний", "Лечебно-профилактическое учреждение", "Лечебное исправительное учреждение", "Колония-поселения", "Объединение колоний"],
            searchCounts: ['Все', 'Только со свидетельствами'],
            searchCount: 'Все',
            options: false,
            markers: 0,
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
                this.iconRedCovid = iconRedCovid;
                this.icong = icongreen;
                //let el = document.getElementsByClassName('gm-style')[0].childNodes[0].childNodes[2].childNodes[0];
                //el.setAttribute("style", "position: fixed; right: 20%; margin-top: 90%; height: 500px; max-height: none")//


                try {
                    //console.log(store.apibase());
                    axios.get(store.apibase() + '/places/').then(response => {
                        this.markers0 = response.data.places;
                        this.markers1 = response.data.places;
                        console.log(this.markers1);
                        /*let mySet = new Set();
                        this.markers0.forEach(val => {
                            mySet.add(val.type);
                        });
                        let a = [];
                        mySet.forEach(val => {
                            a.push(val);
                        });
                        console.log(mySet);
                        console.log(a);*/
                        this.checkUrlMarker();
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
            /**
             * @param {Console} console
             */
            toggleInfoWindow(marker, idx, console) {
                //this.infoWindowPos = marker.position;
                //this.infoOptionsM.content = marker.notes;
                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx === idx) {
                    this.infoWinOpenMine = !this.infoWinOpenMine;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.currentMidx = idx;
                    let info = marker;
                    for (let propName in info) {
                        if ((propName !== "warning") && (info[propName] === null || info[propName].toString() === "" || info[propName] === undefined)) {
                            // deletes empty props
                            delete info[propName];
                        }
                        ;

                    }
                    this.currentInfo = info;
                    this.infoWinOpenMine = true;
                }
                store.setInfowindow(this.infoWinOpenMine);
                //console.log(this.currentInfo);

            },
            checkUrlMarker() {
                let markerToShow = this.$route.query.id;
                console.log(markerToShow);
                if (markerToShow !== undefined) {
                    this.markers1.forEach(el => {
                        if (el._id === markerToShow)
                            this.toggleInfoWindow(el, 0)
                    })
                }
            },
            search() {
                this.markers1 = this.markers0;
                this.markers1 = this.markers1.filter(
                    tmp => this.searchType.includes(tmp.type)
                );
                /*if (this.searchCount !== 'Все'){
                    this.markers1 = this.markers1.filter(
                        tmp => tmp.notes !== ''
                    );
                }*/
            }
        },
        created() {
            this.getplaces();
            // console.log(window.location.host + "/?id=5ed2c5fd0c4a85b90ef09615");
        },

    };
</script>


<style>
	@import '../assets/styles/main.css';

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


	#modePicker {
		position: absolute;
		bottom: 40px;
		right: 0;
		clear: right;
		z-index: 10;
		transform: rotate(90deg);
	}

	#search {
		position: absolute;
		top: 80vh;
		left: 20px;
		z-index: 10;
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

	.fade1-enter-active, .fade1-leave-active {
		transition: opacity .4s;
	}

	.fade1-enter, .fade1-leave-to {
		opacity: 0
	}

	.fade1-enter-to {
		transition: opacity .96s;
	}

</style>