ReactiveCachedValue = function (func) {
  this._dep = new CachedDependency(_.bind(this._getValue, this));
  this._func = func;
  this._value = null;
  this._compute();
};

ReactiveCachedValue.prototype = {
  get: function () {
    return this._dep.get();
  },

  stop: function () {
    if (this._comp)
      this._comp.stop();
  },

  recompute: function () {
    this.stop();
    this._compute();
  },

  _compute: function () {
    var self = this;
    this._comp = Deps.autorun(function () {
      var newValue = self._func();

      if (newValue !== self._value) {
        self._value = newValue;
        self._dep.changed();
      }
    });
  },

  _getValue: function () {
    var self = this;
    return Deps.nonreactive(function () { return self._func(); });
  }
};
