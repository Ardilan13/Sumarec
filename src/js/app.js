jQuery(function () {
    carrusel_cards();
    turn_carrusel();
  });
  
  function turn_carrusel() {
    x = 0;
    $(".campos").on("mouseenter", function () {
      for (var i = 1; i < 5; i++) {
        setTimeout("carrusel_timer(" + i + ")", x);
        x = x + 1500;
      }
    });
  }
  
  function carrusel_cards() {
    $(".icon-card").on("mouseenter", function () {
      let id = $(this).attr("id");
      addHover(id);
    });
    $(".icon-card").on("mouseleave", function () {
      let id = $(this).attr("id");
      removeHover();
    });
  }
  
  function addHover(id) {
    $("#" + id).addClass("hover-icon");
  }
  
  function removeHover() {
    $(".icon-card").removeClass("hover-icon");
  }
  
  function carrusel_timer(id) {
    if (id == 1) {
      removeHover();
      addHover(id);
    } else if (id == 2) {
      removeHover();
      addHover(id);
    } else if (id == 3) {
      removeHover();
      addHover(id);
    } else if (id == 4) {
      removeHover();
      addHover(id);
      setTimeout("removeHover()", 1490);
    }
  }
  