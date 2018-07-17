<script>
export default {
  props: ['table-data', 'label-map', 'selectable'],
  data () {
    return {
      // LABEL_MAP_ORDERED: [
      //   { label: 'Name', value: 'name'},
      //   { label: 'Description', value: 'description'}
      // ]
    }
  },
  methods: {
    show (e) {
      console.log(e)
    }
  },
  render (createElement) {
    const COL_TAG = 'el-table-column'
    const TABLE_TAG = 'el-table'

    let cols = []
    let table = null

    // Adding selection columns
    if (this.selectable) {
      let selectCol = createElement(
        COL_TAG,
        { attrs: { type: 'selection' } }
      )

      cols.push(selectCol)
    }

    // Adding data columns
    for (let i in this.labelMap) {
      let colAttrs = {
        prop: this.labelMap[i].value,
        label: this.labelMap[i].label
      }

      let colSpan = createElement(
        'span',
        {},
        `{{ scope.row.data }}`
      )

      let colTemplate = createElement(
        'template',
        { attrs: { slotScope: 'scope' } },
        colSpan
      )

      let currentCol = createElement(
        COL_TAG,
        {
          attrs: colAttrs
        }, colTemplate)

      cols.push(currentCol)
    }

    table = createElement(
      TABLE_TAG,
      {
        attrs: {
          data: this.tableData
        }
      },
      cols)

    console.log(cols)

    return table
  },
  beforeMount () {
  }
}
</script>
