$(document).ready(function () {
  let selectedPolicy = null;

  // ========== تابع انتخاب سیاست ==========
  function selectPolicy(policyValue) {
    // حذف کلاس selected از همه
    $(".policy-item").removeClass("selected");

    // اضافه کردن کلاس selected به آیتم انتخاب شده
    $(`.policy-item[data-policy="${policyValue}"]`).addClass("selected");

    // تیک رادیو باتن مربوطه
    $(`input[name="cancellationPolicy"][value="${policyValue}"]`).prop(
      "checked",
      true
    );

    selectedPolicy = policyValue;
  }

  // ========== کلیک روی کارت سیاست ==========
  $(".policy-item").on("click", function (e) {
    // اگر روی رادیو باتن کلیک نشده بود
    if (!$(e.target).is(".policy-radio")) {
      const policyValue = $(this).data("policy");
      selectPolicy(policyValue);
    }
  });

  // ========== کلیک روی رادیو باتن ==========
  $(".policy-radio").on("change", function () {
    const policyValue = $(this).val();
    selectPolicy(policyValue);
  });

  // ========== دکمه تایید ==========
  $("#confirmPolicyBtn").on("click", function () {
    if (!selectedPolicy) {
      alert("لطفاً یکی از سیاست‌های لغو رزرو را انتخاب کنید");
      return;
    }

    let policyName = "";
    switch (selectedPolicy) {
      case "flexible":
        policyName = "سیاست سهلگیرانه";
        break;
      case "moderate":
        policyName = "سیاست متعادل";
        break;
      case "strict":
        policyName = "سیاست سختگیرانه";
        break;
    }

    alert(`سیاست لغو رزرو "${policyName}" با موفقیت ثبت شد`);
    console.log("سیاست انتخاب شده:", selectedPolicy);

    // در واقعیت: ارسال به سرور
    // $.post("/api/save-cancellation-policy", { policy: selectedPolicy });
  });

  // ========== ریسپانسیو برای موبایل ==========
  function handleResponsive() {
    if ($(window).width() <= 480) {
      $(".policy-description").each(function () {
        $(this).css("padding-right", "0");
      });
    } else {
      $(".policy-description").each(function () {
        $(this).css("padding-right", "34px");
      });
    }
  }

  handleResponsive();
  $(window).on("resize", handleResponsive);
});
