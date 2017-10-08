var $mmenu,
	mmenuapi,
	currentPosition = 0;

function parallaxObj($o, speed) {
	"use strict";
	$o.css('transform', 'translate3d(0, ' + ~~(currentPosition / speed) + 'px, 0)');
}

function fadeInObjects() {
	"use strict";
	var t = $(window).scrollTop(),
		e = $(window).height();
	$(".fade").not(".in").each(function() {
		var $fadeinelem = $(this);
		var n = $fadeinelem.offset().top - e,
			i = (e / 8);
		if (t - i > n) {
			if ($fadeinelem.data('fadedelay')) {
				setTimeout(function() {
					$fadeinelem.addClass("in");
				}, parseInt($fadeinelem.data('fadedelay')) * 100);
			} else {
				$fadeinelem.addClass("in");
			}
		} else if (t < n) {
			/* $(this).removeClass("in"); */
		}
	});
}

function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
	return emailReg.test($email);
}

function validateFormField($obj) {
	"use strict";
	var valid = 1;
	$obj.parent().addClass('fb_invalid');
	if (($obj.val() === '') || (($obj.attr('type') == 'email') && (!validateEmail($obj.val())))) {
		valid = 0;
	} else {
		$obj.parent().removeClass('fb_invalid');
	}
	return valid;
}

function validateForm($formObj) {
	"use strict";
	var valid = 1;
	$formObj.find(".required").each(function() {
		if (validateFormField($(this).children('input, textarea, select').first()) === 0) {
			valid = 0;
		}
		$(this).children('input, textarea, select').unbind().blur(function() {
			validateFormField($(this));
		});
	});
	if (valid === 1) {
    // 	console.log("VALID: Submit");
		$formObj.attr("action", $formObj.attr("action") + '#' + $formObj.closest('.page').attr('id'));
		$formObj.submit();
	} else {
		// console.log("NOT VALID");
  }
}

$(function() {
	"use strict";
	currentPosition = $(window).scrollTop();

	$mmenu = $("#mobilemenu").mmenu({
		offCanvas: {
			position: "right"
		},
		navbar: {
			add: false,
			title: "Meny",
			titleLink: "Tilbake"
		}
	}, {});

	mmenuapi = $mmenu.data("mmenu");

	// Form validation
	$('form.validate').find('input[type=submit]').on('click', function(e) {
		validateForm( $(this).closest('form') );
		return false;
	});

	fadeInObjects();

	$(window).scroll(function() {
	});

	// Initialize slideshow(s) on the page
	$('.slideshow').bxSlider({
		adaptiveHeight: true,
		pager: false
	});

	$('.slideshow').addClass("bxslider");

	// // Isotope
	// var $container = $('#referanser'),
	// 	body = $("html, body");
	// twidth = 300;
	// u = twidth;
	// scrollwindowtoelem = 0;
	// $container.imagesLoaded(function() {
	// 	reflowonresize();
	// 	createisotope();
	//
	// 	// Filtering
	// 	$("#filter a").click(function(e) {
	// 		e.preventDefault();
	// 		var filterValue = $(this).attr('data-filter');
	// 		// filter by attribute value
	// 		$container.isotope({
	// 			filter: filterValue
	// 		});
	// 		$container.isotope('layout');
	// 	});
	// });
	//
	// $(window).resize(function() {
	// 	reflowonresize();
	// 	$container.isotope('destroy');
	// 	createisotope();
	// });
	// $(".refitem a").click(function(e) {
	// 	e.preventDefault();
	// 	$("#referanser .selected").removeClass("selected");
	// 	$(this).parent().addClass("selected");
	// 	reflowonresize();
	// 	scrollwindowtoelem = this;
	// 	$container.isotope('layout', function() {
	// 		scrollwindowto = parseInt($(scrollwindowtoelem).parent().offset().top - (($(window).height() - $(scrollwindowtoelem).height()) / 2));
	// 		body.animate({
	// 			scrollTop: scrollwindowto
	// 		}, '500', 'swing');
	// 	});
	//
	// });
	//
	// function createisotope() {
	// 	$container.isotope({
	// 		itemSelector: '.refitem',
	// 		layoutMode: 'masonry',
	// 		masonry: {
	// 			columnWidth: u
	// 		}
	// 	});
	// }
	//
	// function reflowonresize() {
	// 	var winwidth = $('#refgallery').outerWidth();
	// 	if (winwidth > 750) {
	// 		twidth = 300;
	// 		theight = 250;
	// 	} else {
	// 		twidth = 150;
	// 		theight = 125;
	// 	}
	// 	countcols = parseInt(winwidth / twidth);
	// 	if (countcols > 2) {
	// 		bigspan = 3;
	// 	} else {
	// 		bigspan = countcols;
	// 	}
	// 	u = parseInt(winwidth / countcols);
	// 	$(".refitem").css("width", (u - 5)).css("height", theight);
	// 	$(".refitem.selected").css("width", ((u * bigspan) - 5)).css("height", ((theight * 2) + 5));
	// }




});

$(window).scroll(function() {
	"use strict";
	currentPosition = $(window).scrollTop();

	// Menu resizing
	if($(document).scrollTop()>50) {
		$("#menu").removeClass("large").addClass("small");
	} else {
		$("#menu").removeClass("small").addClass("large");
	}

	fadeInObjects();
});

$(window).resize(function() {
	"use strict";
	currentPosition = $(window).scrollTop();

	fadeInObjects();
});
