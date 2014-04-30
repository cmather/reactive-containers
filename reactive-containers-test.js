if (Meteor.isClient) {
  ReadyHandle = function () {
    this._isReadyDep = new Deps.Dependency;
    this._isReady = false;
  };

  ReadyHandle.prototype = {
    ready: function () {
      this._isReadyDep.depend();
      return this._isReady;
    },

    set: function (val) {
      if (val !== this._isReady) {
        this._isReady = val;
        this._isReadyDep.changed();
      }
    }
  };

  handle1 = new ReadyHandle;
  handle2 = new ReadyHandle;
  waitlist = new ReactiveReadyList;

  waitlist.push(handle1);
  waitlist.push(handle2);

  handle1.set(true);
  handle2.set(true);

  // this used to run twice even though it shouldn't because
  // the old and new value at the time of calling ready()
  // are the same.
  //
  // now with the CachedDependency it will only run once until the
  // value actually changes.
  Deps.autorun(function (c) {
    console.log('ready: ', waitlist.ready());
  });
}
