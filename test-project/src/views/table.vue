<template>
  <div>
    <el-table
      class='init'
      ref="cardTable"
      size="small"
      :data="cards"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      :highlight-current-row="tableMode.isCurrentRowHighlight"
      :default-sort="{ prop: 'name', order: 'ascending' }">
      <div>
        <el-table-column
          type="selection"></el-table-column>
      </div>
      <el-table-column prop="name"
        label="Name"
        :sortable="true"
        fixed="left">
        <template slot-scope="scope">
          <span>
            {{ scope.row.name}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="Value"
        :sortable="true">
        <template slot-scope="scope">
          <div>
            <span v-if="editedRow === scope.row.id">
            <input type="text" size="4" v-model="editingData.value">
          </span>
          <span v-else>
            {{ scope.row.value }}
          </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Description">
        <template slot-scope="scope">
          <span>
            {{ scope.row.description }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="Index">
        <template slot-scope="scope">
          <span>
            {{ scope.row.id }}
          </span>
        </template>
      </el-table-column>
      <!-- Tools column -->
      <el-table-column
        label="Tools"
        fixed="right"
        width="140px"
        v-if="tableMode.isToolsInRow"
        class="sameLine">
        <template slot-scope="scope">
          <span v-if="editedRow === scope.row.id">
            <el-button
            icon="el-icon-close"
            size="mini"
            :round="true"
            @click="HanldeRowEditing($event,scope.row,false)"></el-button>
            <el-button
            icon="el-icon-check"
            size="mini"
            :round="true"
            @click="HanldeRowEditing($event,scope.row,true)"></el-button>
          </span>
          <span v-else>
            <el-button
            icon="el-icon-edit"
            size="mini"
            @click="editCurrentRow($event,scope.row)">Edit</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- Button tools bar for select & click mode -->
    <!-- TODO: Delete & Reset button -->
    <el-row class="button-tools-bar">
      <el-button
        icon="el-icon-edit"
        @click="show(selectedRows)">Tool</el-button>
    </el-row>

    <!-- Config button, fixed at screen botton -->
    <el-row class="config">
      <el-button
        type="primary"
        @click="isConfigOpened = true"
        icon="el-icon-setting">Config</el-button>
    </el-row>

    <!-- Dialog window for config button-->
    <el-dialog
      title="Config"
      width="70%"
      :visible.sync="isConfigOpened"
      :center="true"
      @close="submitConfig()">
      <el-radio-group
        v-model='config.mode'>
        <el-radio label="selectByClick">Click & Select Mode</el-radio>
        <el-radio label="classic">Classic Mode</el-radio>
      </el-radio-group>
      <div slot="footer">
        <el-button
          @click="isConfigOpened = false">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="isConfigOpened = false">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'temp-table',
  data: function () {
    return {
      cards: null,
      backupData: null,
      selectedRows: [],
      selectedRow: null,
      isConfigOpened: false,
      editedRow: -1,
      tableMode: {
        isSelectByClick: true,
        isCurrentRowHighlight: true,
        isToolsInRow: true
      },
      config: {
        mode: 'selectByClick'
      },
      tableProps: [],
      colProps: ['value'],
      editingData: {
      }
    }
  },
  computed: {
  },
  methods: {
    // sort: function(prop, method) {
    //   console.log('Sorting')
    //   console.log(prop)
    //   console.log(method)
    //   console.log(arguments)
    // },
    editCurrentRow (e, row) {
      this.editedRow = row.id
      for (let i in this.tableProps) {
        this.editingData[this.tableProps[i]] = row[this.tableProps[i]]
      }

      console.log(this.editingData)
      e.stopPropagation()
    },
    HanldeRowEditing (e, row, handle) {
      if (handle) {
        for (let i in this.tableProps) {
          row[this.tableProps[i]] = this.editingData[this.tableProps[i]]
        }
      }

      this.editedRow = -1
      e.stopPropagation()
    },
    submitConfig () {
      // console.log('close call back fn')
      if (this.config.mode === 'selectByClick') {
        this.tableMode.isSelectByClick = true
        this.tableMode.isCurrentRowHighlight = true
        this.tableMode.isToolsInRow = true
      } else {
        this.tableMode.isSelectByClick = false
        this.tableMode.isCurrentRowHighlight = false
        this.tableMode.isToolsInRow = true
      }
    },
    openDialog (element) {
      if (element === 'config') {
        this.isConfigOpened = true
      }
    },
    show: function (e) {
      console.log(e)
    },
    // handleCellClick: function (cell) {
    //   console.log('Cell Click')
    //   console.log(cell)
    // },
    handleSelectionChange: function (val) {
      this.selectedRows = val
    },
    handleRowClick: function (row) {
      console.log('Handle click.')

      if (this.tableMode.isSelectByClick) {
        this.$refs.cardTable.toggleRowSelection(row)
      }

      if (!this.selectedRow) {
        this.selectedRow = row
        return
      }

      if (row.id === this.selectedRow.id) {
        this.$refs.cardTable.setCurrentRow()
        this.selectedRow = null
      } else {
        this.selectedRow = row
      }
    }
  },
  beforeMount: function () {
    this.mode = 'selectByClick'

    this.axios
      .get('static/mock-card-data.json')
      .then((response) => {
        let data = null

        if (response) {
          data = response.data.cards
          let keys = Object.keys(data[0])
          for (let i in keys) {
            this.tableProps.push(keys[i])
            this.editingData[keys[i]] = ''
          }
        }

        console.log(data)
        console.log(this.editingData)
        console.log(this.tableProps)
        this.cards = data
        this.backupData = data
      })
  }
}
</script>

<style>
.init {
  cursor: default;
}

.clickable {
  cursor: pointer;
}

.config {
  position: fixed;
  bottom: 2%;
  right: 2%;
  z-index: 100;
}

.sameLine {
  white-space: nowrap;
}

.button-tools-bar {
  margin-top: 10px;
}
</style>
