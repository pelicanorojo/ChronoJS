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
(function ( global ) {
	var
		CRNJS = global.CRNJS = global.CRNJS || {};

	CRNJS.babySteps = function ( generalContext ) {
		var
			seq = [],
			pub = {};

		function addNext ( fn, args, dT, context ) {

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
				next = seq.shift();

			if ( next ) {
				window.setTimeout ( function () {
					next.fn.apply ( next.context, next.args );
					executeNext();
				}, next.dT );
			}

			return pub;
		}

		pub.addNext = addNext;
		pub.start = executeNext;

		return pub;
	}
}( this ));