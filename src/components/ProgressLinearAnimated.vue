<template lang="pug">
	v-progress-linear(
	:value="((displayNumber / number) * 100) - 1"
	:buffer-value="((displayNumber / number) * 100) - 1"
	color="#4F5250"
	height="25"
	class="progress-bar"
	style="transition-duration: 2s!important; transition-timing-function: ease-in-out;")
		template
			span(style="color: white") {{ displayNumber }}
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from "vue-property-decorator";

    @Component
    export default class ProgressLinearAnimated extends Vue {
        @Prop({required: true})
        public number!: number;

        displayNumber: number = 0;
        interval = 0;

        onChange() {
            clearInterval(this.interval);
            if ( this.number == this.displayNumber ) {
                return;
            }
            this.interval = window.setInterval(function () {
                if ( this.displayNumber != this.number ) {
                    let change = (this.number - this.displayNumber) / 1;
                    change = change >= 0 ? Math.ceil(change) : Math.floor(change);
                    this.displayNumber = this.displayNumber + change;
                }

            }.bind(this), 1);
        }

        mounted(): void {
            //just condition for animation to be completed
            this.onChange();
        }
    }
</script>

<style scoped>
</style>