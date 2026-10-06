$(document).ready(function () {
  let roomCounter = 1;
  let roomsData = {};

  // تابع به‌روزرسانی تعداد اتاق‌ها
  function updateRoomCount() {
    const roomCount = $(".room-card").length;
    $("#roomCountBadge").text(`${roomCount} اتاق`);
  }

  // تابع تولید خلاصه متن اتاق
  function getSummary(roomId) {
    const data = roomsData[roomId];
    if (!data) return "";
    const parts = [];
    if (data.single > 0) parts.push(`${data.single} تخت یک نفره`);
    if (data.double > 0) parts.push(`${data.double} تخت دو نفره`);
    if (data.traditional > 0) parts.push(`${data.traditional} رخت خواب سنتی`);
    if (data.sofa > 0) parts.push(`${data.sofa} مبل تخت خواب شو`);
    if (data.shared > 0) parts.push(`${data.shared} فضای مشترک`);
    if (parts.length === 0) return "هیچ تختی انتخاب نشده است";
    return parts.join(" • ");
  }

  // تابع به‌روزرسانی نمایش خلاصه
  function updateSummary(roomId) {
    $(`#summary-${roomId}`).text(getSummary(roomId));
  }

  // تابع به‌روزرسانی مقادیر عددی در UI
  function updateValues(roomId) {
    const data = roomsData[roomId];
    if (!data) return;
    $(`#val-single-${roomId}`).text(data.single);
    $(`#val-double-${roomId}`).text(data.double);
    $(`#val-traditional-${roomId}`).text(data.traditional);
    $(`#val-sofa-${roomId}`).text(data.sofa);
    $(`#val-shared-${roomId}`).text(data.shared);
    updateSummary(roomId);
  }

  // تابع ایجاد یک اتاق جدید
  function createRoom(roomNumber) {
    const roomId =
      "room_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6);

    roomsData[roomId] = {
      single: 0,
      double: 0,
      traditional: 0,
      sofa: 0,
      shared: 0,
      roomNum: roomNumber,
    };

    const roomHtml = `
            <div class="room-card" data-room-id="${roomId}" id="room-${roomId}">
                <div class="room-header">
                    <div>
                        <span class="room-title">اتاق ${roomNumber}</span>
                        <i class="fas fa-arrow-down"></i>
                    </div>
                    <div>
                        <span class="room-badge"><i class="fas fa-bed"></i> اتاق خواب</span>
                        <span class="delete-room" data-room-id="${roomId}"><i class="fas fa-trash-alt"></i></span>
                    </div>
                </div>
                <div class="room-summary" id="summary-${roomId}">
                    ${getSummary(roomId)}
                </div>
                <div class="room-body" id="body-${roomId}">
                    <div class="bed-item">
                        <span class="bed-label"><i class="fas fa-bed me-2 text-primary"></i> تخت یک نفره</span>
                        <div class="counter-group">
                            <button class="counter-btn decrement" data-type="single" data-room-id="${roomId}">-</button>
                            <span class="counter-value" id="val-single-${roomId}">0</span>
                            <button class="counter-btn increment" data-type="single" data-room-id="${roomId}">+</button>
                        </div>
                    </div>
                    <div class="bed-item">
                        <span class="bed-label"><i class="fas fa-bed me-2 text-success"></i> تخت دو نفره</span>
                        <div class="counter-group">
                            <button class="counter-btn decrement" data-type="double" data-room-id="${roomId}">-</button>
                            <span class="counter-value" id="val-double-${roomId}">0</span>
                            <button class="counter-btn increment" data-type="double" data-room-id="${roomId}">+</button>
                        </div>
                    </div>
                    <div class="bed-item">
                        <span class="bed-label"><i class="fas fa-moon me-2 text-warning"></i> رخت خواب سنتی</span>
                        <div class="counter-group">
                            <button class="counter-btn decrement" data-type="traditional" data-room-id="${roomId}">-</button>
                            <span class="counter-value" id="val-traditional-${roomId}">0</span>
                            <button class="counter-btn increment" data-type="traditional" data-room-id="${roomId}">+</button>
                        </div>
                    </div>
                    <div class="bed-item">
                        <span class="bed-label"><i class="fas fa-couch me-2 text-secondary"></i> مبل تخت خواب شو</span>
                        <div class="counter-group">
                            <button class="counter-btn decrement" data-type="sofa" data-room-id="${roomId}">-</button>
                            <span class="counter-value" id="val-sofa-${roomId}">0</span>
                            <button class="counter-btn increment" data-type="sofa" data-room-id="${roomId}">+</button>
                        </div>
                    </div>
                    <div class="bed-item">
                        <span class="bed-label"><i class="fas fa-users me-2 text-info"></i> فضای مشترک</span>
                        <div class="counter-group">
                            <button class="counter-btn decrement" data-type="shared" data-room-id="${roomId}">-</button>
                            <span class="counter-value" id="val-shared-${roomId}">0</span>
                            <button class="counter-btn increment" data-type="shared" data-room-id="${roomId}">+</button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mt-3">
                        <button class="close-body-btn" data-room-id="${roomId}"><i class="fas fa-times"></i> بستن</button>
                    </div>
                </div>
            </div>
        `;

    $("#roomsContainer").append(roomHtml);
    updateRoomCount();
    return roomId;
  }

  // ========== Event Delegation (مدیریت همه رویدادها) ==========

  // 1. باز و بسته شدن آکاردئون (کلیک روی هدر)
  $(document).on("click", ".room-header", function (e) {
    // اگر روی دکمه حذف کلیک شده باشد، آکاردئون باز نشود
    if ($(e.target).closest(".delete-room").length) return;

    const $roomCard = $(this).closest(".room-card");
    const $roomBody = $roomCard.find(".room-body");
    $roomBody.toggleClass("open");
  });

  // 2. دکمه افزایش (+)
  $(document).on("click", ".increment", function () {
    const roomId = $(this).data("room-id");
    const type = $(this).data("type");
    if (roomsData[roomId] && roomsData[roomId][type] < 20) {
      roomsData[roomId][type]++;
      updateValues(roomId);
    }
  });

  // 3. دکمه کاهش (-)
  $(document).on("click", ".decrement", function () {
    const roomId = $(this).data("room-id");
    const type = $(this).data("type");
    if (roomsData[roomId] && roomsData[roomId][type] > 0) {
      roomsData[roomId][type]--;
      updateValues(roomId);
    }
  });

  // 4. دکمه ویرایش
  $(document).on("click", ".edit-btn", function () {
    const roomId = $(this).data("room-id");
    const $roomBody = $(`#body-${roomId}`);
    $roomBody.addClass("open");
    $roomBody[0].scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // 5. دکمه بستن
  $(document).on("click", ".close-body-btn", function () {
    const roomId = $(this).data("room-id");
    $(`#body-${roomId}`).removeClass("open");
  });

  // 6. حذف اتاق
  $(document).on("click", ".delete-room", function (e) {
    e.stopPropagation();
    const roomId = $(this).data("room-id");
    if (confirm("آیا از حذف این اتاق مطمئن هستید؟")) {
      delete roomsData[roomId];
      $(`#room-${roomId}`).remove();
      renumberRooms();
      updateRoomCount();
    }
  });

  // 7. بازشمارش شماره اتاق‌ها بعد از حذف
  function renumberRooms() {
    let index = 1;
    $(".room-card").each(function () {
      const roomId = $(this).data("room-id");
      if (roomsData[roomId]) {
        roomsData[roomId].roomNum = index;
        $(this).find(".room-title").text(`اتاق ${index}`);
        index++;
      }
    });
    roomCounter = index;
  }

  // 8. اضافه کردن اتاق جدید
  $("#addRoomBtn").on("click", function () {
    const newRoomId = createRoom(roomCounter);
    roomsData[newRoomId] = {
      single: 0,
      double: 0,
      traditional: 0,
      sofa: 0,
      shared: 0,
      roomNum: roomCounter,
    };
    updateValues(newRoomId);
    roomCounter++;
  });

  // ایجاد اتاق پیش‌فرض (اتاق 1)
  const firstRoomId = createRoom(1);
  roomsData[firstRoomId] = {
    single: 0,
    double: 0,
    traditional: 0,
    sofa: 0,
    shared: 0,
    roomNum: 1,
  };
  updateValues(firstRoomId);
  roomCounter = 2;
});

/////////////////////////////

$(document).ready(function () {
  // داده‌های فضای مشترک
  let sharedData = {
    single: 0,
    double: 0,
    traditional: 0,
    sofa: 0,
  };

  // تابع تولید خلاصه متن
  function getSharedSummary() {
    const parts = [];
    if (sharedData.single > 0) parts.push(`${sharedData.single} تخت یک نفره`);
    if (sharedData.double > 0) parts.push(`${sharedData.double} تخت دو نفره`);
    if (sharedData.traditional > 0)
      parts.push(`${sharedData.traditional} رخت خواب سنتی`);
    if (sharedData.sofa > 0) parts.push(`${sharedData.sofa} مبل تخت خواب شو`);
    if (parts.length === 0) return "هیچ تختی انتخاب نشده است";
    return parts.join(" • ");
  }

  // تابع به‌روزرسانی نمایش خلاصه و مقادیر
  function updateSharedUI() {
    $("#val-single").text(sharedData.single);
    $("#val-double").text(sharedData.double);
    $("#val-traditional").text(sharedData.traditional);
    $("#val-sofa").text(sharedData.sofa);
    $("#sharedSummary").text(getSharedSummary());
  }

  // ========== Event Handler ها ==========

  // 1. باز و بسته شدن با کلیک روی هدر
  $("#sharedHeader").on("click", function (e) {
    $("#sharedBody").toggleClass("open");
  });

  // 2. دکمه بستن
  $("#closeSharedBtn").on("click", function () {
    $("#sharedBody").removeClass("open");
  });

  // 3. دکمه افزایش (+)
  $(".increment").on("click", function () {
    const type = $(this).data("type");
    if (sharedData[type] < 20) {
      sharedData[type]++;
      updateSharedUI();
    }
  });

  // 4. دکمه کاهش (-)
  $(".decrement").on("click", function () {
    const type = $(this).data("type");
    if (sharedData[type] > 0) {
      sharedData[type]--;
      updateSharedUI();
    }
  });

  // مقداردهی اولیه
  updateSharedUI();
});
