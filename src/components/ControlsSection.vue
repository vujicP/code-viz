<template>
  <div id="controlssection" class="box">
      <div>
        <p>Add Relations</p>
        <b-autocomplete
            rounded
            v-model="searchNode"
            :data="dataArray"
            placeholder="e.g. Practice or Element"
            icon="magnify"
            @input="searchStringEntered"
            @select="$emit('nodeAdded', getIDbyLabel($event))">
            <template v-if="searchNode.length > 2" slot="empty">No results found</template>
        </b-autocomplete>
        <br/>
      </div>
    <div class="box">
      <p>Selected: {{ selectedLabel }}</p>
      <br/>
      <div class="buttons has-addons">
        <button @click="$emit('nodeAdded', selectedID)" class="button is-small">add +1 relations</button>
        <button @click="removeNode(selectedID)" class="button is-small">remove selected</button>
      </div>
    </div>
  	<div class="buttons is-right">
       <button @click="$emit('resetGraph')" class="button is-right is-dark is-small is-rounded">Clear Graph</button>
    </div>
  </div>
</template>


<script>

import { searchConcepts } from '../store/api.js'

export default{

  props: ["selectedID", "selectedLabel"],

  data() {
    return {
      searchNode: '',
      searchResults: []

    }
  },

  computed: {
    dataArray() {
      return this.searchResults.map(n => n.record.code.properties.name)
    }
  },

  methods: {

    searchStringEntered() {

      if(this.searchNode.length > 2)
      searchConcepts(this.searchNode)
        .then(response => this.searchResults = response.data)
    },

    getIDbyLabel(label) {

      if (this.searchResults.length > 0) 
        if (this.searchResults.find(n => n.record.code.properties.name === label) !== undefined)
          return this.searchResults.find(n => n.record.code.properties.name === label).record.code.id

      return -1
    },

    removeNode(n_id) {
      this.$emit('nodeRemoved', n_id)
    }
  }
}


</script>

<style>

</style>