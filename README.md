# 🌸 CẢ MỘT VƯỜN THƯƠNG - CHÚC MỪNG 20/10

Trang web thiệp hoa nở tương tác nghệ thuật dành tặng những người phụ nữ yêu thương nhân ngày **Phụ nữ Việt Nam 20/10**.

---

## ✨ Điểm nổi bật
- **Khởi đầu tinh tế:** Bắt đầu bằng một đóa hoa hồng nhỏ bồng bềnh trong làn gió nhẹ giữa bầu trời xanh trong trẻo.
- **Hiệu ứng bung nở kì diệu (Cascade Bloom):** Khi chạm vào bông hoa, khu vườn với hơn 200 đóa trên màn hình rộng (hơn 100 đóa trên điện thoại) bung nở nhanh và đan xen chi chít thành thảm hoa kín đáy. Các nụ đỏ, xanh lam, xanh ngọc, trắng, xanh–trắng và cam–kem đều dùng ảnh cắt nền tạo theo ảnh mẫu.
- **Thân và lá hoa:** Cành xanh mảnh với hai lá cắt nền tạo bằng ImageGen theo ảnh mẫu, dùng cho bông hoa mở đầu và các cành trong vườn.
- **Tối ưu hóa tốc độ tải web:** Tinh chỉnh các ảnh hoa chính, áp dụng `DocumentFragment`, tăng tốc phần cứng GPU và rút ngắn hoạt cảnh nở hoa.
- **Đàn bướm 3D dập dờn trong khu vườn:** Khi hoa nở rộ, những cánh bướm pastel nhẹ nhàng cất cánh lượn quanh các đóa hoa. Khi chạm vào bướm, bướm sẽ xoay vòng tung bụi tiên và gửi lời nhắn may mắn!
- **Chạm hoa - Lời nhắn thì thầm yêu thương:** Chạm vào bất kỳ bông hoa nào trong vườn, đóa hoa sẽ nảy nhẹ cùng tiếng chuông pha lê, tung chùm bụi tiên và gửi đến bạn nữ một lời chúc ngọt ngào ngẫu nhiên.
- **Vệt sao lấp lánh (Magic Stardust Trail):** Khi lướt ngón tay hoặc rê chuột qua màn hình, những dải sao bụi tiên ấm áp sẽ lấp lánh bay theo đầu ngón tay.
- **Đom đóm & Bụi phấn phát sáng:** Những đốm sáng đom đóm vàng dịu dàng bay lơ lửng, tạo nên không gian khu vườn thần tiên đầy chất thơ.
- **Thiệp chúc mừng ánh kim sang trọng:** Khi mở thiệp, luồng ánh sáng kim lướt nhẹ qua bề mặt giấy thiệp kèm pháo hoa cánh hoa bay lãng mạn.
- **Thiết kế Responsive hoàn hảo cho mọi thiết bị:** Tự động co giãn mượt mà từ iPhone nhỏ gọn (iPhone SE), iPhone tai thỏ / Dynamic Island (hỗ trợ Safe Area), iPad/máy tính bảng xoay ngang dọc đến màn hình máy tính 4K và Ultrawide.
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
