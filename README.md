reactive-containers
===================

Reactive containers for the Meteor Deps system.

## Try

1. Run the meteor application and open the JavaScript console. You should see "ready: true".
2. In the console try `handle1.set(false)` to set the first ready handle to not ready.
3. Notice the "ready: false" is printed because the entire list is no longer ready.
4. Type `handle2.set(false)` and notice the message is not printed again because the overal state has not changed.

## Key Constructors

**CachedDependency**: Inherits from Deps.Dependency but accepts a function in the constructor. You call the `get()` method to get the value and when you call `changed()` it will only invalidate computations if the value has changed.

**ReactiveCachedValue**: Our version of UI.emboxValue but always returns the current correct value. Uses CachedDependency.

**ReactiveReadyList**: The new WaitList that uses ReactiveCachedValue.
