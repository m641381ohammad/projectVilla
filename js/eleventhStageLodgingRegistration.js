$(document).ready(function () {
  // ========== توابع کمکی ==========
  function parseNumber(value) {
    if (!value) return 0;
    return parseInt(value.toString().replace(/,/g, "")) || 0;
  }

  function formatNumber(num) {
    if (num === 0) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function numberToWords(num) {
    if (num === 0 || isNaN(num) || num === "") return "";

    if (num < 10) return convertSmallNumber(num) + " تومان";
    if (num < 100) return convertTwoDigit(num) + " تومان";
    if (num < 1000) return convertThreeDigit(num) + " تومان";
    if (num < 1000000) return convertThousands(num) + " تومان";
    if (num < 1000000000) return convertMillions(num) + " تومان";

    return formatNumber(num) + " تومان";
  }

  function convertSmallNumber(num) {
    const units = [
      "",
      "یک",
      "دو",
      "سه",
      "چهار",
      "پنج",
      "شش",
      "هفت",
      "هشت",
      "نه",
    ];
    return units[num];
  }

  function convertTwoDigit(num) {
    const tens = [
      "",
      "ده",
      "بیست",
      "سی",
      "چهل",
      "پنجاه",
      "شصت",
      "هفتاد",
      "هشتاد",
      "نود",
    ];
    const units = [
      "",
      "یک",
      "دو",
      "سه",
      "چهار",
      "پنج",
      "شش",
      "هفت",
      "هشت",
      "نه",
    ];
    const teens = [
      "ده",
      "یازده",
      "دوازده",
      "سیزده",
      "چهارده",
      "پانزده",
      "شانزده",
      "هفده",
      "هجده",
      "نوزده",
    ];

    if (num < 10) return convertSmallNumber(num);
    if (num < 20) return teens[num - 10];

    let ten = Math.floor(num / 10);
    let unit = num % 10;
    if (unit === 0) return tens[ten];
    return tens[ten] + " و " + units[unit];
  }

  function convertThreeDigit(num) {
    let hundred = Math.floor(num / 100);
    let remainder = num % 100;

    let result = "";
    if (hundred === 1) result = "صد";
    else if (hundred === 2) result = "دویست";
    else if (hundred === 3) result = "سیصد";
    else if (hundred === 4) result = "چهارصد";
    else if (hundred === 5) result = "پانصد";
    else if (hundred === 6) result = "ششصد";
    else if (hundred === 7) result = "هفتصد";
    else if (hundred === 8) result = "هشتصد";
    else if (hundred === 9) result = "نهصد";

    if (remainder > 0) {
      result += " و " + convertTwoDigit(remainder);
    }
    return result;
  }

  function convertThousands(num) {
    let thousands = Math.floor(num / 1000);
    let remainder = num % 1000;

    let result = "";
    if (thousands === 1) result = "هزار";
    else result = convertThreeDigit(thousands) + " هزار";

    if (remainder > 0) {
      result += " و " + convertThreeDigit(remainder);
    }
    return result;
  }

  function convertMillions(num) {
    let millions = Math.floor(num / 1000000);
    let remainder = num % 1000000;

    let result = "";
    if (millions === 1) result = "یک میلیون";
    else result = convertThreeDigit(millions) + " میلیون";

    if (remainder > 0) {
      result += " و " + convertThousands(remainder);
    }
    return result;
  }

  // ========== حداقل مقادیر مجاز ==========
  const MIN_PRICES = {
    norouz: 1000000,
    springWeekday: 200,
    springWeekend: 20,
    springPeak: 200,
    summerWeekday: 200,
    summerWeekend: 20,
    summerPeak: 200,
    autumnWeekday: 150,
    autumnWeekend: 150,
    autumnPeak: 200,
    winterWeekday: 150,
    winterWeekend: 150,
    winterPeak: 200,
    peak: 100000,
  };

  function validateInput(id, minValue, errorId) {
    let rawValue = $(id).val();
    let numValue = parseNumber(rawValue);
    let isValid = numValue >= minValue;

    if (numValue === 0) {
      $(errorId).removeClass("show").text("");
      $(id).css("border-color", "#dee2e6");
      return true;
    }

    if (!isValid) {
      $(errorId)
        .text(`حداقل مقدار مجاز ${formatNumber(minValue)} تومان است`)
        .addClass("show");
      $(id).css("border-color", "#dc3545");
    } else {
      $(errorId).removeClass("show").text("");
      $(id).css("border-color", "#dee2e6");
    }
    return isValid;
  }

  function updateTextDisplay(id, textId) {
    let rawValue = $(id).val();
    let numValue = parseNumber(rawValue);
    if (numValue > 0) {
      $(textId).text(numberToWords(numValue));
    } else {
      $(textId).text("");
    }
  }

  // ========== اعتبارسنجی فصل بهار ==========
  function validateSpring() {
    let wd = validateInput(
      "#springWeekday",
      MIN_PRICES.springWeekday,
      "#springWeekdayError"
    );
    let we = validateInput(
      "#springWeekend",
      MIN_PRICES.springWeekend,
      "#springWeekendError"
    );
    let pk = validateInput(
      "#springPeak",
      MIN_PRICES.springPeak,
      "#springPeakError"
    );

    updateTextDisplay("#springWeekday", "#springWeekdayText");
    updateTextDisplay("#springWeekend", "#springWeekendText");
    updateTextDisplay("#springPeak", "#springPeakText");

    if (
      (!wd || !we || !pk) &&
      ($("#springWeekday").val() !== "" ||
        $("#springWeekend").val() !== "" ||
        $("#springPeak").val() !== "")
    ) {
      $("#springGeneralError").addClass("show");
    } else {
      $("#springGeneralError").removeClass("show");
    }
    return wd && we && pk;
  }

  // ========== اعتبارسنجی فصل تابستان ==========
  function validateSummer() {
    let wd = validateInput(
      "#summerWeekday",
      MIN_PRICES.summerWeekday,
      "#summerWeekdayError"
    );
    let we = validateInput(
      "#summerWeekend",
      MIN_PRICES.summerWeekend,
      "#summerWeekendError"
    );
    let pk = validateInput(
      "#summerPeak",
      MIN_PRICES.summerPeak,
      "#summerPeakError"
    );

    updateTextDisplay("#summerWeekday", "#summerWeekdayText");
    updateTextDisplay("#summerWeekend", "#summerWeekendText");
    updateTextDisplay("#summerPeak", "#summerPeakText");

    if (
      (!wd || !we || !pk) &&
      ($("#summerWeekday").val() !== "" ||
        $("#summerWeekend").val() !== "" ||
        $("#summerPeak").val() !== "")
    ) {
      $("#summerGeneralError").addClass("show");
    } else {
      $("#summerGeneralError").removeClass("show");
    }
    return wd && we && pk;
  }

  // ========== اعتبارسنجی فصل پاییز ==========
  function validateAutumn() {
    let wd = validateInput(
      "#autumnWeekday",
      MIN_PRICES.autumnWeekday,
      "#autumnWeekdayError"
    );
    let we = validateInput(
      "#autumnWeekend",
      MIN_PRICES.autumnWeekend,
      "#autumnWeekendError"
    );
    let pk = validateInput(
      "#autumnPeak",
      MIN_PRICES.autumnPeak,
      "#autumnPeakError"
    );

    updateTextDisplay("#autumnWeekday", "#autumnWeekdayText");
    updateTextDisplay("#autumnWeekend", "#autumnWeekendText");
    updateTextDisplay("#autumnPeak", "#autumnPeakText");

    if (
      (!wd || !we || !pk) &&
      ($("#autumnWeekday").val() !== "" ||
        $("#autumnWeekend").val() !== "" ||
        $("#autumnPeak").val() !== "")
    ) {
      $("#autumnGeneralError").addClass("show");
    } else {
      $("#autumnGeneralError").removeClass("show");
    }
    return wd && we && pk;
  }

  // ========== اعتبارسنجی فصل زمستان ==========
  function validateWinter() {
    let wd = validateInput(
      "#winterWeekday",
      MIN_PRICES.winterWeekday,
      "#winterWeekdayError"
    );
    let we = validateInput(
      "#winterWeekend",
      MIN_PRICES.winterWeekend,
      "#winterWeekendError"
    );
    let pk = validateInput(
      "#winterPeak",
      MIN_PRICES.winterPeak,
      "#winterPeakError"
    );

    updateTextDisplay("#winterWeekday", "#winterWeekdayText");
    updateTextDisplay("#winterWeekend", "#winterWeekendText");
    updateTextDisplay("#winterPeak", "#winterPeakText");

    if (
      (!wd || !we || !pk) &&
      ($("#winterWeekday").val() !== "" ||
        $("#winterWeekend").val() !== "" ||
        $("#winterPeak").val() !== "")
    ) {
      $("#winterGeneralError").addClass("show");
    } else {
      $("#winterGeneralError").removeClass("show");
    }
    return wd && we && pk;
  }

  // ========== به‌روزرسانی کلی ==========
  function updateDisplay() {
    // نرخ تعطیلات نوروز
    let norouzVal = parseNumber($("#norouzInput").val());
    if (norouzVal > 0) {
      $("#norouzText").text(numberToWords(norouzVal));
    } else {
      $("#norouzText").text("");
    }
    validateInput("#norouzInput", MIN_PRICES.norouz, "#norouzError");

    // بهار
    validateSpring();

    // تابستان
    validateSummer();

    // پاییز
    validateAutumn();

    // زمستان
    validateWinter();

    // نرخ نفر اضافه
    let peakVal = parseNumber($("#peakInput").val());
    if (peakVal > 0) {
      $("#peakText").text(numberToWords(peakVal));
    } else {
      $("#peakText").text("");
    }
    validateInput("#peakInput", MIN_PRICES.peak, "#peakError");
  }

  // ========== آکاردئون ==========
  $(".accordion-header-custom").on("click", function () {
    let $body = $(this).next(".accordion-body-custom");
    let $icon = $(this).find(".accordion-icon");

    $body.toggleClass("show");
    $icon.toggleClass("open");
  });

  // ========== رویدادهای تغییر در اینپوت‌ها ==========
  $(".price-input, .price-item-input").on("input", function () {
    let rawValue = $(this).val();
    let numValue = parseNumber(rawValue);
    if (numValue > 0) {
      $(this).val(formatNumber(numValue));
    } else {
      $(this).val("");
    }
    updateDisplay();
  });

  // ========== مقداردهی اولیه ==========
  updateDisplay();
});
