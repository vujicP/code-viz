export default {

	data() {
		return {
			translateX: 0,
			translateY: 0,
			panning: false,
			mousex: 0,
			mousey: 0,
			
		};
	},

	methods: {

		mdown(e) {

			this.mousex = e.clientX
			this.mousey = e.clientY

			if (this.draggedNode < 0) 
				this.panning = true
			else {
				var n = this.nodes.find(n => n.id === this.draggedNode)
				n.fx = n.x
				n.fy = n.y
				this.simulation.alphaTarget(0.3).restart()
			}
		},

		mmove(e) {

			if (this.draggedNode >= 0) {
				var n = this.nodes.find(n => n.id === this.draggedNode)
				n.fx += e.clientX - this.mousex
				n.fy += e.clientY - this.mousey
				this.mousex = e.clientX
				this.mousey = e.clientY

			}

			if (this.panning) {
				this.translateX += e.clientX - this.mousex
				this.translateY += e.clientY - this.mousey
				this.mousex = e.clientX
				this.mousey = e.clientY
			}

		},
		mup(e) {

			if (this.draggedNode >= 0) {
				var n = this.nodes.find(n => n.id === this.draggedNode)
				n.fx = null
				n.fy = null
				this.links.filter(n=> n.source.id === this.draggedNode || n.target.id === this.draggedNode)
							.forEach(n => { 
									n.distance = Math.sqrt(Math.pow(Math.abs(n.source.x - n.target.x), 2) + 
										   		 Math.pow(Math.abs(n.source.y - n.target.y), 2))
							})
				this.simulation.force("link").links(this.links)
				this.simulation.alphaTarget(0).restart()
				this.draggedNode = -1
			}

			this.panning = false
		},
	}
}
