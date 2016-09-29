import '../assets/js/plugins/select2/select2.css';
import '../assets/js/plugins/select2/select2';

import {options} from '../utils';

export default {
    twoWay: true,
    priority: 1000,
    params: ['options'],
    bind: function () {
        var self = this;       
        var config = options(this.params.options);
        $(this.el)
            .select2({
                data: config
            })
            .on('change', function () {
                self.set(this.value);
            });
    },
    update: function (value) {
        $(this.el).val(value).trigger('change');
    },
    unbind: function () {
        $(this.el).off().select2('destroy');
    }
}