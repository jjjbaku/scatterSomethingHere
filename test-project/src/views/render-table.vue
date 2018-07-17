<template>
    <table-module
      :table-data="tableData"
      :label-map="LABEL_MAP_ORDERED"
      :selectable="isSelectable">
    </table-module>
</template>

<script>
import TableModule from '@/components/el-table-module'

export default {
  name: 'render-table',
  components: {
    tableModule: TableModule
  },
  data () {
    return {
      // DATA_FOR_USE: ['cards'],
      // data: {},
      DATA_TITLE: 'cards',
      LABEL_MAP_ORDERED: [
        { label: 'Name', value: 'name' },
        { label: 'Description', value: 'description' }
      ],
      tableData: null,
      isSelectable: true
    }
  },
  beforeMount () {
    // Initialization
    this.axios
      .get('static/mock-card-data.json')
      .then((response) => {
        // let keys = Object.keys(response.data)
        // for (let i in keys) {
        //   if (this.DATA_FOR_USE.includes(keys[i])) {
        //     this.data[keys[i]] = response.data[keys[i]]
        //   }
        // }

        // this.tableData = this.data['cards']
        this.tableData = response.data[this.DATA_TITLE]
      })
  }
}
</script>
