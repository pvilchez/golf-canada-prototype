$( document ).ready(function() {
    var burger = new svgIcon( document.querySelector( '.si-icon-hamburger-cross' ), svgIconConfig, {
    speed : 200, // animation speed
    easing : mina.linear, // animation esing
    size : { w : 30, h : 55 }, // size
    } );
    $(document).foundation({
      offcanvas : {
        open_method: 'overlap_single'
      }
    });
    $(document).foundation();
    $(document)
      .on('open.fndtn.offcanvas', '[data-offcanvas]', function() {
        $('.left-off-canvas-menu').css('position','fixed');
        $('.left-off-canvas-menu').css('top', $('.fixed_wrapper').height());
        $('.left-off-canvas-menu').css('height',$(window).height()-$('.fixed_wrapper').height());
        $(document.body).trigger("sticky_kit:recalc");
      })
      .on('close.fndtn.offcanvas', '[data-offcanvas]', function() {
          window.setTimeout(function(){$('.left-off-canvas-menu').attr('style','')}, 500);
          if (burger.toggled=true) { burger.toggle(true)}
      })
});
