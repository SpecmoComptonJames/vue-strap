<template>
  <div class="panel-group">
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: null
    },
    oneAtAtime: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openChild (child) {
      if (this.oneAtAtime) {
        this.$children.forEach(item => {
          if (child !== item) {
            item.open = false
          }
        })
      }
    },
    togglingChildren: function (args) {
      this.$nextTick(function () {
        this.$emit('toggle-panel', args);
      });
    }
  },
  created () {
    this._isAccordion = true
  }
}
</script>
