Package.describe({
  name: 'reactive-containers',
  summary: 'Various reactive data structures'
});

Package.on_use(function (api) {
  api.use('underscore');
  api.use('deps');
  api.use('ui');

  api.add_files('utils.js', ['client'])
  api.add_files('reactive_cached_value.js', ['client'])
  api.add_files('cached_dependency.js', ['client'])
  api.add_files('reactive_ready_list.js', ['client'])

  api.export('ReactiveReadyList');
  api.export('CachedDependency');
  api.export('ReactiveCachedValue');
});

Package.on_test(function (api) {
});
