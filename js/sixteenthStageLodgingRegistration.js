$(document).ready(function () {
  // عناصر مورد نظر
  const $docsTitle = $("#docsRequiredTitle");
  const $docsText = $("#docsRequiredText");

  // رویداد تغییر سلیکت
  $("#ownershipTypeSelect").on("change", function () {
    const selectedValue = $(this).val();

    switch (selectedValue) {
      case "owner":
        $docsTitle.html(" سند مالکیت یا فروش نامه را آپلود نمایید:");
        // $docsText.html(
        //   "تصویر سند مالکیت (شش دانگ) • تصویر شناسنامه و کارت ملی • تصویر برگه مالیاتی"
        // );
        break;
      case "tenant":
        $docsTitle.html("اجاره نامه خود را آپلود نمایید:");
        // $docsText.html(
        //   "تصویر اجاره‌نامه معتبر • تصویر مجوز از مالک برای اجاره دادن • تصویر شناسنامه و کارت ملی"
        // );
        break;
      case "representative":
        $docsTitle.html(" نامه تایید مالک / وکالت نامه خود را آپلود نمایید:");
        // $docsText.html(
        //   "تصویر وکالت‌نامه محضری • تصویر سند مالکیت • تصویر شناسنامه و کارت ملی وکیل و مالک"
        // );
        break;
      default:
        $docsTitle.html("مدارک مورد نیاز:");
        $docsText.html("تصویر می‌باید با کیفیت مناسب و واضح باشد");
        break;
    }
  });
});
