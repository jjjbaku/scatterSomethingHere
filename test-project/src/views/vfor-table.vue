<template>
  <div>
    <el-table
      :data="tableDatas[currentPageNumber]"
      class="table">
      <!-- Common data columns -->
      <el-table-column
      v-for="col in tableCols"
      :width="getColumnValue(col, 'width')"
      :key="col.valName"
      :label="col.label"
      :prop="col.valName">
        <template slot-scope="scope">
          <span v-if="rowInEditing === scope.row">
            <input
              :style="{ width: getColumnValue(col, 'inputWidth') }"
              v-model="dataInEditing[col.valName]">
          </span>
          <span v-else>
            {{ scope.row[col.valName] }}
          </span>
        </template>
      </el-table-column>
      <!-- Tool column -->
      <el-table-column
        label="Tools"
        width="130px">
        <template slot-scope="scope">
          <span v-if="rowInEditing === scope.row">
            <el-button
              size="mini"
              icon="el-icon-close"
              @click="checkEditingData(scope.row, false)"></el-button>
            <el-button
              size="mini"
              icon="el-icon-check"
              @click="checkEditingData(scope.row, true)"></el-button>
          </span>
          <span v-else>
              <el-button size="mini" @click="editCurrentRow(scope.row)">Edit</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- Pagination -->
    <el-pagination
      layout="prev, pager, next"
      :pager-count='5'
      :total="pageNumber*10"
      @current-change="changePage">
    </el-pagination>

    <!-- Config button, fixed at screen botton -->
    <el-row class="config">
      <el-button
        type="primary"
        @click="resetPageData()"
        icon="el-icon-setting">Reset</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      DATA_TITLE: 'cards',
      PAGE_ITEM_LIMIT: 5,
      // BUFFERED_DATA_NUMBER: 20,
      COLUMN_PRESET: [
        { label: 'Name', valName: 'name' },
        { label: 'Description', valName: 'description', width: '200px' }
      ],
      DEFUALT_COLUMN_WIDTH: '100px',
      // tableData: null,
      tableDatas: [],
      backupData: [],
      tableCols: [],
      pageNumber: 0,
      currentPageNumber: 0,
      rowInEditing: null,
      dataInEditing: {},
      isCurrentPageEdited: false
    }
  },
  methods: {
    resetPageData () {
      let tableData = this.tableDatas[this.currentPageNumber]
      if (tableData) {
        let props = Object.keys(tableData[0])
        for (let i in tableData) {
          for (let j in props) {
            tableData[i][props[j]] = this.backupData[i][props[j]]
          }
        }
      }
    },
    changePage (pageNum) {
      // console.log(pageNum)
      this.currentPageNumber = pageNum - 1

      // Init everything
      this.backupData = []
      for (let i in this.tableDatas[this.currentPageNumber]) {
        let clone = JSON.parse(JSON.stringify(this.tableDatas[this.currentPageNumber][i]))
        this.backupData.push(clone)
      }
      this.isCurrentPageEdited = false
    },
    editCurrentRow (row) {
      // console.log(row)
      this.rowInEditing = row

      this.dataInEditing = {}
      let props = Object.keys(row)
      for (let i in props) {
        this.dataInEditing[props[i]] = row[props[i]]
      }
      console.log(this.dataInEditing)
    },
    checkEditingData (row, confirm) {
      console.log('Before Check')
      console.log(this.backupData)
      if (confirm) {
        let props = Object.keys(this.dataInEditing)
        for (let i in props) {
          row[props[i]] = this.dataInEditing[props[i]]
        }
        this.isCurrentPageEdited = true
      }
      console.log('After Check')
      console.log(this.backupData)
      this.rowInEditing = null
    },
    getColumnValue (col, flag) {
      if (flag === 'width') {
        return col.width ? col.width : this.DEFUALT_COLUMN_WIDTH
      } else if (flag === 'inputWidth') {
        let getSizeFromWidth = (width) => {
          // console.log(parseInt(width.slice(0, - 2)) / 10)
          return (parseInt(width.slice(0, -2)) - 20) + 'px'
        }
        return col.inputWidth
          ? col.inputWidth
          : (col.width
            ? getSizeFromWidth(col.width)
            : getSizeFromWidth(this.DEFUALT_COLUMN_WIDTH))
      }
    }
  },
  beforeMount () {
    this.axios
      .get('static/mock-card-data.json')
      .then((response) => {
        if (response) {
          let data = response.data[this.DATA_TITLE]
          let rawPropNames = data ? Object.keys(data[0]) : []

          for (let i in this.COLUMN_PRESET) {
            for (let j in rawPropNames) {
              if (this.COLUMN_PRESET[i].valName === rawPropNames[j]) {
                // let colData = {
                //   label: this.COLUMN_PRESET[i].label,
                //   valName: this.COLUMN_PRESET[i].valName
                // }

                // this.tableCols.push(colData)

                this.tableCols.push(this.COLUMN_PRESET[i])
                break
              }
            }
          }

          // this.tableData = data
          // this.backupData = data

          this.pageNumber = Math.ceil(data.length / this.PAGE_ITEM_LIMIT)
          console.log(this.pageNumber)
          for (let i = 0; i < this.pageNumber; i++) {
            this.tableDatas.push([])
          }
          for (let i = 0; i < data.length; i++) {
            let pageNum = Math.floor(i / this.PAGE_ITEM_LIMIT)
            this.tableDatas[pageNum].push(data[i])
            if (i < this.PAGE_ITEM_LIMIT) {
              let clone = JSON.parse(JSON.stringify(data[i]))
              // let clone2 = Object.clone(data[i])

              this.backupData.push(clone)
            }
          }
        }
        // console.log(this.tableData)
        // console.log(this.tableLabels)
        // console.log(this.tableVals)
      })
  }
}
</script>

<style>
.config {
  position: fixed;
  bottom: 2%;
  right: 2%;
  z-index: 100;
}

.table td {
  height: 75px;
}
</style>
