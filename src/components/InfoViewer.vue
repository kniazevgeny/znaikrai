<template>
    <v-card
        class="inform"
        max-width="50vw"
        light
        style="color:#000; overflow-y: auto; overflow-x: hidden"
        v-if="info"
    >
        <v-row>
            <v-col cols="2" sm="1" md="1"/>
            <v-col cols="12" sm="10" md="10">
                <v-card-text>
                    <h1>
                        {{info.name}}
                    </h1>
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
        components:{
          BarChart: BarChart
        }
    }
</script>

<style >
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
    .inform{
        position: absolute!important;
        left: 1vh;
        width: 40vw;
        bottom: 9vh;
        height: 80vh;
    }
    .inform::-webkit-scrollbar {
        display: none;
    }


</style>
