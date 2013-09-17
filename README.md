##ChronoJS
========

Javascript - Time Control Library

This is a JS Librarly for manage time. Oh yes Albert, the time!

It have 2 modules by now, TimeBeats and babySteps.

## CRNJS.TimeBeats Module

The main features are its ability for pause the timer in middle of a period,
and resume the paused period and the subsecuent ticks.


###Methods

#####initialize

```javascript
initialize: function ( options )
returns: this
```

__options__ is an optional object with this properties:

* ```ticks``` _number_: how much periods do you want. (default is 1, and if you pass 0 it means infinity)

* ```period``` _number_: is the tick's period in milliseconds.

* ```callback``` _function_: Is called at the end of each period. And, if started with callBackOnStart, is called at the first period start with ( false/*lastBeat*/, true/*startBeat*/ ) arguments. With finites ticks, at the end of the last one, is called with ( true/*lastBeat*/, undefined/*startBeat*/ ) arguments.

##### start

```javascript
start: function ( options )
returns: this
```

__options__ is an optional object with this properties:

* ```callBackOnStart``` _boolean_: if true, the callback is called on start, at time 0.

##### stop

```javascript
stop: function ()
returns: this
```

##### pause

```javascript
pause: function ()
returns: this
```

##### resume

Resumes the timeBeats after paused.

```javascript
resume: function (  options  )
returns: this
```

__options__ is an optional object with this properties:

* ```period``` _number_: the new optional period in milliseconds.

* ```callback``` _function_: an optional new callback overrider callback.

* ```setAfterResume``` _boolean_: if true, the new period is apply after the finalization of the current truncated period, if alse is set prior to the finalization and is used for it.
( May be there is a apriori bug when you short the period, with setAfterResume in true, except if setTimeout interpret negatives numbers as zero. Or you are using CronoJs in your time machine ;). ) TODO: modified ticks number too.

##### getRemainingTicks

returns the remaining whole ticks.

##### getRemainingTickTime

returns the current period remaining time.

##### getRemainingTime

returns the timer remaining time, that is the current period remaining more the remaining ticks times.

##### getState

returns the state string: stopped, started or paused. Is a result of a better chrono state manage.

##### getTicks

returns the ticks ( not the remaining else the used for start the timer )

##### setTicks

returns this ( set the ticks, not the remaining else the used for start the timer ).

##### getPeriod

returns the period.

##### setPeriod

//for use in stopped state, I'll fix this soon.... returns this

##### addRemainingTicks

If not in stopped state, adds remaining ticks. return this	

### Example of use

```javascript
var timeBeat = new CRNJS.TimeBeats({
	ticks: 5,
	period: 5000,
	callback: tickFn
});

function tickFn ( lastBeat, startCall ) {
  console.log( 'tickFn ( startCall, lastBeat ) = ( ' + startCall + ', ' + lastBeat + ' )');
}

timeBeat.start( { callBackOnStart: true } );
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
