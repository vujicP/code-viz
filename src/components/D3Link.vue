<template>
	<line :y1="sourcey" :x1="sourcex" :y2="targety" :x2="targetx"></line>
</template>


<script>

export default {
	props: ["link", "nodes"],

	computed: {

		fNodeSetSource() {
			return this.link.source.hasOwnProperty("x") ? true : false
		},

		fNodeSetTarget() {
			return this.link.target.hasOwnProperty("x") ? true : false
		},

		sourcex() {
			return this.fNodeSetSource ? this.link.source.x.toFixed(1) : this.nodes.find(n => n.id === this.link.source).x.toFixed(1)
		},

		sourcey() {
			return this.fNodeSetSource ? this.link.source.y.toFixed(1) : this.nodes.find(n => n.id === this.link.source).y.toFixed(1)
		},

		targetx() {
			return this.fNodeSetTarget ? this.link.target.x.toFixed(1) : this.nodes.find(n => n.id === this.link.target).x.toFixed(1)
		},

		targety() {
			return this.fNodeSetTarget ? this.link.target.y.toFixed(1) : this.nodes.find(n => n.id === this.link.target).y.toFixed(1)
		}
	}
}

</script>


<style>



</style>