const app = {
  editor: null,
  controller: null,
  data () {
    return {
      trigger: false,
      createBlockDialog: null,
      canvas: null,
      text: '',
      x: 0,
      y: 0
    }
  },
  mounted () {
    this.createBlockDialog = this.$refs.createBlockDialog
    this.canvas = this.$refs.canvas
    // eslint-disable-next-line
    this.editor = charts.createEditor(this.canvas)
    this.controller = this.editor.controller
  },
  methods: {
    undo () {
      this.controller.undo()
      this.trigger = !this.trigger
    },
    redo () {
      this.controller.redo()
      this.trigger = !this.trigger
    },

    doDefault () {
      this.controller.createBlock({ position: { x: 10, y: 10 }, text: 'ToDo 1' })
      this.controller.createBlock({ position: { x: 70, y: 10 }, text: 'ToDo 2' })
      const block0 = this.editor.storage.blocks[0]

      this.controller.selectBlock(block0)
      this.controller.unselectBlock(block0)
      this.controller.moveBlock(block0, 10, 70)

      this.trigger = !this.trigger
    },

    createBlockDialogOpen () {
      this.createBlockDialog.showModal()
    },

    createBlockOk () {
      this.controller.createBlock({ position: { x: parseInt(this.x), y: parseInt(this.y) }, text: this.text })
      this.createBlockDialog.close()
      this.trigger = !this.trigger
    },

    createBlockCancel () {
      this.createBlockDialog.close()
    },

    getBlocks () {
      if (!this.editor) return []
      // eslint-disable-next-line no-unused-vars
      const foo = this.trigger
      return this.editor.storage.blocks
    }
  }
}
// eslint-disable-next-line
Vue.createApp(app).mount('#app')
