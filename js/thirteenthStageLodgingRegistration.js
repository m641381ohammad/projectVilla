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

  $("#chk_initialAssistance").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "initialAssistance",
        "desc_initialAssistance",
        "مکان جعبه کمک‌های اولیه در منزل را وارد کنید"
      );
    } else {
      removeDescriptionInput("desc_initialAssistance");
    }
  });

  $("#chk_fireSuppressionCapsule").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "fireSuppressionCapsule",
        "desc_fireSuppressionCapsule",
        "مکان کپسول آتشنشانی در منزل را وارد کنید"
      );
    } else {
      removeDescriptionInput("desc_fireSuppressionCapsule");
    }
  });

  $("#chk_fireAlarmExtinguishingSystem").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "fireAlarmExtinguishingSystem",
        "desc_fireAlarmExtinguishingSystem",
        "توضیحات"
      );
    } else {
      removeDescriptionInput("desc_fireAlarmExtinguishingSystem");
    }
  });

  $("#chk_safetyGuide").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "safetyGuide",
        "desc_safetyGuide",
        "مکان برگه راهنمای ایمنی در منزل را وارد کنید"
      );
    } else {
      removeDescriptionInput("desc_safetyGuide");
    }
  });

  $("#chk_poolRescueRing").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput(
        "poolRescueRing",
        "desc_poolRescueRing",
        "حلقه نجات در کنار استخر قرار گیرد"
      );
    } else {
      removeDescriptionInput("desc_poolRescueRing");
    }
  });

  $("#chk_refrigerator").on("change", function () {
    if ($(this).is(":checked")) {
      addDescriptionInput("refrigerator", "desc_refrigerator", "توضیحات یخچال");
    } else {
      removeDescriptionInput("desc_refrigerator");
    }
  });
});
