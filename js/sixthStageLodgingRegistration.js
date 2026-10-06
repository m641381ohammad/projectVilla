// تابع کمکی برای بروزرسانی جمع کل
function updateTotal() {
  let adults = parseInt(document.getElementById("adultCount").innerText);
  let children = parseInt(document.getElementById("childCount").innerText);
  let total = adults + children;
  document.getElementById(
    "totalDisplay"
  ).innerHTML = `تعداد کل مهمانان: ${total} نفر`;
}

// اعمال event listener ها برای تمام دکمه‌های افزایش/کاهش
document.querySelectorAll(".counter-group").forEach((group) => {
  const decrementBtn = group.querySelector(".decrement");
  const incrementBtn = group.querySelector(".increment");
  const valueSpan = group.querySelector(".counter-value");

  decrementBtn.addEventListener("click", () => {
    let currentVal = parseInt(valueSpan.innerText);
    if (currentVal > 0) {
      // حداقل صفر
      valueSpan.innerText = currentVal - 1;
      updateTotal();
    }
  });

  incrementBtn.addEventListener("click", () => {
    let currentVal = parseInt(valueSpan.innerText);
    // حداکثر 10 یا هر محدودیتی که مد نظر است
    if (currentVal) {
      valueSpan.innerText = currentVal + 1;
      updateTotal();
    }
  });
});

// مقداردهی اولیه جمع
updateTotal();
