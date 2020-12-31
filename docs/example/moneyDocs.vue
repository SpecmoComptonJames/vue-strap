<template>
  <doc-section id="money" name="Money">
    <div class="bs-example text-left">
      <form action="." method="get" accept-charset="utf-8">
        <div class="row">
          <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5">
            <bs-money
              ref="txtMoney"
              name="money"
              :group-addon="groupAddon"
              :disabled="check.disabled"
              :error="error"
              :help="help"
              :hideHelp="check.hideHelp"
              v-model="numberValue"
              :align="alignment"
              :icon="check.icon"
              :validate-manually="check.validateManually"
              :required="check.required"
              :required-zero-value-check="check.requiredZeroValueCheck"
            ></bs-money>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <p>
              <checkbox v-model="check.label">Label</checkbox>
            </p>
            <p>
              <checkbox v-model="check.placeholder">placeholder</checkbox>
            </p>
            <p>
              <checkbox v-model="check.hideHelp">hide help</checkbox>
            </p>
            <p>
              <checkbox v-model="check.disabled">disabled</checkbox>
            </p>
            <p>
              <checkbox v-model="check.required">required</checkbox>
              <checkbox v-model="check.requiredZeroValueCheck">require zero value check</checkbox>
            </p>
            <p>
              <checkbox v-model="check.error">error</checkbox>
            </p>
            <p>
              <checkbox v-model="check.validateManually">Validate Manually</checkbox>
            </p>
            <p>
              <checkbox v-model="check.icon">icon</checkbox>
            </p>
            <button type="button" @click="testSetInvalid()" class="btn btn-danger">Set Invalid</button>
            <button type="button" @click="testSetValid()" class="btn btn-success">Set Valid</button>
            <button type="button" @click="clearValid()" class="btn btn-default">Clear Valid</button>
          </div>
          <div>
            <div>
              Val: {{numberValue}} Type: {{typeof(numberValue)}}
            </div>
            <bs-input v-model="groupAddon" label="group-addon:"></bs-input>
            <bs-input v-model="help" label="help:"></bs-input>
            <bs-input v-model="error" label="error:"></bs-input>
            <Select v-model="alignment"
                    group-addon="Alignment"
                    :options="choices.alignments"
                    options-label="value" o
                    ptions-value="value" ></Select>
          </div>
        </div>
      </form>
    </div>
  </doc-section>
</template>

<script>
import docSection from './utils/docSection.vue'
import docTable from './utils/docTable.js'
import docCode from './utils/docCode.js'
import bsInput from 'src/Input.vue'
import ButtonGroup from 'src/buttonGroup.vue'
import Checkbox from 'src/Checkbox.vue'
import Dropdown from 'src/Dropdown.vue'
import Select from 'src/SelectExtended.vue'
import bsMoney from "../../src/Money.vue"


export default {
  name: "moneyDocs",
  components: {
    docSection,
    docTable,
    docCode,
    bsInput,
    ButtonGroup,
    Checkbox,
    Dropdown,
    bsMoney,
    Select
  },
  data() {
    return {
      choices: {
        alignments: [{value: 'left'}, {value: 'right'}, {value: 'center'}]
      },
      check: {
        clearButton: true,
        error: true,
        hideHelp: true,
        icon: true,
        label: true,
        mask: false,
        minlength: true,
        placeholder: true,
        required: true,
        requiredZeroValueCheck: true,
        validateManually: false,
      },
      groupAddon: 'You like money?',
      groupFaTag: null,
      numberValue: 12.55,
      help: 'I like money.',
      alignment: null,
      error: "We should hang out.",
    }
  },
  methods: {
    testSetInvalid() {
      var input = this.$refs['txtMoney'];
      input.setValidState(false);
      console.log(' input.setValidState(false);');
    },
    testSetValid() {
      var input = this.$refs['txtMoney'];
      input.setValidState(true);
      console.log('input.setValidState(true);');
    },
    clearValid() {
      var input = this.$refs['txtMoney'];
      input.setValidState(null);
      console.log('clearValid');
    },
    submitKeyPressed: function(e) {
      console.log('submit_key_pressed:', e);
    }
  }
}
</script>

<style scoped>

</style>
