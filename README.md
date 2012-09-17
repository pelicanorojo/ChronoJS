ChronoJS
========

Javascript - Backbone - Timer

This is a Backbone model for manage timers with a periodic ticks.

The main features are its ability for pause the timer in middle of a period,
and resume the paused period and the subsecuent ticks.


Methods:

initialize: function (timeout, callback, options)

returns: this

timeout is the period // I will rename this soon. By now is mandatory to pass
this parameter in the constructor, the initialization method or in in the start method.

callback is for call at the end of each period.

options is an optional object with this properties:
- ticks: how much periods do you want. (default is 1, and if you pass 0 it means infinity)

start: function ( timeout, callback, options )

starts the timer and reintroduce optionally the initilization params.

stop: function ()

stops the timer.

pause: function ()

pause the timer

resume: function ( timeout, callback )

resume the timer, and allow to pass optional new timeout and callback params.

the resume methods firt do de partially done period, and then continue with the whole remaining periods.


getRemainingTicks: function ()

returns the remaining whole ticks.

getRemainingTickTime: function ()

returns the current period remaining time.

getRemainingTime: function ()

returns the timer remaining time, that is the current period reamining more the remaining ticks times.






