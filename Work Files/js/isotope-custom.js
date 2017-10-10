$(function() {
	var $container = $('#stones'),
		body = $("html, body");
		twidth = 300;
		u = twidth;
		scrollwindowtoelem = 0;
	$container.imagesLoaded(function() {
		reflowonresize();
		createisotope();

		// Scroll to filtering on click
		$(".filter.scroll").click(function(){
			$("html,body").animate({ scrollTop: $("#filter-wrapper").offset().top-80}, 300);
		});

		// Filtering
		$("a.filter").click(function(e) {
			e.preventDefault();
			var filterValue = $(this).attr('data-filter');
			// filter by attribute value
			$container.isotope({
				filter: filterValue
			});
			$container.isotope('layout');
		});
	});

	$(window).resize(function() {
		reflowonresize();
		$container.isotope('destroy');
		createisotope();
	});
	$(".refitem a").click(function(e) {
		e.preventDefault();
		$("#stones .selected").removeClass("selected");
		$(this).parent().addClass("selected");
		reflowonresize();
		scrollwindowtoelem = this;
		$container.isotope('layout', function() {
			scrollwindowto = parseInt($(scrollwindowtoelem).parent().offset().top - (($(window).height() - $(scrollwindowtoelem).height()) / 5));
			body.animate({
				scrollTop: scrollwindowto
			}, '500', 'swing');
		});

	});

	function createisotope() {
		$container.isotope({
			itemSelector: '.refitem',
			layoutMode: 'masonry',
			masonry: {
				columnWidth: u
			}
		});
	}

	function reflowonresize() {
		var winwidth = $('#stones-gallery').outerWidth();
		if (winwidth > 750) {
			twidth = 250;
			theight = 250;
		} else if (winwidth > 450) {
			twidth = 200;
			theight = 200;
		} else if (winwidth > 350) {
			twidth = 150;
			theight = 150;
		} else {
			twidth = 140;
			theight = 140;
		}
		countcols = parseInt(winwidth / twidth);
		if (countcols > 2) {
			bigspan = 3;
		} else {
			bigspan = countcols;
		}
		u = parseInt(winwidth / countcols);
		$(".refitem").css("width", (u - 5)).css("height", theight);
		$(".refitem.selected").css("width", ((u * bigspan) - 5)).css("height", ((theight * 2) + 5));
	}
});
