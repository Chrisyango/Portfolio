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

  // Navigation onClick open the selected option
  let navContainer = $("#nav-container");
  let navItems = $("#nav-items");
  let overlay = $("#overlay");
  $('#nav li a').click(function(){
    event.preventDefault();
    let currentPosition = $(window).scrollTop();
    $(window).scroll(function() {
        $(window).scrollTop(currentPosition);
    });
    navItems.css('z-index', '1');
    navContainer.css('right', '0');
    overlay.css("background", 'rgba(0,0,0,0.5)');
  });

  function closeNav() {
    navContainer.css('right', '-50vw');
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

  $('#nav li').click(function() {
    let liNumber = $(this).index();
    navContainer.find('.nav-item').eq(liNumber).css('display', 'block');
  });

  // Contact Form
  let contact = $('#contact');
  let createForm = $('<form action="POST" data-netlify="true" id="contact-form">\
    <h2>Contact Me</h2>\
    <p><label>Name:</label> <input name="name" type="text" /></p>\
    <p><label>Email Address:</label> <input name="email" type="email" /></p>\
    <p><label>Message:</label>  <textarea name="message"></textarea> </p>\
    <p><div data-netlify-recaptcha="true"></div></p>\
    <p><button type="submit" value="Send" style="cursor: pointer;">Send</button></p>\
    </form>');
  contact.append(createForm);
  
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