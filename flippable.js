(function ( $ ) {
	
	$.fn.underflip = function( options ) {
		var self = this;

		var height  = $(this).height(),
				animation = false,
		    animationstring = 'animation',
		    keyframeprefix = '',
		    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
		    pfx  = '',
		    settings,
		    initRot,
		    endRot;

    settings = $.extend({
	    init      : 'open',
	    trigger   : 'click',
	    direction : ' ',
	    speed     : ' ',
	    ease      : ' ',
	    fade      : ' ',
	    rotation  : ' '
    }, options );

    //sets initial rotation based on init setting
    if (settings.init == 'open') initRot = 0;
    else if (settings.init == 'closed') initRot = 90;

		 
		//checks if animation requires vendor prefix
		if( self[0].style.animationName ) animation = true;     
		
		//if so we'll throw on the prefixes 
		if( animation === false ) {
		  for( var i = 0; i < domPrefixes.length; i++ ) {
		    if( self[0].style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
		      pfx = domPrefixes[ i ];
		      animationstring = pfx + 'Animation';
		      keyframeprefix = '-' + pfx.toLowerCase() + '-';
		      animation = true;
		      break;
		    }
		  }
		}

		if( animation === false ) {
		 
		  // animate in JavaScript fallback
		 
		} else {
			// define the css keyframe
			var keyframes = '@'+ keyframeprefix + 'keyframes swing { ' +
		                    'from {'+ keyframeprefix + 'transform: perspective( 600px ) rotateX( 0deg );}'+
		                    'to {'+ keyframeprefix + 'transform: perspective( 600px ) rotateX( -90deg );}'+
		                  '}';

		 	// define the class of how we want the element to end up after animation
			var after     = '.after { ' +
											  ''+ keyframeprefix + 'animation-timing-function: ease-in;' +
											  ''+ keyframeprefix + 'animation-fill-mode: forwards;' +
											  ''+ keyframeprefix + 'animation-name: swing;' +
											  ''+ keyframeprefix + 'animation-duration: 0.5s;' +
											'}';
 
		  if( document.styleSheets && document.styleSheets.length ) {
		  		//insert css rules into stylesheet
		      document.styleSheets[0].insertRule( keyframes, 0 );
		      document.styleSheets[0].insertRule( after, 0 );

		  } else {
		 		//if no stylesheet, create one and insert css rules into stylesheet
		    var s = document.createElement( 'style' );
		    s.innerHTML = keyframes;
		    document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
		  }

		}


		//set intial css according to init and dir
		self.css({
			'-webkit-transform': 'perspective( 600px ) rotateX( ' + initRot + 'deg )',
			'-webkit-transform-origin': '50% 0%',
			'-webkit-transition': 'opacity 1s ease-in'
		});
		 
		//set ending css according to init and dir, triggered by event
		self.on('click', function() {
			self.addClass('after');
		});

		return self
	}

})(jQuery);
