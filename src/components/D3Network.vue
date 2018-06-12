<template>
<svg ref="svgNetwork" id="codeNetwork" @mousemove="mmove($event)" @mousedown="mdown($event)" @mouseup="mup($event)" :width="layout.width" :height="layout.height">
  <g :transform="'translate(' + translateX + ',' + translateY + ') scale(1)'">
     <d3link v-for="link in links" 
        :key="link.id" 
        :link="link" 
        :nodes="nodes">
      </d3link>
  </g>
  <g :transform="'translate(' + translateX + ',' + translateY + ') scale(1)'">
    <d3node v-for="node in nodes" 
      :key="node.id" 
      :node="node" 
      @click.native="select(node.id)" 
      @mousedown.native="select(node.id); draggedNode = node.id">
     </d3node>
  </g>
</svg>
</template>

<script>
import * as d3 from 'd3-force';
import { default as nav } from './NetworkNavigation.js';
import d3node from './D3Node.vue'
import d3link from './D3Link.vue'


export default {

  components: {
      d3node,
      d3link
    },

  mixins: [nav],

  props:["nodes","links", "started"],

  data() {
    return {   
      simulation: null,
      selectednode: -1,
      draggedNode: -1,
      layout: {
        height: 1000,
        width: 600,
      }
    }
  },

  watch: {
    started: function(newV){
          if(newV) this.startSimulation()
    },
  },
  computed: {

    width() {
      return this.layout.width
    },
    height() {
      return this.layout.height
    }
  },
  methods: {

    select(nid) {
     this.selectednode = nid;
     this.$emit('selectionChange', nid)
    },

    initForceSim() {
      this.simulation = d3.forceSimulation();
      this.simulation
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.width / 3, this.height / 5))
        .force("link", d3.forceLink()
                          .id(function(n) {
                              return n.id //connect links by id, not by index
                          })
                          .distance(function(l) {
                            return l.distance
                          })
          );
    },

    startSimulation() {

      if (this.simulation === null)
        this.initForceSim()

      this.simulation.nodes(this.nodes)
      this.simulation.force("link").links(this.links)
      this.simulation.alphaTarget(1).restart()
    },
  }
}
</script>

<style>
#codeNetwork
{
    margin: 25px; 
}

#codeNetwork path
{
	fill: none;
    stroke: #76BF8A;
    stroke-width: 3px;
}

#codeNetwork line
{
  stroke:grey;
  stroke-width: 2px;
}

#codeNetwork text
{
  color:black;
  font-family: Palatino, 'Palatino Linotype', 'Palatino LT STD', 'Book Antiqua', Georgia, serif;
  font-size: 12px;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 20px;
}
</style>