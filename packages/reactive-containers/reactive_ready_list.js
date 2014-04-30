ReactiveReadyList = function () {
  var self = this;
  this._list = [];
  this._value = new ReactiveCachedValue(_.bind(this._isEveryItemReady, this));
};

ReactiveReadyList.prototype = {
  push: function (item) {
    var idx = this._list.push(item);
    this._value.recompute();
    return idx;
  },

  ready: function () {
    return this._value.get();
  },

  _isEveryItemReady: function () {
    var list = this._list;
    return _.every(list, function (item) {
      return item.ready();
    });
  }
};
