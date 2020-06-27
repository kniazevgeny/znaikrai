<template lang="pug">
	v-layout(wrap='')
		v-layout(style='width: 100vw;')
			v-layout#search(dark='', height='60', raised='', tile='', style='z-index: 4;')
				v-card(dark='', height='60', raised='', tile='', style='z-index: 4;', wrap='', color='white')
					v-layout.pa-0.ma-0(style='vertical-align: center; align-content: center', height='60')
						v-icon.pa-2.ma-0.search-icon(light='', large='', style='width: 5vw; height: 60px;') search
						i#attach0
						v-autocomplete.pa-0.ma-0.search-autocomplete(v-if='markers0', v-model='searchName', @change='search', light='', height='60', style='width: 32vw; z-index: 100; ', label='Поиск по учреждениям ФСИН', :items='searchNames', item-text='name', item-value='searchObj', multiple='', flat='', attach='#attach0', menu-props='light, top, offsetY, tile, flat, close-on-click')
							template(v-slot:selection='{ item, index }', style='overflow-y: hidden')
								span(v-if='index === 0')
									span {{ item }}
								span.grey--text.caption(v-if='index === 1') (+{{ searchName.length - 1 }})
							template(v-slot:item='{ item, attrs }', style='overflow-y: hidden')
								span.search-select-menu
									z-checkbox(:checked='attrs.inputValue')
									span  {{item}}
							template(v-slot:no-data='')
								span.ml-4 По запросу не найдено учреждений. Попробуйте изменить запрос.
						v-icon.pa-2.ma-0.search-icon(light='', meduim='', style='z-index: 101; height: 60px;', @click="searchName = '', search()") mdi-window-close
						v-select.pa-0.ma-0.mb-0.search-select(@input='search()', dark='', height='60', v-model='searchCovid', :items='searchCovids', label='По наличию COVID-19', menu-props='top, offsetY, light, close-on-click', placeholder='Все', attach='#attach2', dense='', style='z-index: 100; width: 15vw')
							template(v-slot:selection='{ item, index }', style='overflow-y: hidden')
								span#attach2
								span {{ item }}
							template(v-slot:item='{ item, attrs }', style='overflow-y: hidden')
								span.search-select-menu
									z-checkbox(:checked='attrs.inputValue')
									span  {{item}}
				v-card(dark='', height='60', raised='', tile='', style='z-index: 4;', wrap='')
					transition(name='fade1', mode='out-in')
						v-layout(v-if='options', wrap='', style='max-width: 20vw')
							span#attach1
							v-select.pa-0.ma-0.search-select(@input='search', dark='', height='60', v-model='searchType', :items='searchTypes', attach='#attach1', label='По типу учреждения', multiple='', menu-props='light, top, offsetY', style='z-index: 100; width: 33vw')
								template(v-slot:selection='{ item, index }', style='overflow-y: hidden')
									span(v-if='index === 0')
										span {{ item }}
									span.grey--text.caption(v-if='index === 1') (+{{ searchType.length - 1 }})
								template(v-slot:item='{ item, attrs }', style='overflow-y: hidden')
									span.search-select-menu
										z-checkbox(:checked='attrs.inputValue')
										span  {{item}}
								template(v-slot:no-data='')
									span.ml-4 По запросу не найдено учреждений. Попробуйте изменить запрос.
				v-btn(height='60', @click='options = !options', tile='', fab='', meduim='', :color="options ? 'white' : 'black'")
					transition(name='fade', mode='out-in')
						tune-r(v-if='options')
						tune-b(v-else='')
			#modePicker(:style="$vuetify.breakpoint.name === 'xs' ? 'margin-right: -15px' : ''")
				v-btn-toggle(v-model='mapMode', mandatory='', tile='', active-class='v-btn--disabled')
					v-tooltip(left style="z-index: 100")
						template(v-slot:activator="{ on, attrs }")
							v-btn(:small="$vuetify.breakpoint.name === 'xs'", fab='', v-on="on")
								v-icon adjust
						span {{$t('map.group')}}
					v-tooltip(left style="z-index: 100")
						template(v-slot:activator="{ on, attrs }")
							v-btn(:small="$vuetify.breakpoint.name === 'xs'", fab='', v-on="on")
								v-icon blur_on
						span {{$t('map.ungroup')}}
			#themePicker(:style="$vuetify.breakpoint.name === 'xs' ? 'margin-right: -15px' : ''")
				v-btn-toggle(v-model='mapTheme', mandatory='', tile='', active-class='v-btn--disabled')
					v-tooltip(left style="z-index: 100")
						template(v-slot:activator="{ on, attrs }")
							v-btn(@click='changeTheme()', :small="$vuetify.breakpoint.name === 'xs'", fab='', v-on="on")
								v-icon wb_sunny
						span {{$t('map.lightTheme')}}
					v-tooltip(left style="z-index: 100")
						template(v-slot:activator="{ on, attrs }")
							v-btn(@click='changeTheme()', :small="$vuetify.breakpoint.name === 'xs'", fab='', v-on="on")
								v-icon(style='transform: rotate(-90deg)') brightness_3
						span {{$t('map.darkTheme')}}
			google-map#map(v-if='google', :center='mapCenter', :zoom='mapZoom', ref='mapRef', style='height: 100vh; width: 100vw; clear: left; z-index: 1; bottom: 0;', :options='mapTheme === 0 ? mapLightStyle : mapDarkStyle')
				gmap-info-window(:position='infoWindowPos', :opened='infoWinOpen', @closeclick='infoWinOpen=false', :options='infoOptions')
				GmapCluster(v-if='!mapMode && markers1', imagePath='static/cluster', imageExtension='svg', :imageSizes='[30, 30, 30, 30, 30]', :calculator="calculator", averageCenter='', :animation='4', zoomOnClick)
					gmap-marker(v-for='(m,i) in markers1', :key='i', :position='google && m.position', :clickable='true', @click='toggleInfoWindow(m,i)', :icon='getIcon(m)')
				gmap-marker(v-if='mapMode && markers1', v-for='(m,i) in markers1', :key='i', :position='google && m.position', :clickable='true', @click='toggleInfoWindow(m,i)', :icon='getIcon(m)')
		transition(name='slide-fade', mode='in-out', style='z-index: 101')
			v-layout.inform(v-show='infoWinOpenMine', style='position: absolute !important; margin-bottom: 20vh')
				InfoViewer(v-if='getWidth() >= 1150', :_info='currentInfo', @closes='closes()')
				v-dialog(v-else='', v-model='infoWinOpenMine', fullscreen='')
					InfoViewer(:_info='currentInfo', @closes='closes()')
</template>

<script lang="js">
    import Vue from "vue";
    import axios from "axios";
    import * as store from "../plugins/store";
    import * as VueGoogleMaps from "vue2-google-maps";
    import {gmapApi} from 'vue2-google-maps'
    import {loaded} from 'vue2-google-maps'
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
            mapCenter: {lat: 61.52401, lng: 105.318756},
            mapZoom: 4,
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
            searchCovids: ['Только с COVID-19', 'Все'],
            searchCovid: 'Только с COVID-19',
            searchName: "",
            searchNames: [],
            options: false,
            markers0: [],
            markers1: [],
            markersForClusters: new Map,
            searchObj: 0

        }),
        computed: {
            google: gmapApi,
        },
        components: {
            InfoViewer: InfoViewer
        },
        methods: {
            getWidth() {
                return window.innerWidth
            },
            processPlaces(raw) {
                let sorted = raw.sort(function (a, b) {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                });
                let _markersForClusters = new Map;
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
                    _markersForClusters.set(val.position.lat, val);
                });
                set_types.forEach(val => this.searchTypes.push(val));
                set_types.clear();
                this.searchType = this.searchTypes;
                this.markers1.forEach(val => this.searchNames.push(val.name));
                //console.log(this.markers1);
                this.markersForClusters = new Map([..._markersForClusters.entries()].sort());
                //console.log(this.markersForClusters);
                store.setPlaces(this.markers0);
                this.checkUrlMarker();
                this.setUrlParams();
            },
            changeTheme() {
                store.setDark(!this.mapTheme);
            },
            getPlaces() {
                try {
                    //console.log(store.apibase());
                    axios.get(store.apibase() + '/places/').then(response => {
                        this.processPlaces(response.data.places);
                        this.search();
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
                //console.log(this.place);
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
                let hue = (Math.pow(1 - value, 1.3) * 100).toString(10); //105 - max = red
                return ["hsl(", hue, ",85%,40%)"].join("");
            },
            getIcon(marker) {
                const maxviolations = 15;
                // if there's no violations, gray color is used
                if (!marker.number_of_violations && !marker.coronavirus) return getColoredMarkerUrl(["hsl(0, 0%, 50%)"], marker.coronavirus);
                if (marker.coronavirus) return getColoredMarkerUrl(["hsl(0, 85%, 40%)"], marker.coronavirus);
                // this calls Marker or MarkerCovid.vue with color param
                return getColoredMarkerUrl(this.getColor(marker.number_of_violations / maxviolations), marker.coronavirus);
            },
            checkUrlMarker() {
                if (this.$route.query.id !== undefined) {
                    //console.log(this.$route.query.id);
                    this.markers0.forEach(el => {
                        if (el._id === this.$route.query.id) {
                            this.toggleInfoWindow(el, 0);
                        }
                    })
                }
            },
            setUrlParams() {
                if (this.searchCovid === 'Все') {
                    if (this.$route.query.showAll !== "1")
                        this.$router.replace({
                            name: "home",
                            query: {showAll: "1", id: this.$route.query.id !== undefined ? this.$route.query.id : ""}
                        });
                } else if (this.$route.query.showAll !== "0")
                    this.$router.replace({
                        name: "home",
                        query: {showAll: "0", id: this.$route.query.id !== undefined ? this.$route.query.id : ""}
                    })
            },
            search() {
                this.setUrlParams();
                this.markers1 = store.places();
                this.markers1 = this.markers1.filter(
                    tmp => this.searchType.includes(tmp.type)
                );
                if (this.searchCovid !== 'Все')
                    this.markers1 = this.markers1.filter(
                        tmp => {
                            if (this.searchCovid === this.searchCovids[0]) return tmp.coronavirus === true;
                            else return tmp.coronavirus === false;
                        }
                    );
                this.searchNames = [];
                this.markers1.forEach(val => this.searchNames.push(val.name));
                if (this.searchName !== "")
                    this.markers1 = this.markers1.filter(
                        tmp => this.searchName.includes(tmp.name)
                    );
            },
            binarySearch(ar, el) {
                let m = 0;
                let n = ar.length - 1;
                while (m <= n) {
                    let k = (n + m) >> 1;
                    let cmp = el - ar[k];
                    if (cmp > 0) {
                        m = k + 1;
                    } else if (cmp < 0) {
                        n = k - 1;
                    } else {
                        return k;
                    }
                }
                return -m - 1;
            },
            calculator(markers, numStyles) {
                let violationCounter = 0;
                let covid = markers.some(gmarker => {
                    let marker = this.markersForClusters.get(gmarker.position.lat());
                    violationCounter += marker.number_of_violations;
                    return marker.coronavirus;
                });
                if (covid) return {text: markers.length, index: 5};
                if (violationCounter === 0) return {text: markers.length, index: 0};
                if (violationCounter / 18 <= 0.25) return {text: markers.length, index: 3};
                if (violationCounter / 18 <= 1) return {text: markers.length, index: 4};
                return {text: markers.length, index: 5};
            },
        },
        mounted() {
            this.$gmapApiPromiseLazy().then(() => {
                var bounds = new google.maps.LatLngBounds() /* etc */
                // load places onload, but load from store on site navigation
                this.mapTheme = 1;
                this.changeTheme(); //set theme
                this.mapTheme = 0;
                if (this.$route.query.showAll === "1") this.searchCovid = 'Все';
                this.getPlaces();
                // console.log(window.location.host + "/?id=5ed2c5fd0c4a85b90ef09615");
            });
        },
        watch: {
            markers1(old, value) {
                // find new element from search
                let s = old.filter(function (obj) {
                    return value.indexOf(obj) === -1;
                });
                if (s.length === 1) {
                    this.$refs.mapRef.$mapPromise.then((map) => {
                        map.panTo(s[0].position); })
                }
            }
        }

    };
</script>


<style>

	@import url('../assets/styles/main.css');

	#map {
		padding: 0 !important;
	}

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
		margin-top: -13px;
	}

	.v-input.search-select.mb-0 > .v-input__control > .v-input__slot {
		background-color: #D50000 !important;
	}

	.v-input.search-select.mb-0 > .v-input__control > .v-input__slot > .v-select__slot > label {
		color: #fff;
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

	#modePicker > .v-item-group > button {
		min-width: 45px;
		width: 45px;
		height: 45px;
	}

	#themePicker {
		position: absolute;
		bottom: 160px;
		right: 0;
		clear: right;
		z-index: 10;
		transform: rotate(90deg);
	}

	#themePicker > .v-item-group > button {
		min-width: 45px;
		width: 45px;
		height: 45px;
	}

	#search {
		position: absolute;
		top: 90vh;
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

</style>