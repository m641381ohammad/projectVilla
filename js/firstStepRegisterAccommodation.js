$(document).ready(function () {
  function saveOriginalNumbers() {
    $(".menu-item").each(function () {
      var $item = $(this);
      var originalNumber = $item.find(".text-item-number").text().trim();
      $item.data("original-number", originalNumber);

      // ذخیره URL هر آیتم برای تشخیص صفحه فعلی
      var link = $item.find("a").attr("href");
      if (link) {
        $item.data("page-url", link);
      }
    });
  }

  function restoreNumbersAfter(currentItem) {
    currentItem.nextAll().each(function () {
      var $this = $(this);
      var originalNumber = $this.data("original-number");
      $this.find(".text-item-number").html(originalNumber);
      $this.removeClass("active completed");
    });
  }

  function restoreAllNumbers() {
    $(".menu-item").each(function () {
      var $this = $(this);
      var originalNumber = $this.data("original-number");
      $this.find(".text-item-number").html(originalNumber);
    });
  }

  function updateMenu($clickedItem) {
    $(".menu-item").removeClass("active completed");
    restoreAllNumbers();

    $clickedItem.addClass("active");
    $clickedItem
      .find(".text-item-number")
      .html('<i class="fas fa-hourglass-start"></i>');

    $clickedItem.prevAll().each(function () {
      $(this).addClass("completed");
      $(this).find(".text-item-number").html('<i class="fas fa-check"></i>');
    });

    $clickedItem.nextAll().each(function () {
      $(this).removeClass("active completed");
    });

    // ========== ذخیره مرحله فعال در localStorage ==========
    var activeStep =
      $clickedItem.find(".item-number").data("step-index") ||
      $clickedItem.index();
    localStorage.setItem("activeStep", activeStep);

    // همچنین می‌توانید URL صفحه را ذخیره کنید
    var activeUrl = $clickedItem.find("a").attr("href");
    if (activeUrl) {
      localStorage.setItem("activePageUrl", activeUrl);
    }
  }

  // ========== بازیابی مرحله فعال بر اساس صفحه فعلی ==========
  function restoreActiveStepFromCurrentPage() {
    var currentPageUrl = window.location.pathname.split("/").pop();

    // پیدا کردن آیتمی که لینک آن با صفحه فعلی مطابقت دارد
    var $matchedItem = null;
    $(".menu-item").each(function () {
      var link = $(this).find("a").attr("href");
      if (link && link === currentPageUrl) {
        $matchedItem = $(this);
        return false; // break the loop
      }
    });

    if ($matchedItem && $matchedItem.length > 0) {
      updateMenu($matchedItem);
    } else {
      // اگر هیچ مطابقت پیدا نشد، از localStorage استفاده کن
      var savedStep = localStorage.getItem("activeStep");
      if (savedStep !== null) {
        var $savedItem = $(".menu-item").eq(parseInt(savedStep));
        if ($savedItem.length > 0) {
          updateMenu($savedItem);
          return;
        }
      }
      // در غیر این صورت آیتم اول را فعال کن
      $(".menu-item:first").click();
    }
  }

  saveOriginalNumbers();

  // ========== تغییر رویداد کلیک: ذخیره مرحله + رفتن به صفحه ==========
  $(".menu-item").on("click", function (e) {
    // اگر داخل آیتم لینک وجود دارد، اجازه بده صفحه عوض شود
    var $link = $(this).find("a");
    if ($link.length > 0 && $link.attr("href")) {
      // ذخیره مرحله قبل از رفتن به صفحه جدید
      var stepIndex = $(this).index();
      localStorage.setItem("activeStep", stepIndex);
      localStorage.setItem("activePageUrl", $link.attr("href"));
      // اجازه بده لینک کار خودش را بکند
      return true;
    }

    // اگر لینکی نبود، فقط منو را آپدیت کن
    updateMenu($(this));
    e.preventDefault();
  });

  // دکمه بعدی
  $("#nextBtn").on("click", function () {
    var $current = $(".menu-item.active");
    if ($current.length === 0) {
      $(".menu-item:first").click();
    } else {
      var $next = $current.next();
      if ($next.length > 0) {
        var $nextLink = $next.find("a");
        if ($nextLink.length > 0 && $nextLink.attr("href")) {
          localStorage.setItem("activeStep", $next.index());
          localStorage.setItem("activePageUrl", $nextLink.attr("href"));
          window.location.href = $nextLink.attr("href");
        } else {
          updateMenu($next);
        }
      }
    }
  });

  // دکمه قبلی
  $("#prevBtn").on("click", function () {
    var $current = $(".menu-item.active");
    if ($current.length === 0) {
      $(".menu-item:first").click();
    } else {
      var $prev = $current.prev();
      if ($prev.length > 0) {
        var $prevLink = $prev.find("a");
        if ($prevLink.length > 0 && $prevLink.attr("href")) {
          localStorage.setItem("activeStep", $prev.index());
          localStorage.setItem("activePageUrl", $prevLink.attr("href"));
          window.location.href = $prevLink.attr("href");
        } else {
          updateMenu($prev);
        }
      }
    }
  });

  // ========== بازیابی مرحله فعال بر اساس صفحه فعلی ==========
  restoreActiveStepFromCurrentPage();
});
