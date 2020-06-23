<template lang="pug">
	v-progress-linear(
	:value="calcValue()"
	:buffer-value="calcValue()"
	:color="color"
	:height="height"
	class="progress-bar"
	style="transition-duration: 2s!important; transition-timing-function: ease-in-out;")
		template
			span(style="color: white") {{ displayNumber }}
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from "vue-property-decorator";

    @Component
    export default class ProgressLinearAnimated extends Vue {
        @Prop({required: true})
        public value!: number;

        @Prop({required: true})
        public height!: number;

        @Prop({required: true})
        public color!: string;

        @Prop({default: 0, required: false})
        public offset!: string;

        displayNumber: number = 0;
        interval = 0;

        calcValue() {
            return ((this.displayNumber / this.value) * 100) + parseInt(this.offset)
        }

        onChange() {
            clearInterval(this.interval);
            if ( this.value == this.displayNumber ) {
                return;
            }
            this.interval = window.setInterval(function () {
                if ( this.displayNumber != this.value ) {
                    let change = (this.value - this.displayNumber) / 1;
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