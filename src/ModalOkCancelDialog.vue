<template>
    <div>
        <modal :title='title'
               :effect='effect'
               :width='width'
               :css-class="cssClassEval"
               v-model="show" @callback="onModalClose">
            <div class="modal-body" slot='modal-body'>
                {{body}}
            </div>
            <div class="modal-footer" slot='modal-footer'>
                <div v-if="footer" class="modal-footer-message">
                    {{footer}}
                </div>
                <button class="btn btn-primary" v-if="buttons.ok" @click='onModalClose("OK")'>OK</button>
                <button class="btn btn-link" v-if="buttons.cancel" @click='onModalClose("CANCEL")'>CANCEL</button>
            </div>
        </modal>
    </div>
</template>

<script>
    import  xmodal from './Modal.vue';

    export default {
        name: "ModalOkCancelDialog",
        components: {
            modal: xmodal
        },
        props: {
            effect: {type: String, default: 'fade'},
            width: {default: null},
            cssClass: {type: String, default: null }
        },
        data: function () {
            return {
                show: false,
                title: "",
                body: "",
                footer: "",
                classOverride: "",
                buttons: {
                    ok: true,
                    cancel: true
                },
            }
        },
        methods: {
            showDialog: function(options) {
                var _self = this;
                if (options.title) {
                    _self.title = options.title;
                }

                if (options.body) {
                    _self.body = options.body;
                }

                if (options.footer) {
                    _self.footer = options.footer;
                }

                if (options.cssClass) {
                    _self.classOverride = options.cssClass;
                }

                if (options.buttons) {
                    if (typeof(options.buttons.ok === "boolean")) {
                        _self.buttons.ok = options.buttons.ok;
                    }
                    if (typeof(options.buttons.cancel === "boolean")) {
                        _self.buttons.cancel = options.buttons.cancel;
                    }
                } else {
                    _self.buttons.ok = true;
                    _self.buttons.cancel = true;

                }

                _self.show = true;
                _self.$emit('shown');
            },
            onModalClose: function(args) {
                var _self = this;
                _self.show = false;
                var action = "CANCEL";
                if (args === "OK") {
                    action = "OK";
                }
                _self.$emit('closed', action);
                _self.classOverride = "";
            }
        },
        computed: {
            cssClassEval: function() {
                if (this.classOverride) {
                    return this.classOverride;
                }

                return this.cssClass;
            }
        }
    }
</script>

<style scoped>
    .modal-footer-message {
        text-align: left;
    }
</style>
