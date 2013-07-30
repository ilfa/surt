var assert = require('assert'),
    _ = require('underscore');

describe('Парсер текста.', function() {
    var parser = require('./parser');

    it('Парсер есть', function() {
        assert(parser && typeof parser == 'function');
    });

    it('Пустой сет и текст возвращают пустой сет', function() {
        var kit = [],
            text = '',
            result = parser(kit, text);

        assert.deepEqual(result, []);
    });

    it('Текст соответствует сету', function() {
        var kit = [{
                text: 'Ресторан',
                type: 'rubric'
            }, {
                text: 'Wi-Fi',
                type: 'filter'
            }],
            text = 'Ресторан Wi-Fi',
            result = parser(kit, text);

        assert.deepEqual(result, kit);
    });

    it('Текст частично не соответствует сету', function() {
        var kit = [{
                text: 'Ресторан',
                type: 'rubric'
            }, {
                text: 'Wi-Fi',
                type: 'filter'
            }],
            text = 'Ресторан Wi-F',
            result = parser(kit, text);

        assert.deepEqual(result, [kit[0], {
            text: 'Wi-F',
            type: 'text'
        }]);
    });

    it('Текст вообще никак не соответствует сету', function() {
        var kit = [{
                text: 'Ресторан',
                type: 'rubric'
            }, {
                text: 'Wi-Fi',
                type: 'filter'
            }],
            text = 'Рестора Wi-F',
            result = parser(kit, text);

        assert.deepEqual(result, [{
            text: 'Рестора Wi-F',
            type: 'text'
        }]);
    });

    it('Выпиливание текста из центральных токенов', function() {
        var kit = [{
                text: 'Ресторан',
                type: 'rubric'
            }, {
                text: 'Wi-Fi',
                type: 'filter'
            }, {
                text: 'лыжи',
                type: 'attr'
            }],
            text = 'Ресторан W лыжи',
            result = parser(kit, text);

        assert.deepEqual(result, [kit[0], {
            text: 'W',
            type: 'text'
        }, kit[2]]);
    });

    it('Выпиливание текста задевает первый токен', function() {
        var kit = [{
                text: 'Ресторан',
                type: 'rubric'
            }, {
                text: 'Wi-Fi',
                type: 'filter'
            }, {
                text: 'лыжи',
                type: 'attr'
            }],
            text = 'Ресто-Fi лыжи',
            result = parser(kit, text);

        assert.deepEqual(result, [{
            text: 'Ресто-Fi',
            type: 'text'
        }, kit[2]]);
    });

    it('Выпиливание текста задевает последний токен', function() {
        var kit = [{
                text: 'Ресторан',
                type: 'rubric'
            }, {
                text: 'Wi-Fi',
                type: 'filter'
            }, {
                text: 'лыжи',
                type: 'attr'
            }],
            text = 'Ресторан Fiыжи',
            result = parser(kit, text);

        assert.deepEqual(result, [kit[0], {
            text: 'Fiыжи',
            type: 'text'
        }]);
    });

    it('Выпиливание текста задевает несколько не соседних токенов + несколько пробелов', function() {
        var kit = [{
                text: 'Ресторан',
                type: 'rubric'
            }, {
                text: 'Wi-Fi',
                type: 'filter'
            }, {
                text: 'лыжи',
                type: 'attr'
            }, {
                text: 'gprs',
                type: 'internet'
            }],
            text = 'Ресторан Fi лыжи   gs',
            result = parser(kit, text);

        assert.deepEqual(result, [kit[0], {
            text: 'Fi',
            type: 'text'
        }, kit[2], {
            text: 'gs',
            type: 'text'
        }]);
    });
});