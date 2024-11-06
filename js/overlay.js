'use strict';

$(document).on("ready",function(){

	(function(){
		var overlay;
		var triggerBttn = $( '.portfolio-item figure' );
		var closeBttn = $( '.overlay-close' );
		var transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		};

		triggerBttn.on( 'click', function(){
			var overlay_id = $(this).data('target');
			overlay = $("#" + overlay_id);
			toggleOverlay();
		});

		closeBttn.on('click',toggleOverlay);

		var transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
		var support = { transitions : Modernizr.csstransitions };

		function toggleOverlay() {
			if( overlay.hasClass('open') ) {
				overlay.removeClass('open' );
				overlay.addClass('close' );
				var onEndTransitionFn = function( ev ) {
					if( support.transitions ) {
						if( ev.propertyName !== 'visibility' ) return;
						this.unbind(transEndEventName, onEndTransitionFn)
					}
					overlay.removeClass( 'close' );
				};
				if( support.transitions ) {
					overlay.bind(transEndEventName, onEndTransitionFn);
				}
				else {
					onEndTransitionFn();
				}
			}
			else if( !overlay.hasClass( 'close' ) ) {
				overlay.addClass( 'open' );
			}
		}
	})();
});
