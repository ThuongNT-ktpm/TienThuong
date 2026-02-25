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

if (slides.length > 0) {
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
}

// 3. TÍNH NĂNG LỌC VÀ PHÂN TRANG
const filterBtns = document.querySelectorAll(".filter-btn");
const productItems = document.querySelectorAll(
  "#product-list .product-card.item",
);
const paginationContainer = document.getElementById("pagination");

if (filterBtns.length > 0 && productItems.length > 0) {
  const itemsPerPage = 6;
  let currentPage = 1;
  let currentFilter = "all";

  function renderProducts() {
    const allItems = Array.from(productItems);
    const isDesktop = window.innerWidth >= 768;

    const filteredItems = allItems.filter((item) => {
      return (
        currentFilter === "all" ||
        item.getAttribute("data-category") === currentFilter
      );
    });

    allItems.forEach((item) => (item.style.display = "none"));

    if (isDesktop && currentFilter === "all") {
      const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      filteredItems
        .slice(startIndex, endIndex)
        .forEach((item) => (item.style.display = "flex"));
      renderPagination(totalPages);
    } else {
      filteredItems.forEach((item) => (item.style.display = "flex"));
      if (paginationContainer) paginationContainer.classList.remove("show");
    }
  }

  function renderPagination(totalPages) {
    if (!paginationContainer) return;
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

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      currentPage = 1;
      renderProducts();
    });
  });

  window.addEventListener("resize", renderProducts);
  renderProducts();
}

// 4. MỞ BANNER CHÍNH SÁCH (MODAL)
const modal = document.getElementById("policyModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.querySelector(".close-modal");
const linkPrivacy = document.getElementById("link-privacy");
const linkRefund = document.getElementById("link-refund");

if (modal && linkPrivacy && linkRefund) {
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

  linkPrivacy.addEventListener("click", () => {
    modalTitle.innerText = policyContent.privacy.title;
    modalBody.innerText = policyContent.privacy.text;
    modal.classList.add("show");
  });

  linkRefund.addEventListener("click", () => {
    modalTitle.innerText = policyContent.refund.title;
    modalBody.innerText = policyContent.refund.text;
    modal.classList.add("show");
  });

  closeModalBtn.addEventListener("click", () => modal.classList.remove("show"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
}

// 5. ĐIỀU HƯỚNG MENU TỐI ƯU CHO CẢ ĐIỆN THOẠI VÀ MÁY TÍNH
document.querySelectorAll(".nav-item, .desktop-nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Chỉ can thiệp nếu link có chứa dấu # (như #study-source hoặc index.html#love-web)
    if (href && href.includes("#")) {
      const parts = href.split("#");
      const pageUrl = parts[0]; // Sẽ ra "" (nếu là #id) hoặc "index.html"
      const targetId = parts[1]; // Tên ID cần lướt tới (vd: love-web)

      // Lấy tên trang hiện tại (vd: source.html, services.html, index.html)
      const currentPath = window.location.pathname;
      const currentPage = currentPath.substring(
        currentPath.lastIndexOf("/") + 1,
      );

      // Xác định xem mình có ĐANG Ở ĐÚNG TRANG CHỨA MỤC ĐÓ KHÔNG
      // - Nếu pageUrl rỗng (VD: href="#study-source") -> Đang ở cùng trang
      // - Nếu pageUrl là "index.html" VÀ trang hiện tại đúng là index.html (hoặc "/") -> Cùng trang
      let isSamePage = false;
      if (pageUrl === "") {
        isSamePage = true;
      } else if (
        pageUrl === "index.html" &&
        (currentPage === "index.html" || currentPage === "")
      ) {
        isSamePage = true;
      }

      if (isSamePage) {
        // TRƯỜNG HỢP 1: ĐANG Ở CÙNG TRANG
        // -> Ngăn chuyển trang, tự lướt mượt xuống mục đó
        e.preventDefault();

        // Đổi màu nút đang chọn
        document
          .querySelectorAll(".nav-item, .desktop-nav a")
          .forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");

        // Lướt xuống
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 70, // Trừ hao thanh header
            behavior: "smooth",
          });
        }
      } else {
        // TRƯỜNG HỢP 2: ĐANG Ở TRANG KHÁC (vd ở Source mà bấm Tỏ tình)
        // -> ÉP ĐIỆN THOẠI CHUYỂN TRANG BẰNG LỆNH CỨNG!
        e.preventDefault();
        window.location.href = href;
      }
    }
  });
});

// 6. XỬ LÝ LƯỚT MƯỢT KHI VỪA TỪ TRANG KHÁC CHUYỂN TỚI (Ví dụ: source.html -> index.html#love-web)
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Đợi 0.3s cho giao diện điện thoại render kịp ảnh và layout rồi mới lướt
      setTimeout(() => {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        });
      }, 300);

      // Làm sáng đúng nút trên thanh Menu
      document.querySelectorAll(".nav-item, .desktop-nav a").forEach((nav) => {
        const navHref = nav.getAttribute("href");
        if (navHref && navHref.includes(targetId)) {
          document
            .querySelectorAll(".nav-item, .desktop-nav a")
            .forEach((n) => n.classList.remove("active"));
          nav.classList.add("active");
        }
      });
    }
  }
});
