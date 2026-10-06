$(document).ready(function () {
  console.log("loginSignup.js loaded successfully");
  // ========== لیست کشورها ==========
  const countries = [
    { name: "ایران", code: "+98", flag: "🇮🇷" },
    { name: "افغانستان", code: "+93", flag: "🇦🇫" },
    { name: "پاکستان", code: "+92", flag: "🇵🇰" },
    { name: "ترکیه", code: "+90", flag: "🇹🇷" },
    { name: "امارات متحده عربی", code: "+971", flag: "🇦🇪" },
    { name: "عربستان سعودی", code: "+966", flag: "🇸🇦" },
    { name: "قطر", code: "+974", flag: "🇶🇦" },
    { name: "کویت", code: "+965", flag: "🇰🇼" },
    { name: "عمان", code: "+968", flag: "🇴🇲" },
    { name: "بحرین", code: "+973", flag: "🇧🇭" },
    { name: "عراق", code: "+964", flag: "🇮🇶" },
    { name: "سوریه", code: "+963", flag: "🇸🇾" },
    { name: "اردن", code: "+962", flag: "🇯🇴" },
    { name: "لبنان", code: "+961", flag: "🇱🇧" },
    { name: "فلسطین", code: "+970", flag: "🇵🇸" },
    { name: "آذربایجان", code: "+994", flag: "🇦🇿" },
    { name: "ارمنستان", code: "+374", flag: "🇦🇲" },
    { name: "گرجستان", code: "+995", flag: "🇬🇪" },
    { name: "روسیه", code: "+7", flag: "🇷🇺" },
    { name: "آلمان", code: "+49", flag: "🇩🇪" },
    { name: "فرانسه", code: "+33", flag: "🇫🇷" },
    { name: "انگلستان", code: "+44", flag: "🇬🇧" },
    { name: "ایتالیا", code: "+39", flag: "🇮🇹" },
    { name: "اسپانیا", code: "+34", flag: "🇪🇸" },
    { name: "سوئد", code: "+46", flag: "🇸🇪" },
    { name: "نروژ", code: "+47", flag: "🇳🇴" },
    { name: "دانمارک", code: "+45", flag: "🇩🇰" },
    { name: "هلند", code: "+31", flag: "🇳🇱" },
    { name: "بلژیک", code: "+32", flag: "🇧🇪" },
    { name: "سوئیس", code: "+41", flag: "🇨🇭" },
    { name: "اتریش", code: "+43", flag: "🇦🇹" },
    { name: "یونان", code: "+30", flag: "🇬🇷" },
    { name: "قبرس", code: "+357", flag: "🇨🇾" },
    { name: "مالزی", code: "+60", flag: "🇲🇾" },
    { name: "اندونزی", code: "+62", flag: "🇮🇩" },
    { name: "تایلند", code: "+66", flag: "🇹🇭" },
    { name: "سنگاپور", code: "+65", flag: "🇸🇬" },
    { name: "فیلیپین", code: "+63", flag: "🇵🇭" },
    { name: "ویتنام", code: "+84", flag: "🇻🇳" },
    { name: "هند", code: "+91", flag: "🇮🇳" },
    { name: "چین", code: "+86", flag: "🇨🇳" },
    { name: "ژاپن", code: "+81", flag: "🇯🇵" },
    { name: "کره جنوبی", code: "+82", flag: "🇰🇷" },
    { name: "استرالیا", code: "+61", flag: "🇦🇺" },
    { name: "کانادا", code: "+1", flag: "🇨🇦" },
    { name: "آمریکا", code: "+1", flag: "🇺🇸" },
    { name: "مصر", code: "+20", flag: "🇪🇬" },
    { name: "مراکش", code: "+212", flag: "🇲🇦" },
    { name: "تونس", code: "+216", flag: "🇹🇳" },
    { name: "الجزایر", code: "+213", flag: "🇩🇿" },
  ];

  let currentCountry = countries[0];
  let currentPhoneNumber = "";
  let timerInterval = null;
  let timerSeconds = 93;

  // ========== توابع کمکی ==========
  function populateCountryList(searchTerm = "") {
    const filtered = countries.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.includes(searchTerm)
    );
    $("#countryItems").html("");
    filtered.forEach((country) => {
      $("#countryItems").append(`
              <div class="country-item" data-name="${country.name}" data-code="${country.code}" data-flag="${country.flag}">
                  <span class="country-flag">${country.flag}</span>
                  <span class="country-code">${country.code}</span>
                  <span class="country-name">${country.name}</span>
              </div>
          `);
    });
  }

  function updateSelectedCountry(country) {
    currentCountry = country;
    $("#selectedFlag").text(country.flag);
    $("#selectedCode").text(country.code);
    $("#selectedName").text(country.name);
    $("#phonePrefix").text(country.code);
  }

  function formatPhoneNumber(phone) {
    let val = phone.replace(/\D/g, "");
    if (val.length >= 10) {
      val = val.slice(0, 3) + " " + val.slice(3, 6) + " " + val.slice(6);
    }
    return val;
  }

  function updatePhoneDisplay() {
    const formattedPhone = formatPhoneNumber(currentPhoneNumber);
    $("#displayPhoneNumber").text(`${currentCountry.code} ${formattedPhone}`);
    $("#displayPhoneNumberStep3").text(
      `${currentCountry.code} ${formattedPhone}`
    );
  }

  // تایمر
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerSeconds = 93;
    updateTimerDisplay();
    timerInterval = setInterval(function () {
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        $("#timerSeconds").text("ارسال مجدد");
        $("#resendCodeBtn").removeClass("disabled").prop("disabled", false);
      } else {
        timerSeconds--;
        updateTimerDisplay();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    let minutes = Math.floor(timerSeconds / 60);
    let seconds = timerSeconds % 60;
    $("#timerSeconds").text(
      `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    );
  }

  function resetTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerSeconds = 93;
    updateTimerDisplay();
    startTimer();
  }

  // جابجایی بین مراحل
  function goToStep1() {
    if (timerInterval) clearInterval(timerInterval);
    $(".login-step").removeClass("active-Registration");
    $("#step1").addClass("active-Registration");
    $("#verificationCode").val("");
    $("#passwordInput").val("");
  }

  function goToStep2(phoneNumber) {
    currentPhoneNumber = phoneNumber;
    updatePhoneDisplay();
    $(".login-step").removeClass("active-Registration");
    $("#step2").addClass("active-Registration");
    resetTimer();
  }

  function goToStep3() {
    updatePhoneDisplay();
    $(".login-step").removeClass("active-Registration");
    $("#step3").addClass("active-Registration");
    if (timerInterval) clearInterval(timerInterval);
  }

  // ========== توابع کنترل مودال ==========
  window.openLoginModal = function () {
    $("#loginModalComponent").addClass("show");
    $("body").css("overflow", "hidden");
    goToStep1();
    $("#loginPhoneNumber").val("");
  };

  window.closeLoginModal = function () {
    $("#loginModalComponent").removeClass("show");
    $("body").css("overflow", "");
    $("#loginPhoneNumber").val("");
    $("#verificationCode").val("");
    $("#passwordInput").val("");
    $("#countrySearchInput").val("");
    $("#countryList").removeClass("show");
    if (timerInterval) clearInterval(timerInterval);
  };

  // ========== اتصال به دکمه‌ها ==========
  $("[data-login-trigger]").on("click", function (e) {
    e.preventDefault();
    openLoginModal();
  });

  // ========== رویدادهای داخلی ==========
  $("#selectedCountryBtn").on("click", function (e) {
    e.stopPropagation();
    $("#countryList").toggleClass("show");
    populateCountryList("");
    $("#countrySearchInput").val("");
  });

  $("#countrySearchInput").on("input", function () {
    populateCountryList($(this).val());
  });

  $(document).on("click", ".country-item", function () {
    const country = {
      name: $(this).data("name"),
      code: $(this).data("code"),
      flag: $(this).data("flag"),
    };
    updateSelectedCountry(country);
    $("#countryList").removeClass("show");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".country-selector").length) {
      $("#countryList").removeClass("show");
    }
  });

  $("#closeLoginModalBtn").on("click", closeLoginModal);
  $("#loginModalComponent").on("click", function (e) {
    if ($(e.target).is("#loginModalComponent")) {
      closeLoginModal();
    }
  });

  // ارسال کد تایید (مرحله 1 -> 2)
  $("#sendCodeBtn").on("click", function () {
    const phoneNumber = $("#loginPhoneNumber").val();
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    if (!phoneNumber || phoneNumber.trim() === "") {
      alert("لطفاً شماره همراه خود را وارد کنید");
      return;
    }
    if (cleanPhone.length < 9) {
      alert("شماره همراه معتبر نیست");
      return;
    }

    const fullNumber = currentCountry.code + cleanPhone;
    console.log("ارسال کد به:", fullNumber);
    alert(`کد تایید به شماره ${fullNumber} ارسال شد (کد آزمایشی: 123456)`);

    goToStep2(cleanPhone);
  });

  // ویرایش شماره (بازگشت به مرحله 1)
  $("#editNumberBtn, #editNumberBtnStep3").on("click", function () {
    goToStep1();
  });

  // تایید کد و ورود (مرحله 2)
  $("#verifyCodeBtn").on("click", function () {
    const code = $("#verificationCode").val();
    if (!code || code.trim() === "") {
      alert("لطفاً کد فعال‌سازی را وارد کنید");
      return;
    }
    if (code.length < 4) {
      alert("کد فعال‌سازی معتبر نیست");
      return;
    }

    if (code === "123456") {
      alert("ورود با موفقیت انجام شد");
      closeLoginModal();
      // window.location.href = "/dashboard";
    } else {
      alert("کد وارد شده اشتباه است");
    }
  });

  // ورود با رمز عبور (مرحله 3)
  $("#loginWithPasswordBtn").on("click", function () {
    const password = $("#passwordInput").val();
    if (!password || password.trim() === "") {
      alert("لطفاً رمز عبور خود را وارد کنید");
      return;
    }

    console.log("تلاش برای ورود با رمز:", password);
    alert("ورود با رمز عبور در حال بررسی...");
    // در واقعیت: درخواست به سرور
    // if (success) { closeLoginModal(); }
  });

  // جابجایی به مرحله 3 (ورود با رمز عبور)
  $("#switchToPasswordBtn").on("click", function (e) {
    e.preventDefault();
    goToStep3();
  });

  // جابجایی به مرحله 2 (ورود با کد یکبار مصرف)
  $("#switchToCodeBtn").on("click", function (e) {
    e.preventDefault();
    goToStep2(currentPhoneNumber);
    resetTimer();
  });

  // نمایش/مخفی کردن رمز عبور
  $(".toggle-password").on("click", function () {
    const $input = $(this)
      .closest(".password-input-wrapper")
      .find(".password-input");
    const type = $input.attr("type") === "password" ? "text" : "password";
    $input.attr("type", type);
    $(this).toggleClass("fa-eye-slash fa-eye");
  });

  // قالب‌بندی شماره تلفن
  $("#loginPhoneNumber").on("input", function () {
    let val = $(this).val().replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length >= 10) {
      val = val.slice(0, 3) + " " + val.slice(3, 6) + " " + val.slice(6);
    }
    $(this).val(val);
  });

  // افزودن دکمه ارسال مجدد به مرحله 2
  function addResendButton() {
    if ($("#resendCodeBtn").length === 0) {
      $("#timerText").append(
        '<button class="resend-link" id="resendCodeBtn">ارسال دوباره کد</button>'
      );
    }
  }
  addResendButton();

  // نمایش/مخفی کردن رمز عبور
  $(document).on("click", ".toggle-password", function () {
    const $passwordInput = $(this).siblings(".password-input");
    const type =
      $passwordInput.attr("type") === "password" ? "text" : "password";
    $passwordInput.attr("type", type);
    $(this).toggleClass("fa-eye-slash fa-eye");
  });

  $(document).on("click", "#resendCodeBtn", function () {
    if ($(this).hasClass("disabled")) return;
    const fullNumber = currentCountry.code + currentPhoneNumber;
    alert(`کد جدید به شماره ${fullNumber} ارسال شد`);
    resetTimer();
  });

  // مقداردهی اولیه
  populateCountryList("");
  updateSelectedCountry(countries[0]);
});
