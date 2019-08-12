var app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      rows: 3,
      cols: 3,
      activeRow: null,
      activeCol: null,
      table: [],
      enableIndent: false,
      includeTableTag: true,
      includeTbodyTag: false,
      breakTr: false,
      useTh: false,
      tableClass: '',
      trClass: '',
      tdClass: '',
      thClass: '',
    }
  },
  mounted() {
    this.updateTableSize();
  },
  computed: {
    tableHtml() {
      if (this.table.length === 0) return '';

      let s = '';
      const indent = 2;
      let indentDepth = 0;

      const tableclass = this.tableClass.length > 0 ? ' class="' + this.tableClass + '"' : '';
      const trclass = this.trClass.length > 0 ? ' class="' + this.trClass + '"' : '';
      const tdclass = this.tdClass.length > 0 ? ' class="' + this.tdClass + '"' : '';
      const thclass = this.thClass.length > 0 ? ' class="' + this.thClass + '"' : '';

      if (this.includeTableTag) {
        s += '<table' + tableclass + '>\n';
        if (this.enableIndent) indentDepth++;
      }

      if (this.includeTbodyTag) {
        s += ' '.repeat(indent * indentDepth) + '<tbody>\n';
        if (this.enableIndent) indentDepth++;
      }

      for (let i = 0; i < this.rows; i++) {
        s += ' '.repeat(indent * indentDepth) + '<tr' + trclass + '>';
        
        if (this.breakTr) {
          if (this.enableIndent) indentDepth++;
          s += '\n' + ' '.repeat(indent * indentDepth);
        }

        for (let j = 0; j < this.cols; j++) {
          const tdth = (this.useTh && i == 0) ? 'th' : 'td';
          s += '<' + tdth + (tdth === 'th' ? thclass : tdclass) + '>' + this.table[i][j] + '</' + tdth + '>';
        }
        if (this.breakTr && this.enableIndent) indentDepth--;

        if (this.breakTr) {
          s += '\n' + ' '.repeat(indent * indentDepth);
        }

        s += '</tr>\n';
      }

      if (this.includeTbodyTag) {
        if (this.enableIndent) indentDepth--;
        s += ' '.repeat(indent * indentDepth) + '</tbody>\n'
      }

      if (this.includeTableTag) {
        s += '</table>';
      }

      return s;
    }
  },
  methods: {
    updateTableSize() {
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
      this.cols = Math.max(1, this.cols - 1);
      this.updateTableSize();
    },
    incCol() {
      this.cols++;
      this.updateTableSize();
    },
    decRow() {
      this.rows = Math.max(1, this.rows - 1);
      this.updateTableSize();
    },
    incRow() {
      this.rows++;
      this.updateTableSize();
    },
    copyHtml() {
      document.getElementById('htmltext').select();
      document.execCommand('Copy');
    }
  }
})
