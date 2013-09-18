/**
 * LIBRARY: ChronoJS
 *
 * Author: Pablo E. Benito - pelicanorojo - bioingbenito@gmail.com
 * https://github.com/pelicanorojo/ChronoJS
 *
*/
/**
 * MODULE: TimeBeats
 *
 * You can use CRNJS.timeBeats as a singleton object, or as a prototype for a Constructor Function, Factory Function, backbone model or other framework.
 * Or you can use the constructor function CRNJS.TimeBeats.
 * Are pending commonJS and AMD versions.
 *
 */
var
	CRNJS = CRNJS || {};//TODO: adapt for commonjs and amd

(function ( CRNJS ) {

	function dummyFn () {}

	CRNJS.timeBeats = {
		statesValues: {
			stopped: 'stopped',
			started: 'started',
			paused: 'paused'
		},
		initialize: function ( options ) {
			options = options || {};

			this.setPeriod( options.period || this.period || 0 );//beat period
			this.setCallback( options.callback || dummyFn );

			//desired ticks count
			//one tick by default, tick must be undefined or Natural number. 0 for infinite ticks
			this.setTicks( ( typeof options.ticks !== 'undefined' ) ? options.ticks : this.ticks || 1 );

			this._reset();

			return this;
		},
		_deleteTimer: function () {
			if ( this.interval !== null ) {
				if ( this.inPadding ) {
					window.clearTimeout( this.interval );
					this.inPadding = false;
				} else {
					window.clearInterval( this.interval );
				}
				this.interval = null;
			}
		},
		_periodicFunction: function ( callback ) {
			var
				lastBeat = false;

				this.lastTick = new window.Date();

				if ( this.remainingTicks !== Number.POSITIVE_INFINITY ) { //if not infinite repetitions
					lastBeat = this.remainingTicks === 0;
					if ( !lastBeat ) {
						this.remainingTicks--;
					}
				}

				if ( lastBeat ) {
					this._reset();
				}
				// call after eventual reset for good remainder time calculation
				try {
					//protect against callback error
					callback( lastBeat );
				}  catch ( e ) {
					//TODO: securelog
				}
		},
		_createPaddingTimeout: function ( callback ) {
			var
				that = this;

			this.lastTick = new window.Date() - ( this.pauseTick - this.lastTick ); //compensating

			this.pauseTick = null;

			this.inPadding = true;
			this.interval = window.setTimeout( function () {
				that._periodicFunction( callback ); // the intermediary callback
			}, this.getRemainingTickTime() );//TODO: check how are treated negatives values, because it may come on resumes with shorter periods.	
		},
		_createTimer: function () {
			var
				that = this;

			this.interval = window.setInterval( function () {
				that._periodicFunction( that.callback ); // the user callback
			}, this.period );
		},
		_reset: function () {
			this.state = this.statesValues.stopped;

			this._deleteTimer();				

			this.lastTick = null; // the last tick in order to calculate the remaining tick time
			this.pauseTick = null; // the pause in order to calculate the remaining tick time

			return this;
		},
		start: function ( options ) {
			this.state = this.statesValues.started;

			this.remainingTicks = this.ticks ? this.ticks-1 : Number.POSITIVE_INFINITY;

			this.lastTick = new window.Date();
			if ( options && options.callBackOnStart ) { this.callback( false/*lastBeat*/, true/*startBeat*/ ); }
			this._createTimer();

			return this;
		},
		stop: function () {
			this._reset();
			return this;
		},
		pause: function () {
			this.state = this.statesValues.paused;

			this._deleteTimer();
			this.pauseTick =  new window.Date();
			return this;
		},
		resume: function ( options ) {//TODO: add ticks on options.
			var 
				that = this;

			options = options || {};

			if ( this.state === this.statesValues.paused ) {
				this.state = this.statesValues.started;			
				this.callback = options.callback || this.callback;

				//change period before resume
				if ( !options.setAfterResume ) {
					this.period = options.period || this.period;
				}

				//ends current tick
				this._createPaddingTimeout( function ( lastBeat ) {

					//change period after resume
					if ( !options.setAfterResume ) {
						that.period = options.period || that.period;
					}

					//restart timer
					if ( !lastBeat ) {
						that._createTimer();
					}
					//call callback
					that.callback( lastBeat );
				});
			}
			return this;
		},
		getState: function () {
			return this.state;
		},
		setPeriod: function ( period ) {
			this.period = period;
			return this;
		},
		getPeriod: function () {
			return this.period;
		},
		setTicks: function ( ticks ) {
			ticks = window.Math.round( window.Math.abs( ticks ) );
			this.ticks = ticks;
			return this;
		},
		getTicks: function () {
			return this.ticks;
		},
		setCallback: function ( callback ) {
			this.callback = callback;
			return this;
		},
		getRemainingTicks: function () {
			return ( this.state !== this.statesValues.stopped ) ? this.remainingTicks : 0 ;
		},
		addRemainingTicks: function ( ticks ) {
			if ( this.state !== this.statesValues.stopped ) {
				this.remainingTicks += ticks;
			}
			return this;
		},	
		getRemainingTickTime: function () {
			var remaining;

			if ( this.state !== this.statesValues.stopped ) {
				remaining = this.pauseTick ? 
				this.period - ( this.pauseTick - this.lastTick ) :
				this.period - ( new window.Date() - this.lastTick );
			} else {
				remaining = 0;
			}

			return remaining;		
		},
		getRemainingTime: function () {
			var remaining;

			if ( this.remainingTicks === Number.POSITIVE_INFINITY ) {
				remaining = -1;			
			} else if ( this.state === this.statesValues.stopped ) {
				remaining = 0;
			} else {
				remaining = this.getRemainingTickTime() + ( this.remainingTicks ) * this.period;
			}

			return remaining;
		}
	};

	CRNJS.TimeBeats = function ( /*initialize arguments*/ ) {
		//If call without arguments initialize the instance.
		if ( arguments.length ) {
			this.initialize.apply( this, arguments );
		}
		return this;
	};

	CRNJS.TimeBeats.prototype = CRNJS.timeBeats;
}( CRNJS ));
