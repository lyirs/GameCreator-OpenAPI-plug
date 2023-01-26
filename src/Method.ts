
module OpenAPI {

    /**
     * 通用API
     */
    export class Method {

        /**
         * 当前页面协议
         * @ "http://" : "https://"
         */
        static get Origin(): string {
            return window.location.protocol == "http:" ? "http://" : "https://";
        }

        /**
         * 随机字符串
         * @param {number} len 随机字符串的长度
         */
        static getRandomString(len: number) {
            let _charStr = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
                min = 0,
                max = _charStr.length - 1,
                _str = '';
            // 不允许为0的情况
            if (len == 0) {
                return;
            }
            // 循环生成字符串
            for (var i = 0, index; i < len; i++) {
                index = (function (randomIndexFunc, i) {
                    return randomIndexFunc(min, max, i, randomIndexFunc);
                })(function (min, max, i, _self) {
                    let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
                        numStart = _charStr.length - 10;
                    if (i == 0 && indexTemp >= numStart) {
                        indexTemp = _self(min, max, i, _self);
                    }
                    return indexTemp;
                }, i);
                _str += _charStr[index];
            }
            return _str;
        }

        /**
         * 日期转时间戳, 格式 1970/1/1 00:00:00
         * @param {string} date 日期
         */
        static dateToTimestamp(date: string): number {
            let time = new Date(Date.parse(date));
            return time.getTime();
        }

        /**
         * 时间戳转日期, 格式 1609459200。 支持获取特定时间 
         * @param {any} data 时间戳
         * @param {string} data_type 【可选】获取时间类型 y、m、d、h、i、s。如 s = 获取时间戳中的秒
         */
        static timestampToDate(data: number, data_type = "") {
            let _data = 0;
            if (String(data).length == 13) {
                _data = data
            } else {
                _data = data * 1000
            }
            let time = new Date(_data);
            let _time = 0;
            if (data_type == "y") {
                _time = time.getFullYear();
            }
            if (data_type == "m") {
                _time = time.getMonth() + 1;
            }
            if (data_type == "d") {
                _time = time.getDate();
            }
            if (data_type == "h") {
                _time = time.getHours();
            }
            if (data_type == "i") {
                _time = time.getMinutes();
            }
            if (data_type == "s") {
                _time = time.getSeconds();
            }
            if (data_type == "") {
                return _data;
            }
            return _time;
        }

        /**
         * 判断常量变量类型
         * @param {number} variable_index_constant 常量
         * @param {number} variable_index_variable 变量
         * @param {number} variable_index_type 选项类型
         * @param {number} variable_type 【默认数值】变量类型
         */
        static JudgeTypeConstantVariable(variable_index_constant: number, variable_index_variable: number, variable_index_type: number, variable_type = 0) {
            let variable_value;
            if (variable_index_type == 0) {
                variable_value = variable_index_constant;
            } else {
                // 数值
                if (variable_type == 0) {
                    variable_value = Game.player.variable.getVariable(variable_index_variable);
                }

                // 字符串
                if (variable_type == 1) {
                    variable_value = Game.player.variable.getString(variable_index_variable);
                }

                // 开关
                if (variable_type == 2) {
                    variable_value = Game.player.variable.getSwitch(variable_index_variable);
                }
            }
            return variable_value;
        }
    }
}