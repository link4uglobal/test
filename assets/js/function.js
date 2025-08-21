// Lock scroll during preload
document.body.style.overflow = "hidden";
document.body.style.position = "fixed";
document.body.style.width = "100%";

// Percentage Counter Logic
let count = 0;
const percentElement = document.getElementById("percent-count");

const interval = setInterval(() => {
  if (count < 100) {
    count++;
    percentElement.textContent = count + "%";
  }
}, 30); // Speed of counting

// On window load, hide loader after 3s
window.addEventListener("load", () => {
  setTimeout(() => {
    clearInterval(interval);
    percentElement.textContent = "100%";
    document.getElementById("loader-wrapper").style.display = "none";
    document.body.classList.add("loaded");

    // Restore scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  }, 3000);
});

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = [...sections].indexOf(entry.target);
        const direction = index % 2 === 0 ? "animate-left" : "animate-right";
        entry.target.classList.add(direction);
        observer.unobserve(entry.target); // Animate only once
      }
    });
  },
  {
    threshold: 0.1,
  }
);

sections.forEach((section) => observer.observe(section));

(function ($) {
  "use strict";

  var $window = $(window);
  var $body = $("body");

  /* Preloader Effect */
  $window.on("load", function () {
    $(".preloader").fadeOut(600);
  });

  /* Sticky Header */
  if ($(".active-sticky-header").length) {
    $window.on("resize", function () {
      setHeaderHeight();
    });

    function setHeaderHeight() {
      $("header.main-header").css(
        "height",
        $("header .header-sticky").outerHeight()
      );
    }

    $(window).on("scroll", function () {
      var fromTop = $(window).scrollTop();
      setHeaderHeight();
      var headerHeight = $("header .header-sticky").outerHeight();
      $("header .header-sticky").toggleClass(
        "hide",
        fromTop > headerHeight + 100
      );
      $("header .header-sticky").toggleClass("active", fromTop > 600);
    });
  }

  /* Slick Menu JS */
  $("#menu").slicknav({
    label: "",
    prependTo: ".responsive-menu",
  });

  if ($("a[href='#top']").length) {
    $("a[href='#top']").click(function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    });
  }

  /* Hero Slider Layout JS */
  const hero_slider_layout = new Swiper(".hero-slider-layout .swiper", {
    slidesPerView: 1,
    speed: 1000,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".hero-pagination",
      clickable: true,
    },
  });

  /* Car Details Slider JS */
  if ($(".car-details-slider").length) {
    const testimonial_slider = new Swiper(".car-details-slider .swiper", {
      slidesPerView: 1,
      speed: 1000,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".car-button-next",
        prevEl: ".car-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1300: {
          slidesPerView: 4,
        },
        1600: {
          slidesPerView: 5,
        },
      },
    });
  }

  /* client logo slider JS */
  var swiper = new Swiper(".client_logo_slider", {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 6,
      },
    },
  });

  /* testimonial Slider JS */
  if ($(".testimonial-slider").length) {
    const testimonial_slider = new Swiper(".testimonial-slider .swiper", {
      slidesPerView: 1,
      speed: 1000,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".testimonial-button-next",
        prevEl: ".testimonial-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      },
    });
  }

  /* Fleets Single Image Carousel JS */
  if ($(".fleets-single-slider").length) {
    const property_photos_carousel = new Swiper(
      ".fleets-single-slider .swiper",
      {
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      }
    );
  }

  /* Team member Testimonial Slider Carousel JS */
  if ($(".team-member-slider").length) {
    const property_photos_carousel = new Swiper(".team-member-slider .swiper", {
      slidesPerView: 1,
      speed: 1000,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  /* Youtube Background Video JS */
  if ($("#herovideo").length) {
    var myPlayer = $("#herovideo").YTPlayer();
  }

  /* Init Counter */
  if ($(".counter").length) {
    $(".counter").counterUp({ delay: 6, time: 3000 });
  }

  /* Image Reveal Animation */
  if ($(".reveal").length) {
    gsap.registerPlugin(ScrollTrigger);
    let revealContainers = document.querySelectorAll(".reveal");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play none none none",
        },
      });
      tl.set(container, {
        autoAlpha: 1,
      });
      tl.from(container, 1, {
        xPercent: -100,
        ease: Power2.out,
      });
      tl.from(image, 1, {
        xPercent: 100,
        scale: 1,
        delay: -1,
        ease: Power2.out,
      });
    });
  }

  /* Text Effect Animation */
  if ($(".text-anime-style-1").length) {
    let staggerAmount = 0.05,
      translateXValue = 0,
      delayValue = 0.5,
      animatedTextElements = document.querySelectorAll(".text-anime-style-1");

    animatedTextElements.forEach((element) => {
      let animationSplitText = new SplitText(element, { type: "chars, words" });
      gsap.from(animationSplitText.words, {
        duration: 1,
        delay: delayValue,
        x: 20,
        autoAlpha: 0,
        stagger: staggerAmount,
        scrollTrigger: { trigger: element, start: "top 85%" },
      });
    });
  }

  if ($(".text-anime-style-2").length) {
    let staggerAmount = 0.03,
      translateXValue = 20,
      delayValue = 0.1,
      easeType = "power2.out",
      animatedTextElements = document.querySelectorAll(".text-anime-style-2");

    animatedTextElements.forEach((element) => {
      let animationSplitText = new SplitText(element, { type: "chars, words" });
      gsap.from(animationSplitText.chars, {
        duration: 1,
        delay: delayValue,
        x: translateXValue,
        autoAlpha: 0,
        stagger: staggerAmount,
        ease: easeType,
        scrollTrigger: { trigger: element, start: "top 85%" },
      });
    });
  }

  if ($(".text-anime-style-3").length) {
    let animatedTextElements = document.querySelectorAll(".text-anime-style-3");

    animatedTextElements.forEach((element) => {
      //Reset if needed
      if (element.animation) {
        element.animation.progress(1).kill();
        element.split.revert();
      }

      element.split = new SplitText(element, {
        type: "lines,words,chars",
        linesClass: "split-line",
      });
      gsap.set(element, { perspective: 400 });

      gsap.set(element.split.chars, {
        opacity: 0,
        x: "50",
      });

      element.animation = gsap.to(element.split.chars, {
        scrollTrigger: { trigger: element, start: "top 90%" },
        x: "0",
        y: "0",
        rotateX: "0",
        opacity: 1,
        duration: 1,
        ease: Back.easeOut,
        stagger: 0.02,
      });
    });
  }

  /* Parallaxie js */
  /* var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}*/

  /* Zoom Gallery screenshot */
  $(".gallery-items").magnificPopup({
    delegate: "a",
    type: "image",
    closeOnContentClick: false,
    closeBtnInside: false,
    mainClass: "mfp-with-zoom",
    image: {
      verticalFit: true,
    },
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
      opener: function (element) {
        return element.find("img");
      },
    },
  });

  /* Book PopUp Form */
  if ($(".popup-with-form").length) {
    $(".popup-with-form").magnificPopup({
      type: "inline",
      closeOnBgClick: false,
      preloader: false,
      midClick: true,
    });
  }

  /* Contact form validation */

  function submitForm() {
    /* Initiate Variables With Form Content*/
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#msg").val();

    $.ajax({
      type: "POST",
      url: "form-process.php",
      data:
        "fname=" +
        fname +
        "&lname=" +
        lname +
        "&email=" +
        email +
        "&phone=" +
        phone +
        "&message=" +
        message,
      success: function (text) {
        if (text == "success") {
          formSuccess();
        } else {
          submitMSG(false, text);
        }
      },
    });
  }

  function formSuccess() {
    $contactform[0].reset();
    submitMSG(true, "Message Sent Successfully!");
  }

  function submitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-success";
    } else {
      var msgClasses = "h3 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
  /* Contact form validation end */

  /* Car Booking PopUp form validation */
  var $bookingform = $("#bookingform");
  $bookingform.validator({ focus: false }).on("submit", function (event) {
    if (!event.isDefaultPrevented()) {
      event.preventDefault();
      submitbookingform();
    }
  });

  function submitbookingform() {
    /* Initiate Variables With Form Content*/
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var phone = $("#cartype").val();
    var phone = $("#pickuplocation").val();
    var date = $("#pickupdate").val();
    var phone = $("#droplocation").val();
    var date = $("#returndate").val();
    var message = $("#msg").val();

    $.ajax({
      type: "POST",
      url: "form-car-booking.php",
      data:
        "name=" +
        name +
        "&email=" +
        email +
        "&phone=" +
        phone +
        "&cartype=" +
        cartype +
        "&pickuplocation=" +
        pickuplocation +
        "&pickupdate=" +
        pickupdate +
        "&droplocation=" +
        droplocation +
        "&returndate=" +
        returndate +
        "&message=" +
        message,
      success: function (text) {
        if (text == "success") {
          bookingformSuccess();
        } else {
          appointmentsubmitMSG(false, text);
        }
      },
    });
  }

  function bookingformSuccess() {
    $bookingform[0].reset();
    appointmentsubmitMSG(true, "Message Sent Successfully!");
  }

  function appointmentsubmitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-success";
    } else {
      var msgClasses = "h3 text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
  }
  /* Appointment form validation end */

  /* Animated Wow Js */
  new WOW().init();

  /* Popup Video */
  if ($(".popup-video").length) {
    $(".popup-video").magnificPopup({
      type: "iframe",
      mainClass: "mfp-zoom-in",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: true,
    });
  }
})(jQuery);

function w3_open() {
  const sidebar = document.getElementById("mySidebar");

  // Reset animation class if needed
  sidebar.classList.remove("w3-animate-right");
  sidebar.style.display = "block";

  // Trigger slide-in animation
  requestAnimationFrame(() => {
    sidebar.classList.add("w3-animate-left");
  });

  // Lock scroll
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
}

function w3_close() {
  const sidebar = document.getElementById("mySidebar");

  // Remove entry animation
  sidebar.classList.remove("w3-animate-left");

  // Trigger slide-out animation
  sidebar.classList.add("w3-animate-right");

  // Wait for animation, then hide and cleanup
  setTimeout(() => {
    sidebar.style.display = "none";
    sidebar.classList.remove("w3-animate-right");

    // Restore scroll
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
  }, 900); // duration must match CSS animation
}

// exper
document.addEventListener("DOMContentLoaded", function () {
  const stats = document.querySelectorAll(".stat-box");
  stats.forEach((box, index) => {
    box.style.opacity = 0;
    box.style.transform = "translateY(20px)";
    setTimeout(() => {
      box.style.transition = "all 0.6s ease";
      box.style.opacity = 1;
      box.style.transform = "translateY(0)";
    }, index * 200);
  });
});

function animateCounter(element, end, duration = 2000) {
  let start = 0;
  const increment = end / (duration / 10); // updates every 20ms

  const counter = setInterval(() => {
    start += increment;
    if (start >= end) {
      element.innerText = end;
      clearInterval(counter);
    } else {
      element.innerText = Math.floor(start);
    }
  }, 20);
}
// for counter 
document.addEventListener("DOMContentLoaded", () => {
  if ($(".odometer").length) {
    const counters = document.querySelectorAll(".odometer");
    if (counters) {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-count"));
        animateCounter(counter, target);
      });
    }
  }
});
//   sell car form
if ($("#openFormBtnSell").length) {
  const popup = document.getElementById("popupForm");
    const openBtn = document.getElementById("openFormBtnSell");
    const closeBtn = document.querySelector(".sell-car-form-close");

    openBtn.onclick = () => (popup.style.display = "flex");
    closeBtn.onclick = () => (popup.style.display = "none");
    window.onclick = (e) => {
      if (e.target == popup) popup.style.display = "none";
    };

      const form = document.getElementById("sellCarForm");
        const message = document.getElementById("formMessage");

        function showError(input, msg) {
            input.classList.add("error");
            const existing = input.nextElementSibling;
            if (!existing || !existing.classList.contains("error-message")) {
                const error = document.createElement("div");
                error.className = "error-message";
                error.textContent = msg;
                input.after(error);
            }
        }

        function clearErrors() {
            document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
            document.querySelectorAll(".error-message").forEach(el => el.remove());
        }

        function validateFieldOnInput(input, validateFn) {
            input.addEventListener("input", () => {
                const errorElement = input.nextElementSibling;
                if (validateFn(input.value)) {
                    if (errorElement && errorElement.classList.contains("error-message")) {
                        errorElement.remove();
                        input.classList.remove("error");
                    }
                }
            });
        }

        validateFieldOnInput(document.getElementById("name"), val => /^.{4,10}$/.test(val));
        validateFieldOnInput(document.getElementById("phone"), val => /^\d{10}$/.test(val));
        validateFieldOnInput(document.getElementById("brand"), val => /^[A-Za-z0-9\/\- ]{2,}$/.test(val));
        validateFieldOnInput(document.getElementById("model"), val => /^[A-Za-z0-9\/\- ]{2,}$/.test(val));
        validateFieldOnInput(document.getElementById("location"), val => /^[A-Za-z0-9\/\- ]{2,}$/.test(val));
        validateFieldOnInput(document.getElementById("year"), val => {
            const y = parseInt(val);
            const currentYear = new Date().getFullYear();
            return y >= 2000 && y <= currentYear;
        });

        form.addEventListener("submit", async function (e) {
            e.preventDefault();
            clearErrors();
            message.textContent = "";

            const name = document.getElementById("name");
            const phone = document.getElementById("phone");
            const brand = document.getElementById("brand");
            const model = document.getElementById("model");
            const year = document.getElementById("year");
            const location = document.getElementById("location");

            let hasError = false;

            if (!/^.{4,20}$/.test(name.value)) {
                showError(name, "Enter full name");
                hasError = true;
            }

            if (!/^\d{10}$/.test(phone.value)) {
                showError(phone, "Phone must be 10 digits.");
                hasError = true;
            }

            if (!/^[A-Za-z0-9\/\- ]{2,}$/.test(brand.value)) {
                showError(brand, "Brand must be at least 2 valid characters.");
                hasError = true;
            }

            if (!/^[A-Za-z0-9\/\- ]{2,}$/.test(model.value)) {
                showError(model, "Model must be at least 2 valid characters.");
                hasError = true;
            }

            const y = parseInt(year.value);
            const currentYear = new Date().getFullYear();
            if (!(y >= 2000 && y <= currentYear)) {
                showError(year, `Year must be between 2000 and ${currentYear}.`);
                hasError = true;
            }

            if (!/^[A-Za-z0-9\/\- ]{3,}$/.test(location.value)) {
                showError(location, "Location must be at least 3 valid characters.");
                hasError = true;
            }

            if (hasError) return;
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (response.ok) {
                    form.reset();
                    message.innerHTML = "<p class='success-message'>✅ Thank you! Your car details have been submitted successfully.</p>";
                    setTimeout(() => {
                        popup.style.display = "none";
                        message.innerHTML = "";
                    }, 3000);
                } else {
                    message.innerHTML = "<p class='error-message'>❌ Something went wrong. Please try again.</p>";
                }
            } catch (error) {
                message.innerHTML = "<p class='error-message'>⚠️ Network error. Please check your connection.</p>";
            }
        });
}
