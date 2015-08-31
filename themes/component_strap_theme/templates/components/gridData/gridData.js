(function ($) {

  var template = twig({
    id: "gridDataItem",
    href: "components/gridData/gridDataItem.html.twig",
    async: false
  });

  var gridDataItemHTML = twig({ ref: "gridDataItem" }).render({"label" : "Clientside"});

  $(".gridData__more").click(function(){
    $(".gridData__item:last-of-type").after(gridDataItemHTML);
  });



})(jQuery);
