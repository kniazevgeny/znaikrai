<template>
	<i>
		<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="11" height="11" rx="1" fill="#C4C4C4"/>
			<transition name="fade2" mode="out-in">
				<rect v-if="checked" x="2" y="2" width="7" height="7" rx="1" fill="#D50000"/>
			</transition>
		</svg>

	</i>
</template>

<script>
    export default {
        props: ['checked'],
        name: "Z-checkbox"
    }
</script>

<style>
	.fade2-enter-active, .fade2-leave-active {
		transition: opacity .3s ease-in-out;
	}

	.fade2-enter, .fade2-leave-to {
		opacity: 0
	}

	.fade2-leave-to {
		transition: opacity .45s ease-out;
	}
</style>