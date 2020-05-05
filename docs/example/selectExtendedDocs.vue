<!--suppress CheckTagEmptyBody -->
<template>
    <doc-section id="selectExtended" name="Select Extended">
        <h4>SPC Select control to minick some of the validation and Look and Feel of other controls. Make this control
            look less out of place from UI standpoint.</h4>
        <p>Based in a <a target="_blank" href="https://silviomoreto.github.io/bootstrap-select/">bootstrap-select-extended</a>
            implementation.</p>
        <div class="bs-example">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <p>
                    <pre>Normal select data: {{select.normal}}</pre>
                    </p>
                    <form action="./#select" method="get">
                        <v-select ref="txtNormalSelectData"
                                  :options="select.options" options-value="val" v-model="select.normal" name="animal"
                                  :search="select.search"
                                  :required="select.required" :clear-button="select.clearButton"
                                  :disabled="select.disabled"
                                  help="Pick an item from the list (this isn't hard)"
                                  placeholder="-- SELECT ONE --"
                                  :group-addon="select.groupAddon"
                                  :group-fa-icon="select.groupFaTag"
                                  cssClass="test1 test2"
                                  group-fa-icon="fab fa-vuejs"
                                  control-id="xxx1"
                                  :enable-feedback="select.enableFeedBack"
                                  :error="select.errorText"
                                  :enable-dropdown-auto-alignment="select.enableDropDownAutoAlignment"
                        ></v-select>
                        <button type="submit" class="btn btn-default">Submit</button>
                        <p>
                            <checkbox v-model="select.enableDropDownAutoAlignment">Enable Dropdown Auto Alignment</checkbox>
                        </p>
                        <p>
                            <checkbox v-model="select.enableFeedBack">Enable Feedback</checkbox>
                        </p>
                    </form>
                    <br/>
                    <p>
                    <pre>Normal select w/label: {{select.normal}}</pre>
                    </p>
                    <form action="./#select" method="get">
                        <v-select ref="txtNormalSelectData2"
                                  :options="select.options" options-value="val" v-model="select.normal" name="animal"
                                  :search="select.search"
                                  :required="select.required" :clear-button="select.clearButton"
                                  :disabled="select.disabled"
                                  :readonly="select.readonly"
                                  help="Pick an item from the list (this isn't hard)"
                                  placeholder="-- SELECT ONE --"
                                  cssClass="test1 test2"
                                  group-fa-icon="fab fa-vuejs"
                                  control-id="xxx1"
                                  :error="select.errorText"
                                  :enable-feedback="select.enableFeedBack"
                                  label="This is my label"
                                  minWidth="300px"
                                  :enable-dropdown-auto-alignment="select.enableDropDownAutoAlignment"
                        ></v-select>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <p>
                    <pre>Multiple select data : {{select.multiple.join(',')}}</pre>
                    </p>
                    <form action="./#select" method="get">
                        <v-select :options="select.options" options-value="val" v-model="select.multiple"
                                  name="animals[]" :search="select.search"
                                  multiple
                                  :required="select.required"
                                  :clear-button="select.clearButton"
                                  :placeholder="select.placeholder?'Using placeholder':null"
                                  :close-on-select="select.closeOnSelect" :limit="select.limit?3:1024"
                                  :group-addon="select.groupAddon"
                                  :group-fa-icon="select.groupFaTag"
                                  :disabled="select.disabled"
                                  :enable-feedback="select.enableFeedBack"
                                  :enable-dropdown-auto-alignment="select.enableDropDownAutoAlignment"

                        ></v-select>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                </div>
            </div>
            <br/>
            <div>
                <h3>Slot Test</h3>
                <form action="./#select" method="get">
                    <v-select ref="txtNormalSelectData2"
                              :options="select.options" options-value="val" v-model="select.normal" name="animal"
                              :search="select.search"
                              :required="select.required" :clear-button="select.clearButton"
                              :disabled="select.disabled"
                              help="Pick an item from the list (this isn't hard)"
                              placeholder="-- SELECT ONE --"
                              :group-addon="select.groupAddon"
                              :group-fa-icon="select.groupFaTag"
                              cssClass="test1 test2"
                              group-fa-icon="fab fa-vuejs"
                              control-id="xxx1"
                              :error="select.errorText"
                              :enable-dropdown-auto-alignment="select.enableDropDownAutoAlignment"
                    >
                         <span slot="before" class="input-group-btn">
                            B4
                         </span>
                        <span slot="after" class="input-group-btn">
                           <button type="button" class="btn btn-primary">GO!</button>
                        </span>
                    </v-select>
                    <button type="submit" class="btn btn-default">Submit</button>
                    <p>
                        <checkbox v-model="select.enableDropDownAutoAlignment">Enable Dropdown Auto Alignment</checkbox>
                    </p>
                </form>
            </div>
            <button-group type="primary" :buttons="false">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <p>
                            <label>Group Addon Tag:</label>
                            <input v-model="select.groupAddon"></input>
                        </p>
                        <p>
                            <label>FA Tag:</label>
                            <input v-model="select.groupFaTag"></input>
                        </p>
                        <p>
                            <checkbox v-model="select.disabled">Disabled</checkbox>
                        </p>
                        <p>
                            <checkbox v-model="select.readonly">Read Only</checkbox>
                        </p>
                        <p>
                            <checkbox v-model="select.placeholder">Placeholder</checkbox>
                        </p>
                        <p>
                            <checkbox v-model="select.search">Search</checkbox>
                        </p>
                        <p>
                            <checkbox v-model="select.clearButton">Clear Button</checkbox>
                        </p>
                        <button @click="testSetInvalid()" class="btn btn-danger">Set Invalid</button>
                        <button @click="testSetValid()" class="btn btn-success">Set Valid</button>
                        <button @click="clearValid()" class="btn btn-default">Clear Valid</button>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <p>
                            <checkbox v-model="select.required">Required (empty value if noting selected)</checkbox>
                        </p>
                        <p>
                            Multiple:
                            <checkbox v-if="select.multiple" v-model="select.limit">Limit (e.g. 3)</checkbox>
                            <checkbox v-if="select.multiple" v-model="select.closeOnSelect">Close on Select</checkbox>
                        </p>
                    </div>
                </div>
            </button-group>
            <doc-code>
                &lt;form action="./#select" method="get">
                &lt;v-select v-model="select.value" :options="select.options" options-value="val"
                multiple name="animals[]" limit="3"
                placeholder="Using placeholder"
                search justified required disabled
                clear-button close-on-select
                >&lt;/v-select>
                &lt;button type="submit" class="btn btn-default">Submit form&lt;/button>
                &lt;/form>
            </doc-code>
            <doc-code language="javascript">
                options: [
                {val: 0, label: 'Cat'},
                {val: 1, label: 'Cow'},
                {val: 2, label: 'Dog'},
                {val: 3, label: 'Elephant'},
                {val: 4, label: 'Fish'},
                {val: 5, label: 'Lion'},
                {val: 6, label: 'Tiger'},
                {val: 7, label: 'Turtle'}
                ]
            </doc-code>
            <h4>Select with option component:</h4>
            <p>
            <pre>Selected data : {{single}}</pre>
            </p>
            <v-select v-model="single">
                <v-option value="apple">Apple</v-option>
                <v-option value="banana">Banana</v-option>
                <v-option value="cherry">Cherry</v-option>
                <v-option value="orange">Orange</v-option>
                <v-option value="grape">Grape</v-option>
            </v-select>
            <doc-code>
                &lt;v-select>
                &lt;v-option value="apple">Apple&lt;/v-option>
                &lt;v-option value="banana">Banana&lt;/v-option>
                &lt;v-option value="cherry">Cherry&lt;/v-option>
                &lt;v-option value="orange">Orange&lt;/v-option>
                &lt;v-option value="grape">Grape&lt;/v-option>
                &lt;/v-select>
            </doc-code>
            <hr/>
            <h4>Use button-group (component or <a href="http://getbootstrap.com/components/#btn-groups-justified">bootstrap
                element</a>) if you want to justify.</h4>
            <button-group justified>
                <v-select multiple clear-button>
                    <v-option value="apple">Apple</v-option>
                    <v-option value="banana">Banana</v-option>
                    <v-option value="cherry">Cherry</v-option>
                    <v-option value="cranberry">Cranberry</v-option>
                    <v-option value="grape">Grape</v-option>
                    <v-option value="orange">Orange</v-option>
                    <v-option value="passionfruit">Passionfruit</v-option>
                    <v-option value="pineapple">Pineapple</v-option>
                    <v-option value="strawberry">Strawberry</v-option>
                    <v-option value="a">Apple</v-option>
                    <v-option value="b">Banana</v-option>
                    <v-option value="c">Cherry</v-option>
                    <v-option value="c">Cranberry</v-option>
                    <v-option value="g">Grape</v-option>
                    <v-option value="o">Orange</v-option>
                    <v-option value="p">Passionfruit</v-option>
                    <v-option value="p">Pineapple</v-option>
                    <v-option value="s">Strawberry</v-option>
                </v-select>
            </button-group>
            <doc-code>
                &lt;button-group justified>&lt;select>...&lt;/select>&lt;/button-group>
                // or
                &lt;div class="btn-group btn-group-justified">&lt;select>...&lt;/select>&lt;/div>
            </doc-code>
            <hr/>
            <h4>Ajax data and parent dependency:</h4>
            <p>Depend on <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">vue-resource</a>. Disabled if
                not present.</p>
            <p>The second select has inheritance, is enabled when the first get some value and the ajax return
                values.</p>
            <v-select url="docs/data.json" options-label="text" v-model="ajax.value" clear-button
                      @options="ajax.options = arguments[0]"></v-select>
            <v-select url="docs/data.json" options-label="text" multiple :parent="ajax.value"></v-select>
            <doc-code>
                &lt;v-select url="docs/data.json" options-label="text" v-model="ajax.value" clear-button
                @options="ajax.options = arguments[0]">&lt;/v-select>
                &lt;v-select url="docs/data.json" options-label="text" multiple :parent="ajax.value">&lt;/v-select>
            </doc-code>
            <p>Ajax response:</p>
            <pre v-html="ajax.options"></pre>
        </div>
        <doc-table name="Other">
            <div>
                <p>enableDropdownAutoAlignment</p>
                <p><code>Boolean</code></p>
                <p><code>false</code></p>
                <p>If true the drop down will be set to left:auto to allign with the group add-on</p>
            </div>
            <div>
                <p>min-search</p>
                <p><code>Number</code></p>
                <p><code>0</code></p>
                <p>If defined, the searchbox is disabled if are less than the minimum value you set.</p>
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
                <p>options-label</p>
                <p><code>String</code></p>
                <p><code>label</code></p>
                <p>Define the value in the data used as label.</p>
            </div>
            <div>
                <p>options-value</p>
                <p><code>String</code></p>
                <p><code>value</code></p>
                <p>Define the value in the data used as value.</p>
            </div>
            <div>
                <p>placeholder</p>
                <p><code>String</code></p>
                <p>
                    Nothing Selected</p>
                <p>
                    Value displayed in drop down when no value has been chosen by the user.
                </p>
            </div>
            <div>
                <p>search-text</p>
                <p><code>String</code></p>
                <p></p>
                <p></p>
            </div>
            <div>
                <p>groupAddon</p>
                <p>String</p>
                <p></p>
                <p>Render a group-addon bootstrap tag... Text value to place in tag</p>
            </div>
            <div>
                <p>groupFaIcon</p>
                <p>String</p>
                <p></p>
                <p>render a font awesome tag (if installed in CSS) place FA tag here. Renders as part of the group-addon
                    tag</p>
            </div>
            <div>
                <p>groupFaIcon</p>
                <p>String</p>
                <p></p>
                <p>render a font awesome tag (if installed in CSS) place FA tag here. Renders as part of the group-addon
                    tag</p>
            </div>
            <div>
                <p>cssClass</p>
                <p><code>String</code></p>
                <p><code>custom css class name</code></p>
                <p>spc Added: Adds a custom CSS class to outside of this control.</p>
            </div>
            <div>
                <p>controlId</p>
                <p>String</p>
                <p></p>
                <p>Create a dom id for this control</p>
            </div>
            <div>
                <p>setValidState</p>
                <p><code>Boolean or null</code></p>
                <p></p>
                <p>Method: Programmatically override the valid flag by setting the has-feedback flags to true/false. <code>null</code> clears the has-feedback flag until next validation event.</p>
            </div>
        </doc-table>
        <doc-table type="Events">
            <div>
                <p>change</p>
                <p>(<code>value</code>)</p>
                <p>Return the selected value(s).</p>
            </div>
            <div>
                <p>options</p>
                <p>(<code>options:Array</code>)</p>
                <p>Return the options array. Helpfull for dinamic/url options.</p>
            </div>
            <div>
                <p>selected</p>
                <p>(<code>labels:String</code>)</p>
                <p>Return a string with the label(s) of the selected item(s).</p>
            </div>
        </doc-table>
        <doc-table  type="Notes" :headers="['Name','Description']">
            <div>
                <p>cssClass</p>
                <p>Added cssClass property to take a string of custom css styling class names.</p>
            </div>
            <div>
                <p>setValidState</p>
                <p>Added setValidState method - allows the developer to programmatically override the bootstrap validation styling</p>
            </div>
            <div>
                <p>Add Bootstrap has-feedback support</p>
                <p>Try to match styling of input box and add has feedback support.</p>
            </div>
            <div>
                <p>Add help support</p>
                <p>Try to match styling of input box and add has feedback support.</p>
            </div>
        </doc-table>
    </doc-section>
</template>

<script>
    import docSection from './utils/docSection.vue'
    import docTable from './utils/docTable.js'
    import docCode from './utils/docCode.js'
    import ButtonGroup from 'src/buttonGroup.vue'
    import checkbox from 'src/Checkbox.vue'
    import vSelect from 'src/SelectExtended.vue'
    import vOption from 'src/Option.vue'

    export default {
        components: {
            docSection,
            docTable,
            docCode,
            ButtonGroup,
            checkbox,
            vSelect,
            vOption
        },
        data() {
            return {
                select: {
                    enableFeedBack: true,
                    clearButton: false,
                    closeOnSelect: false,
                    disabled: false,
                    readonly: false,
                    justified: true,
                    limit: false,
                    enableDropDownAutoAlignment: false,
                    multiple: [],
                    options: [
                        {val: 0, label: 'Cat'},
                        {val: 1, label: 'Cow'},
                        {val: 2, label: 'Dog'},
                        {val: 3, label: 'Elephant'},
                        {val: 4, label: 'Fish'},
                        {val: 5, label: 'Lion'},
                        {val: 6, label: 'Tiger'},
                        {val: 7, label: 'Turtle'}
                    ],
                    placeholder: false,
                    required: false,
                    search: true,
                    groupAddon: 'Field Label',
                    groupFaTag: null,
                    errorText: 'It is broken'
                },
                ajax: {
                    options: [],
                    value: null
                },
                single: []
            }
        },
        methods: {
            testSetInvalid() {
                var input = this.$refs['txtNormalSelectData'];
                input.setValidState(false);
                var input2 = this.$refs['txtNormalSelectData2'];
                input2.setValidState(false);
                console.log('set invalid state');
            },
            testSetValid() {
                var input = this.$refs['txtNormalSelectData'];
                input.setValidState(true);
                var input2 = this.$refs['txtNormalSelectData2'];
                input2.setValidState(true);
                console.log('set invalid state');
            },
            clearValid() {
                debugger;
                var input = this.$refs['txtNormalSelectData'];
                input.setValidState(null);
                var input2 = this.$refs['txtNormalSelectData2'];
                input2.setValidState(null);
                console.log('set invalid state');
            }
        }
    }
</script>

<style>
    .checkbox > label:not(:first-child) {
        margin-left: 15px;
    }


</style>
