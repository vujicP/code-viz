<template>
	<g @mousedown="selectednode = node.id">
		<circle style="fill: rgb(63, 138, 191);" r="3" :cx="node.x.toFixed(1)" :cy="node.y.toFixed(1)">
		</circle>
		<text :x="node.x.toFixed(1) + 2" :y="node.y.toFixed(1) + 1"> {{ node.label }}</text>
	</g>
</template>



<script>

export default {
	props: ["node"],

	data() {
		return {
			selectednode: -1,
		}
	}
}

</script>

<style>

</style>