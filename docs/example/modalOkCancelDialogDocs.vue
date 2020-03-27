<template>
  <doc-section id="ModalOkCancelDialog" name="ModalOkCancelDialog">
    <div class="bs-example">
      <p>
        <label>Effect</label>
        <input type="text" v-model="effect" />
      </p>
      <p>
        <label>Width</label>
        <input type="text" v-model="width" />
      </p>
      <p>
        <label>Title</label>
        <input type="text" v-model="title" />
      </p>
      <p>
        <label>body</label>
        <input type="text" v-model="body" />
      </p>
      <p>
        <label>htmlBody</label>
        <input type="text" v-model="htmlBody" />
      </p>
      <p>
        <label>Footer</label>
        <input type="text" v-model="footer" />
      </p>
      <p>
        <label>OK Button</label>
        <input type="checkbox" v-model="buttons.ok" />
      </p>
      <p>
        <label>Cancel Button</label>
        <input type="checkbox" v-model="buttons.cancel" />
      </p>

      <button class="btn btn-default"
              @click="showModal"
              >Show modal</button>
     <modal ref="pageModal1" css-class="custom"  :width="width" :effect="effect" @closed="closed"></modal>
    </div>
    <hr/>
    <doc-table>
      <div>
        <p>backdrop</p>
        <p><code>Boolean</code></p>
        <p><code>true</code></p>
        <p>Enables/disables closing the modal by clicking on the backdrop.</p>
      </div>
      <div>
        <p>callback</p>
        <p><code>Function</code></p>
        <p></p>
        <p>A callback Function when you click the modal primary button.</p>
      </div>
      <div>
        <p>cancel-text</p>
        <p><code>String</code></p>
        <p>Close</p>
        <p>Text for cancel button</p>
      </div>
      <div>
        <p>effect</p>
        <p><code>String</code></p>
        <p></p>
        <p>set the name of the effect to use on modal, like fade or zoom</p>
      </div>
      <div>
        <p>large</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Large modal (see boostrap's documentation for .modal-lg)</p>
      </div>
      <div>
        <p>ok-text</p>
        <p><code>String</code></p>
        <p>Save changes</p>
        <p>Text for OK button</p>
      </div>
      <div>
        <p>small</p>
        <p><code>Boolean</code></p>
        <p><code>false</code></p>
        <p>Small modal (see boostrap's documentation for .modal-sm)</p>
      </div>
      <div>
        <p>title</p>
        <p><code>String</code></p>
        <p></p>
        <p>Title of the modal component.</p>
      </div>
      <div>
        <p>value</p>
        <p><code>Boolean</code></p>
        <p></p>
        <p>true if modal need to be shown, note the Modal has no intenal state</p>
      </div>
      <div>
        <p>width</p>
        <p><code>Number, String or null</code></p>
        <p><code>null</code></p>
        <p>Pass a Number in pixels or a String with relational sizes ( e.g. '80%' or '5em' ). If null, the modal will be responsive per bootstrap's default.</p>
      </div>
    </doc-table>
    <doc-table type="Events">
      <div>
        <p>input</p>
        <p>(<code>show:boolean</code>)</p>
        <p>Return if the modal is shown.</p>
      </div>
      <div>
        <p>ok</p>
        <p></p>
        <p>Called if the modal was accepted.</p>
      </div>
      <div>
        <p>cancel</p>
        <p></p>
        <p>Called if the modal was canceled.</p>
      </div>
      <div>
        <p>opened</p>
        <p></p>
        <p>Called when the modal is opened.</p>
      </div>
      <div>
        <p>closed</p>
        <p></p>
        <p>Called when the modal is closed.</p>
      </div>
    </doc-table>
    <p><strong>Note:</strong> The default events are called if you use the default footer. Using a footer slot, you must implement your own events to the buttons.</p>
  </doc-section>
</template>

<script>
import docSection from './utils/docSection.vue'
import docTable from './utils/docTable.js'
import docCode from './utils/docCode.js'
import modal from 'src/ModalOkCancelDialog.vue'

export default {
  components: {
    docSection,
    docTable,
    docCode,
    modal
  },
  data () {
    return {
      fadeModal: false,
      zoomModal: false,
      showCustomModal: false,
      largeModal: false,
      smallModal: false,
      effect: "fade",
      width: "800px",
      title: "Dialog Title",
      body: "Body Text",
      htmlBody: "",
      footer: "footer text",
      buttons: {
        ok: true,
        cancel: true
      }
    }
  },
  methods: {
    showModal() {
        var bx = this.$refs['pageModal1'];
        bx.showDialog({title: this.title, body: this.body,htmlBody: this.htmlBody, footer: this.footer, buttons: this.buttons})
    },
    closed: function(args) {
      console.log('CLOSED EVENT - > ',args);
    }
  }
}
</script>
