<template>
    <div :class="['form-group',{validate:canValidate,'has-feedback':icon,'has-error':canValidate&&valid===false,'has-success':canValidate&&valid}]">
        <label v-if="label" class="control-label">{{label}}</label>
        <div class="datepicker" :class="['input-group', cssClass]">
            <span v-if="groupAddon" class="input-group-addon">
              <i v-if="groupFaIcon" :class="groupFaIcon" style="margin-right: 3px"></i>
              {{groupAddon}}
            </span>
            <input class="form-control datepicker-input" type="text"
                   v-model="val"
                   :class="{'with-reset-button': clearButton}"
                   :placeholder="placeholder"
                   :style="{width:width}"
                   @click="inputClick"
                   @focus="onFocus"
                   @keyup="onKeyup"
            />
            <span :class="['form-control-feedback dropdown-glyph glyphicon datepicker-feedback-glyph',{'glyphicon-ok':canValidate&&valid, 'glyphicon-remove': canValidate&&valid ===false}]"
                  aria-hidden='true'></span>
            <button v-if="clearButton&&val" type="button" class="close" @click="val = ''">
                <span>&times;</span>
            </button>
            <div class="datepicker-popup" v-show="displayDayView">
                <div class="datepicker-inner">
                    <div class="datepicker-body">
                        <div class="datepicker-ctrl">
                            <span :class="preBtnClasses" aria-hidden="true" @click="preNextMonthClick(0)"></span>
                            <span :class="nextBtnClasses" aria-hidden="true" @click="preNextMonthClick(1)"></span>
                            <p @click="switchMonthView">{{stringifyDayHeader(currDate)}}</p>
                        </div>
                        <div class="datepicker-weekRange">
                            <span v-for="w in text.daysOfWeek">{{w}}</span>
                        </div>
                        <div class="datepicker-dateRange">
                            <span v-for="d in dateRange" :class="d.sclass" @click="daySelect(d)">{{d.text}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="datepicker-popup" v-show="displayMonthView">
                <div class="datepicker-inner">
                    <div class="datepicker-body">
                        <div class="datepicker-ctrl">
                            <span :class="preBtnClasses" aria-hidden="true" @click="preNextYearClick(0)"></span>
                            <span :class="nextBtnClasses" aria-hidden="true" @click="preNextYearClick(1)"></span>
                            <p @click="switchDecadeView">{{stringifyYearHeader(currDate)}}</p>
                        </div>
                        <div class="datepicker-monthRange">
                            <template v-for="(m, index) in text.months">
                <span v-text="m.substr(0,3)"
                      :class="{'datepicker-dateRange-item-active':
                    (text.months[parse(val).getMonth()] === m) &&
                    currDate.getFullYear() === parse(val).getFullYear()}"
                      @click="monthSelect(index)"
                ></span>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="datepicker-popup" v-show="displayYearView">
                <div class="datepicker-inner">
                    <div class="datepicker-body">
                        <div class="datepicker-ctrl">
                            <span :class="preBtnClasses" aria-hidden="true" @click="preNextDecadeClick(0)"></span>
                            <span :class="nextBtnClasses" aria-hidden="true" @click="preNextDecadeClick(1)"></span>
                            <p>{{stringifyDecadeHeader(currDate)}}</p>
                        </div>
                        <div class="datepicker-monthRange decadeRange">
                            <template v-for="decade in decadeRange">
                <span :class="{'datepicker-dateRange-item-active':parse(val).getFullYear() === decade.text}"
                      v-text="decade.text"
                      @click.stop="yearSelect(decade.text)"
                ></span>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showHelp" class="help-block" @click="focus">{{help}}</div>
        <div v-if="showError" class="help-block with-errors" @click="focus">{{errorText}}</div>
        <p>D: {{currDate}}</p>
    </div>
</template>

<script>
    import {translations} from './utils/utils.js'
    // import $ from './utils/NodeList.js'

    export default {
        props: {
            value: {type: String},
            format: {default: 'MM/dd/yyyy'},
            disabledDaysOfWeek: {
                type: Array, default() {
                    return []
                }
            },
            width: {type: String},
            clearButton: {type: Boolean, default: false},
            lang: {type: String, default: typeof navigator !== 'undefined' ? navigator.language : "zh-CN"},
            placeholder: {type: String},
            iconsFont: {type: String, default: 'glyphicon'},
            icon: {type: Boolean, default: false},
            label: {type: String, default: null},
            cssClass: {type: String, default: null},
            groupAddon: {type: String, default: null},
            groupFaIcon: {type: String, default: null},
            error: {type: String, default: null},
            help: {type: String, default: null},
            hideHelp: {type: Boolean, default: true},
            required: {type: Boolean, default: null},
            openOnFocus: {type: Boolean, default: false},
            validationDelay: {type: Number, default: 250},
            formatDelay: {type: Number, default: 250},
            month: {type: String, default:''},
            day: {type: String, default: ''},
            year: {type: String, default: ''}
        },
        data() {
            return {
                currDate: new Date(),
                dateRange: [],
                decadeRange: [],
                displayDayView: false,
                displayMonthView: false,
                displayYearView: false,
                val: this.value,
                valid: null,
                displayValidationErrorMessage: false
            }
        },
        watch: {
            currDate() {
                this.getDateRange();
            },
            format() {
                this.val = this.stringify(this.currDate);
            },
            val(val, old) {
                this.$emit('input', val);
                if (val !== old) {
                    this.eval();
                }
            },
            valid(val, old) {
                this.$emit('isvalid', val);
                this.$emit(!val ? 'invalid' : 'valid');
                if (this._parent) this._parent.validate()
            },
            value(val) {
                console.log('value', val);
                if (this.val !== val) {
                    this.val = val;
                }
            }
        },
        computed: {
            canValidate() {
                return true
            },
            text() {
                return translations(this.lang)
            },
            preBtnClasses() {
                return `datepicker-preBtn ${this.iconsFont} ${this.iconsFont}-chevron-left`
            },
            nextBtnClasses() {
                return `datepicker-nextBtn ${this.iconsFont} ${this.iconsFont}-chevron-right`
            },
            disabledDaysArray() {
                return this.disabledDaysOfWeek.map(d => parseInt(d, 10))
            },
            showError() {
                return this.error && this.valid === false
            },
            showHelp() {
                return this.help && (!this.showError || !this.hideHelp)
            },
            errorText() {
                var value = this.value;
                var error = [this.error];
                if (!value && this.required) error.push('(' + this.text.required.toLowerCase() + ')');
                if (!this.displayValidationErrorMessage && this.format) error.push('( Check Date: ' + this.format + ')');
                return error.join(' ');
            }
        },
        methods: {
            extractDateParts: function (value) {
                var format = this.format;
                var pos;
                var valuePieces;
                var month;
                var year;
                var day;
                var dateString = "";
                var date = null;
                var valid = true;

                if (format.indexOf('-') > -1) {
                    //dash format
                    pos = format.split('-');
                } else {
                    pos = format.split('/');
                }

                if (value.indexOf('-') > -1) {
                    //dash format
                    valuePieces = value.split('-');
                } else {
                    valuePieces = value.split('/');
                }

                if (valuePieces.length < 3) {
                    return false;
                }
                var checkPosition = function (index, pos, valuePieces) {

                    switch (pos[index]) {
                        case "MM":
                            month = index;
                            if (valuePieces[index].length != 2) {
                                return false;
                            }

                            if (isNaN(valuePieces[index])) {
                                return false;
                            }

                            if (parseInt(valuePieces[index]) < 1 && parseInt(valuePieces[index]) > 12) {
                                return false;
                            }
                            month = parseInt(valuePieces[index]);
                            break;
                        case "dd":
                            if (valuePieces[index].length != 2) {
                                return false;
                            }
                            if (isNaN(valuePieces[index])) {
                                return false;
                            }
                            day = parseInt(valuePieces[index]);
                            break;
                        case "yy":
                            year = index;
                            if (valuePieces[index].length != 2) {
                                return false;
                            }

                            if (isNaN(valuePieces[index])) {
                                return false;
                            }

                            if (parseInt(valuePieces[index]) < 0 && parseInt(valuePieces[index]) > 99) {
                                return false;
                            }
                            year = parseInt(valuePieces[index]);
                        case "yyyy":
                            year = index;
                            if (valuePieces[index].length != 4) {
                                return false;
                            }

                            if (isNaN(valuePieces[index])) {
                                return false;
                            }

                            if (parseInt(valuePieces[index]) < 0 && parseInt(valuePieces[index]) > 9999) {
                                return false;
                            }
                            year = parseInt(valuePieces[index]);
                            break;
                    }
                    return true;
                };

                if (!checkPosition(0,pos,valuePieces)) {
                    valid = false;
                }
                if (!checkPosition(1,pos,valuePieces)) {
                    valid = false;
                }

                if (!checkPosition(2,pos,valuePieces)) {
                    valid = false;
                }

                if (valid) {
                    var daysInMonth = function (month, year) {
                        return new Date(year, month, 0).getDate();
                    };

                    var days = daysInMonth(month, year);
                    if (day > days || day < 1) {
                        valid = false;
                    }
                }

                if (valid) {
                    //make a good date and deal with local time malfunction.
                    //console.log(year, month , day);
                    date =  new Date(Date.UTC(year, parseInt(month) - 1 , day,0,0,0));
                    //console.log('create date-> ', date);
                }
                return {month: month, year: year, day: day, valid: valid, date: date};
            },
            validate() {
                var valid = true;
                if (!this.canValidate) {
                    return true;
                }

                var value = (this.val || '').trim();
                if (!value) {
                    return !this.required;
                }

                console.log('validate -> ready to parse', value);
                var outD = this.extractDateParts(value);
                console.log('validate -> after test', outD);
                return outD.valid;
            },
            onKeyup(e) {
                if (this._timeout.onKeyUp) clearTimeout(this._timeout.onKeyUp);
                console.log('keyUp',e);
                if (e.key == "Escape") {
                    this.val = '';
                    this.eval();
                    return;
                }
                this._timeout.onKeyUp = setTimeout(() => {
                    console.log('timeout.onKeyUp');
                    this.formatValue();
                    this.eval();
                    this._timeout.onKeyUp = null
                }, this.formatDelay)

            },
            formatValue() {
                console.log('formatValue');
                var val = this.val;
                var format = this.format;

                if (!val) {
                    return;
                }

                if (val.length != format.length - 2) {
                    return;
                }

                var pos;
                var valuePieces;
                var delimChar;
                if (format.indexOf('-') > -1) {
                    //dash format
                    pos = format.split('-');
                    delimChar = '-';
                } else {
                    pos = format.split('/');
                    delimChar = '/';
                }

                val = val.replace(/[^0-9]/g,'');
                val = val.trim();

                if (val) {
                    val = val.slice(0, pos[0].length) + delimChar + val.slice(pos[0].length);
                    val = val.slice(0, pos[0].length + 1 + pos[1].length, pos[1].length) + delimChar + val.slice(pos[0].length + 1 + pos[1].length);
                }
                this.val = val;
                this.eval();
                this.close();
            },
            close() {
                console.log('close');
                this.displayDayView = this.displayMonthView = this.displayYearView = false;
            },
            eval() {
                console.log('eval');
                if (this._timeout.eval) clearTimeout(this._timeout.eval);
                if (!this.canValidate) {
                    this.valid = true
                } else {
                    this._timeout.eval = setTimeout(() => {
                        this.valid = this.validate();
                        this._timeout.eval = null
                    }, this.validationDelay)
                }
            },
            focus() {
                this.input.focus()
            },
            onFocus() {
                if (this.openOnFocus) {
                    this.inputClick();
                }
            },
            inputClick() {
                console.log('inputClick -> start', this.val);
                if (!this.val) {
                    this.val = '';
                    this.currDate = new Date();
                } else {
                    var outD = this.extractDateParts(this.val);
                    if (outD.valid) {
                        this.currDate = outD.date;
                    } else {
                        this.currDate = new Date();
                    }
                    console.log('inputClick -> currdate after parse', outD, this.currDate );
                }
                //this.currDate = this.parse(this.val) || this.parse(new Date());
                console.log('inputClick -> currdate after parse', this.currDate);
                if (this.displayMonthView || this.displayYearView) {
                    this.displayDayView = false;
                } else {
                    this.displayDayView = !this.displayDayView;
                }
            },
            preNextDecadeClick(flag) {
                const year = this.currDate.getFullYear();
                const months = this.currDate.getMonth();
                const date = this.currDate.getDate();

                if (flag === 0) {
                    this.currDate = new Date(year - 10, months, date);
                } else {
                    this.currDate = new Date(year + 10, months, date);
                }
            },
            preNextMonthClick(flag) {
                const year = this.currDate.getFullYear();
                const month = this.currDate.getMonth();
                const date = this.currDate.getDate();

                if (flag === 0) {
                    const preMonth = this.getYearMonth(year, month - 1);
                    this.currDate = new Date(preMonth.year, preMonth.month, date);
                } else {
                    const nextMonth = this.getYearMonth(year, month + 1);
                    this.currDate = new Date(nextMonth.year, nextMonth.month, date);
                }
            },
            preNextYearClick(flag) {
                const year = this.currDate.getFullYear();
                const months = this.currDate.getMonth();
                const date = this.currDate.getDate();

                if (flag === 0) {
                    this.currDate = new Date(year - 1, months, date);
                } else {
                    this.currDate = new Date(year + 1, months, date);
                }
            },
            yearSelect(year) {
                this.displayYearView = false;
                this.displayMonthView = true;
                this.currDate = new Date(year, this.currDate.getMonth(), this.currDate.getDate());
            },
            daySelect(day) {
                if (day.sclass === 'datepicker-item-disable') {
                    return false;
                } else {
                    this.currDate = day.date;
                    this.val = this.stringify(this.currDate);
                    this.displayDayView = false;
                }
            },
            switchMonthView() {
                this.displayDayView = false;
                this.displayMonthView = true;
            },
            switchDecadeView() {
                this.displayMonthView = false;
                this.displayYearView = true;
            },
            monthSelect(index) {
                this.displayMonthView = false;
                this.displayDayView = true;
                this.currDate = new Date(this.currDate.getFullYear(), index, this.currDate.getDate())
            },
            getYearMonth(year, month) {
                if (month > 11) {
                    year++;
                    month = 0;
                } else if (month < 0) {
                    year--;
                    month = 11;
                }
                return {year: year, month: month}
            },
            getDateParts(date) {
                  var valStrings = {
                      fullYear: date.getFullYear().toString()
                  }
            },
            stringifyDecadeHeader(date) {
                const yearStr = date.getFullYear().toString();
                const firstYearOfDecade = yearStr.substring(0, yearStr.length - 1) + 0;
                const lastYearOfDecade = parseInt(firstYearOfDecade, 10) + 10;
                return firstYearOfDecade + '-' + lastYearOfDecade;
            },
            stringifyDayHeader(date) {
                return this.text.months[date.getMonth()] + ' ' + date.getFullYear();
            },
            parseMonth(date) {
                return this.text.months[date.getMonth()];
            },
            stringifyYearHeader(date) {
                return date.getFullYear();
            },
            stringify(date, format = this.format) {
                throw new Exception("bah don't use stringify");
                console.log('stringify', date, format);
                if (!date) date = this.parse();
                if (!date) return '';
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const monthName = this.parseMonth(date);
                var fmt = format
                    .replace(/yyyy/g, year)
                    .replace(/yy/g, year)
                    .replace(/MMMM/g, monthName)
                    .replace(/MMM/g, monthName.substring(0, 3))
                    .replace(/MM/g, ('0' + month).slice(-2))
                    .replace(/M(?!a)/g, month)
                    .replace(/dd/g, ('0' + day).slice(-2))
                    .replace(/d/g, day);
                console.log('stringify -> out', fmt);
                return fmt;
            },
            parse(str) {

                if (str === undefined || str === null) {
                    str = this.val;
                }
              /*  var date = str.length === 10 && (this.format === 'dd-MM-yyyy' || this.format === 'dd/MM/yyyy') ?
                    new Date(str.substring(6, 10), str.substring(3, 5) - 1, str.substring(0, 2)) :
                    new Date(str);
                //console.log('parse -> make date', date);
                return isNaN(date.getFullYear()) ? new Date() : date;*/

                if (str) {
                    var outD = this.extractDateParts(str);
                    return (outD.valid) ? outD.date : new Date();
                } else {
                    console.log('blank date');
                    return new Date();
                }
            },
            getDayCount(year, month) {
                const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (month === 1) {
                    if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
                        return 29;
                    }
                }
                return dict[month];
            },
            getDateRange() {
                this.dateRange = [];
                this.decadeRange = [];
                const time = {
                    year: this.currDate.getFullYear(),
                    month: this.currDate.getMonth(),
                    day: this.currDate.getDate()
                };
                const yearStr = time.year.toString();
                const firstYearOfDecade = (yearStr.substring(0, yearStr.length - 1) + 0) - 1;
                for (var i = 0; i < 12; i++) {
                    this.decadeRange.push({
                        text: firstYearOfDecade + i
                    });
                }

                const currMonthFirstDay = new Date(time.year, time.month, 1);
                var firstDayWeek = currMonthFirstDay.getDay() + 1;
                if (firstDayWeek === 0) {
                    firstDayWeek = 7;
                }
                const dayCount = this.getDayCount(time.year, time.month);
                if (firstDayWeek > 1) {
                    const preMonth = this.getYearMonth(time.year, time.month - 1);
                    const prevMonthDayCount = this.getDayCount(preMonth.year, preMonth.month);
                    for (var i = 1; i < firstDayWeek; i++) {
                        const dayText = prevMonthDayCount - firstDayWeek + i + 1;
                        const date = new Date(preMonth.year, preMonth.month, dayText);
                        var sclass = 'datepicker-item-gray';
                        if (this.disabledDaysArray.indexOf(date.getDay()) > -1) {
                            sclass = 'datepicker-item-disable';
                        }
                        this.dateRange.push({text: dayText, date, sclass});
                    }
                }

                for (var i = 1; i <= dayCount; i++) {
                    const date = new Date(time.year, time.month, i);
                    var sclass = '';
                    if (this.disabledDaysArray.indexOf(date.getDay()) > -1) {
                        sclass = 'datepicker-item-disable';
                    }
                    if (i == time.day && date.getFullYear() == time.year && date.getMonth() == time.month) {
                        sclass = 'datepicker-dateRange-item-active';
                    }
                    this.dateRange.push({text: i, date, sclass});
                }

                if (this.dateRange.length < 42) {
                    const nextMonthNeed = 42 - this.dateRange.length;
                    const nextMonth = this.getYearMonth(time.year, time.month + 1);

                    for (var i = 1; i <= nextMonthNeed; i++) {
                        const date = new Date(nextMonth.year, nextMonth.month, i);
                        var sclass = 'datepicker-item-gray';
                        if (this.disabledDaysArray.indexOf(date.getDay()) > -1) {
                            sclass = 'datepicker-item-disable';
                        }
                        this.dateRange.push({text: i, date, sclass});
                    }
                }
            },
            setValidState(state) {
                this.valid = state;
            }
        },
        created() {
            this._timeout = {};
        },
        mounted() {
            this.$emit('child-created', this);
            console.log('mounted', this.val);
            this.currDate = this.parse(this.val) || this.parse(new Date());
            console.log('currDate', this.currDate);
            this._blur = e => {
                if (!this.$el.contains(e.target))
                    this.close();
            };
            window.addEventListener('click', this._blur);
        },
        beforeDestroy() {
            window.removeEventListener('click', this._blur);
        }
    }
</script>

<style>
    .datepicker {
        position: relative;
        display: inline-block;
    }

    input.datepicker-input.with-reset-button {
        padding-right: 25px;
    }

    .datepicker > button.close {
        position: absolute;
        top: 0;
        right: 0;
        outline: none;
        z-index: 2;
        display: block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
    }

    .datepicker > button.close:focus {
        opacity: .2;
    }

    .datepicker-popup {
        position: absolute;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
        margin-top: 34px;
        z-index: 1000;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    }

    .datepicker-inner {
        width: 218px;
    }

    .datepicker-body {
        padding: 10px 10px;
    }

    .datepicker-ctrl p,
    .datepicker-ctrl span,
    .datepicker-body span {
        display: inline-block;
        width: 28px;
        line-height: 28px;
        height: 28px;
        border-radius: 4px;
    }

    .datepicker-ctrl p {
        width: 65%;
    }

    .datepicker-ctrl span {
        position: absolute;
    }

    .datepicker-body span {
        text-align: center;
    }

    .datepicker-monthRange span {
        width: 48px;
        height: 50px;
        line-height: 45px;
    }

    .datepicker-item-disable {
        background-color: white !important;
        cursor: not-allowed !important;
    }

    .decadeRange span:first-child,
    .decadeRange span:last-child,
    .datepicker-item-disable,
    .datepicker-item-gray {
        color: #999;
    }

    .datepicker-dateRange-item-active:hover,
    .datepicker-dateRange-item-active {
        background: rgb(50, 118, 177) !important;
        color: white !important;
    }

    .datepicker-monthRange {
        margin-top: 10px
    }

    .datepicker-monthRange span,
    .datepicker-ctrl span,
    .datepicker-ctrl p,
    .datepicker-dateRange span {
        cursor: pointer;
    }

    .datepicker-monthRange span:hover,
    .datepicker-ctrl p:hover,
    .datepicker-ctrl i:hover,
    .datepicker-dateRange span:hover,
    .datepicker-dateRange-item-hover {
        background-color: #eeeeee;
    }

    .datepicker-weekRange span {
        font-weight: bold;
    }

    .datepicker-label {
        background-color: #f8f8f8;
        font-weight: 700;
        padding: 7px 0;
        text-align: center;
    }

    .datepicker-ctrl {
        position: relative;
        height: 30px;
        line-height: 30px;
        font-weight: bold;
        text-align: center;
    }

    .month-btn {
        font-weight: bold;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .datepicker-preBtn {
        left: 2px;
    }

    .datepicker-nextBtn {
        right: 2px;
    }

    .datepicker-feedback-glyph {
        margin-right: 20px;
    }
</style>
