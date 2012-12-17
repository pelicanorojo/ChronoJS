##ChronoJS
========

Javascript - Backbone - Timer

This is a Backbone model for manage timers with a periodic ticks.

The main features are its ability for pause the timer in middle of a period,
and resume the paused period and the subsecuent ticks.


###Methods

```javascript
initialize: function (period, callback, options)
returns: this
```

__period__ is the tick's period

__callback__ is for call at the end of each period. Now a boolean param lastBeat is passed in the last one!!

__options__ is an optional object with this properties:

* ```ticks``` _number_: how much periods do you want. (default is 1, and if you pass 0 it means infinity)
* ```start``` _function_: starts the timer.
* ```stop``` _function_: stops the timer.
* ```pause``` _function_: pause the timer
* ```resume``` _function_: resume the timer
_the resume methods firt do de partially done period, and then continue with the whole remaining periods._
// deprecated: "and allow to pass optional new period and callback params"
* ```getRemainingTicks``` _function_: returns the remaining whole ticks.
* ```getRemainingTickTime``` _function_: returns the current period remaining time.
* ```getRemainingTime``` _function_: returns the timer remaining time, that is the current period remaining more the remaining ticks times.
* ```getState``` _function_: returns the state string: stopped, started or paused. Is a result of a better chrono state manage.
* ```getTicks``` _function_ returns the ticks ( not the remaining else the used for start the timer)
* ```setTicks``` _function_ (ticks) return: this ( not the remaining else the used for start the timer )
* ```getPeriod``` _function_ returns the period
* ```setPeriod``` _function_ //for use in stopped state, I'll fix this soon.... returns this
* ```addRemainingTicks``` _function_ If not in stopped state, adds remaining ticks. return this	

### Example of use

```javascript
var timer = initialize(5, done, { ticks: 0});
function done(){
  //I'm initialized!
  timer.start();
}
```
_**Checkout the index.html file to see it working on a real Backbone example**_

## License 

(The MIT License)

Copyright (c) 2012 Pablo Benito &lt;bioingbenito@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
