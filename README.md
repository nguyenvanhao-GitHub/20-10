# 🌸 CẢ MỘT VƯỜN THƯƠNG - CHÚC MỪNG 20/10

Trang web thiệp hoa nở tương tác nghệ thuật dành tặng những người phụ nữ yêu thương nhân ngày **Phụ nữ Việt Nam 20/10**.

---

## ✨ Điểm nổi bật
- **Khởi đầu tinh tế:** Bắt đầu bằng một đóa hoa hồng nhỏ bồng bềnh trong làn gió nhẹ giữa bầu trời xanh trong trẻo.
- **Hiệu ứng bung nở kì diệu (Cascade Bloom):** Khi chạm vào bông hoa, khu vườn với khoảng 90 đóa trên màn hình rộng (gần 50 đóa trên điện thoại) đồng loạt vươn mình bung nở. Hoa hồng dùng ảnh cắt nền nhiều lớp cánh; các màu gồm hồng, cam đào, xanh bạc hà, lam ngọc, vàng bơ và tím oải hương.
- **Thiệp chúc mừng đầy cảm xúc:** Sau khi hoa nở rộ, bức thiệp trang nhã tự động xuất hiện với những dòng nhắn gửi dịu dàng, sâu lắng.
- **Tương tác linh hoạt:** 
  - Nút **"Ngắm vườn hoa"** để thu gọn thiệp và chiêm ngưỡng toàn cảnh khu vườn.
  - Nút **"Đọc lại thiệp"** để mở lại bức thiệp bất cứ lúc nào.
  - Nút **"Cho hoa nở lại"** để trải nghiệm lại khoảnh khắc hoa nở rộ từ đầu.
  - Nút **"Tạo link theo tên"** & hỗ trợ tham số URL `?name=Tên_Người_Nhận` (Ví dụ: `?name=Mai`, `?name=Chị_Ngọc`).
  - Âm thanh chuông pha lê & giai điệu piano nhẹ nhàng bằng Web Audio API (hoạt động offline mượt mà không lo lỗi tải file nhạc).

---

## 🚀 Hướng dẫn chạy và sử dụng

### Cách 1: Mở trực tiếp
Nhấp đúp chuột vào tệp `index.html` hoặc `garden.html` để mở ngay trên trình duyệt web (Google Chrome, Microsoft Edge, Cốc Cốc, Safari...).

### Cách 2: Chạy qua Local Server
Mở terminal/PowerShell tại thư mục dự án và gõ:
```bash
python -m http.server 8000
```
Sau đó mở trình duyệt và truy cập:
```
http://localhost:8000/garden.html
```
hoặc:
```
http://localhost:8000/
```

### Cách 3: Gửi kèm tên người nhận riêng
Bạn chỉ cần thêm `?name=Tên` vào đuôi đường link:
- `http://localhost:8000/garden.html?name=Hương`
- `http://localhost:8000/garden.html?name=Mẹ_Yêu`
- `http://localhost:8000/garden.html?name=Các_bạn_nữ_phòng_kinh_doanh`

Tên người nhận sẽ tự động hiển thị trang trọng ở góc trái và trong lời chào đầu bức thiệp!

---

## 🌐 Hướng dẫn đưa lên GitHub Pages để gửi tặng bạn bè qua mạng
1. Commit và push code lên GitHub repo của bạn:
   ```bash
   git add .
   git commit -m "Update 20/10 garden interactive card"
   git push origin main
   ```
2. Vào GitHub repository của bạn:
   - Chọn tab **Settings** -> mục **Pages** (bên menu trái).
   - Tại mục **Build and deployment** > **Branch**: chọn `main` và thư mục `/ (root)`.
   - Nhấn **Save**.
3. Sau 1-2 phút, GitHub sẽ cung cấp cho bạn một đường link công khai miễn phí (ví dụ: `https://nguyenvanhao-github.github.io/20-10/`). Bạn có thể gửi đường link này cho các bạn nữ cùng trải nghiệm!
