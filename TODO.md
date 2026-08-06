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

- [ ] **22. Push Notifications Realtime via FCM (Firebase Cloud Messaging)**
  - [ ] Push notifications for attendance reminders & leave approval updates.

- [ ] **23. Autentikasi Biometrik (Fingerprint / Face ID)**
  - [ ] Local auth integration with `local_auth` package in Flutter.
