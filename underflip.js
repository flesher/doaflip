(function ( $ ) {
	
	$.fn.underflip = function( options ) {
		var self = this;

		var height  = $(this).height(),
				animation = false,
		    animationstring = 'animation',
		    keyframeprefix = '',
		    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
		    pfx  = '',
		    settings, initRot, endRot, origin, speed, pre, post;

    settings = $.extend({
	    init        : 'open',
	    trigger     : 'click',
	    perspective : 600,
	    axis        : 'X',
	    origin      : 50,
	    speed       : 500,
	    ease        : 'ease-in',
	    rotation    : -180,
    }, options )  ;

    //sets initial rotation based on init setting
    if (settings.init == 'open') initRot = 0;
    else if (settings.init == 'closed') initRot = 90;

    //sets origin based on origin setting and axis setting
    if (settings.axis == 'X') origin = "50% " + settings.origin + "%";
    if (settings.axis == 'Y') origin = settings.origin + "% 50%";
    
    speed = settings.speed / 1000;

		 
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
			var keyframe = '@'+ keyframeprefix + 'keyframes after { ' +
		                    'from {'+ keyframeprefix + 'transform: perspective( ' + settings.perspective + 'px ) rotate' + settings.axis + '( 0deg );}'+
		                    'to {'+ keyframeprefix + 'transform: perspective( ' + settings.perspective + 'px ) rotate' + settings.axis + '( ' + settings.rotation + 'deg );}'+
		                  '}';

		  // define the css keyframe
			var keyframeBack = '@'+ keyframeprefix + 'keyframes before { ' +
		                    'from {'+ keyframeprefix + 'transform: perspective( ' + settings.perspective + 'px ) rotate' + settings.axis + '( ' + settings.rotation + 'deg );}'+
		                    'to {'+ keyframeprefix + 'transform: perspective( ' + settings.perspective + 'px ) rotate' + settings.axis + '( 0deg );}'+
		                  '}';


		 	// define the class of how we want the element to end up after animation
			var after     = '.after { ' +
											  ''+ keyframeprefix + 'animation-timing-function: ' + settings.ease + ';' +
											  ''+ keyframeprefix + 'animation-fill-mode: forwards;' +
											  ''+ keyframeprefix + 'animation-name: after;' +
											  ''+ keyframeprefix + 'animation-duration: '+ speed +'s;' +
											'}';

		 	// define the class of how we want the element to end up after animation
			var before    = '.before { ' +
											  ''+ keyframeprefix + 'animation-timing-function: ' + settings.ease + ';' +
											  ''+ keyframeprefix + 'animation-fill-mode: forwards;' +
											  ''+ keyframeprefix + 'animation-name: before;' +
											  ''+ keyframeprefix + 'animation-duration: '+ speed +'s;' +
											'}';

			//creates style element and inserts rules defined above
	    if ($('#anim-style').length == 0) {
	    	var s = document.createElement( 'style' );
	    	s.id = "anim-style";
	    	document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
	    	s.innerHTML = keyframe + keyframeBack + after + before;
	    } else {
	    	$('#anim-style').html(keyframe + keyframeBack + after + before);
	    }
		}

		//set intial css according to init and dir
		self.css({
			'-webkit-transform': 'perspective( 600px ) rotateX( ' + initRot + 'deg )',
			'-webkit-transform-origin': origin,
			'-webkit-transition': 'opacity 1s ease-in'
		});
		 
		//set ending css according to init and dir, triggered by event
		pre  = self.hasClass('after');
		post = self.hasClass('before');

		if (!pre) {
			if (post) self.removeClass('before');
			self.addClass('after');
		} else {
			self.removeClass('after');
			self.addClass('before');
		}

		return self
	}

})(jQuery);
