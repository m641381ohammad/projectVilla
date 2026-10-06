$(".card-carousel-all-same").owlCarousel({
  rtl: true,
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  items: 4,

  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 2.2,
    },
    992: {
      items: 3.2,
    },
    1200: {
      items: 3.5,
    },
    1400: {
      items: 4.5,
    },
  },
});

$(".card-carousel-magazine-dashboard").owlCarousel({
  rtl: true,
  loop: true,
  margin: 5,
  nav: true,
  dots: false,
  items: 2,

  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 1.4,
    },
    1200: {
      items: 2,
    },
  },
});

$(".owl-carousel-stores").owlCarousel({
  loop: true,
  margin: 5,
  nav: true,
  dots: false,
  rtl: true,
  items: 8.4,

  responsiveClass: true,
  responsive: {
    0: {
      items: 3.4,
    },
    400: {
      items: 5.4,
    },
    576: {
      items: 5.4,
    },
    768: {
      items: 5.4,
    },
    992: {
      items: 8.4,
    },
  },
});

$(".owl-carousel-stores").owlCarousel({
  rewind: false,
  margin: 5,
  nav: true,
  dots: false,
  rtl: true,
  items: 8.4,

  //   responsiveClass: true,
  responsive: {
    0: {
      items: 3.4,
    },
    400: {
      items: 5.4,
    },
    576: {
      items: 5.4,
    },
    768: {
      items: 5.4,
    },
    992: {
      items: 8.4,
    },
  },
});

$(".cities .discount-city").on("click", function (e) {
  let data = $(e.currentTarget).attr("data");
  $(".tab-section").removeClass("show-section");
  $(".tab-section[data-target='" + data + "']").addClass("show-section");
  $(".cities .discount-city").removeClass(
    "active-motivational-travel-discounts",
  );
  $(".cities .discount-city[data='" + data + "']").addClass(
    "active-motivational-travel-discounts",
  );
});

///////////////////////////////////////////////////////
$(document).ready(function () {
  $(".accommodation-Details .btn-filter").on("click", function (e) {
    $(".btn-filter").removeClass("btn-filter-active");
    $(this).addClass("btn-filter-active");
  });

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  let currentMonthIndex = 9;
  let currentYear = 1404;

  const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let checkinDate = null;
  let checkoutDate = null;

  function isLeapYear(year) {
    const a = (year + 2346) % 2820;
    return a === 0 || (a % 128 === 0 && a % 4 !== 0);
  }

  function getDaysInMonth(year, monthIndex) {
    if (monthIndex === 11 && isLeapYear(year)) {
      return 30;
    }
    return daysInMonth[monthIndex];
  }

  function getFirstDayOfMonth(year, monthIndex) {
    let totalDays = 0;

    for (let y = 1300; y < year; y++) {
      totalDays += isLeapYear(y) ? 366 : 365;
    }

    for (let m = 0; m < monthIndex; m++) {
      totalDays += m === 11 ? getDaysInMonth(year, m) : daysInMonth[m];
    }

    const baseDay = 6;
    return (baseDay + totalDays) % 7;
  }

  function generateCalendarDays(year, monthIndex, containerId) {
    const container = $(`#${containerId}`);
    container.empty();

    const totalDays = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);

    for (let i = 0; i < firstDay; i++) {
      container.append('<div class="day-cell empty"></div>');
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayCell = $('<div class="day-cell"></div>');
      dayCell.text(day);

      dayCell.attr("data-year", year);
      dayCell.attr("data-month", monthIndex);
      dayCell.attr("data-day", day);

      const dayOfWeek = (firstDay + day - 1) % 7;

      if (dayOfWeek === 6) {
        dayCell.addClass("friday");
      }

      if (
        checkinDate &&
        checkinDate.year === year &&
        checkinDate.month === monthIndex &&
        checkinDate.day === day
      ) {
        if (checkoutDate) {
          dayCell.addClass("start-date");
        } else {
          dayCell.addClass("single-date");
        }
      }

      if (
        checkoutDate &&
        checkoutDate.year === year &&
        checkoutDate.month === monthIndex &&
        checkoutDate.day === day
      ) {
        dayCell.addClass("end-date");
      }

      if (checkinDate && checkoutDate) {
        const currentDate = { year, month: monthIndex, day };
        if (
          compareDates(currentDate, checkinDate) > 0 &&
          compareDates(currentDate, checkoutDate) < 0
        ) {
          dayCell.addClass("in-range");
        }
      }

      dayCell.on("click", function () {
        handleDayClick($(this));
      });

      container.append(dayCell);
    }
  }

  function compareDates(date1, date2) {
    if (date1.year !== date2.year) {
      return date1.year > date2.year ? 1 : -1;
    }
    if (date1.month !== date2.month) {
      return date1.month > date2.month ? 1 : -1;
    }
    if (date1.day !== date2.day) {
      return date1.day > date2.day ? 1 : -1;
    }
    return 0;
  }

  function handleDayClick(cell) {
    const year = parseInt(cell.attr("data-year"));
    const month = parseInt(cell.attr("data-month"));
    const day = parseInt(cell.attr("data-day"));

    const clickedDate = { year, month, day };

    if (!checkinDate || (checkinDate && checkoutDate)) {
      checkinDate = clickedDate;
      checkoutDate = null;
    } else if (checkinDate && !checkoutDate) {
      if (compareDates(clickedDate, checkinDate) > 0) {
        checkoutDate = clickedDate;
      } else if (compareDates(clickedDate, checkinDate) < 0) {
        checkinDate = clickedDate;
        checkoutDate = null;
      } else {
        checkinDate = null;
      }
    }

    updateUI();
  }

  function calculateNights(start, end) {
    if (!start || !end) return 0;

    let totalDays = 0;
    const current = { year: start.year, month: start.month, day: start.day };

    while (compareDates(current, end) < 0) {
      totalDays++;

      current.day++;
      if (current.day > getDaysInMonth(current.year, current.month)) {
        current.day = 1;
        current.month++;
        if (current.month > 11) {
          current.month = 0;
          current.year++;
        }
      }
    }

    return totalDays;
  }

  function formatDate(date) {
    if (!date) return "---";
    return `${date.day} ${months[date.month]} ${date.year}`;
  }

  function updateUI() {
    generateCalendarDays(currentYear, currentMonthIndex, "month1-days");

    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextMonthYear =
      currentMonthIndex === 11 ? currentYear + 1 : currentYear;

    generateCalendarDays(nextMonthYear, nextMonthIndex, "month2-days");

    $("#month1-name").text(months[currentMonthIndex]);
    $("#month1-year").text(currentYear);

    $("#month2-name").text(months[nextMonthIndex]);
    $("#month2-year").text(nextMonthYear);

    $(".month-box").removeClass("active");
    $(".month-box").first().addClass("active");

    if (checkinDate) {
      $("#checkin-text").text(formatDate(checkinDate));

      if (checkoutDate) {
        $("#checkout-text").text(formatDate(checkoutDate));
        const nights = calculateNights(checkinDate, checkoutDate);
        $("#nights-text").text(nights);
      } else {
        $("#checkout-text").text("---");
        $("#nights-text").text("0");
      }
    } else {
      $("#checkin-text").text("---");
      $("#checkout-text").text("---");
      $("#nights-text").text("0");
    }
  }

  $(".btn-prev").on("click", function () {
    if (currentMonthIndex === 0) {
      currentMonthIndex = 11;
      currentYear--;
    } else {
      currentMonthIndex--;
    }
    updateUI();
  });

  $(".btn-next").on("click", function () {
    if (currentMonthIndex === 11) {
      currentMonthIndex = 0;
      currentYear++;
    } else {
      currentMonthIndex++;
    }
    updateUI();
  });

  $(".btn-clear").on("click", function () {
    checkinDate = null;
    checkoutDate = null;
    updateUI();
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      checkinDate = null;
      checkoutDate = null;
      updateUI();
    }
  });

  updateUI();

  window.getCheckinDate = function () {
    return checkinDate ? formatDate(checkinDate) : null;
  };

  window.getCheckoutDate = function () {
    return checkoutDate ? formatDate(checkoutDate) : null;
  };

  window.getNights = function () {
    if (checkinDate && checkoutDate) {
      return calculateNights(checkinDate, checkoutDate);
    }
    return 0;
  };

  window.clearDates = function () {
    checkinDate = null;
    checkoutDate = null;
    updateUI();
  };

  window.getRawDates = function () {
    return {
      checkin: checkinDate,
      checkout: checkoutDate,
      nights:
        checkinDate && checkoutDate
          ? calculateNights(checkinDate, checkoutDate)
          : 0,
    };
  };
});
///////////////////////////////////////////////////////

///////////////////////
$(document).ready(function () {
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar-scroll");

    if (window.scrollY > 999) {
      navbar.classList.add("fixed-top");
      navbar.classList.add("scroll");
      console.log("ok Scroll Navbar");
    } else {
      navbar.classList.remove("fixed-top");
      navbar.classList.remove("scroll");
      console.log("no Scroll Navbar");
    }
  });
});

/////////////////
$(document).ready(function () {
  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let currentMonthIndex = 9;
  let currentYear = 1404;

  let checkinDate = null;
  let checkoutDate = null;
  let activePopup = null;

  function getDaysInMonth(year, monthIndex) {
    if (monthIndex === 11) {
      const a = (year + 2346) % 2820;
      return a === 0 || (a % 128 === 0 && a % 4 !== 0) ? 30 : 29;
    }
    return daysInMonth[monthIndex];
  }

  function getFirstDayOfMonth(year, monthIndex) {
    let totalDays = 0;
    for (let y = 1300; y < year; y++) {
      totalDays += getDaysInMonth(y, 11) === 30 ? 366 : 365;
    }
    for (let m = 0; m < monthIndex; m++) {
      totalDays += getDaysInMonth(year, m);
    }
    return (6 + totalDays) % 7;
  }

  function compareDates(d1, d2) {
    if (!d1 || !d2) return 0;
    if (d1.year !== d2.year) return d1.year > d2.year ? 1 : -1;
    if (d1.month !== d2.month) return d1.month > d2.month ? 1 : -1;
    if (d1.day !== d2.day) return d1.day > d2.day ? 1 : -1;
    return 0;
  }

  function formatDate(date) {
    if (!date) return "انتخاب تاریخ";
    return date.day + " " + months[date.month] + " " + date.year;
  }

  function buildPopupHTML() {
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;

    let html = "";
    html += '<div class="calendar-popup-header">';
    html +=
      '<button class="nav-btn prev-month-btn"><i class="fas fa-chevron-right"></i></button>';
    html += '<div class="month-title-group">';
    html +=
      '<div class="month-box"><span class="year">' +
      currentYear +
      '</span><span class="month-name">' +
      months[currentMonthIndex] +
      "</span></div>";
    html +=
      '<div class="month-box"><span class="year">' +
      nextYear +
      '</span><span class="month-name">' +
      months[nextMonthIndex] +
      "</span></div>";
    html += "</div>";
    html +=
      '<button class="nav-btn next-month-btn"><i class="fas fa-chevron-left"></i></button>';
    html += "</div>";

    html += '<div class="calendars-row">';
    html +=
      '<div class="calendar-month"><div class="weekdays-row"><div class="weekday-cell">ش</div><div class="weekday-cell">ی</div><div class="weekday-cell">د</div><div class="weekday-cell">س</div><div class="weekday-cell">چ</div><div class="weekday-cell">پ</div><div class="weekday-cell friday">ج</div></div><div class="days-grid month1-days"></div></div>';
    html +=
      '<div class="calendar-month"><div class="weekdays-row"><div class="weekday-cell">ش</div><div class="weekday-cell">ی</div><div class="weekday-cell">د</div><div class="weekday-cell">س</div><div class="weekday-cell">چ</div><div class="weekday-cell">پ</div><div class="weekday-cell friday">ج</div></div><div class="days-grid month2-days"></div></div>';
    html += "</div>";

    html +=
      '<div class="legend-row"><div class="legend-item"><span class="legend-dot selected-dot"></span><span>انتخاب</span></div><div class="legend-item"><span class="legend-dot range-dot"></span><span>بازه</span></div></div>';

    return html;
  }

  function fillDays(popup) {
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextYear = currentMonthIndex === 11 ? currentYear + 1 : currentYear;
    fillMonthDays(popup.find(".month1-days"), currentYear, currentMonthIndex);
    fillMonthDays(popup.find(".month2-days"), nextYear, nextMonthIndex);
  }

  function fillMonthDays(container, year, monthIndex) {
    container.empty();
    const totalDays = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);

    for (let i = 0; i < firstDay; i++) {
      container.append('<div class="day-cell empty"></div>');
    }

    for (let day = 1; day <= totalDays; day++) {
      const cell = $('<div class="day-cell"></div>').text(day);
      cell.attr("data-year", year);
      cell.attr("data-month", monthIndex);
      cell.attr("data-day", day);

      const dow = (firstDay + day - 1) % 7;
      if (dow === 6) cell.addClass("friday");

      if (
        checkinDate &&
        checkinDate.year === year &&
        checkinDate.month === monthIndex &&
        checkinDate.day === day
      ) {
        cell.addClass(checkoutDate ? "start-date" : "single-date");
      }
      if (
        checkoutDate &&
        checkoutDate.year === year &&
        checkoutDate.month === monthIndex &&
        checkoutDate.day === day
      ) {
        cell.addClass("end-date");
      }
      if (checkinDate && checkoutDate) {
        const curr = { year, month: monthIndex, day };
        if (
          compareDates(curr, checkinDate) > 0 &&
          compareDates(curr, checkoutDate) < 0
        ) {
          cell.addClass("in-range");
        }
      }

      cell.on("click", function () {
        const clickedDate = {
          year: parseInt($(this).attr("data-year")),
          month: parseInt($(this).attr("data-month")),
          day: parseInt($(this).attr("data-day")),
        };

        if (!checkinDate || (checkinDate && checkoutDate)) {
          checkinDate = clickedDate;
          checkoutDate = null;
        } else if (checkinDate && !checkoutDate) {
          if (compareDates(clickedDate, checkinDate) > 0) {
            checkoutDate = clickedDate;
            closePopup();
          } else if (compareDates(clickedDate, checkinDate) < 0) {
            checkinDate = clickedDate;
          }
        }

        updateDisplay();
        refreshPopup();
      });

      container.append(cell);
    }
  }

  function updateDisplay() {
    if (checkinDate) {
      $("#checkin-display").text(formatDate(checkinDate)).addClass("selected");
    } else {
      $("#checkin-display").text("انتخاب تاریخ").removeClass("selected");
    }

    if (checkoutDate) {
      $("#checkout-display")
        .text(formatDate(checkoutDate))
        .addClass("selected");
    } else {
      $("#checkout-display").text("انتخاب تاریخ").removeClass("selected");
    }
  }

  function refreshPopup() {
    if (activePopup) {
      const popup = $("#" + activePopup + "-popup");
      popup.html(buildPopupHTML());
      fillDays(popup);

      popup.find(".prev-month-btn").on("click", function (e) {
        e.stopPropagation();
        if (currentMonthIndex === 0) {
          currentMonthIndex = 11;
          currentYear--;
        } else {
          currentMonthIndex--;
        }
        refreshPopup();
      });

      popup.find(".next-month-btn").on("click", function (e) {
        e.stopPropagation();
        if (currentMonthIndex === 11) {
          currentMonthIndex = 0;
          currentYear++;
        } else {
          currentMonthIndex++;
        }
        refreshPopup();
      });
    }
  }

  function openPopup(type) {
    closePopup();
    activePopup = type;

    const trigger = $("#" + type + "-trigger");
    const popup = $("#" + type + "-popup");

    trigger.addClass("active");
    popup.html(buildPopupHTML());
    fillDays(popup);
    popup.addClass("show");
    $("#calendar-overlay").addClass("show");

    popup.find(".prev-month-btn").on("click", function (e) {
      e.stopPropagation();
      if (currentMonthIndex === 0) {
        currentMonthIndex = 11;
        currentYear--;
      } else {
        currentMonthIndex--;
      }
      refreshPopup();
    });

    popup.find(".next-month-btn").on("click", function (e) {
      e.stopPropagation();
      if (currentMonthIndex === 11) {
        currentMonthIndex = 0;
        currentYear++;
      } else {
        currentMonthIndex++;
      }
      refreshPopup();
    });
  }

  function closePopup() {
    $(".calendar-popup").removeClass("show");
    $(".date-input-wrapper").removeClass("active");
    $("#calendar-overlay").removeClass("show");
    activePopup = null;
  }

  $("#checkin-trigger").on("click", function (e) {
    e.stopPropagation();
    activePopup === "checkin" ? closePopup() : openPopup("checkin");
  });

  $("#checkout-trigger").on("click", function (e) {
    e.stopPropagation();
    activePopup === "checkout" ? closePopup() : openPopup("checkout");
  });

  $("#calendar-overlay").on("click", closePopup);

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });

  updateDisplay();
});

/////////////////

/////////////////
$(document).ready(function () {
  function fetchImagesFromBackend() {
    const sampleData = {
      title: "کلبه سوئیسی استخردار در چالوس",
      images: [
        "images&icons/7e2d5e7d-.png",
        "images&icons/12.png",
        "images&icons/12.png",
        "images&icons/12.png",
        "images&icons/12.png",
        "images&icons/12.png",
        "images&icons/12.png",
        "images&icons/12.png",
      ],
    };

    initGallery(sampleData.images, sampleData.title);
  }

  let galleryImages = [];
  let currentIndex = 0;
  let totalImages = 0;

  function initGallery(images, title) {
    galleryImages = images;
    totalImages = images.length;
    currentIndex = 0;

    $("#villaTitle").text(title || "");

    updateMainImage(0);

    buildThumbnails();

    updateCounter();
  }

  function buildThumbnails() {
    const container = $("#thumbnailsContainer");
    container.empty();

    const maxDisplay = 4;
    const displayCount = Math.min(totalImages - 1, maxDisplay);
    const remaining = totalImages - 1 - maxDisplay;

    if (displayCount <= 0) {
      container.addClass("single-thumb");
      return;
    }

    if (displayCount === 1) {
      container.addClass("single-thumb");
    } else if (displayCount === 2) {
      container.addClass("two-thumbs");
    } else {
      container.addClass("many-thumbs");
    }

    for (let i = 1; i <= displayCount; i++) {
      const thumbWrapper = $(`
              <div class="thumbnail-wrapper" data-image-index="${i}">
                  <img src="${galleryImages[i]}" alt="عکس ${
                    i + 1
                  }" class="thumbnail-image">
                  <div class="thumbnail-overlay"></div>
              </div>
          `);
      container.append(thumbWrapper);
    }

    if (remaining > 0) {
      const lastThumb = container.find(".thumbnail-wrapper").last();
      lastThumb.addClass("show-all");
      lastThumb.attr("data-image-index", totalImages - 1);

      lastThumb.attr("data-remaining", "+" + remaining);
      lastThumb.find(".thumbnail-overlay").css("display", "none");
    }
  }

  function updateMainImage(index) {
    if (index < 0) index = totalImages - 1;
    if (index >= totalImages) index = 0;

    currentIndex = index;

    $("#mainImage").attr("src", galleryImages[index]);
    $("#mainImage").attr("alt", "عکس " + (index + 1));

    $(".thumbnail-wrapper").removeClass("active-thumb");
    $(`.thumbnail-wrapper[data-image-index="${index}"]`).addClass(
      "active-thumb",
    );

    updateCounter();
  }

  function updateCounter() {
    $("#currentImageNum").text(currentIndex + 1);
    $("#totalImagesNum").text(totalImages);
  }

  $(document).on("click", ".thumbnail-wrapper", function () {
    const index = parseInt($(this).attr("data-image-index"));

    if (index >= 0 && index < totalImages) {
      openModal(index);
    }
  });

  $("#mainImageWrapper").on("click", function (e) {
    if (
      !$(e.target).closest(".gallery-nav").length &&
      !$(e.target).closest(".image-counter").length
    ) {
      openModal(currentIndex);
    }
  });

  $("#prevBtn").on("click", function (e) {
    e.stopPropagation();
    updateMainImage(currentIndex - 1);
  });

  $("#nextBtn").on("click", function (e) {
    e.stopPropagation();
    updateMainImage(currentIndex + 1);
  });

  function openModal(index) {
    currentIndex = index;
    buildModalThumbnails();
    updateModalImage(index);
    $("#galleryModal").addClass("show");
    $("body").css("overflow", "hidden");
  }

  function closeModal() {
    $("#galleryModal").removeClass("show");
    $("body").css("overflow", "");
    updateMainImage(currentIndex);
  }

  function updateModalImage(index) {
    if (index < 0) index = totalImages - 1;
    if (index >= totalImages) index = 0;

    currentIndex = index;

    $("#modalImage").css("opacity", "0");
    setTimeout(function () {
      $("#modalImage").attr("src", galleryImages[index]);
      $("#modalImage").css("opacity", "1");
    }, 150);

    $("#modalCounter").text(index + 1 + " / " + totalImages);

    $(".modal-thumb-item").removeClass("active");
    $(`.modal-thumb-item[data-modal-index="${index}"]`).addClass("active");

    const activeThumb = $(`.modal-thumb-item[data-modal-index="${index}"]`);
    const container = $("#modalThumbnails");
    if (activeThumb.length) {
      const pos = activeThumb.position().left + container.scrollLeft();
      container.animate({ scrollLeft: pos - 30 }, 250);
    }
  }

  function buildModalThumbnails() {
    const container = $("#modalThumbnails");
    container.empty();

    galleryImages.forEach(function (imgSrc, i) {
      const thumb = $(`
              <div class="modal-thumb-item ${
                i === currentIndex ? "active" : ""
              }" data-modal-index="${i}">
                  <img src="${imgSrc}" alt="عکس ${i + 1}">
              </div>
          `);
      container.append(thumb);
    });
  }

  $(document).on("click", ".modal-thumb-item", function () {
    const index = parseInt($(this).attr("data-modal-index"));
    updateModalImage(index);
  });

  $("#modalPrevBtn").on("click", function () {
    updateModalImage(currentIndex - 1);
  });

  $("#modalNextBtn").on("click", function () {
    updateModalImage(currentIndex + 1);
  });

  $("#modalCloseBtn").on("click", closeModal);

  $("#galleryModal").on("click", function (e) {
    if ($(e.target).is("#galleryModal")) {
      closeModal();
    }
  });

  // کیبورد
  $(document).on("keydown", function (e) {
    if ($("#galleryModal").hasClass("show")) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") updateModalImage(currentIndex - 1);
      if (e.key === "ArrowLeft") updateModalImage(currentIndex + 1);
    }
  });

  fetchImagesFromBackend();
});
/////////////////

///////////////////////////////////////////////////////
(function () {
  // ========== لیست شهرها ==========
  const cities = [
    "تهران",
    "مشهد",
    "اصفهان",
    "شیراز",
    "تبریز",
    "کرج",
    "قم",
    "اهواز",
    "رشت",
    "کرمانشاه",
    "زاهدان",
    "همدان",
    "کرمان",
    "اراک",
    "یزد",
    "اردبیل",
    "بندرعباس",
    "قزوین",
    "زنجان",
    "سنندج",
    "خرم‌آباد",
    "بوشهر",
    "ساری",
    "گرگان",
    "چالوس",
    "نوشهر",
    "رامسر",
    "تنکابن",
    "آمل",
    "بابلسر",
    "محمودآباد",
    "نور",
  ];

  // ========== ماه‌های شمسی ==========
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  // ========== متغیرهای تقویم ==========
  let checkinDate = null;
  let checkoutDate = null;
  let currentCheckinYear = 1405,
    currentCheckinMonth = 0;
  let currentCheckoutYear = 1405,
    currentCheckoutMonth = 0;

  // ========== متغیرهای تعداد نفرات ==========
  let adultCount = 2,
    childCount = 0,
    infantCount = 0;

  // ========== توابع کمکی ==========
  function closeAllDropdowns() {
    document
      .querySelectorAll(".dropdown")
      .forEach((drop) => drop.classList.remove("show"));
  }

  // ========== 1. شهرها ==========
  function renderCities(searchTerm = "") {
    const filtered = cities.filter((city) => city.includes(searchTerm));
    const container = document.getElementById("cityList");
    if (!container) return;
    container.innerHTML = "";
    filtered.forEach((city) => {
      const item = document.createElement("div");
      item.className = "dropdown-item";
      item.textContent = city;
      item.onclick = () => {
        document.getElementById("cityInput").value = city;
        closeAllDropdowns();
      };
      container.appendChild(item);
    });
  }

  const cityInput = document.getElementById("cityInput");
  const cityDropdown = document.getElementById("cityDropdown");
  if (cityInput) {
    cityInput.onclick = (e) => {
      e.stopPropagation();
      closeAllDropdowns();
      renderCities("");
      cityDropdown.classList.add("show");
      setTimeout(() => document.getElementById("citySearch")?.focus(), 50);
    };
  }
  const citySearch = document.getElementById("citySearch");
  if (citySearch) {
    citySearch.oninput = (e) => renderCities(e.target.value);
  }

  // ========== 2. تقویم شمسی ==========
  function getDaysInMonth(year, month) {
    const days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    if (month === 11) {
      const a = (year + 2346) % 2820;
      const isLeap = a === 0 || (a % 128 === 0 && a % 4 !== 0);
      return isLeap ? 30 : 29;
    }
    return days[month];
  }

  function getFirstDayOfMonth(year, month) {
    let total = 0;
    const days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    for (let y = 1400; y < year; y++) {
      total += getDaysInMonth(y, 11) === 30 ? 366 : 365;
    }
    for (let m = 0; m < month; m++) total += days[m];
    return (total + 5) % 7;
  }

  function renderCalendar(containerId, year, month, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    let html = `
                <div class="calendar-header">
                    <button class="calendar-nav" data-dir="prev">❮</button>
                    <div class="calendar-title">${persianMonths[month]} ${year}</div>
                    <button class="calendar-nav" data-dir="next">❯</button>
                </div>
                <div class="calendar-weekdays">
                    <div class="calendar-weekday">ش</div><div class="calendar-weekday">ی</div>
                    <div class="calendar-weekday">د</div><div class="calendar-weekday">س</div>
                    <div class="calendar-weekday">چ</div><div class="calendar-weekday">پ</div>
                    <div class="calendar-weekday">ج</div>
                </div>
                <div class="calendar-days" id="${type}-days"></div>
            `;
    container.innerHTML = html;

    const daysContainer = document.getElementById(`${type}-days`);

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement("div");
      empty.style.visibility = "hidden";
      daysContainer.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "calendar-day";
      dayDiv.textContent = d;

      const isSelected =
        type === "checkin" &&
        checkinDate &&
        checkinDate.year === year &&
        checkinDate.month === month &&
        checkinDate.day === d;
      if (isSelected) dayDiv.classList.add("selected");

      dayDiv.onclick = (e) => {
        e.stopPropagation();
        selectDate(type, year, month, d);
      };
      daysContainer.appendChild(dayDiv);
    }

    container.querySelectorAll(".calendar-nav").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const dir = btn.getAttribute("data-dir");
        let newYear = year,
          newMonth = month;
        if (dir === "prev") {
          if (month === 0) {
            newYear--;
            newMonth = 11;
          } else newMonth--;
        } else {
          if (month === 11) {
            newYear++;
            newMonth = 0;
          } else newMonth++;
        }
        renderCalendar(containerId, newYear, newMonth, type);
        if (type === "checkin") {
          currentCheckinYear = newYear;
          currentCheckinMonth = newMonth;
        } else {
          currentCheckoutYear = newYear;
          currentCheckoutMonth = newMonth;
        }
      };
    });
  }

  function selectDate(type, year, month, day) {
    const dateStr = `${year}/${(month + 1).toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
    if (type === "checkin") {
      document.getElementById("checkinInput").value = dateStr;
      checkinDate = { year, month, day };
      closeAllDropdowns();
    } else {
      if (checkinDate) {
        if (
          year < checkinDate.year ||
          (year === checkinDate.year && month < checkinDate.month) ||
          (year === checkinDate.year &&
            month === checkinDate.month &&
            day <= checkinDate.day)
        ) {
          alert("تاریخ خروج باید بعد از تاریخ ورود باشد");
          return;
        }
      }
      document.getElementById("checkoutInput").value = dateStr;
      checkoutDate = { year, month, day };
      closeAllDropdowns();
    }
  }

  // تاریخ ورود
  const checkinInput = document.getElementById("checkinInput");
  const checkinDropdown = document.getElementById("checkinDropdown");
  if (checkinInput) {
    checkinInput.onclick = (e) => {
      e.stopPropagation();
      closeAllDropdowns();
      renderCalendar(
        "checkinDropdown",
        currentCheckinYear,
        currentCheckinMonth,
        "checkin",
      );
      checkinDropdown.classList.add("show");
    };
  }

  // تاریخ خروج
  const checkoutInput = document.getElementById("checkoutInput");
  const checkoutDropdown = document.getElementById("checkoutDropdown");
  if (checkoutInput) {
    checkoutInput.onclick = (e) => {
      e.stopPropagation();
      if (!checkinDate) {
        alert("لطفاً ابتدا تاریخ ورود را انتخاب کنید");
        return;
      }
      closeAllDropdowns();
      renderCalendar(
        "checkoutDropdown",
        currentCheckoutYear,
        currentCheckoutMonth,
        "checkout",
      );
      checkoutDropdown.classList.add("show");
    };
  }

  // ========== 3. تعداد نفرات ==========
  function updateGuestDisplay() {
    const total = adultCount + childCount + infantCount;
    document.getElementById("guestInput").value = total + " نفر";

    const adultSpan = document.getElementById("guestAdultCount");
    const childSpan = document.getElementById("guestChildCount");
    const infantSpan = document.getElementById("guestInfantCount");
    const totalSpan = document.getElementById("guestTotal");

    if (adultSpan) adultSpan.textContent = adultCount;
    if (childSpan) childSpan.textContent = childCount;
    if (infantSpan) infantSpan.textContent = infantCount;
    if (totalSpan) totalSpan.textContent = total + " مهمان";

    const adultMinus = document.getElementById("adultMinus");
    const childMinus = document.getElementById("childMinus");
    const infantMinus = document.getElementById("infantMinus");

    if (adultMinus) adultMinus.disabled = adultCount <= 1;
    if (childMinus) childMinus.disabled = childCount <= 0;
    if (infantMinus) infantMinus.disabled = infantCount <= 0;
  }

  function createGuestModal() {
    const container = document.getElementById("guestDropdown");
    if (!container) return;
    container.innerHTML = `
                <div class="guest-container">
                    <div class="guest-item">
                        <span class="guest-label">بزرگسالان</span>
                        <div class="guest-controls">
                            <button class="guest-btn" id="adultMinus">-</button>
                            <span class="guest-count" id="guestAdultCount">2</span>
                            <button class="guest-btn" id="adultPlus">+</button>
                        </div>
                    </div>
                    <div class="guest-item">
                        <span class="guest-label">کودکان</span>
                        <div class="guest-controls">
                            <button class="guest-btn" id="childMinus">-</button>
                            <span class="guest-count" id="guestChildCount">0</span>
                            <button class="guest-btn" id="childPlus">+</button>
                        </div>
                    </div>
                    <div class="guest-item">
                        <span class="guest-label">نوزادان</span>
                        <div class="guest-controls">
                            <button class="guest-btn" id="infantMinus">-</button>
                            <span class="guest-count" id="guestInfantCount">0</span>
                            <button class="guest-btn" id="infantPlus">+</button>
                        </div>
                    </div>
                    <div class="guest-total" id="guestTotal">2 مهمان</div>
                </div>
            `;

    const adultPlus = document.getElementById("adultPlus");
    const adultMinus = document.getElementById("adultMinus");
    const childPlus = document.getElementById("childPlus");
    const childMinus = document.getElementById("childMinus");
    const infantPlus = document.getElementById("infantPlus");
    const infantMinus = document.getElementById("infantMinus");

    if (adultPlus)
      adultPlus.addEventListener("click", (e) => {
        e.stopPropagation();
        if (adultCount < 20) adultCount++;
        updateGuestDisplay();
      });
    if (adultMinus)
      adultMinus.addEventListener("click", (e) => {
        e.stopPropagation();
        if (adultCount > 1) adultCount--;
        updateGuestDisplay();
      });
    if (childPlus)
      childPlus.addEventListener("click", (e) => {
        e.stopPropagation();
        if (childCount < 10) childCount++;
        updateGuestDisplay();
      });
    if (childMinus)
      childMinus.addEventListener("click", (e) => {
        e.stopPropagation();
        if (childCount > 0) childCount--;
        updateGuestDisplay();
      });
    if (infantPlus)
      infantPlus.addEventListener("click", (e) => {
        e.stopPropagation();
        if (infantCount < 5) infantCount++;
        updateGuestDisplay();
      });
    if (infantMinus)
      infantMinus.addEventListener("click", (e) => {
        e.stopPropagation();
        if (infantCount > 0) infantCount--;
        updateGuestDisplay();
      });
  }

  const guestInput = document.getElementById("guestInput");
  const guestDropdown = document.getElementById("guestDropdown");
  if (guestInput) {
    createGuestModal();
    guestInput.onclick = (e) => {
      e.stopPropagation();
      closeAllDropdowns();
      guestDropdown.classList.add("show");
    };
  }

  // ========== بستن با کلیک خارج ==========
  document.addEventListener("click", closeAllDropdowns);

  // ========== دکمه جستجو ==========
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.onclick = () => {
      const city = document.getElementById("cityInput")?.value || "";
      const checkin = document.getElementById("checkinInput")?.value || "";
      const checkout = document.getElementById("checkoutInput")?.value || "";
      const total = adultCount + childCount + infantCount;

      if (!city) {
        alert("لطفاً شهر را انتخاب کنید");
        return;
      }
      if (!checkin) {
        alert("لطفاً تاریخ ورود را انتخاب کنید");
        return;
      }
      if (!checkout) {
        alert("لطفاً تاریخ خروج را انتخاب کنید");
        return;
      }

      alert(
        `🔍 جستجو برای ${city}\n📅 ورود: ${checkin}\n📅 خروج: ${checkout}\n👥 تعداد: ${total} نفر`,
      );
    };
  }

  // ========== مقداردهی اولیه ==========
  renderCities("");
  updateGuestDisplay();
})();

///////////////////////////////////////////////////////
