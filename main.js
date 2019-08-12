var app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      rows: 3,
      cols: 3,
      table: [],
      enableIndent: false,
      includeTableTag: true,
      includeTbodyTag: false,
      tableClass: '',
      trClass: '',
      tdClass: '',
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

      if (this.includeTableTag) {
        s += '<table' + tableclass + '>\n';
        if (this.enableIndent) indentDepth++;
      }

      if (this.includeTbodyTag) {
        s += ' '.repeat(indent * indentDepth) + '<tbody>\n';
        if (this.enableIndent) indentDepth++;
      }

      for (let i = 0; i < this.rows; i++) {
        s += ' '.repeat(indent * indentDepth) + '<tr' + trclass + '>\n';
        
        if (this.enableIndent) indentDepth++;
        s += ' '.repeat(indent * indentDepth);
        for (let j = 0; j < this.cols; j++) {
          s += '<td' + tdclass + '>' + this.table[i][j] + '</td>';
        }
        if (this.enableIndent) indentDepth--;

        s += '\n' + ' '.repeat(indent * indentDepth) + '</tr>\n';
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
        this.table[i] = [];
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
    }
  }
})
