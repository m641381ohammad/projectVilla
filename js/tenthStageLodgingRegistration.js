$(document).ready(function () {
  let currentValue = 1;
  const MIN_VALUE = 1;
  const MAX_VALUE = 7;

  const $decrementBtn = $("#decrementBtn");
  const $incrementBtn = $("#incrementBtn");
  const $nightCount = $("#nightCount");
  const $resultValue = $("#resultValue");

  // تابع به‌روزرسانی وضعیت دکمه‌ها و نمایش مقدار
  function updateCounter() {
    // به‌روزرسانی مقدار نمایش داده شده
    $nightCount.text(currentValue);
    $resultValue.text(currentValue);

    // غیرفعال کردن دکمه منفی اگر به حداقل رسیده باشد
    if (currentValue <= MIN_VALUE) {
      $decrementBtn.prop("disabled", true);
    } else {
      $decrementBtn.prop("disabled", false);
    }

    // غیرفعال کردن دکمه مثبت اگر به حداکثر رسیده باشد
    if (currentValue >= MAX_VALUE) {
      $incrementBtn.prop("disabled", true);
    } else {
      $incrementBtn.prop("disabled", false);
    }
  }

  // دکمه افزایش (+)
  $("#incrementBtn").on("click", function () {
    if (currentValue < MAX_VALUE) {
      currentValue++;
      updateCounter();
    }
  });

  // دکمه کاهش (-)
  $("#decrementBtn").on("click", function () {
    if (currentValue > MIN_VALUE) {
      currentValue--;
      updateCounter();
    }
  });

  // مقداردهی اولیه
  updateCounter();
});
