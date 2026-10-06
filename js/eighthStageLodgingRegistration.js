$(document).ready(function () {
  function addDescriptionInput(
    amenityId,
    containerId,
    placeholderText = "توضیحات را وارد کنید..."
  ) {
    const inputHtml = `
            <div class="description-input" id="input-${amenityId}">
                <input type="text" class="form-control" placeholder="${placeholderText}" id="txt-${amenityId}">
            </div>
        `;
    $(`#${containerId}`).html(inputHtml);
  }

  function removeDescriptionInput(containerId) {
    $(`#${containerId}`).empty();
  }

  $("#chk_furniture").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "furniture",
        "desc_furniture",
        "مثال: مبلمان راحتی برای 7 نفر"
      );
    } else {
      removeDescriptionInput("desc_furniture");
    }
  });

  $("#chk_refrigerator").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("refrigerator", "desc_refrigerator", "توضیحات یخچال");
    } else {
      removeDescriptionInput("desc_refrigerator");
    }
  });

  $("#chk_television").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "television",
        "desc_television",
        "مثال: یک عدد تلویزیون فلت سامسونگ 48 اینچ و یک عدد تلویزیون پارس 14 اینچ"
      );
    } else {
      removeDescriptionInput("desc_television");
    }
  });

  $("#chk_diningTable").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "diningTable",
        "desc_diningTable",
        "مثال: میز نهارخوری برای 6 نفر و 6 عدد صندلی"
      );
    } else {
      removeDescriptionInput("desc_diningTable");
    }
  });

  $("#chk_heatingSystem").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "heatingSystem",
        "desc_heatingSystem",
        "مثال: سیستم پکیج / بخاری گازی"
      );
    } else {
      removeDescriptionInput("desc_heatingSystem");
    }
  });

  $("#chk_coolingSystem").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "coolingSystem",
        "desc_coolingSystem",
        "مثال: یک دستگاه اسپیلت 18 هزار در پذیرایی"
      );
    } else {
      removeDescriptionInput("desc_coolingSystem");
    }
  });

  $("#chk_parking").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "parking",
        "desc_parking",
        "مثال: پارکینگ مسقف برای 2 عدد اتومبیل / پارکینگ روباز برای 3 عدد اتومبیل"
      );
    } else {
      removeDescriptionInput("desc_parking");
    }
  });

  $("#chk_elevator").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("elevator", "desc_elevator", "توضیحات آسانسور");
    } else {
      removeDescriptionInput("desc_elevator");
    }
  });

  $("#chk_internet").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "internet",
        "desc_internet",
        "مشخص نمایید: اینترنت کابلی / بی‌سیم-وای‌فای"
      );
    } else {
      removeDescriptionInput("desc_internet");
    }
  });

  $("#chk_westernToilet").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "westernToilet",
        "desc_westernToilet",
        "توضیحات توالت فرنگی"
      );
    } else {
      removeDescriptionInput("desc_westernToilet");
    }
  });

  $("#chk_iranianToilet").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "iranianToilet",
        "desc_iranianToilet",
        "توضیحات توالت ایرانی"
      );
    } else {
      removeDescriptionInput("desc_iranianToilet");
    }
  });

  $("#chk_pool").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("pool", "desc_pool", "مشخصات استخر");
    } else {
      removeDescriptionInput("desc_pool");
    }
  });

  $("#chk_sauna").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("sauna", "desc_sauna", "توضیحات سونا");
    } else {
      removeDescriptionInput("desc_sauna");
    }
  });

  $("#chk_jacuzzi").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("jacuzzi", "desc_jacuzzi", "توضیحات جکوزی");
    } else {
      removeDescriptionInput("desc_jacuzzi");
    }
  });

  $("#chk_handball").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("handball", "desc_handball", "توضیحات فوتبال دستی");
    } else {
      removeDescriptionInput("desc_handball");
    }
  });

  $("#chk_billiardTable").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "billiardTable",
        "desc_billiardTable",
        "توضیحات میز بیلیارد"
      );
    } else {
      removeDescriptionInput("desc_billiardTable");
    }
  });

  $("#chk_bath").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("bath", "desc_bath", "توضیحات حمام");
    } else {
      removeDescriptionInput("desc_bath");
    }
  });

  $("#chk_cabinet").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("cabinet", "desc_cabinet", "توضیحات کمد / دراور");
    } else {
      removeDescriptionInput("desc_cabinet");
    }
  });

  $("#chk_gasStove").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("gasStove", "desc_gasStove", "توضیحات اجاق گاز");
    } else {
      removeDescriptionInput("desc_gasStove");
    }
  });

  $("#chk_kitchenUtensils").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "kitchenUtensils",
        "desc_kitchenUtensils",
        "توضیحات وسایل آشپزخانه"
      );
    } else {
      removeDescriptionInput("desc_kitchenUtensils");
    }
  });

  $("#chk_kebabGrill").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "kebabGrill",
        "desc_kebabGrill",
        "مثال: کباب‌پز حرفه‌ای زغالی در بالکن"
      );
    } else {
      removeDescriptionInput("desc_kebabGrill");
    }
  });

  $("#chk_vacuumCleaner").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "vacuumCleaner",
        "desc_vacuumCleaner",
        "توضیحات جاروبرقی"
      );
    } else {
      removeDescriptionInput("desc_vacuumCleaner");
    }
  });

  $("#chk_washingMachine").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "washingMachine",
        "desc_washingMachine",
        "توضیحات ماشین لباسشویی"
      );
    } else {
      removeDescriptionInput("desc_washingMachine");
    }
  });

  $("#chk_iron").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("iron", "desc_iron", "توضیحات اتو");
    } else {
      removeDescriptionInput("desc_iron");
    }
  });

  $("#chk_microwave").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("microwave", "desc_microwave", "توضیحات مایکروویو");
    } else {
      removeDescriptionInput("desc_microwave");
    }
  });

  $("#chk_hairDryer").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("hairDryer", "desc_hairDryer", "توضیحات سشوار");
    } else {
      removeDescriptionInput("desc_hairDryer");
    }
  });

  $("#chk_telephone").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("telephone", "desc_telephone", "توضیحات تلفن ثابت");
    } else {
      removeDescriptionInput("desc_telephone");
    }
  });

  $("#chk_water").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("water", "desc_water", "توضیحات آب لوله کشی");
    } else {
      removeDescriptionInput("desc_water");
    }
  });

  $("#chk_electricity").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("electricity", "desc_electricity", "توضیحات برق");
      $("#example_electricity").show();
    } else {
      removeDescriptionInput("desc_electricity");
      $("#example_electricity").hide();
    }
  });

  $("#chk_food").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "food",
        "desc_food",
        "مثال: امکان سرو غذای محلی برای شام و نهار وجود دارد"
      );
      $("#example_food").show();
    } else {
      removeDescriptionInput("desc_food");
      $("#example_food").hide();
    }
  });

  $("#chk_guard").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "guard",
        "desc_guard",
        "توضیحات درباره سرایدار/نگهبان"
      );
    } else {
      removeDescriptionInput("desc_guard");
    }
  });
});
