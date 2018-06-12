<template>
        <div class="section">
          <h5 class="title is-5">Visualize Relations</h5>
          <div id="code-viz" class="columns">
            <div id="leftframe" class="container column is-two-thirds">
              <div id="d3network" class="is-unselectable is-fullwidth">
                <D3Network
                :nodes="graph.nodes"
                :links="graph.links"
                :started="networkStarted"
                @selectionChange="selectedNode = $event">
                </D3Network>
              </div>
            </div>
            <div id="rightframe" class="column">
              <ControlsSection
              :selectedID="selectedNode"
              :selectedLabel="selectedLabel"
              @resetGraph="graph.nodes=[];graph.links=[]"
              @nodeAdded="addNodes($event)"
              @nodeRemoved="removeNodes($event)">
              </ControlsSection>
              
              <div class="box">
                <p>Data References</p>
                <br/>
                <div>
                  <div class="tile is-ancestor">
                    <div class="tile is-vertical">
                      <div v-for="o in origin" class="tile box">
                        <a v-if="toggled.includes(o.id)===false" @click="toggled.push(o.id)">{{ o.shortDesc }}</a>
                        <a v-else @click="toggled.splice(toggled.indexOf(o.id), 1)">{{ o.desc }}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>


<script>


import D3Network from './D3Network.vue'
import ControlsSection from './ControlsSection.vue'

export default {
  components: {
    D3Network,
    ControlsSection,
  },

  data() {
    return {
      selectedNode: -1,
      graph: {
        nodes: [],
        links: []
      },
      networkStarted: false,
      toggled: []

    }
  },

  computed: {
    graphdata() {
      return this.$store.state.closest_connections
    },

    selectedLabel() {
      if (this.graph.nodes.find(n => n.id === this.selectedNode) !== undefined)
        return this.graph.nodes.find(n => n.id === this.selectedNode).label
      return ""
    },

    origin() {
      var list = this.$store.state.concept_provenance
      var returnv = []
      if (list.length > 0) {

        list.forEach(n => !returnv.some(o => o.id === n.record.interpretation.id) && returnv.push({
          id: n.record.interpretation.id,
          shortDesc: n.record.interpretation.properties.content.substring(0, 26) + "...",
          desc: n.record.interpretation.properties.content
        }))

        list.forEach(n => !returnv.some(o => o.id === n.record.sequence.id) && returnv.push({
          id: n.record.sequence.id,
          shortDesc: n.record.sequence.properties.content.substring(0, 26) + "...",
          desc: n.record.sequence.properties.content
        }))
      }
      return returnv
    }
  },
  watch: {

    selectedNode: function(newn) {

      if (newn > -1) 
        this.$store.dispatch('getCodeProvenance', newn)
    },

    graphdata: function dataChanged() {
      this.recalculateData(this.graphdata)
      this.networkStarted = true
    },
  },
  methods: {

    addNodes(nodeid) {

      if (nodeid > -1) {
        this.networkStarted = false

        this.$store.dispatch("getClosestConnections", {
          hops: 1,
          codeid: nodeid
        })
      }
    },

    removeNodes(nodeid) {

      var indexToDelete = this.graph.nodes.findIndex(n => n.id === nodeid)
      var deleteLinks = this.graph.links.reduce((arr, n, index) => {
        if (n.source.id === nodeid || n.target.id === nodeid)
          arr.push(index)
        return arr
      }, [])

      this.graph.nodes.splice(indexToDelete, 1)
      var l = deleteLinks.length
      while (l--)
        this.graph.links.splice(deleteLinks[l], 1)
    },

    recalculateData(data) {

      for (let i = 0; i < data.length; i++) {
        let node1found = this.graph.nodes.find(n => n.id === data[i].record.code.id)
        if (node1found === undefined) {
          this.graph.nodes.push({
            id: data[i].record.code.id,
            label: data[i].record.code.properties.name,
            index: 0,
            vx: 0,
            vy: 0, 
            x: 0,
            y: 0,
            fx: null,
            fy: null
          })
        }

        for (let j = 0; j < data[i].record.rels.length; j++) {
          var relation = data[i].record.rels[j][0]
          var relatedNode = data[i].record.rels[j][1]

          let node2found = this.graph.nodes.find(n => n.id === relatedNode.id)
          if (node2found === undefined) {
            this.graph.nodes.push({
              id: relatedNode.id,
              label: relatedNode.properties.name,
              index: 0,
              vx: 0,
              vy: 0, 
              x: 0,
              y: 0,
              fx: null,
              fy: null
            })
          }

          let relfound = this.graph.links.find(l => l.source.id === relation.start && l.target.id === relation.end || l.source.id === relation.end && l.target.id === relation.start)
          if (relfound === undefined) {

            this.graph.links.push({
              source: relation.start,
              target: relation.end,
              distance: 50
            })
          }
        }
      }

    }
  }

}
</script>


<style>


</style>