$(function(){
  var $container = $('#referanser'),
  body = $("html, body");
  twidth = 300;
  u = twidth;
  scrollwindowtoelem = 0;
  $container.imagesLoaded(function () {
    reflowonresize();
    createisotope();
  });
  $( window ).resize(function() {
    reflowonresize();
    $container.isotope('destroy');
    createisotope();
  });
  $(".refitem a").click(function(e) {
    e.preventDefault();
    $("#referanser .selected").removeClass("selected");
    $(this).parent().addClass("selected");
    reflowonresize();
    scrollwindowtoelem = this;
    $container.isotope('reLayout', function() {
        scrollwindowto = parseInt( $(scrollwindowtoelem).parent().offset().top - ( ($(window).height() - $(scrollwindowtoelem).height() ) / 2 ) );
        body.animate({scrollTop:scrollwindowto}, '500', 'swing');
    });

  });
  function createisotope() {
    $container.isotope({
      itemSelector : '.refitem',
      layoutMode : 'masonry',
      masonry : {
        columnWidth: u
      }
    });

	 // Filtering
	$("#filter a").click(function(e){
	 e.preventDefault();
	 var filterValue = $(this).attr('data-filter');
	 // filter by attribute value
	 $grid.isotope({ filter: filterValue });
	 $grid.isotope('layout');
	});

	 $grid.on( 'click', '.grid-item-content', function() {

	   var itemContent = this;
	   setItemContentPixelSize( itemContent );

	   var itemElem = itemContent.parentNode;
	   $( itemElem ).toggleClass('is-expanded');

	   // force redraw
	   var redraw = itemContent.offsetWidth;
	   // renable default transition
	   itemContent.style[ transitionProp ] = '';

	   addTransitionListener( itemContent );
	   setItemContentTransitionSize( itemContent, itemElem );

	   $grid.isotope('layout');
	 });


	 var docElemStyle = document.documentElement.style;
	 var transitionProp = typeof docElemStyle.transition == 'string' ?
	   'transition' : 'WebkitTransition';
	 var transitionEndEvent = {
	   WebkitTransition: 'webkitTransitionEnd',
	   transition: 'transitionend'
	 }[ transitionProp ];

	 function setItemContentPixelSize( itemContent ) {
	   var previousContentSize = getSize( itemContent );
	   // disable transition
	   itemContent.style[ transitionProp ] = 'none';
	   // set current size in pixels
	   itemContent.style.width = previousContentSize.width + 'px';
	   itemContent.style.height = previousContentSize.height + 'px';
	 }

	 function addTransitionListener( itemContent ) {
	   if ( !transitionProp ) {
		  return;
	   }
	   // reset 100%/100% sizing after transition end
	   var onTransitionEnd = function() {
		  itemContent.style.width = '';
		  itemContent.style.height = '';
		  itemContent.removeEventListener( transitionEndEvent, onTransitionEnd );
	   };
	   itemContent.addEventListener( transitionEndEvent, onTransitionEnd );
	 }

	 function setItemContentTransitionSize( itemContent, itemElem ) {
	   // set new size
	   var size = getSize( itemElem );
	   itemContent.style.width = size.width + 'px';
	   itemContent.style.height = size.height + 'px';
	 }
  }
  function reflowonresize() {
    var winwidth = $( '#refgallery' ).outerWidth();
    if(winwidth > 750) {
        twidth = 300;
        theight = 250;
    } else {
        twidth = 150;
        theight = 125;
    }
    countcols = parseInt(winwidth/twidth);
    if(countcols > 2) {
        bigspan = 3;
    } else {
        bigspan = countcols;
    }
    u = parseInt(winwidth/countcols);
    $(".refitem").css("width",(u-5)).css("height",theight);
    $(".refitem.selected").css("width",((u*bigspan)-5)).css("height",((theight*2)+5));
  }
});
