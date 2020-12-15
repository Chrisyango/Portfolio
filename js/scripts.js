(function($) {
  'use strict';

  $( document ).ready(function() {
    $('#slider h1').css({
      "transform": "translateY(-50%)",
      "opacity": 1
    });
    $('header').css({
      "right": 0,
      "opacity": 1
    });
  });

  // Navigation on click open the selected option
  let navContainer = $("#nav-container");
  let navItems = $("#nav-items");
  let overlay = $("#overlay");

  $('#nav li a').click(function(){
    event.preventDefault();
    let liNumber = $(this).parent().index();
    let currentPosition = $(window).scrollTop();
    $(window).scroll(function() {
        $(window).scrollTop(currentPosition);
    });
    navContainer.find('.nav-item').eq(liNumber).css('display', 'block');
    navItems.css('z-index', '1');
    overlay.css("background", 'rgba(0,0,0,0.5)');
    navContainer.animate({"right": '0'}, 1000);
  });

  function closeNav() {
    navContainer.animate({"right": '-50vw'}, 1000);
    overlay.css("background", 'rgba(0,0,0,0)');
    $(window).off('scroll');
    setTimeout(function() {
      navItems.css("z-index", '-1');
      $('#nav-container .nav-item').css('display', 'none');
    }, 1000);
  }
  
  $('#close-nav, #overlay').click(function() {
    event.preventDefault();
    closeNav();
  });
  
  // Validate Form
  const constraints = {
    name: {
        presence: { allowEmpty: false }
    },
    email: {
        presence: { allowEmpty: false },
        email: true
    },
    message: {
        presence: { allowEmpty: false }
    }
};

const form = $('#contact-form')[0];

form.addEventListener('submit', function (event) {
  const formValues = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      message: form.elements.message.value
  };

  const errors = validate(formValues, constraints);

  if (errors) {
    event.preventDefault();
    const errorMessage = Object
        .values(errors)
        .map(function (fieldValues) { return fieldValues.join(', ')})
        .join("\n");

    alert(errorMessage);
  }
}, false);

})(jQuery);