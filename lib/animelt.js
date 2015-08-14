(function($, undefined){
"use strict";

var rCssValue = /([#0-9.]+)([#a-z%]+)?/ig,
	isHexColor = /#[a-f0-9]/ig,
	digits = /[0-9.]+/g,
	dTest = /[0-9]/g,
	specials = {},
	quickJ = $( [1] );

// TODO: Fix transform in Opera and Mozilla
if( $.browser.webkit ){
	specials.transform = "WebkitTransform";
}
else if( $.browser.mozilla ){
	specials.transform = "MozTransform";
}
else if( $.browser.opera ){
	specials.transform = "OTransform";
}
else if( $.browser.ie ){
	specials.transform = "-ms-transform";
}

var animelt = $.animelt = {
	specials: {},
	quickJ: $( [1] ),

	init: function( els, props, a, b, c ){

		var opts = $.speed( a,b,c );
		
		var elsPropsValues = animelt.fx.fetchOriginValues(els, props);
		$( { p:0 } ).animate({ p:1 }, {

			step: function( p ){
				els.each(function( i, el ){
					animelt.quickJ[0] = el;
					var elProps = elsPropsValues[ i ];
					animelt.quickJ.css(animelt.fx.updateABunchOfProps(elProps, p));
				});
			},

			duration: opts.duration,

			easing: opts.easing,

			complete: opts.complete

		});

	},

	fx: {
		updateComplexStr: function(startValue, finalValue, p){
			var i = 0, old;

			if( !$.isArray(startValue) )
				old = startValue.match( digits ) || 0;
			else
				old = startValue;

			return finalValue.replace(rCssValue, function(exp,num,unit){
				if( isHexColor.test(exp) ) return exp;

				var curValue = Number(old[i] || 0) + ( Number(num) - Number(old[i]||0) ) * p;
				i++;

				return curValue + ( unit || '' );
			});
		},

		updateABunchOfProps: function(props, p){
			var updatedProps = {};
			$.each(props, function(prop, vals){
				updatedProps[prop] = animelt.fx.updateComplexStr(vals.origin, vals.final, p);
			});

			return updatedProps;
		},

		fetchOriginValues: function( els, props ){
			var parsedElsValues = [];

			els.each(function(i){
				var el = this,
						elProps = {};

				$.each(props,function( prop, val ){
					if( prop in specials ){
						prop = specials[prop];
					}

					var originValue;

					if ( el.style[prop] ){
						originValue = el.style[prop];
					}
					// Tries to find the origin value in element's computedStyle
					else if ( dTest.test( $(el).css(prop) ) ){
						originValue = $(el).css(prop);
					}
					// If none, assigns 0
					else {
						originValue = "0";
					}

					elProps[ prop ] = {
						origin: originValue,
						final: val
					};
				});

				parsedElsValues[ i ] = elProps;

			});

			return parsedElsValues;
		}
	}

}

$.fn.animelt = function(props,a,b,c){
	animelt.init(this, props, a, b, c);
	return this;
};
})(jQuery);
