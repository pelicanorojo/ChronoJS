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

callback is for call at the end of each period. Now a boolean param lastBeat is passed in the last one!!

options is an optional object with this properties:
- ticks: how much periods do you want. (default is 1, and if you pass 0 it means infinity)

start: function (  )

starts the timer.

stop: function ()

stops the timer.

pause: function ()

pause the timer

resume: function ()

// deprecated: resume the timer, and allow to pass optional new period and callback params.
// the resume methods firt do de partially done period, and then continue with the whole remaining periods.

getRemainingTicks: function ()

returns the remaining whole ticks.

getRemainingTickTime: function ()

returns the current period remaining time.

getRemainingTime: function ()

returns the timer remaining time, that is the current period remaining more the remaining ticks times.

getState: function ()
returns the state string: stopped, started or paused. Is a result of a better chrono state manage.

getTicks: function ()
returns the ticks ( not the remaining else the used for start the timer)

setTicks: function ( ticks )
return: this ( not the remaining else the used for start the timer )

getPeriod: function ()
returns the period

setPeriod: function ()
returns this

addRemainingTicks: function () 

If not in stopped state, adds remaining ticks.

return this	





