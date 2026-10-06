const dropZone = document.getElementById("dropZone");
const imageInput = document.getElementById("imageInput");
const selectBtn = document.getElementById("selectImagesBtn");
const previewGrid = document.getElementById("previewGrid");
const submitBtn = document.getElementById("submitImages");
const imageCountSpan = document.getElementById("imageCount");
const imageCountSpan2 = document.getElementById("imageCount2");
const clearAllBtn = document.getElementById("clearAllBtn");

let images = [];
let nextId = 1;

// باز کردن انتخاب فایل
selectBtn.addEventListener("click", () => imageInput.click());
dropZone.addEventListener("click", () => imageInput.click());

// هندل فایل‌های انتخاب شده
imageInput.addEventListener("change", (e) => {
  addImages(e.target.files);
  imageInput.value = ""; // reset برای انتخاب مجدد
});

// دراپ زون
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  addImages(e.dataTransfer.files);
});

// حذف همه تصاویر
clearAllBtn.addEventListener("click", () => {
  if (confirm(`آیا از حذف تمام ${images.length} تصویر مطمئن هستید؟`)) {
    images = [];
    updatePreview();
  }
});

function addImages(files) {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

  const newImages = Array.from(files).filter((file) => {
    if (!allowedTypes.includes(file.type)) {
      alert(`❌ فرمت ${file.name} پشتیبانی نمی‌شود. فقط JPG, PNG, GIF`);
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert(`❌ حجم ${file.name} بیشتر از 10 مگابایت است`);
      return false;
    }
    return true;
  });

  if (newImages.length === 0) return;

  // اضافه کردن بدون محدودیت تعداد
  newImages.forEach((file) => {
    const reader = new FileReader();
    const imageId = nextId++;

    reader.onload = (e) => {
      images.push({
        id: imageId,
        file: file,
        preview: e.target.result,
        name: file.name,
        size: file.size,
      });
      updatePreview();
    };
    reader.readAsDataURL(file);
  });

  // اخطار اگر تعداد زیاد شد (فقط اطلاع‌رسانی، بدون محدودیت)
  if (images.length + newImages.length > 50) {
    alert(
      `⚠️ توجه: تعداد تصاویر به ${
        images.length + newImages.length
      } رسید. عملکرد مرورگر ممکن است کاهش یابد.`
    );
  }
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

function updatePreview() {
  previewGrid.innerHTML = "";

  if (images.length === 0) {
    previewGrid.innerHTML =
      '<div class="text-center text-muted w-100 py-5">هنوز تصویری انتخاب نشده است</div>';
    clearAllBtn.style.display = "none";
  } else {
    clearAllBtn.style.display = "inline-block";
  }

  images.forEach((img, index) => {
    const previewItem = document.createElement("div");
    previewItem.className = "image-preview-item";
    previewItem.innerHTML = `
                <img src="${img.preview}" alt="پیش‌نمایش">
                <div class="delete-image" data-id="${img.id}">
                    <i class="fas fa-trash-alt"></i>
                </div>
                <div class="file-size">${formatFileSize(img.file.size)}</div>
                ${
                  index === 0
                    ? '<div class="cover-badge"><i class="fas fa-star"></i> کاور</div>'
                    : ""
                }
            `;
    previewGrid.appendChild(previewItem);
  });

  // رویداد حذف تکی
  document.querySelectorAll(".delete-image").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      images = images.filter((img) => img.id !== id);
      updatePreview();
    });
  });

  // به روز رسانی شمارنده
  imageCountSpan.textContent = images.length;
  imageCountSpan2.textContent = images.length;
  submitBtn.disabled = images.length === 0;
}

// آپلود نهایی
submitBtn.addEventListener("click", () => {
  if (images.length === 0) return;

  const formData = new FormData();
  images.forEach((img) => {
    formData.append("images[]", img.file);
  });

  // نمایش اطلاعات در کنسول
  console.log(`📸 آپلود ${images.length} تصویر:`);
  images.forEach((img, i) => {
    console.log(`  ${i + 1}. ${img.name} (${formatFileSize(img.size)})`);
  });

  alert(`${images.length} تصویر با موفقیت آماده آپلود شد`);

  // ارسال به سرور (در صورت نیاز)
  // fetch('/api/upload', { method: 'POST', body: formData })
  //   .then(res => res.json())
  //   .then(data => console.log('آپلود شد:', data));
});

// نمایش پیام خوش‌آمدگویی
console.log("✅ آپلودر آماده است - بدون محدودیت تعداد");
