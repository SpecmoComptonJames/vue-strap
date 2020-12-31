<template>
  <div :id="controlId"
       :class="[{validate:canValidate,'has-feedback':icon,'has-error':canValidate&&valid===false,'has-success':canValidate&&valid}, cssClass]">
    <slot name="label"><label v-if="label" class="control-label" @click="focus">{{label}}</label></slot>
    <div class="input-group">
      <slot name="before"></slot>
      <span v-if="groupAddon" class="input-group-addon">
         <i v-if="groupFaIcon" :class="groupFaIcon" style="margin-right: 3px"></i>
            {{ groupAddon }}
      </span>
      <input
             :class="[ 'form-control','money',
             {'text-align-right': (align == 'right'),
              'text-align-left': (align=='left'),
              'text-align-center': (align=='center'),
             }]"
             ref="input"
             :disabled="disabled"
             :name="name"
             :placeholder="placeholder"
             :readonly="readonly"
             :required="required"
             type="number"
             v-model="val"
             @blur="blur" @input="emit" @focus="emit"
             :tabindex="tabIndex"
      ></input>
      <div v-if="clearButton && value" :class="{icon:icon}">
        <span class="close" @click="value = ''">&times;</span>
      </div>
      <div v-if="icon" class="icon">
                <span v-if="icon&&valid!==null"
                      :class="['form-control-feedback glyphicon','glyphicon-'+(valid?'ok':'remove')]"
                      aria-hidden="true"></span>
      </div>
    </div>
    <slot name="after"></slot>
    <div v-if="showHelp" class="help-block" @click="focus">{{help}}</div>
    <div v-if="showError" class="help-block with-errors" @click="focus">{{errorText}}</div>
  </div>
</template>

<script>
  import {translations} from "./utils/utils";

  export default {
    name: "Money",
    props: {
      clearButton: {type: Boolean, default: false},
      disabled: {type: Boolean, default: false},
      enterSubmit: {type: Boolean, default: false},
      error: {type: String, default: null},
      groupAddon: {type: String, default: null},
      groupFaIcon: {type: String, default: null},
      help: {type: String, default: null},
      hideHelp: {type: Boolean, default: true},
      icon: {type: Boolean, default: false},
      label: {type: String, default: null},
      name: {type: String, default: null},
      placeholder: {type: String, default: null},
      align: {type: String, default: 'right'},
      readonly: {type: Boolean, default: false},
      required: {type: Boolean, default: false},
      requiredZeroValueCheck: {type: Boolean, default: true},
      validationDelay: {type: Number, default: 250},
      validateManually: {type: Boolean, default: false},
      value: { default: null},
      cssClass: {type: String, default: null},
      controlId: {default: true},
      debug: {type: Boolean, default: false},
      tabIndex: {type: String, default: null}
    },
    data() {
      var val = this.value
      return {
        val,
        valid: null
      }
    },
    computed: {
      canValidate() {
        return !this.disabled && !this.readonly && (this.required || this.nativeValidate || this.validateManually || this.match !== null)
      },
      input() {
        return this.$refs.input
      },
      nativeValidate() {
        return (this.input || {}).checkValidity
      },
      showError() {
        return this.error && this.valid === false
      },
      showHelp() {
        return this.help && (!this.showError || !this.hideHelp)
      },

      title() {
        return this.errorText || this.help || ''
      },
      errorText() {
        var value = this.value
        var error = [this.error]
        if (!value && this.required) error.push('(' + this.text.required.toLowerCase() + ')')
        //check for zero
        if(value && isNaN(value) == false && this.required && this.requiredZeroValueCheck && parseFloat(value) == 0) error.push('(' + this.text.required.toLowerCase() + ')')
        return error.join(' ')
      },
      text() {
        return translations(this.lang)
      },
    },
    watch: {
      eval() {
        if (this._timeout.eval) clearTimeout(this._timeout.eval)
        if (!this.canValidate) {
          this.valid = true
        } else {
          this._timeout.eval = setTimeout(() => {
            this.valid = this.validate()
            this._timeout.eval = null
          }, this.validationDelay)
        }
      },
      val(val, old) {
        this.$emit('input', val)
        if (val !== old) {

        }
      },
      valid(val, old) {
        this.$emit('isvalid', val)
        this.$emit(!val ? 'invalid' : 'valid')
        if (this._parent) this._parent.validate()
      },
      value(val) {
        if (this.val !== val) {
          this.val = val
        }
      }
    },
    methods: {
      validate() {
        if (!this.canValidate) {
          return true
        }
        //var value = (this.val || '').trim();
        var value = "";
        if (typeof this.val !=='string') {
          value = this.val;
        } else {
          value = (this.val || '').trim();
        }

        if (this.validateManually) {
          return this.valid;
        }
        if (!value) {
          return !this.required
        }

        if(value && isNaN(value) == false && this.required && this.requiredZeroValueCheck && parseFloat(value) == 0) {
          return !this.required;
        }

        return true
      },
      emit(e) {
        this.$emit(e.type, e.type == 'input' ? e.target.value : e)
        if (e.type === 'blur' && this.canValidate) {
          this.valid = this.validate()
        }
      },
      blur(e) {
        //make string number
        if (!this.val) {
            this.val = "0.00";
        } else {
          let nums = this.val.toString();
          let num = parseFloat(nums);
          this.val = num.toFixed(2);
        }
        this.emit(e);
      },
      focus() {
        if (this.input && typeof this.input.focus === 'function') {
          this.input.focus();
        }
      },
      setValidState(state) {
        this.valid = state;
      },
    },
    created() {
      this._timeout = {};
    }
  }
</script>

<style scoped>
  .text-align-right {
    text-align: right;
  }

  .text-align-left {
    text-align: left;
  }

  .text-align-center {
    text-align: center;
  }

</style>
