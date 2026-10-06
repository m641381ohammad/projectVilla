$(document).ready(function () {
  // ========== داده‌های قوانین ==========
  const rulesData = {
    1: {
      title: "همراه داشتن حیوان خانگی",
      allowedText:
        "ورود حیوان خانگی (سگ، گربه، ...) به شرط رعایت کامل نظافت مجاز است. در داخل ساختمان حیوان باید در باکس مخصوص نگهداری شود.",
      disabledText: "همراه داشتن حیوان خانگی ممنوع است.",
    },
    2: {
      title: "برگزاری جشن و پخش موزیک",
      allowedText: "برگزاری جشن کوچک با هماهنگی میزبان امکانپذیر است.",
      disabledText: "هرگونه جشن و پخش موزیک ممنوع است.",
    },
    3: {
      title: "استعمال دخانیات (سیگار، قلیان و ...) در فضای داخلی ساختمان",
      allowedText:
        "استعمال دخانیات فقط در فضای باز و حیاط مجاز است. در داخل ساختمان ممنوع می‌باشد.",
      disabledText:
        "استعمال هرگونه دخانیات در تمامی فضاهای اقامتگاه ممنوع است.",
    },
    4: {
      title: "پذیرش مهمان خارجی",
      allowedText:
        "رزرو برای مهمانان خارجی شامل ملیت هایی همچون عرب، ترک و همه ملیت های غیر ایرانی، مجاز است.",
      disabledText:
        "رزرو برای مهمانان خارجی شامل ملیت هایی همچون عرب، ترک و همه ملیت های غیر ایرانی، ممنوع است.",
    },
  };

  // ========== تابع به‌روزرسانی توضیحات ==========
  function updateDescription(ruleId, isAllowed) {
    const $descDiv = $(`#desc-${ruleId}`);
    const data = rulesData[ruleId];

    if (!data) return;

    if (isAllowed) {
      $descDiv
        .find(".description-text")
        .html(
          `<i class="fas fa-check-circle" style="color:#27ae60;"></i> ${data.allowedText}`
        );
      $descDiv.find(".example-text").hide();
    } else {
      $descDiv
        .find(".description-text")
        .html(
          `<i class="fas fa-ban" style="color:#e74c3c;"></i> ${data.disabledText}`
        );
      // برای قانون 4 (پذیرش مهمان خارجی) مثال خاص دارد
      if (ruleId == 4) {
        $descDiv
          .find(".example-text")
          .html(`توصیحات: ${data.disabledText}`)
          .show();
      } else {
        $descDiv.find(".example-text").hide();
      }
    }
    $descDiv.addClass("show");
  }

  // ========== مقداردهی اولیه سوئیچ‌ها ==========
  function initializeSwitches() {
    $(".rule-item").each(function () {
      const ruleId = $(this).data("rule-id");
      const $checkbox = $(this).find(".rule-switch");
      const isAllowed = false; // پیش‌فرض ممنوع
      $checkbox.prop("checked", isAllowed);
      updateDescription(ruleId, isAllowed);
    });
  }

  // ========== رویداد تغییر سوئیچ ==========
  $(document).on("change", ".rule-switch", function () {
    const $ruleItem = $(this).closest(".rule-item");
    const ruleId = $ruleItem.data("rule-id");
    const isAllowed = $(this).is(":checked");

    // به‌روزرسانی استایل برچسب‌ها
    const $labels = $ruleItem.find(".switch-label");
    $labels.removeClass("active-allowed active-disabled");

    if (isAllowed) {
      $labels.filter('[data-status="allowed"]').addClass("active-allowed");
    } else {
      $labels.filter('[data-status="disabled"]').addClass("active-disabled");
    }

    updateDescription(ruleId, isAllowed);
  });

  // ========== تابع افزودن قانون جدید به DOM ==========
  let nextRuleId = 5;

  function addNewRuleToDOM(title, allowedText, disabledText) {
    const ruleId = nextRuleId;

    const newRuleHtml = `
            <div class="rule-item" data-rule-id="${ruleId}">
                <div class="rule-header">
                    <div class="rule-title">
                        <i class="fas fa-gavel"></i>
                        <span>${escapeHtml(title)}</span>
                    </div>
                    <div class="switch-container">
                        <span class="switch-label disabled" data-status="disabled">ممنوع</span>
                        <label class="switch">
                            <input type="checkbox" class="rule-switch">
                            <span class="slider"></span>
                        </label>
                        <span class="switch-label allowed" data-status="allowed">مجاز</span>
                    </div>
                </div>
                <div class="rule-description" id="desc-${ruleId}">
                    <div class="description-text"></div>
                    <div class="example-text"></div>
                </div>
            </div>
        `;

    $("#rulesList").append(newRuleHtml);

    // ذخیره داده‌های قانون
    rulesData[ruleId] = {
      title: title,
      allowedText: allowedText,
      disabledText: disabledText,
    };

    // مقداردهی اولیه (حالت ممنوع)
    updateDescription(ruleId, false);

    nextRuleId++;
  }

  // ========== توابع مودال ==========
  function resetForm() {
    $("#newRuleTitle").val("");
    $("#newRuleAllowedDesc").val("");
    $("#newRuleDisabledDesc").val("");
  }

  function closeModal() {
    $("#addRuleModal").removeClass("show");
    resetForm();
  }

  // باز کردن مودال
  $("#openModalBtn").on("click", function () {
    $("#addRuleModal").addClass("show");
  });

  // بستن مودال با دکمه X
  $("#closeModalBtn").on("click", function () {
    closeModal();
  });

  // بستن مودال با دکمه انصراف
  $("#cancelModalBtn").on("click", function () {
    closeModal();
  });

  // بستن مودال با کلیک روی overlay
  $("#addRuleModal").on("click", function (e) {
    if ($(e.target).is("#addRuleModal")) {
      closeModal();
    }
  });

  // ========== ذخیره قانون جدید ==========
  $("#saveModalBtn").on("click", function () {
    const title = $("#newRuleTitle").val().trim();
    const allowedText = $("#newRuleAllowedDesc").val().trim();
    const disabledText = $("#newRuleDisabledDesc").val().trim();

    if (!title) {
      alert("لطفاً عنوان قانون را وارد کنید");
      return;
    }
    if (!allowedText) {
      alert("لطفاً توضیحات حالت مجاز را وارد کنید");
      return;
    }
    if (!disabledText) {
      alert("لطفاً توضیحات حالت ممنوع را وارد کنید");
      return;
    }

    // افزودن قانون جدید به DOM
    addNewRuleToDOM(title, allowedText, disabledText);

    // بستن مودال و ریست فرم
    closeModal();

    // نمایش پیام موفقیت
    console.log("قانون جدید اضافه شد:", { title, allowedText, disabledText });
  });

  // تابع escape برای جلوگیری از XSS
  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  /*
    

  $("#addRuleBtn").on("click", function () {
    $("#addRuleModal").addClass("show");
  });

  $("#cancelModalBtn").on("click", function () {
    $("#addRuleModal").removeClass("show");
    $("#newRuleTitle").val("");
    $("#newRuleAllowedDesc").val("");
    $("#newRuleDisabledDesc").val("");
  });

  $("#saveModalBtn").on("click", function () {
    const title = $("#newRuleTitle").val().trim();
    const allowedText = $("#newRuleAllowedDesc").val().trim();
    const disabledText = $("#newRuleDisabledDesc").val().trim();

    if (!title) {
      alert("لطفاً عنوان قانون را وارد کنید");
      return;
    }
    if (!allowedText) {
      alert("لطفاً توضیحات حالت مجاز را وارد کنید");
      return;
    }
    if (!disabledText) {
      alert("لطفاً توضیحات حالت ممنوع را وارد کنید");
      return;
    }

    // ذخیره قانون جدید
    rulesData[nextRuleId] = {
      title: title,
      allowedText: allowedText,
      disabledText: disabledText,
    };

    // افزودن به DOM
    const newRuleHtml = `
            <div class="rule-item" data-rule-id="${nextRuleId}">
                <div class="rule-header">
                    <div class="rule-title">
                        <i class="fas fa-gavel"></i>
                        <span>${title}</span>
                    </div>
                    <div class="switch-container">
                        <span class="switch-label disabled" data-status="disabled">ممنوع</span>
                        <label class="switch">
                            <input type="checkbox" class="rule-switch">
                            <span class="slider"></span>
                        </label>
                        <span class="switch-label allowed" data-status="allowed">مجاز</span>
                    </div>
                </div>
                <div class="rule-description" id="desc-${nextRuleId}">
                    <div class="description-text"></div>
                    <div class="example-text"></div>
                </div>
            </div>
        `;

    $("#rulesList").append(newRuleHtml);

    // مقداردهی اولیه قانون جدید (ممنوع)
    updateDescription(nextRuleId, false);

    nextRuleId++;

    // بستن مودال و ریست فرم
    $("#addRuleModal").removeClass("show");
    $("#newRuleTitle").val("");
    $("#newRuleAllowedDesc").val("");
    $("#newRuleDisabledDesc").val("");
  });

  // بستن مودال با کلیک خارج
  $("#addRuleModal").on("click", function (e) {
    if ($(e.target).is("#addRuleModal")) {
      $(this).removeClass("show");
    }
  });
*/

  // ========== تنظیمات اولیه قانون 4 (مثال خاص) ==========
  // مقداردهی اولیه همه
  initializeSwitches();

  // تنظیم ویژه برای قانون 4 (نمایش مثال)
  //   const $rule4Desc = $("#desc-4");
  //   $rule4Desc
  //     .find(".example-text")
  //     .html(
  //       "توصیحات: رزرو برای مهمانان خارجی شامل ملیت هایی همچون عرب، ترک و همه ملیت های غیر ایرانی، ممنوع است."
  //     );

  // اطمینان از نمایش صحیح قانون 4 در حالت ممنوع
  const $rule4Checkbox = $(".rule-item[data-rule-id='4'] .rule-switch");
  if (!$rule4Checkbox.is(":checked")) {
    $("#desc-4 .description-text").html(
      `<i class="fas fa-ban" style="color:#e74c3c;"></i> ${rulesData[4].disabledText}`
    );
    $("#desc-4 .example-text").show();
  }
});
