$(document).ready(function(){
	var height = $(window).height()
		,	width  = $(window).width()
		, rot    = 0;

	function swing() {
		var top = $(document).scrollTop();

		$('.work').each(function(i, el){
			var divHeight = $(el).height();
			var elOffset  = $(el).offset();
			var distance  = elOffset.top - top;
			var smHeight  = height - divHeight / 4;
			var prev      = $(this).prev();
			
			function swung() {
				var checkSwing = prev.css('opacity');
				if (i == 0 || checkSwing == 1) return true;
				else return false;
			}

			if ( distance <= smHeight && swung() ){
				$(el).addClass('fade swing');
				$('body').trigger('doneSwingin');	
			} 

			if ( distance > height ) $(el).removeClass('fade swing');
			
		});
	}

	$(window).scroll(function(){
		clearTimeout($.data(this, "setTimer"));
		$.data(this, "setTimer", setTimeout(function(){	
			swing();
		}, 100));
	});

	$('body').on('doneSwingin', function(){
		clearTimeout($.data(this, "setTimer"));
		$.data(this, "setTimer", setTimeout(function(){	
			swing();
		}, 100));
	});
});