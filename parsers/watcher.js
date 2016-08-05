!(function (undefined) {
    function Watcher(scope, expr, callback) {
        this.scope = scope;
        this.expr = expr;
        this.callback = callback;
        if (isFunction(expr)) {
            this.getter = expr;
            this.setter = undefined;
        } else {
            var res = parseExpression(expr, true);
            this.getter = res.get;
            this.setter = res.set;
        }

    }

    Watcher.prototype.get = function () {
        var scope = this.scop;
        var value;
        try {
            value = this.getter.call(scope, scope);
        } catch (e) {
            console.warn(
                'Error when evaluating expression ' +
                '"' + this.expr + '": ' + e.toString()
            )
        }
        return value
    };

    /**
     * Set the corresponding value with the setter.
     *
     * @param {*} value
     */

    Watcher.prototype.set = function (value) {
        var scope = this.scope;
        try {
            this.setter.call(scope, scope, value, this.callback)
        } catch (e) {
            console.warn(
                'Error when evaluating setter ' +
                '"' + this.expression + '": ' + e.toString()
            )
        }
    };

    window.Watcher = Watcher;
})();