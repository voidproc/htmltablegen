var app = new Vue({
  el: '#app',

  vuetify: new Vuetify(),

  data() {
    return {
      rows: 3,
      cols: 3,

      activeRow: 0,
      activeCol: 0,

      // テーブルの各セルの文字列
      table: [],

      // オプション
      option: {
        rows: 3,
        cols: 3,
        enableIndent: false,
        includeTableTag: true,
        includeTbodyTag: false,
        breakTr: false,
        useTh: false,
        tableClass: '',
        trClass: '',
        tdClass: '',
        thClass: '',
      },
    }
  },

  mounted() {
    this.applyTableSize();
  },

  computed: {
    tableHtml() {
      if (this.table.length === 0) return '';

      let s = '';
      const indent = 2;
      let indentDepth = 0;

      const tableclass = this.option.tableClass.length > 0 ? ' class="' + this.option.tableClass + '"' : '';
      const trclass = this.option.trClass.length > 0 ? ' class="' + this.option.trClass + '"' : '';
      const tdclass = this.option.tdClass.length > 0 ? ' class="' + this.option.tdClass + '"' : '';
      const thclass = this.option.thClass.length > 0 ? ' class="' + this.option.thClass + '"' : '';

      if (this.option.includeTableTag) {
        s += '<table' + tableclass + '>\n';
        if (this.option.enableIndent) indentDepth++;
      }

      if (this.option.includeTbodyTag) {
        s += ' '.repeat(indent * indentDepth) + '<tbody>\n';
        if (this.option.enableIndent) indentDepth++;
      }

      for (let i = 0; i < this.rows; i++) {
        s += ' '.repeat(indent * indentDepth) + '<tr' + trclass + '>';
        
        if (this.option.breakTr) {
          if (this.option.enableIndent) indentDepth++;
          s += '\n' + ' '.repeat(indent * indentDepth);
        }

        for (let j = 0; j < this.cols; j++) {
          const tdth = (this.option.useTh && i == 0) ? 'th' : 'td';
          s += '<' + tdth + (tdth === 'th' ? thclass : tdclass) + '>' + this.table[i][j] + '</' + tdth + '>';
        }
        if (this.option.breakTr && this.option.enableIndent) indentDepth--;

        if (this.option.breakTr) {
          s += '\n' + ' '.repeat(indent * indentDepth);
        }

        s += '</tr>\n';
      }

      if (this.option.includeTbodyTag) {
        if (this.option.enableIndent) indentDepth--;
        s += ' '.repeat(indent * indentDepth) + '</tbody>\n'
      }

      if (this.option.includeTableTag) {
        s += '</table>';
      }

      return s;
    }
  },

  methods: {
    applyTableSize() {
      this.rows = this.option.rows;
      this.cols = this.option.cols;

      this.table.length = this.rows;
      for (let i = 0; i < this.rows; i++) {
        if (this.table[i] === undefined || this.table[i] === null) this.table[i] = [];
        this.table[i].length = this.cols;
      }
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          if (this.table[i][j] == undefined || this.table[i][j] == null) {
            this.table[i][j] = "";
          }
        }
      }
      this.table.splice(0, 0);
    },

    setInput(e, i, j) {
      this.table[i][j] = e.target.innerText.trim();
      this.table.splice(0, 0);
    },

    setFocus(i, j) {
      this.activeRow = i;
      this.activeCol = j;
    },

    decCol() {
      this.option.cols = Math.max(1, this.cols - 1);
      this.applyTableSize();
    },

    incCol() {
      this.option.cols++;
      this.applyTableSize();
    },

    decRow() {
      this.option.rows = Math.max(1, this.rows - 1);
      this.applyTableSize();
    },

    incRow() {
      this.option.rows++;
      this.applyTableSize();
    },

    insertRowAbove() {
      if (this.activeRow === null) return;

      this.table.splice(this.activeRow, 0, new Array(this.cols));
      this.option.rows++;
      this.activeRow++;
      this.applyTableSize();
      this.updateTableCells();
    },

    insertRowBelow() {
      if (this.activeRow === null) return;

      this.table.splice(this.activeRow + 1, 0, new Array(this.cols));
      this.option.rows++;
      this.applyTableSize();
      this.updateTableCells();
    },

    updateTableCells() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          const id = 'cell-' + i + '-' + j;
          const td = document.getElementById(id);
          td.innerText = this.table[i][j];
        }
      }
    },

    copyHtml() {
      document.getElementById('htmltext').select();
      document.execCommand('Copy');
    },

    tdBgColor(i, j) {
      if (i == this.activeRow) {
        return 'white';
      }
      return 'transparent';
    }
  }
})
