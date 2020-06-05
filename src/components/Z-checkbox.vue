<template>
	<i>
		<svg v-if="checked" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="11" height="11" rx="1" fill="#C4C4C4"/>
			<rect x="2" y="2" width="7" height="7" rx="1" fill="#D50000"/>
		</svg>
		<svg v-else width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="11" height="11" rx="1" fill="#C4C4C4"/>
		</svg>

	</i>
</template>

<script>
    export default {
        props: ['checked'],
        name: "Z-checkbox"
    }
</script>

<style scoped>

</style>