ChronoJS
========

Javascript - Backbone - Timer

This is a Backbone model for manage timers with a periodic ticks.

The main features are its ability for pause the timer in middle of a period,
and resume the paused period and the subsecuent ticks.


Methods:

initialize: function (period, callback, options)

returns: this

period is the tick's period

callback is for call at the end of each period.

options is an optional object with this properties:
- ticks: how much periods do you want. (default is 1, and if you pass 0 it means infinity)

start: function (  )

starts the timer.

stop: function ()

stops the timer.

pause: function ()

pause the timer

resume: function ( period, callback )

resume the timer, and allow to pass optional new period and callback params.

the resume methods firt do de partially done period, and then continue with the whole remaining periods.


getRemainingTicks: function ()

returns the remaining whole ticks.

getRemainingTickTime: function ()

returns the current period remaining time.

getRemainingTime: function ()

returns the timer remaining time, that is the current period reamining more the remaining ticks times.






