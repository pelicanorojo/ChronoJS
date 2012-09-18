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
	initialize: function (period, callback, options) {

		this.period =  period || this.period || 0;//beat period
		this.callback  =  callback || this.callback;
		//desired ticks count
		this.ticks = ( options && (typeof options.ticks !== 'undefined')) ? options.ticks : this.ticks || 1;//one tick by default, tick must be undefined or Natural number.
		this.ticks = window.Math.round( window.Math.abs(this.ticks) );

		this._reset();
		
		return this;
	},
	_deleteTimer: function () {
		if ( this.interval !== null ) {
			window.clearInterval(this.interval);
			this.interval = null;			
		}
	},
	_createPaddingTimeout: function ( callback ) {
		var
			that = this;

		this.lastTick = new window.Date() - ( this.pauseTick - this.lastTick ); //compensado

		this.pauseTick = null;

		this.interval = window.setTimeout( function () {
			that.lastTick = new window.Date();

			if ( that.remainingTicks !== Number.POSITIVE_INFINITY ) { //if not infinite repetitions
				if ( that.remainingTicks === 0 ) { // if last tick
					that._reset();
				} else {
					that.remainingTicks--;
				}
			}
			callback();
		}, this.getRemainingTickTime() );		
	},
	_createTimer: function () {
		var
			that = this;

		this.interval = window.setInterval( function () {
			that.lastTick = new window.Date();

			if ( that.remainingTicks !== Number.POSITIVE_INFINITY ) { //if not infinite repetitions
				if ( that.remainingTicks === 0 ) { // if last tick
					that._reset();
				} else {
					that.remainingTicks--;					
				}
			} 

			that.callback();
		}, this.period );
	},
	_reset: function () {

		this._deleteTimer();				

		this.lastTick = null;
		this.pauseTick = null;
		this.remainingTicks = 0;		

		return this;
	},
	start: function ( ) {
		this.remainingTicks = this.ticks ? this.ticks : Number.POSITIVE_INFINITY;

		this.lastTick = new window.Date();

		this._createTimer();

		return this;
	},
	stop: function () {
		this._reset();
		return this;
	},
	pause: function () {
		this._deleteTimer();
		this.pauseTick =  new window.Date();
		return this;
	},
	resume: function ( period, callback ) {
		var 
			that = this;

		this.callback = callback || this.callback;
		this.period = period || this.period;
		//terminar tick actual
		this._createPaddingTimeout( function () {
			//restart timer
			if ( that.remainingTicks !== 0 && that.remainingTicks !== Number.POSITIVE_INFINITY ) {
				that._createTimer();
			}
			//call callback
			that.callback();
		});
		return this;
	},
	getRemainingTicks: function () {
		return this.remainingTicks;
	},
	getRemainingTickTime: function () {
		var remaining;

		if ( this.lastTick ) {
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

		if ( this.remainingTicks !== Number.POSITIVE_INFINITY ) {
			remaining = this.getRemainingTickTime() + this.remainingTicks * this.period;	
		} else {
			remaining = -1;
		}

		return remaining;
	}
};
