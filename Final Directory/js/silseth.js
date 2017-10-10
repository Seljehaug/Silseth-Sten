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

	// --- Active state in menu ---
	var loc = window.location.href; // returns the full URL
	// console.log(loc);

	var url_parts = loc.split('/');
	var current_page = url_parts.pop() || url_parts.pop(); // handle potential trailing slash
	current_page = current_page.substring(0, current_page.indexOf('.'));
	// console.log(current_page);

	var selector = "#menu li a[href*='" + current_page + "']";
	// console.log(selector);

	// User is on the index page
	if(current_page === ""){
		selector = "#menu li a[href*='/']";
		// console.log("index page");
		$(selector).parent().addClass('active');
	}else {
		// user is on another page
		$(selector).parent().addClass('active');
	}

	// --- Mobile menu ---
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

	// --- Form validation ---
	$('form.validate').find('input[type=submit]').on('click', function(e) {
		validateForm( $(this).closest('form') );
		return false;
	});

	fadeInObjects();

	$(window).scroll(function() {
	});

	// --- Initialize slideshow(s) on the page ---
	$('.slideshow').bxSlider({
		adaptiveHeight: true,
		pager: false
	});

	$('.slideshow').addClass("bxslider");

});

$(window).scroll(function() {
	"use strict";
	currentPosition = $(window).scrollTop();

	// --- Menu resizing and opacity ---
	if($(document).scrollTop()>50) {
		$("#menu").removeClass("large").addClass("small");
		$("#menu").css("background", "rgba(212, 212, 212, 1)");
	} else {
		$("#menu").removeClass("small").addClass("large");
	}

	if($(document).scrollTop()<50) {
		$("#menu").css("background", "rgba(212, 212, 212, 0.6)");
	}

	fadeInObjects();
});

$(window).resize(function() {
	"use strict";
	currentPosition = $(window).scrollTop();

	fadeInObjects();
});
