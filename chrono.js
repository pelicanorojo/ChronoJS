/**
 * LIBRARY: chrono
 *
*/
/**
 * MODEL: TimeBeatsPrototype
 *
 *
 */
var	TimeBeatsPrototype = {
	initialize: function ( period, callback, options ) {
		this.statesValues = {
			stopped: 'stopped',
			started: 'started',
			paused: 'paused'
		};

		this.setPeriod( period || this.period || 0 );//beat period
		this.setCallback( callback );
	
		//desired ticks count
		this.setTicks( ( options && ( typeof options.ticks !== 'undefined' ) ) ? options.ticks : this.ticks || 1 );//one tick by default, tick must be undefined or Natural number.


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
				
			}
	},
	_createPaddingTimeout: function ( callback ) {
		var
			that = this;

		this.lastTick = new window.Date() - ( this.pauseTick - this.lastTick ); //compensado

		this.pauseTick = null;
		
		this.inPadding = true;
		this.interval = window.setTimeout( function () {
			that._periodicFunction( callback ); // the intermediary callback
		}, this.getRemainingTickTime() );		
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
	start: function ( ) {
		this.state = this.statesValues.started;

		this.remainingTicks = this.ticks ? this.ticks-1 : Number.POSITIVE_INFINITY;

		this.lastTick = new window.Date();

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
	resume: function ( period, callback ) {
		var 
			that = this;

		if ( this.state === this.statesValues.paused ) {
			this.state = this.statesValues.started;			
			this.callback = callback || this.callback;
			this.period = period || this.period;
			//terminar tick actual
			this._createPaddingTimeout( function ( lastBeat ) {
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
}