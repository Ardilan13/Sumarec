jQuery(function () {
  carrusel_cards();
  turn_carrusel();
  modal();
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

  $(".servicios-card").on("mouseenter", function () {
    let id = $(this).attr("id");
    addHover(id);
  });
  $(".servicios-card").on("mouseleave", function () {
    let id = $(this).attr("id");
    removeHover();
  });
}

function addHover(id) {
  $("#" + id).addClass("hover-icon");
}

function removeHover() {
  $(".icon-card").removeClass("hover-icon");
  $(".servicios-card").removeClass("hover-icon");
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

function modal() {
  $(".servicios-card").on("dblclick", function () {
    let id = $(this).attr("id");
    openModal(id);
  });
  $(".modal-open").on("click", function () {
    let id = $(this).parent().parent().attr("id");
    openModal(id);
  });
  $(".modal-close").on("click", function () {
    let id = $(".servicios-card").attr("id");
    $(".modal-content").css({opacity: "0"});
    closeModal();
  });
  $(".modal").on("mouseenter", function () {
    $(".modal-content").css({opacity: "1"});
  });
  $(".modal").on("mouseleave", function () {
    
  });
}

function openModal(id) {
  let title = $("#" + id + " h4").text();
  let text = $("#" + id + " p").text();
  let svg = $("#" + id + " .servicios-svg svg").html();

  $("html, body").css({ overflow: "hidden", margin: "0px", height: "100%" });
  $(".modal").show();

  $(".modal-content h2").text(title);
  $(".modal-content svg").html(svg);
  $(".modal-content p").text(text);
  $(".modal-content .modal-avif").attr("srcset", "build/img/servicios/"+id+".avif");
  $(".modal-content .modal-webp").attr("srcset", "build/img/servicios/"+id+".webp");
  $(".modal-content .modal-avif").attr("src", "build/img/servicios/"+id+".png");
}

function closeModal() {
  $("html, body").css({ overflow: "auto" });
  $(".modal").hide();
}
