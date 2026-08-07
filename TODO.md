# SIMPATI (Presensi ASN Kabupaten Soppeng) - TODO List

## 🚨 Phase 1: Fix Fatal Security Gaps (High Priority)
- [x] **1. Fake GPS / Mock Location Detection**
  - [x] Update Flutter app (`simpati_mobile`) to check `position.isMocked` using `Geolocator`.
  - [x] Reject attendance submission immediately on mobile if Fake GPS / Mock Location is detected.
  - [x] Pass `is_mocked` parameter in API payload to `AttendanceController.php`.
  - [x] Validate `is_mocked` parameter in Laravel backend `AttendanceController@store`.

- [x] **2. Single Device Binding (Prevent Account Sharing/Titip Presensi)**
  - [x] Add `device_id` column to `users` table migration.
  - [x] Store `device_id` upon first login or check against registered `device_id`.
  - [x] Provide admin ability to reset user `device_id` if ASN changes phone.
  - [x] Validate `device_id` in API requests for attendance submission.

- [x] **3. Camera Live Verification & Anti-Spoofing**
  - [x] Ensure attendance camera source is strictly live front camera (disable gallery selection for attendance selfie).
  - [x] Add camera orientation & basic liveness/image checks before submission.

---

## 🌟 Phase 2: Feature Enhancements (Medium Priority)
- [x] **4. Mobile Approval Dashboard for Supervisors (Atasan / Kepala OPD)**
  - [x] Create Supervisor Leave Request Approval screen in Flutter mobile app.
  - [x] Add API endpoint for supervisors to view and approve/reject subordinate leave requests.

- [x] **5. Out of Office / WFH Attendance Category**
  - [x] Add "Dinas Luar" & "WFH" attendance type with required assignment document upload.
  - [x] Set status to Pending Approval for out-of-radius attendance with valid assignment letter.

- [x] **6. Offline Attendance Sync**
  - [x] Implement local offline queue (SharedPreferences/JSON) for presensi in blank spot areas.
  - [x] Auto-sync attendance when internet connectivity is restored.

- [x] **7. Export PDF/Excel Attendance Recap for Mobile**
  - [x] Add PDF download/view API endpoint and service for individual monthly attendance recap.

---

## 🚀 Phase 3: Advanced Government Features (High Impact)
- [x] **8. Kalkulasi Otomatis Potongan TPP / Gaji Pemda**
  - [x] Add TPP deduction calculation logic in Laravel backend (`StatisticController` & `AttendanceController`).
  - [x] Expose TPP deduction summary in `GET /api/statistics` API.
  - [x] Display TPP deduction estimate widget in Flutter Mobile App Dashboard & Statistics tab.

- [x] **9. Broadcast Pengumuman & Edaran OPD (Announcement Banner)**
  - [x] Create announcement model & migration for OPD broadcast messages.
  - [x] Render Announcement Banner on Flutter Mobile App Dashboard.

- [x] **10. Smart Local Alarm Pengingat Presensi**
  - [x] Auto-schedule local notifications 15 mins before check-in and check-out time.

- [x] **11. Pengajuan Pertukaran Shift Kerja (Shift Swap)**
  - [x] Add shift swap request model, API endpoints, and mobile UI.

- [x] **12. Peta Interaktif Monitoring Real-time untuk Atasan / Admin**
  - [x] Interactive live map for OPD supervisors to monitor subordinate locations.

---

## 🏛️ Phase 4: Web Admin & Enterprise OPD Upgrades (High Value)
- [x] **13. Peta Interaktif Monitoring Real-time ASN di Dashboard Web**
  - [x] Add Leaflet/OpenStreetMap interactive live location map component to Admin Dashboard (`resources/js/Pages/Admin/Dashboard.vue`).
  - [x] Render live ASN check-in markers with status colors (Tepat Waktu, Terlambat, Dinas Luar) & office geofence circle.

- [x] **14. Cetak Laporan Rekapitulasi Potongan TPP Siap BPKAD (PDF & Excel)**
  - [x] Add OPD monthly TPP deduction PDF & Excel export generator endpoint (`/admin/attendances/export-tpp`).
  - [x] Add export button & preview modal in Admin Attendances page (`resources/js/Pages/Admin/Attendances.vue`).

- [x] **15. Dashboard Persetujuan Pertukaran Shift Kerja (Shift Swap)**
  - [x] Create Admin Shift Swaps page (`resources/js/Pages/Admin/ShiftSwaps.vue`) and controller web routes (`/admin/shift-swaps`).
  - [x] Allow Admin / OPD Supervisors to approve/reject shift swap requests on web.

- [x] **16. Audit Log Keamanan & Deteksi Audit Fake GPS**
  - [x] Create Security Audit Logs migration & page (`resources/js/Pages/Admin/AuditLogs.vue`).
  - [x] Track & display Fake GPS detection logs, unauthorized device changes, and abnormal location check-ins.

- [x] **17. Cetak Kartu ID / QR Code ASN Digital**
  - [x] Add QR Code generation for ASN profile in `resources/js/Pages/Admin/Users.vue`.
  - [x] Create printable ID Card card layout for official ASN attendance & event verification.

---

## 🛡️ Phase 5: Next Level Security & Feature Upgrades (New Roadmap)
- [x] **18. Active Liveness Detection & Anti-Spoofing for Selfie Presensi**
  - [x] Verify Fake GPS & Mock Location detection (Already active in `presensi_screen.dart` & `AttendanceController.php`).
  - [x] Verify Offline Attendance Queue & Auto-Sync (Already active in `offline_sync_service.dart`).
  - [x] Add Active Face Liveness challenge prompt overlay before selfie snapshot on Flutter camera.

- [x] **19. Kuota & Balance Cuti (Leave Balance & Quota Management)**
  - [x] Support `sisa_cuti_tahunan` in UserProfile model & Laravel migration.
  - [x] Auto-deduct leave quota upon supervisor approval in `LeaveRequestController@updateStatus`.
  - [x] Render interactive Sisa Kuota Cuti Card & live duration calculator in Mobile `pengajuan_screen.dart`.

- [x] **20. Upload & Preview Lampiran Surat Cuti/Dinas (PDF & Image)**
  - [x] Support PDF/image attachments in Leave Request screen (`LeaveRequests/Create.vue`).
  - [x] Add in-app preview modal for documents (`Admin/LeaveRequests.vue` & `LeaveRequests/Index.vue`).

- [x] **21. Multi-Level Approval Flow untuk Pengajuan Cuti/Dinas**
  - [x] Support multi-stage approval (Atasan Langsung -> Kepala OPD/HR).

- [x] **22. Push Notifications Realtime via FCM (Firebase Cloud Messaging)**
  - [x] Push notifications for attendance reminders & leave approval updates (`FcmService.php` & `SendAttendanceReminders.php`).

- [x] **23. Autentikasi Biometrik (Fingerprint / Face ID)**
  - [x] Local auth integration with `local_auth` package in Flutter (`BiometricService.dart` & `login_screen.dart`).

---

## 🧭 Phase 6: Gap Analysis & Advanced Feature Roadmap (New)
- [x] **24. Monitoring Peta Realtime ASN di Mobile untuk Atasan / Kepala OPD (Gap #1)**
  - [x] Tambahkan API endpoint `GET /api/supervision/live-locations` untuk mengambil lokasi presensi real-time bawahan OPD.
  - [x] Buat layar interactive map `monitoring_map_screen.dart` (menggunakan flutter_map / map picker) di `simpati_mobile` untuk Atasan/Kepala OPD.
  - [x] Tampilkan marker lokasi bawahan (Hadir, Terlambat, Dinas Luar) beserta radius geofence kantor.

- [x] **25. Approval Pertukaran Shift (Shift Swap) untuk Atasan di Mobile (Gap #2)**
  - [x] Tambahkan tab/layar Approval Shift Swap di aplikasi Mobile untuk Atasan.
  - [x] Sambungkan API persetujuan shift swap ke mobile UI.

- [x] **26. Pengajuan Koreksi Presensi / Lupa Absen di Mobile & Web (Gap #3)**
  - [x] Buat tabel & API model pengajuan koreksi presensi (Attendance Correction Request).
  - [x] Tambahkan form pengajuan koreksi presensi di Flutter Mobile & dashboard approval di Web/Mobile.

- [x] **27. Polygon Geofence Builder di Web Admin (Peningkatan Web)**
  - [x] Integrasikan Leaflet Draw & Ray-Casting Polygon Geofence di Web Admin & Backend untuk membuat batas geofence polygon (non-lingkaran).

- [x] **28. Dynamic TPP Deduction Rule Engine (Peningkatan Web)**
  - [x] Buat halaman konfigurasi aturan kalkulasi potongan TPP dinamis sesuai Peraturan Bupati (Perbup) di Web Admin.

- [x] **29. Presensi Apel / Upacara / Kegiatan via Dynamic QR Scanner (Peningkatan Mobile)**
  - [x] Buat generator QR Code Dinamis di Web Admin untuk panitia apel/kegiatan.
  - [x] Implementasikan QR Code Scanner di Flutter Mobile untuk presensi kegiatan.

- [x] **30. Dynamic Watermark Foto Presensi (Peningkatan Keamanan)**
  - [x] Tambahkan watermark otomatis (NIP, Nama, Lat/Long, Timestamp) pada foto presensi yang diunggah.

---

## 🎨 Phase 7: UI/UX Master Roadmap (Mobile & Web Admin)

### 📱 1. Rekomendasi UI/UX Aplikasi Mobile (Pegawai ASN)
- [x] **31. Visual Ringkasan Presensi Kalender (Month Grid Visualizer)**
  - [x] Tampilkan grid kalender bulanan interaktif dengan indikator warna (*color-coded dots/highlights*): Hijau (Tepat Waktu), Kuning (Terlambat), Biru (Izin/Cuti), Merah (Alpha) di `riwayat_screen.dart`.
- [x] **32. Indikator Countdown & Radius Presensi Real-Time di Dashboard**
  - [x] Tampilkan *live timer* sisa waktu menuju batas jam masuk/pulang & indikator jarak radius kantor real-time di `dashboard_screen.dart` / `presensi_screen.dart`.
- [x] **33. Umpan Balik Haptik & Audio Ringan (Haptic Feedback)**
  - [x] Integrasikan `HapticFeedback.lightImpact()` / `mediumImpact()` saat selfie liveness terverifikasi dan presensi berhasil.
- [x] **34. Banner Status Mode Offline (Offline Sync Status Banner)**
  - [x] Tampilkan banner informasi halus saat koneksi lambat/offline bahwa presensi tersimpan lokal dan akan sinkron otomatis saat online.

### 💻 2. Rekomendasi UI/UX Web Admin Panel (Pengelola BKPSDM & OPD)
- [ ] **35. Aksi Massal (Bulk Actions) dengan Checkbox Multi-Select**
  - [ ] Tambahkan persetujuan/penolakan massal (*Bulk Approve / Reject*) pada pengajuan cuti, koreksi presensi, & shift swap.
- [ ] **36. Command Palette / Pencarian Pintar Global (`Ctrl + K`)**
  - [ ] Sediakan modal pencarian pintas `Ctrl + K` untuk cepat berpindah ke data pegawai, OPD, atau halaman admin.
- [ ] **37. Opsi Ekspor Laporan Serbaguna (Excel `.xlsx` & PDF)**
  - [ ] Tambahkan ekspor laporan presensi OPD format Excel `.xlsx` selain PDF.
- [ ] **38. Grafik Tren Kehadiran Interaktif (Dashboard Analytics)**
  - [ ] Tambahkan chart tren persetujuan & kehadiran ASN per minggu/bulan di Web Admin Dashboard.

