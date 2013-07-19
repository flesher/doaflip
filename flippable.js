(function ( $ ) {
	
	$.fn.flippable = function( options ) {
		var self = this;

		var height  = $(this).height();

    var settings = $.extend({
	    init      : 'closed',
	    trigger   : ' ',
	    direction : ' ',
	    speed     : ' ',
	    ease      : ' ',
	    fade      : ' ',
	    rotation  : ' '
    }, options );

		//set intial css according to init and dir
		self.css({
			'-webkit-transform': 'perspective( 600px ) rotateX( 0deg )',
			'-webkit-transform-origin': '50% 0%',
			'-webkit-transition': 'opacity 1s ease-in'
		});

		// if( animation === false ) {
		 
		//   // animate in JavaScript fallback
		 
		// } else {
		//   // elm.style[ animationstring ] = 'rotate 1s linear infinite';
		 
		  var keyframes = '@-webkit-keyframes swing { ' +
		                    'from {-webkit-transform: perspective( 600px ) rotateX( 0deg );}'+
		                    'to {-webkit-transform: perspective( 600px ) rotateX( -90deg );}'+
		                  '}';

			var after     = '.after { ' +
											  '-webkit-animation-timing-function: ease-in;' +
											  '-webkit-animation-fill-mode: forwards;' +
											  '-webkit-animation-name: swing;' +
											  '-webkit-animation-duration: 0.5s;' +
											'}';

		  console.log(keyframes);
		 
		  if( document.styleSheets && document.styleSheets.length ) {
		 
		      document.styleSheets[0].insertRule( keyframes, 0 );
		      document.styleSheets[0].insertRule( after, 0 );
		 
		  } else {
		 
		    var s = document.createElement( 'style' );
		    s.innerHTML = keyframes;
		    document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
		 
		  }
		 
		// }

		//set ending css according to init and dir, triggered by event
		self.on('click', function() {
			self.addClass('after');
		});


		
		//return self

	}

})(jQuery);
