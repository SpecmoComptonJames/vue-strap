<template>
    <doc-section id="datepickerExtended" name="Datepicker Extended">
        <div class="bs-example">
            <div class="row">
                <div class="col-lg-6">
                    <p>
                        <pre>Selected date is: {{date}}</pre>
                    </p>
                    <h4>Plain Date Picker</h4>
                    <datepicker ref="dp"
                                v-model="date"
                                :disabled-days-of-week="disabled"
                                :format="format"
                                :clear-button="clear"
                                :placeholder="placeholder"
                                :groupAddon="groupAddon"
                                :error="errorText"
                                errorDefaultMessage="Date is invalid."
                                :required="required"
                                help="Pick a Date"
                                :openOnFocus="openFocus"
                                :icon="icon"
                                :validator-custom-function="validateRoDate"
                    ></datepicker>
                    <button @click="checkValidState">call isValid()</button>
                    <p>Control State Check:
                        {{stateCheck}}
                    </p>
                    <h4>Plain Date With Label</h4>
                    <datepicker
                            ref="dp2"
                            v-model="date"
                            :disabled-days-of-week="disabled"
                            :format="format"
                            :clear-button="clear"
                            :placeholder="placeholder"
                            label="Here is my Label"
                            :openOnFocus="openFocus"
                            :required="required"

                    ></datepicker>
                    <h4>Plain Date With DateTime Type</h4>
                    <datepicker ref="dp3"
                                v-model="date"
                                :disabled-days-of-week="disabled"
                                :format="format"
                                :clear-button="clear"
                                :placeholder="placeholder"
                                :groupAddon="groupAddon"
                                :error="errorText"
                                :required="required"
                                help="Pick a Date"
                                :openOnFocus="openFocus"
                                :icon="icon"
                    ></datepicker>
                    <p>{{dateValue}}</p>
                    <h4>Disabled days of week</h4>

                    <v-select multiple v-model="disabled" :options="[0,1,2,3,4,5,6]"></v-select>

                    <h4>Format</h4>
                    <v-select v-model="format" :options="formats"></v-select>

                    <h4>Reset button</h4>
                    <checkbox :value="clear" @checked="clear = arguments[0]" type="primary">toggle clear button</checkbox>
                    <checkbox :value="openFocus" @checked="openFocus = arguments[0]" type="primary">toggle focus on enter button</checkbox>
                    <checkbox :value="required" @checked="required = arguments[0]" type="primary">toggle Required</checkbox>
                    <checkbox :value="icon" @checked="icon = arguments[0]" type="primary">toggle Icon</checkbox>
                    <checkbox :value="canValidate" @checked="icon = arguments[0]" type="primary">Can Validate</checkbox>

                    <p>
                        <label>Group Addon Tag:</label>
                        <input v-model="groupAddon"></input>
                    </p>
                    <p>
                        <label>FA Tag:</label>
                        <input v-model="groupFaTag"></input>
                    </p>
                    <p>
                        <label>Date:</label>
                        <input v-model="date"></input>
                    </p>

                    <button @click="testSetInvalid()" class="btn btn-danger">Set Invalid</button>
                    <button @click="testSetValid()" class="btn btn-success">Set Valid</button>
                    <button @click="clearValid()" class="btn btn-default">Clear Valid</button>
                    <button @click="setDateTime()" class="btn btn-default">For to DateTime Data Value</button>
                    <p>{{date}}</p>
                </div>
            </div>
        </div>
        <doc-code language="markup">
            &lt;datepicker v-model="value" :disabled-days-of-Week="disabled" :format="format" :clear-button="clear"
            :placeholder="placeholder">&lt;/datepicker>
        </doc-code>
        <doc-table>
            <div>
                <p>clear-button</p>
                <p><code>Boolean</code></p>
                <p>false</p>
                <p>If <strong>true</strong> shows an &times; shaped button to clear the selected date.
                    Usefull in forms where date entry is optional.</p>
            </div>
            <div>
                <p>disabled-days-of-week</p>
                <p><code>Array</code></p>
                <p></p>
                <p>Days of the week that should be disabled. Values are 0 (Sunday) to 6 (Saturday).
                    Multiple values should be comma-separated.</p>
            </div>
            <div>
                <p>format</p>
                <p><code>String</code></p>
                <p><code>MMMM/dd/yyyy</code></p>
                <p>The date format, combination of d, dd, M, MM, MMM, MMMM, yyyy.</p>
            </div>
            <div>
                <p>placeholder</p>
                <p><code>String</code></p>
                <p></p>
                <p>Placeholder to put on the input field when no date (null or empty) is set</p>
            </div>
            <div>
                <p>groupAddon</p>
                <p><code>String</code></p>
                <p></p>
                <p>Creates a BootStrap 3 Group-add-on tag and places text in it</p>
            </div>
            <div>
                <p>error</p>
                <p><code>String</code></p>
                <p></p>
                <p>message to display if validation of the date fails.</p>
            </div>
            <div>
                <p>value</p>
                <p><code>String</code></p>
                <p></p>
                <p>Value of the input DOM</p>
            </div>
            <div>
                <p>width</p>
                <p><code>String</code></p>
                <p></p>
                <p>Width of the input DOM</p>
            </div>
            <div>
                <p>icons-font</p>
                <p><code>String</code></p>
                <p><code>glyphicon</code></p>
                <p>The icon font used for arrows. Can be 'glyphicon' or 'fa' (Font Awesome)</p>
            </div>
            <div>
                <p>icon</p>
                <p><code>Boolean</code></p>
                <p><code></code></p>
                <p>Trues the gylph icon</p>
            </div>
            <div>
                <p>validatorCustomFunction</p>
                <p><code>function({month: str, year: str, day: str, valid: bool, date: DateTime}, self) {
                    return {valid: boolean, customerMessage: string}
                    }</code></p>
                <p><code></code></p>
                <p>A custom function which can validate the date further after the controls validate method executes and succeeds.</p>
            </div>
            <div>
                <p>setErrorMessage(string)</p>
                <p><code>function(string)</code></p>
                <p><code></code></p>
                <p>Override error message.</p>
            </div>
        </doc-table>
        <doc-table type="Events">
            <div>
                <p>input</p>
                <p>(<code>value:string</code>)</p>
                <p>Return the selected value.</p>
            </div>
        </doc-table>
    </doc-section>
</template>

<script>
    import docSection from './utils/docSection.vue'
    import docTable from './utils/docTable.js'
    import docCode from './utils/docCode.js'
    import Checkbox from 'src/Checkbox.vue'
    import Datepicker from 'src/DatepickerExtended.vue'
    import vSelect from 'src/Select.vue'
    import vOption from 'src/Option.vue'

    export default {
        components: {
            docSection,
            docTable,
            docCode,
            Checkbox,
            Datepicker,
            vSelect,
            vOption
        },
        data() {
            return {
                clear: true,
                disabled: [],
                required: false,
                format: 'yyyy-MM-dd',
                formats: ['dd/MM/yyyy', 'dd-MM-yyyy', 'yyyy,MM,dd', 'yyyy-MM-dd', 'yyyy.MM.dd', 'MM/dd/yyyy', 'MM-dd-yyyy'],
                placeholder: 'placeholder is displayed when value is null or empty',
                date: '2015-06-10',
                dateValue: null,
                groupAddon: 'Field Label',
                groupFaTag: null,
                errorText: 'It is broken',
                openFocus: false,
                icon: true,
                canValidate: true,
                stateCheck: null
            }
        },
        computed: {
           /* dateString() {
                var date;
                if (this.date.length === 10 && (this.format === 'dd-MM-yyyy' || this.format === 'dd/MM/yyyy')) {
                    date = new Date(this.date.substring(6, 10), this.date.substring(3, 5), this.date.substring(0, 2))
                } else {
                    date = new Date(this.date)
                }
                return isNaN(date.getFullYear()) ? new Date().toString() : date.toString()
            }*/
        },
        methods: {
            setDateTime() {
                this.dateValue = new Date();
            },
            testSetInvalid() {
                var input = this.$refs['dp'];
                input.setValidState(false);
                var input2 = this.$refs['dp2'];
                input2.setValidState(false);
                console.log('set invalid state');
            },
            testSetValid() {
                var input = this.$refs['dp'];
                input.setValidState(true);
                var input2 = this.$refs['dp2'];
                input2.setValidState(true);
                console.log('set invalid state');
            },
            clearValid() {
                var input = this.$refs['dp'];
                input.setValidState(null);
                var input2 = this.$refs['dp2'];
                input2.setValidState(null);
                console.log('set invalid state');
            },
            validateRoDate: function(args, sender) {
                var _self = this;
                console.log('validate ro date ->', args, sender);
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                if (args.date >= tomorrow) {
                    return {valid: false, customMessage: "Date must be before or equal to today."};
                }
                return {valid: true};
            },
            checkValidState() {
                var input = this.$refs['dp'];
                this.stateCheck = input.isValid();

            }

        }
    }
</script>
