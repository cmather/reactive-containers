var nextId = 0;

CachedDependency = function (func) {
  this._func = func;
  this._id = nextId++
  Deps.Dependency.prototype.constructor.apply(this, arguments);
};

inherit(CachedDependency, Deps.Dependency);

_.extend(CachedDependency.prototype, {
  get: function () {
    var self = this;
    var value = Deps.nonreactive(function () { return self._func(); });
    var comp = Deps.currentComputation;

    if (comp) {
      comp._cachedDepValues = comp._cachedDepValues || {};
      comp._cachedDepValues[this._id] = value;
    }

    this.depend();
    return value;
  },


  // invalidate associated computations only
  // if value has actually changed from previous
  // cached value
  changed: function () {
    var self = this;
    var comp;
    var oldValue;
    var newValue;

    for (var id in self._dependentsById) {
      comp = self._dependentsById[id];
      oldValue = comp._cachedDepValues[this._id];
      newValue = Deps.nonreactive(function () { return self._func(); });

      if (oldValue !== newValue)
        comp.invalidate();
    }
  }
});
