// 1. MESSENGER
const FB_USERNAME = "tien.thuong.674774";
function buyViaMessenger(message) {
  navigator.clipboard.writeText(message).finally(() => {
    window.location.href = `https://m.me/${FB_USERNAME}`;
  });
}

// 2. SLIDESHOW BANNER
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  slides[index].classList.add("active");
  dots[index].classList.add("active");
  currentSlide = index;
}
function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}
function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

document.querySelector(".next-btn").addEventListener("click", () => {
  nextSlide();
  resetInterval();
});
document.querySelector(".prev-btn").addEventListener("click", () => {
  prevSlide();
  resetInterval();
});
dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    showSlide(idx);
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 2500);
}
slideInterval = setInterval(nextSlide, 2500);

// 3. TÍNH NĂNG LỌC VÀ PHÂN TRANG (CHỈ ÁP DỤNG LAPTOP VÀ CHỈ Ở MỤC WEB TỎ TÌNH)
const filterBtns = document.querySelectorAll(".filter-btn");
const productItems = document.querySelectorAll("#product-list .product-card.item");
const paginationContainer = document.getElementById("pagination");

const itemsPerPage = 6; // Giới hạn 6 thẻ (2 hàng x 3 cột)
let currentPage = 1;
let currentFilter = "all";

function renderProducts() {
  const allItems = Array.from(productItems);
  const isDesktop = window.innerWidth >= 768; // Kiểm tra màn hình laptop

  // Lọc theo Category
  const filteredItems = allItems.filter((item) => {
    return (
      currentFilter === "all" ||
      item.getAttribute("data-category") === currentFilter
    );
  });

  // Ẩn tất cả Web tỏ tình trước
  allItems.forEach((item) => (item.style.display = "none"));

  if (isDesktop && currentFilter === "all") {
    // Nếu là PC và đang ở mục "Tất cả" -> Bật Phân trang
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Chỉ hiện đúng số lượng của trang hiện tại
    filteredItems
      .slice(startIndex, endIndex)
      .forEach((item) => (item.style.display = "flex"));
    renderPagination(totalPages);
  } else {
    // Nếu là Điện thoại, Hoặc không phải tab "Tất cả" -> Hiện hết không có phân trang
    filteredItems.forEach((item) => (item.style.display = "flex"));
    paginationContainer.classList.remove("show");
  }
}

function renderPagination(totalPages) {
  paginationContainer.innerHTML = "";
  if (totalPages > 1) {
    paginationContainer.classList.add("show");
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");
      btn.innerText = i;
      btn.onclick = () => {
        currentPage = i;
        renderProducts();
        document
          .getElementById("love-web")
          .scrollIntoView({ behavior: "smooth" });
      };
      paginationContainer.appendChild(btn);
    }
  } else {
    paginationContainer.classList.remove("show");
  }
}

// Xử lý khi nhấn nút Lọc (Filter)
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    currentPage = 1; // Nhấn qua lại filter sẽ quay về trang 1
    renderProducts();
  });
});

// Lắng nghe sự kiện kéo dãn màn hình để tự cập nhật
window.addEventListener("resize", renderProducts);
renderProducts(); // Chạy lần đầu

// 4. MỞ BANNER CHÍNH SÁCH (MODAL)
const modal = document.getElementById("policyModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.querySelector(".close-modal");

const policyContent = {
  privacy: {
    title: "Chính Sách Bảo Mật 🔒",
    text: "Chúng tôi cam kết bảo mật 100% thông tin cá nhân của bạn. Dữ liệu chỉ được sử dụng để hỗ trợ bạn trong quá trình tư vấn và cung cấp web tỏ tình, source code. Sẽ không có bất kỳ thông tin nào được chia sẻ cho bên thứ ba.",
  },
  refund: {
    title: "Chính Sách Hoàn Tiền 💸",
    text: "Cậu SE Trẻ cam kết hỗ trợ đổi hoặc hoàn tiền 100% nếu Source Code bị lỗi không thể chạy được, hoặc sản phẩm Web Tỏ Tình không đúng như mô tả Demo. Mọi yêu cầu được xử lý cực kỳ nhanh gọn thông qua việc nhắn tin trực tiếp.",
  },
};

document.getElementById("link-privacy").addEventListener("click", () => {
  modalTitle.innerText = policyContent.privacy.title;
  modalBody.innerText = policyContent.privacy.text;
  modal.classList.add("show");
});

document.getElementById("link-refund").addEventListener("click", () => {
  modalTitle.innerText = policyContent.refund.title;
  modalBody.innerText = policyContent.refund.text;
  modal.classList.add("show");
});

// Đóng Banner Modal
closeModalBtn.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

// 5. ĐIỀU HƯỚNG CUỘN MENU
document.querySelectorAll(".nav-item, .desktop-nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (this.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      document
        .querySelectorAll(".nav-item, .desktop-nav a")
        .forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");
      const targetSection = document.getElementById(
        this.getAttribute("href").substring(1)
      );
      if (targetSection)
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        });
    }
  });
});