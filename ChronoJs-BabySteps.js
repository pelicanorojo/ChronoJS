/**
 * LIBRARY: ChronoJS
 *
 * Author: Pablo E. Benito - pelicanorojo - bioingbenito@gmail.com
 * https://github.com/pelicanorojo/ChronoJS
 *
*/
/**
 * MODULE: BabySteps
 *
 * You can use CRNJS.babySteps for create a sequence in wich you add functions to ron in a specified delay relative to the previous one.
 *
 */
(function ( CRNJS ) {

	CRNJS.babySteps = function ( generalContext ) {
		var
			seq = [],
			pub = {},
			repetitions = 0,
			nextInd = 0;

		function addNext ( fn, dT, context, args ) {

			seq.push({
				fn: fn,
				dT: dT || 0,
				args: Object.prototype.toString.call( args ) === '[object Array]' ? args : [ args ],
				context: context || generalContext
			});

			return pub;
		}

		function executeNext () {
			var
				next = seq[ nextInd++ ];

			if ( next ) {
				window.setTimeout ( function () {
					if ( typeof next.fn === 'function' ) {
						next.fn.apply ( next.context, next.args );
					}
					executeNext();
				}, next.dT );
			} else if ( repetitions > 0 ) {
				repetitions--;
				nextInd = 0;
				executeNext();
			}

			return pub;
		}

		function repeat ( aRepetitions ) {
			repetitions = aRepetitions ? aRepetitions : ( Number.MAX_VALUE ) * 2;
			return pub;
		}

		pub.addNext = addNext;
		pub.start = executeNext;
		pub.repeat = repeat;
		pub.wait = function ( dT ) { return addNext( null, dT ); };

		return pub;
	};
}( CRNJS ));