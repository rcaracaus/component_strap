(function ($) {


  function getParameterByName(name) {
    var regex,
      results;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  $(function () {
    // Syntax hightlignting with Rainbow.js.
    $('code.html').attr('data-language', 'html');
    $('code.css').attr('data-language', 'css');
    $('code.less, code.scss').attr('data-language', 'generic');

    // Add lorem ipsum containers.
    $('[data-kss~="lorem-ipsum"]').append('<span data-kss="lorem-ipsum__child">');

    // Turn on focus mode.
    if (window.location.hash && getParameterByName('focus') == 'true') {
      $('body').addClass('kss-focus-mode');
    }
  });


}(jQuery));
