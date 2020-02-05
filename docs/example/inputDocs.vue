<!--suppress ALL -->
<template>
    <doc-section id="input" name="Input">
        <div class="bs-example text-left">
            <form action="." method="get" accept-charset="utf-8">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <bs-input
                                  ref="txtUserName"
                                  name="username"
                                  :group-addon="groupAddon"
                                  :disabled="check.disabled"
                                  :error="check.error ? 'Insert user name' : null"
                                  help="Only allows lowercase letters and numbers."
                                  :enter-submit="check.enterSubmit"
                                  :icon="check.icon"
                                  :label="check.label ? 'User Name' : null"
                                  :mask="check.mask?mask:null"
                                  :minlength="check.minlength?5:0"
                                  pattern="^[a-z][a-z0-9]+$"
                                  :placeholder="check.placeholder ? 'Username can\'t start with a number.' : null"
                                  :readonly="check.readonly"
                                  :required="check.required"
                                  :hide-help="check.hideHelp"
                                  :clear-button="check.clearButton"
                                  :validate-manually="check.validateManually"
                                  v-model="input"
                                  cssClass="myCssClass myCssClass2"
                                  @submit_key_pressed="submitKeyPressed"
                                  :debug="debug"
                        ></bs-input>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <bs-input name="match" required type="password" :match="input" :icon="check.icon"
                                  :enter-submit="check.enterSubmit" help="Match the User Name">
                            <label slot="label">Match value</label>
                        </bs-input>
                    </div>
                </div>
                <div class="row">
                    <button-group type="primary" :buttons="false">
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
                                <checkbox v-model="check.error">error</checkbox>
                            </p>
                            <p>
                                <checkbox v-model="check.icon">icon</checkbox>
                            </p>
                            <button type="button" @click="testSetInvalid()" class="btn btn-danger">Set Invalid</button>
                            <button type="button" @click="testSetValid()" class="btn btn-success">Set Valid</button>
                            <button type="button" @click="clearValid()" class="btn btn-default">Clear Valid</button>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <p>
                                <checkbox v-model="check.mask">mask</checkbox>
                            </p>
                            <p>
                                <checkbox v-model="check.minlength">minlength=5</checkbox>
                            </p>
                            <p>
                                <checkbox v-model="check.readonly">readonly</checkbox>
                            </p>
                            <p>
                                <checkbox v-model="check.required">required</checkbox>
                            </p>
                            <p>
                                <checkbox v-model="check.clearButton">clear button</checkbox>
                            </p>
                            <p>
                                <checkbox v-model="check.enterSubmit">enter submit</checkbox>
                            </p>
                            <p>
                                <checkbox v-model="check.validateManually">Validate Manually</checkbox>
                            </p>
                            <p>
                                <label>Group Addon Tag:</label>
                                <input v-model="groupAddon"></input>
                            </p>
                            <p>
                                <label>FA Tag:</label>
                                <input v-model="groupFaTag"></input>
                            </p>
                            <p>
                                <label>Value:</label>
                                <div>{{input}}</div>
                                <input v-model="input" type="text"></input>
                            </p>
                        </div>
                    </button-group>
                </div>
                <hr/>
                <bs-input
                        ref="with-slots"
                        label="Input with slots"
                        type="text"
                        required
                        icon
                        clear-button
                        error="I am an error message"
                        help="I am a help message"
                >
                    <span slot="before" class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                    <span slot="after" class="input-group-addon"><span class="glyphicon glyphicon-question-sign"></span></span>
                </bs-input>
                <bs-input name="textarea"
                          label="Textarea"
                          type="textarea"
                          :icon="check.icon"
                          :enter-submit="check.enterSubmit"
                          @focus="event = 'focused'"
                          @blur="event = 'blured'"
                          v-model="textarea"
                ></bs-input>
                <pre> Test event on textarea: {{event}}</pre>
                <p>Test Text Area Text: <input type="text" v-model="textarea"/></p>
            </form>
            <doc-code>
                &lt;bs-input v-model="input"
                label="Username"
                help="Only allows lowercase letters and numbers."
                error="Insert username"
                placeholder="Username can't start with a number."
                pattern="^[a-z][a-z0-9]+$"
                :mask="mask"
                minlength="5"
                readonly
                required
                icon
                >&lt;/bs-input>
                &lt;bs-input required label="Match value" type="password"
                :match="input"
                >&lt;/bs-input>
                &lt;bs-input label="Textarea" type="textarea"
                @focus="event = 'focused'"
                @blur="event = 'blured'"
                >&lt;/bs-input>
            </doc-code>
            <doc-code language="javascript">
                mask: function (value) {
                // change to lowercase, remove up to the first letter,
                // and then remove all other unsuported characters
                return value.toLowerCase().replace(/^[^a-z]+/,'').replace(/[^a-z0-9]/g,'');
                }
            </doc-code>
            <h2>Input groups:</h2>
            <p>More details in <a href="http://getbootstrap.com/components/#input-groups">bootstrap input groups</a>.
            </p>
            <bs-input label="With dropdown and button" type="text" :group-addon="groupAddon">
                <dropdown slot="before" text="dropdown">
                    <li><a href="#">option</a></li>
                </dropdown>
                <span slot="after" class="input-group-btn">
          <button type="button" class="btn btn-primary">Go!</button>
        </span>
            </bs-input>
            <h4>With Addon:</h4>
            <doc-code>
                &lt;bs-input label="With dropdown and button"
                type="text"
                :group-addon="groupAddon"
                >
                &lt;dropdown slot="before" text="dropdown">
                &lt;li>&lt;a href="#">option&lt;/a>&lt;/li>
                &lt;/dropdown>
                &lt;span slot="after" class="input-group-btn">
                &lt;button type="button" class="btn btn-primary">Go!&lt;/button>
                &lt;/span>
                &lt;/bs-input>
            </doc-code>
            <bs-input label="With icon and text" type="number" placeholder="Insert how much cost your house">
                <span slot="before" class="input-group-addon"><span class="glyphicon glyphicon-home"></span></span>
                <span slot="after" class="input-group-addon">$</span>
            </bs-input>
            <doc-code>
                &lt;bs-input label="With icon and text" type="number" placeholder="Insert how much cost your house">
                &lt;span slot="before" class="input-group-addon">&lt;span class="glyphicon glyphicon-home">&lt;/span>&lt;/span>
                &lt;span slot="after" class="input-group-addon">$&lt;/span>
                &lt;/bs-input>
            </doc-code>
            <bs-input label="With datalist (new on html5)" type="text" placeholder="Insert a fruit"
                      :datalist="fruits"></bs-input>
            <doc-code>
                &lt;bs-input label="With datalist" type="text" placeholder="Insert a fruit" :datalist="fruits">
                &lt;/bs-input>
            </doc-code>
        </div>
        <doc-table>
            <div>
                <p>cssClass</p>
                <p><code>String</code></p>
                <p><code>custom css class name</code></p>
                <p>spc Added: Adds a custom CSS class to outside of this control.</p>
            </div>
            <div>
                <p>value</p>
                <p><code>String</code></p>
                <p><code>''</code></p>
                <p>Input value. Use <code>v-model="value"</code></p>
            </div>
            <div>
                <p>datalist</p>
                <p><code>Array</code></p>
                <p><code>null</code></p>
                <p>
                    A list of predefined values that you can select. Work closer to an autocomplete. The items must be
                    <code>String</code> values.
                </p>
            </div>
            <div>
                <p>disabled</p>
                <p><code>Boolean</code></p>
                <p><code>false</code></p>
                <p></p>
            </div>
            <div>
                <p>enterSubmit</p>
                <p><code>Boolean</code></p>
                <p><code>false</code></p>
                <p>Submit when you press <code>Enter</code>. Not supported on type <code>textarea</code>.</p>
            </div>
            <div>
                <p>error</p>
                <p><code>String</code></p>
                <p><code>null</code></p>
                <p>Error message.</p>
            </div>
            <div>
                <p>groupAddon</p>
                <p><code>String</code></p>
                <p></p>
                <p>Creates a BootStrap 3 Group-add-on tag and places text in it</p>
            </div>
            <div>
                <p>groupFaIcon</p>
                <p><code>String</code></p>
                <p></p>
                <p>CSS for a font-awesome icon.</p>
            </div>
            <div>
                <p>help</p>
                <p><code>String</code></p>
                <p><code>null</code></p>
                <p>Help text behind the input</p>
            </div>
            <div>
                <p>hide-help</p>
                <p><code>Boolean</code></p>
                <p><code>true</code></p>
                <p>Only work with help and error.<br/>Hide the help if have to show any error message.</p>
            </div>
            <div>
                <p>icon</p>
                <p><code>Boolean</code></p>
                <p><code>false</code></p>
                <p></p>
            </div>
            <div>
                <p>label</p>
                <p><code>String</code></p>
                <p><code>null</code></p>
                <p>Enable input label (name).</p>
            </div>
            <div>
                <p>lang</p>
                <p><code>String</code></p>
                <p>Browser language</p>
                <p><abbr title="ISO 639-1 code"><a
                        href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">Language</a></abbr>. Default <code>en</code>
                    if the translation doesn't exist.</p>
            </div>
            <div>
                <p>mask</p>
                <p><code>Function</code></p>
                <p><code>null</code></p>
                <p>Mask function that receive and edit the value.</p>
            </div>
            <div>
                <p>mask-delay</p>
                <p><code>Number</code></p>
                <p><code>100</code></p>
                <p>Delay time before apply the mask.</p>
            </div>
            <div>
                <p>match</p>
                <p><code>String</code></p>
                <p><code>''</code></p>
                <p>Matching value. Both have to be the same value.</p>
            </div>
            <div>
                <p>maxlength</p>
                <p><code>Number</code></p>
                <p><code>null</code></p>
                <p></p>
            </div>
            <div>
                <p>minlength</p>
                <p><code>Number</code></p>
                <p><code>0</code></p>
                <p></p>
            </div>
            <div>
                <p>name</p>
                <p><code>String</code></p>
                <p><code>null</code></p>
                <p></p>
            </div>
            <div>
                <p>pattern</p>
                <p><code>String</code>, <code>RegExp</code> or <code>Function</code></p>
                <p><code>null</code></p>
                <p>Validation pattern. A full <a
                        href="https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions"
                        target="_blank">regular expression</a> or a function that evaluate the content and return <code>true</code>
                    or <code>false</code>.</p>
            </div>
            <div>
                <p>placeholder</p>
                <p><code>String</code></p>
                <p><code>null</code></p>
                <p></p>
            </div>
            <div>
                <p>required</p>
                <p><code>Boolean</code></p>
                <p><code>false</code></p>
                <p></p>
            </div>
            <div>
                <p>type</p>
                <p><code>String</code></p>
                <p><code>text</code></p>
                <p></p>
            </div>
            <div>
                <p>url</p>
                <p><code>String</code></p>
                <p><code>null</code></p>
                <p>url for a datalist.</p>
            </div>
            <div>
                <p>url-map</p>
                <p><code>Function</code></p>
                <p><code>null</code></p>
                <p>A map function that handle the data receibed from the url.</p>
            </div>
            <div>
                <p>validation-delay</p>
                <p><code>Number</code></p>
                <p><code>250</code></p>
                <p>Delay time before apply the validation.</p>
            </div>
            <div>
                <p>setValidState</p>
                <p><code>Boolean or null</code></p>
                <p></p>
                <p>Method: Progamatically overide the valid flag by setting the has-feedback flags to true/false. <code>null</code> clears the has-feedback flag until next validation event.</p>
            </div>
        </doc-table>
        <doc-table type="Events">
            <div>
                <p>submit_key_pressed</p>
                <p>(<code></code>)</p>
                <p>Listen to enter key presses if the enterSubmit property is true and the control is valid.</p>
            </div>
        </doc-table>
        <doc-table type="Notes">
            <div>
                <p>cssClass</p>
                <p>Added cssClass property to take a string of custom css styling class names</p>
            </div>
            <div>
                <p>setValidState</p>
                <p>Added setValidState method - allows the developer to programatically overide the bootstrap validation styling</p>
            </div>
            <div>
                <p>submit_key_pressed</p>
                <p>Added submit_key_pressed event - allows the developer to listen to enter key presses if the enterSubmit property is true and the control is valid</p>
            </div>

        </doc-table>

        <doc-table name="Supported Native Validator" :headers="['Name','Description']">
            <div>
                <p>type</p>
                <p>Use native validation with <code>url</code> and <code>email</code>.</p>
            </div>
            <div>
                <p>min&nbsp;/&nbsp;max&nbsp;/&nbsp;step</p>
                <p>That attributes handle the values supported.
                    Work with the following input types: <code>number</code>, <code>range</code>, <code>date</code>,
                    <code>datetime-local</code>, <code>month</code>, <code>time</code> and <code>week</code>.</p>
            </div>
        </doc-table>
        That validations only work in browsers that support <a
            href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Data_form_validation" target="_blank">HTML5
        form validations (all modern browsers support it).</a>
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

    export default {
        components: {
            docSection,
            docTable,
            docCode,
            bsInput,
            ButtonGroup,
            Checkbox,
            Dropdown
        },
        data() {
            return {
                check: {
                    clearButton: true,
                    error: true,
                    hideHelp: true,
                    icon: true,
                    label: true,
                    mask: false,
                    minlength: true,
                    placeholder: true,
                    required: true
                },
                event: null,
                fruits: ['apple', 'avocado', 'banana', 'cherry', 'coconut', 'grapefruit', 'kiwi', 'lime', 'orange', 'quince', 'strawberry', 'watermelon'],
                input: null,
                match: null,
                debug: true,
                groupAddon: null,
                groupFaTag: null,
                textarea: null,
                validateManually: false
            }
        },
        methods: {
            mask(value) {
                return value.toLowerCase().replace(/^[^a-z]+/, '').replace(/[^a-z0-9]/g, '')
            },
            testSetInvalid() {
                var input = this.$refs['txtUserName'];
                input.setValidState(false);
                console.log(' input.setValidState(false);');

                var input = this.$refs['with-slots'];
                input.setValidState(false);
                console.log(' input.setValidState(false);');


            },
            testSetValid() {
                var input = this.$refs['txtUserName'];
                input.setValidState(true);
                console.log('input.setValidState(true);');

                var input = this.$refs['with-slots'];
                input.setValidState(true);
                console.log(' input.setValidState(false);');
            },
            clearValid() {
                var input = this.$refs['txtUserName'];
                input.setValidState(null);
                console.log('clearValid');

                var input = this.$refs['with-slots'];
                input.setValidState(null);
                console.log(' input.setValidState(false);');
            },
            submitKeyPressed: function(e) {
                console.log('submit_key_pressed:', e);

            }
        }
    }
</script>
