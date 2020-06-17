<template lang="html">
	<v-layout wrap>
		<v-layout style="width: 100vw;">
			<v-layout dark id="search" height="60" raised tile style="z-index: 4;">
				<v-card dark height="60" raised tile style="z-index: 4;" wrap color="white">
					<v-layout style="vertical-align: center; align-content: center" height="60" class="pa-0 ma-0">
						<v-icon light class="pa-2 ma-0 search-icon" large style="width: 5vw; height: 60px;">search
						</v-icon>
						<i id="attach0"></i>
						<v-autocomplete v-if="markers0" v-model="searchName" @change="search" light height="60"
						                class="pa-0 ma-0 search-autocomplete" style="width: 32vw; z-index: 100; "
						                label="Поиск по учреждениям ФСИН"
						                :items="searchNames" item-text="name" item-value="searchObj"
						                multiple flat attach="#attach0"
						                menu-props="light, top, offsetY, tile, flat, close-on-click">
							<template v-slot:selection="{ item, index }" style="overflow-y: hidden">
								<span v-if="index === 0">
										<span>{{ item }}</span>
									</span>
								<span
									v-if="index === 1"
									class="grey--text caption"
								>(+{{ searchName.length - 1 }})</span>
							</template>
							<template v-slot:item="{ item, attrs }" style="overflow-y: hidden">
										<span class="search-select-menu">
											<z-checkbox :checked="attrs.inputValue"></z-checkbox>
											{{ item }}
										</span>
							</template>
							<template v-slot:no-data>
								<span class="ml-4">По запросу не найдено учреждений. Попробуйте изменить запрос.</span>
							</template>
						</v-autocomplete>
						<v-icon light meduim class="pa-2 ma-0 search-icon" style="z-index: 101; height: 60px;"
						        @click="searchName = ''; search()">mdi-window-close
						</v-icon>
					</v-layout>
				</v-card>
				<v-card dark height="60" raised tile style="z-index: 4;" wrap>
					<transition name="fade1" mode="out-in">
						<v-layout v-if="options" wrap style="max-width: 50vw">
							<span id="attach1"></span>
							<span id="attach2"></span>
							<v-select @input="search" dark height="60" class="pa-0 ma-0 search-select" v-model="searchType"
							          :items="searchTypes" attach="#attach1"
							          label="По типу учреждения" multiple menu-props="light, top, offsetY"
							          style="z-index: 100; width: 33vw">
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
							<v-select @input="search" dark height="60" class="pa-0 ma-0 search-select" v-model="searchCovid"
							          :items="searchCovids"
							          label="По наличию COVID-19" menu-props="top, offsetY, light"
							          placeholder="Все" attach="#attach2"
							          multiple dense style="z-index: 100; width: 15vw">
								<template v-slot:selection="{ item, index }" style="overflow-y: hidden">
									<span
										v-if="(searchCovid.indexOf('Да') !== -1 && searchCovid.indexOf('Нет') !== -1) || searchCovid.length === 0">
										<span v-if="index === 0 || searchCovid.length === 0">Все</span>
									</span>
									<span v-else>{{ item }}</span>
								</template>
								<template v-slot:item="{ item, attrs }" style="overflow-y: hidden">
										<span class="search-select-menu">
											<z-checkbox :checked="attrs.inputValue"></z-checkbox>
											{{ item }}
										</span>
								</template>
							</v-select>
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

			<div id="modePicker" :style="$vuetify.breakpoint.name === 'xs' ? 'margin-right: -15px' : ''">
				<v-btn-toggle v-model="mapMode" mandatory tile active-class="v-btn--disabled">
					<v-btn :small="$vuetify.breakpoint.name === 'xs'" fab>
						<v-icon>adjust</v-icon>
					</v-btn>
					<v-btn :small="$vuetify.breakpoint.name === 'xs'" fab>
						<v-icon>blur_on</v-icon>
					</v-btn>
				</v-btn-toggle>
			</div>
			<div id="themePicker" :style="$vuetify.breakpoint.name === 'xs' ? 'margin-right: -15px' : ''">
				<v-btn-toggle v-model="mapTheme" mandatory tile active-class="v-btn--disabled">
					<v-btn @click="changeTheme()" :small="$vuetify.breakpoint.name === 'xs'" fab>
						<v-icon>wb_sunny</v-icon>
					</v-btn>
					<v-btn @click="changeTheme()" :small="$vuetify.breakpoint.name === 'xs'" fab>
						<v-icon style="transform: rotate(-90deg)">brightness_3</v-icon>
					</v-btn>
				</v-btn-toggle>
			</div>
			<google-map :center="{lat: 61.52401, lng: 105.318756}" :zoom="4"
			            style="height: 100vh; width: 100vw; clear: left; z-index: 1; bottom: 0;"
			            :options="mapTheme === 0 ? mapLightStyle : mapDarkStyle">
				<gmap-info-window :position="infoWindowPos" :opened="infoWinOpen"
				                  @closeclick="infoWinOpen=false" :options="infoOptions"><!--:-->
				</gmap-info-window>
				<GmapCluster v-if="!mapMode">
					<gmap-marker v-if="markers1" v-for="(m,i) in markers1" :key="i" :position="m.position" :clickable="true"
					             @click="toggleInfoWindow(m,i)" :icon="getIcon(m)"></gmap-marker>
				</GmapCluster>
				<gmap-marker v-if="mapMode && markers1" v-for="(m,i) in markers1" :key="i" :position="m.position"
				             :clickable="true"
				             @click="toggleInfoWindow(m,i)" :icon="getIcon(m)"></gmap-marker>
				<!-- m.coronavirus ? iconRedCovid : icong-->
			</google-map>
		</v-layout>
		<transition name="slide-fade" mode="in-out" style="z-index: 101">
			<v-layout v-show="infoWinOpenMine" class="inform" style="position: absolute !important; margin-bottom: 20vh">
				<InfoViewer v-if="$vuetify.breakpoint.name !== 'xs' && $vuetify.breakpoint.name !== 'sm'" :_info="currentInfo"
				            @closes="closes()"></InfoViewer>
				<v-dialog v-else v-model="infoWinOpenMine" fullscreen>
					<InfoViewer :_info="currentInfo" @closes="closes()"></InfoViewer>
				</v-dialog>
			</v-layout>
		</transition>

		<!--v-btn @click="getPlaces">get</v-btn-->

		<!--a v-if="markers1" v-text="markers1"></a-->
	</v-layout>
</template>

<script lang="js">
    import Vue from "vue";
    import axios from "axios";
    import * as store from "../plugins/store";
    import * as VueGoogleMaps from "vue2-google-maps";
    import {getColoredMarkerUrl} from "../utils/marker-url-generator";
    import tune_r from "./tuneSVG_r";
    import tune_b from "./tuneSVG_b";
    import zcheckbox from "./Z-checkbox"
    // !WARNING
    // before adding new svg, edit it and add to svg attribute height and width parameters
    // e.g. <svg width="60" height="60" ...
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
            mapTheme: 0,
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
            mapLightStyle: {
                styles: [
                    [
                        {
                            "featureType": "administrative.land_parcel",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
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
                            "elementType": "labels.text",
                            "stylers": [
                                {
                                    "visibility": "off"
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
                        }
                    ]
                ]
            },
            mapDarkStyle: {
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
                                "visibility": "on"
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
            searchTypes: [],
            searchType: [],
            searchCovids: ['Да', 'Нет'],
            searchCovid: ['Да', 'Нет'],
            searchName: "",
            searchNames: [],
            options: false,
            markers0: [],
            markers1: [],
            searchObj: 0

        }),
        computed: {
            google: () => VueGoogleMaps,
        },
        components: {
            InfoViewer: InfoViewer
        },
        methods: {
            processPlaces(raw) {
                let sorted = raw.sort(function (a, b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                });
                let set_types = new Set();
                sorted.forEach(val => {
                    // removes xyz«INFO»xyz
                    val.name = val.name.slice(val.name.indexOf("«") + 1, val.name.indexOf("»"));
                    // removes space after №
                    if (val.name.indexOf("№") !== -1)
                        val.name = val.name.slice(0, val.name.indexOf("№") + 1) + val.name.slice(val.name.indexOf("№") + 2, val.name.length);
                    set_types.add(val.type);
                    this.markers0.push(val);
                    this.markers1.push(val);
                });
                set_types.forEach(val => this.searchTypes.push(val));
                set_types.clear();
                this.searchType = this.searchTypes;
                this.markers1.forEach(val => this.searchNames.push(val.name));
                console.log(this.markers1);
                store.setPlaces(this.markers0);
                this.checkUrlMarker();
            },
            changeTheme() {
                store.setDark(!this.mapTheme);
            },
            getPlaces() {
                try {
                    //console.log(store.apibase());
                    axios.get(store.apibase() + '/places/').then(response => {
                        this.processPlaces(response.data.places);

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
                    let info = marker;
                    for (let propName in info) {
                        if ((propName !== "warning") && (info[propName] === null || info[propName].toString() === "" || info[propName] === undefined)) {
                            // deletes empty props
                            delete info[propName];
                        }
                    }
                    this.currentInfo = info;
                    this.infoWinOpenMine = true;
                }
                store.setInfowindow(this.infoWinOpenMine);
                //console.log(this.currentInfo);

            },
            getColor(value) {
                //value from 0 to 1
                //https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage/7128796
                let hue = (Math.pow(1 - value, 3) * 105).toString(10);
                return ["hsl(", hue, ",85%,40%)"].join("");
            },
            getIcon(marker) {
                const maxviolations = 15;
                // if there's no violations, gray color is used
                if (!marker.number_of_violations && !marker.coronavirus) return getColoredMarkerUrl(["hsl(0, 0%, 50%)"], marker.coronavirus);
                // this calls Marker or MarkerCovid.vue with color param
                return getColoredMarkerUrl(this.getColor(marker.number_of_violations / maxviolations), marker.coronavirus);
            },
            checkUrlMarker() {
                let markerToShow = this.$route.query.id;
                if (markerToShow !== undefined) {
                    this.markers1.forEach(el => {
                        if (el._id === markerToShow)
                            this.toggleInfoWindow(el, 0)
                    })
                }
            },
            search() {
                this.markers1 = store.places();
                this.markers1 = this.markers1.filter(
                    tmp => this.searchType.includes(tmp.type)
                );
                this.markers1 = this.markers1.filter(
                    tmp => {
                        if (this.searchCovid.length === 1)
                            if (this.searchCovid[0] === "Да") return tmp.coronavirus === true;
                            else return tmp.coronavirus === false;
                        return true
                    }
                );
                this.searchNames = [];
                this.markers1.forEach(val => this.searchNames.push(val.name));
                if (this.searchName !== "")
                    this.markers1 = this.markers1.filter(
                        tmp => this.searchName.includes(tmp.name)
                    );
            }
        },
        mounted() {
            // load places onload, but load from store on site navigation
            this.mapTheme = 1;
            this.changeTheme(); //set theme
            this.mapTheme = 0;
            this.getPlaces();
            // console.log(window.location.host + "/?id=5ed2c5fd0c4a85b90ef09615");
        },

    };
</script>


<style>
	.search-select > .v-input__control > .v-input__slot {
		background-color: #000;
	}

	.search-select > .v-input__control > .v-input__slot > .v-select__slot > label {
		font-family: 'Roboto';
		margin-top: 10px;
		margin-left: 15px;
		font-style: normal;
		font-weight: 300;
		font-size: 15px;
		line-height: 15px;
		display: flex;
		align-items: center;
		color: #585858;
	}

	.search-select > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections {
		font-family: 'Roboto';
		padding-left: 15px;
		margin-top: 10px;

		font-style: normal;
		font-weight: 300;
		font-size: 17px;
		line-height: 19px;
		display: flex;
		align-items: center;
	}

	.search-autocomplete > .v-input__control > .v-input__slot {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 300;
		font-size: 16px;
		line-height: 19px;
		display: flex;
		align-items: center;
		border: none !important;
	}

	.search-select > .v-input__control > .v-input__slot::after {
		color: #D50000 !important;
		border-width: 1.5px !important;
	}

	.search-autocomplete > .v-input__control > .v-input__slot::after {
		display: none !important;
	}

	.search-autocomplete > .v-input__control > .v-input__slot::before {
		display: none !important;
		border: none !important;
	}

	.search-select > .v-input__control > .v-input__slot::before {
		display: none !important;
	}

	.search-icon {
		padding: 15px !important;
		border: none !important;
	}

	span > .v-menu__content.v-autocomplete__content > .v-list > .v-list-item {
		width: 40px !important;
		display: flex;
		align-items: center;
		color: #999;
		caret-color: #EEEEEE !important;
		background: #EEEEEE !important;
	}

	span > .v-menu__content > .v-list > .v-list-item--active {
		color: #000 !important;
	}

	span > .v-menu__content > .v-list > .v-list-item:before {
		opacity: 0 !important;
	}

	#attach1 > .v-menu__content {
		width: 15vw !important;
		min-width: 400px !important;
		margin-top: -1px;
	}

	#attach2 > .v-menu__content {
		margin-top: -1px;
		margin-left: 33vw;
	}

	span > .v-menu__content > .v-list > .v-list-item {
		min-height: 40px !important;
		height: 40px !important;
		background: #EEEEEE !important;

	}

	.v-autocomplete__content > .v-list > .v-list-item {
		min-height: 40px !important;
		height: 40px !important;
		background: #EEEEEE !important;
		сaret-color: #EEEEEE !important;
	}

	.v-autocomplete__content {
		margin-top: -2px !important;
		left: 5vw !important;
		min-width: 40vw !important;
		width: 40vw !important;
	}

	.v-autocomplete__content > .v-list > .v-list-item--link:before {
		сaret-color: #EEEEEE !important;
		background: #000;
	}

	.v-autocomplete__content > .v-list > .v-list-item > .v-ripple__container > .v-ripple__animation {
		сaret-color: #DDDDDD !important;
		color: #666 !important;
	}

	i > .v-autocomplete__content > .v-list > .primary--text {
		сaret-color: #EEEEEE !important;
	}

	.v-autocomplete__content.v-menu__content {
		margin-left: -5vw;
		z-index: 103 !important;
	}

	.v-list-item > .search-select-menu {
		color: #333;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 300;
		font-size: 15px !important;
		line-height: 13px;
		background: #EEEEEE;

	}

	.v-input.pa-0.ma-0.search-autocomplete.v-input--is-focused.theme--light.v-text-field.v-text-field--solo-flat.v-text-field--is-booted.v-select.v-select--is-multi.v-autocomplete.primary--text {
		сaret-color: #000 !important;
		color: #000 !important;
	}

	.v-label.v-label--active.theme--light.primary--text {
		сaret-color: #000 !important;
		color: #000 !important;
	}

	.v-list-item--active > .search-select-menu {
		color: #000;
	}

	.info-navigation > button.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
		background: #070809;
		border: 1px solid #070809;
	}

	.gm-fullscreen-control {
		display: none;
	}

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

	#themePicker {
		position: absolute;
		bottom: 160px;
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
		transition: opacity .2s;
	}

	.fade1-enter, .fade1-leave-to {
		opacity: 0
	}

	.fade1-enter-to {
		transition: opacity .96s;
	}

	/* svg icon color*/
	.st0 {
		fill: #DFFF00 !important
	}
</style>