<template>
    <v-card
        class="off"
        max-width="344"
        id="inform"
        light
        style="color:#000;"
        v-if="info"
    >
        <v-row>
            <v-col cols="12" sm="1" md="4"/>
            <v-col cols="12" sm="10" md="4">
                <v-card-text>
                    <h3>
                        {{info.name}}
                    </h3>
                    <div class="text--primary text--lighten-1" style="color:#000!important">
                        {{info}}
                    </div>
                </v-card-text>

                <v-progress-linear
                    background-color="white"
                    color="red"
                    value="35"
                    height="20px"

                ></v-progress-linear>
                <v-card-actions>
                    <v-btn
                        text
                        color="deep-purple accent-4"
                    >

                        Learn More
                    </v-btn>
                </v-card-actions>
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
        },
        mounted() {
            if (info) {
                let el = document.getElementById("inform");
                el.classList.remove("off");
                el.classList.add("on");
            }
        }
    }
</script>

<style scoped>
    .off {
        /*display: none;

        visibility: hidden;
        width: 0;
        height: 0;
        position: fixed!important;*/
        z-index: -1;
        margin-bottom: -1000px;
        /*
                animation: fade-in-move-up 0.7s;
        */
    }

    .on {
        position: relative !important;
        top: 15%;
        left: 2%;
        height: 80%;
        width: 40%;
        /*transform: translateY(100%);
        transition: all 500ms;*/
    }


</style>
