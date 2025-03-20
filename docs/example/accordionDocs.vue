<template>
  <doc-section id="accordion" name="Accordion">
    <div class="bs-example">
      <checkbox v-model="checked" type="primary">Open only one at a time.</checkbox>
      <p><v-select :options="types" clear-button v-model="selected" placeholder="Global type"></v-select></p>
      <p><v-select :options="types" clear-button v-model="first" placeholder="First element type"></v-select></p>
      <accordion ref="myAccord" :one-at-atime="checked" :type="selected" @toggle-panel="onPanelToggled">
        <panel is-open :type="first=='panel'?null:first"  @opened="onPanelOpened" @header-clicked="onHeaderClicked">
          <strong slot="header"><u>Panel #1</u></strong>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #2" @opened="onPanelOpened" @header-clicked="onHeaderClicked">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #3" @opened="onPanelOpened" @header-clicked="onHeaderClicked">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
        <panel header="Panel #4" @opened="onPanelOpened" @header-clicked="onHeaderClicked">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </panel>
      </accordion>
      <bs-input
          group-addon="Index To Open"
                v-model="idxToOpen"
                required
                type="number"
                :enable-feedback="false"
                tab-index="11">
      </bs-input>
      <button @click="openByIndex">Open Index</button>
      <button @click="toggleByIndex">Toggle Index</button>
    </div>
    <doc-code language="markup">
      &lt;accordion :one-at-atime="checked" type="info">
        &lt;panel is-open type="primary" @opened="onPanelOpened">
          &lt;strong slot="header">&lt;u>Panel #1&lt;/u>&lt;/strong>
          ...
        &lt;/panel>
        &lt;panel header="Panel #2" @opened="onPanelOpened">
          ...
        &lt;/panel>
        &lt;panel header="Panel #3">
          ...
        &lt;/panel>
        &lt;panel header="Panel #4">
          ...
        &lt;/panel>
      &lt;/accordion>
    </doc-code>
    <doc-table>
      <div>
        <p>type</p>
        <p><code>String</code></p>
        <p><code>null</code></p>
        <p>Define the type of color for the tabs (global).</p>
      </div>
      <div>
        <p>one-at-time</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Control whether expanding an item will cause the other items to close.</p>
      </div>
    </doc-table>
    <doc-table name="Panel">
      <div>
        <p>header</p>
        <p><code>String</code></p>
        <p></p>
        <p>The clickable text on the group's header. You need one to be able to click on the header for toggling.</p>
      </div>
      <div>
        <p>is-open</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Whether accordion group is open or closed.</p>
      </div>
      <div>
        <p>type</p>
        <p><code>String</code></p>
        <p><code>null</code></p>
        <p>Define the type of color for the tab (single).</p>
      </div>
    </doc-table>
    <doc-table type="Events">
      <div>
        <p>toggle-panel</p>
        <p>Object: {"header": string}</p>
        <p>Called when chosen panel changes</p>
      </div>
      <div>
        <p>opened</p>
        <p>Object: {"open": bool, "header": string}</p>
        <p>emitted when pane is opened or closed.  Event of the panel object.</p>
      </div>
      <div>
        <p>header-clicked</p>
        <p>Object: {"open": bool, "header": string}</p>
        <p>emitted when header is clicked.  Event of the panel object.</p>
      </div>
    </doc-table>
    <p>If you want to personalize your header with some html you can use the slot instead of header attribute (panel&nbsp;#1 in the example).</p>
  </doc-section>
</template>

<script>
import docSection from './utils/docSection.vue'
import docTable from './utils/docTable.js'
import docCode from './utils/docCode.js'
import Accordion from 'src/Accordion.vue'
import Checkbox from 'src/Checkbox.vue'
import Panel from 'src/Panel.vue'
import vSelect from 'src/Select.vue'
import bsInput from "../../src/Input.vue";

export default {
  components: {
    bsInput,
    docSection,
    docTable,
    docCode,
    Accordion,
    Checkbox,
    Panel,
    vSelect
  },
  data () {
    return {
      idxToOpen: 0,
      checked: true,
      selected: 'info',
      first: 'primary',
      types: ['default', 'primary', 'info', 'success', 'warning', 'danger']
    }
  },
  methods: {
    openByIndex: function() {
      this.$refs.myAccord.openIndex(this.idxToOpen);
    },
    toggleByIndex: function() {
      this.$refs.myAccord.openIndex(this.idxToOpen, true);
    },
    onPanelToggled: function(args) {
      console.log('panelToggled', args);
    },
    onPanelOpened: function(args) {
      console.log('onPanelOpened', args);
    },
    onHeaderClicked: function(args) {
      console.log('onHeaderClicked', args);
    }
  }
}
</script>
