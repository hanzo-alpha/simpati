<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Rekap Presensi{{ isset($typeLabel) ? ' - '.$typeLabel : '' }} - {{ $officeName }} - {{ $monthName }}</title>
    <link rel="icon" type="image/png" href="/images/logo/logo-soppeng.png">
    <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; margin: 20px; color: #000; }
        .header { position: relative; text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 20px; min-height: 65px; }
        .header .header-logo { position: absolute; left: 10px; top: 0; height: 65px; width: auto; }
        .header h2 { margin: 0; font-size: 14pt; text-transform: uppercase; }
        .header h3 { margin: 2px 0; font-size: 16pt; font-weight: bold; text-transform: uppercase; }
        .header p { margin: 0; font-size: 10pt; font-style: italic; }
        .title { text-align: center; margin-bottom: 20px; }
        .title h4 { margin: 0; text-decoration: underline; font-size: 13pt; text-transform: uppercase; }
        .title p { margin: 2px 0; font-size: 11pt; }
        .summary-box { display: flex; gap: 20px; justify-content: center; margin-bottom: 20px; }
        .summary-item { border: 1px solid #ccc; border-radius: 6px; padding: 8px 16px; text-align: center; min-width: 90px; }
        .summary-item .val { font-size: 18pt; font-weight: bold; }
        .summary-item .lbl { font-size: 9pt; color: #666; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 9.5pt; }
        table, th, td { border: 1px solid #000; }
        th { background-color: #e8f5e9; padding: 6px; text-align: center; font-weight: bold; font-size: 9pt; }
        td { padding: 4px 6px; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .badge { padding: 2px 8px; border-radius: 10px; font-size: 8pt; font-weight: bold; display: inline-block; }
        .badge-tepat { background: #c8e6c9; color: #2e7d32; }
        .badge-terlambat { background: #fff3e0; color: #e65100; }
        .badge-sangat { background: #ffcdd2; color: #c62828; }
        .badge-masuk { background: #e8f5e9; color: #1b5e20; }
        .badge-pulang { background: #f3e5f5; color: #6a1b9a; }
        .badge-istirahat { background: #fff8e1; color: #f57f17; }
        .badge-kembali { background: #e3f2fd; color: #0d47a1; }
        .badge-dinas { background: #e8eaf6; color: #283593; }
        .badge-wfh { background: #e0f2f1; color: #00695c; }
        .badge-pending { background: #e3f2fd; color: #1565c0; }
        .ttd { width: 100%; margin-top: 40px; }
        .ttd-box { width: 250px; text-align: center; float: right; }
        .footer-info { font-size: 8.5pt; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 8px; }
        @media print {
            .no-print { display: none; }
            body { margin: 10px; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 15px; text-align: right;">
        <button onclick="window.print()" style="padding: 8px 16px; background: #0d9488; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
            🖨️ Cetak / Download PDF
        </button>
        <button onclick="window.close()" style="padding: 8px 16px; background: #ef4444; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-left: 8px;">
            ✕ Tutup
        </button>
    </div>

    <!-- Kop Surat -->
    <div class="header">
        <img src="{{ asset('images/logo/logo-soppeng.png') }}" class="header-logo" alt="Logo Soppeng">
        <h2>PEMERINTAH KABUPATEN SOPPENG</h2>
        <h3>{{ $officeName }}</h3>
        <p>Jalan Salotungo No. 1, Watansoppeng, Kabupaten Soppeng, Sulawesi Selatan</p>
    </div>

    <!-- Title -->
    <div class="title">
        <h4>REKAPITULASI PRESENSI PEGAWAI ASN</h4>
        <p>PERIODE BULAN: {{ strtoupper($monthName) }}</p>
        @if(isset($typeLabel) && $typeLabel)
            <p style="font-size: 12pt; font-weight: bold; margin-top: 4px; color: #1565c0;">
                Filter Jenis: {{ strtoupper($typeLabel) }}
            </p>
        @endif
    </div>

    <!-- Summary -->
    <table style="width: auto; margin: 0 auto 20px auto; border: none;">
        <tr style="border: none;">
            <td style="border: 1px solid #ccc; border-radius: 4px; padding: 6px 14px; text-align: center;">
                <div style="font-size: 16pt; font-weight: bold; color: #333;">{{ $summaryData['total'] }}</div>
                <div style="font-size: 8pt; color: #888;">Total Presensi</div>
            </td>
            <td style="border: 1px solid #ccc; border-radius: 4px; padding: 6px 14px; text-align: center;">
                <div style="font-size: 16pt; font-weight: bold; color: #2e7d32;">{{ $summaryData['tepat_waktu'] }}</div>
                <div style="font-size: 8pt; color: #888;">Tepat Waktu</div>
            </td>
            <td style="border: 1px solid #ccc; border-radius: 4px; padding: 6px 14px; text-align: center;">
                <div style="font-size: 16pt; font-weight: bold; color: #e65100;">{{ $summaryData['terlambat'] }}</div>
                <div style="font-size: 8pt; color: #888;">Terlambat</div>
            </td>
            <td style="border: 1px solid #ccc; border-radius: 4px; padding: 6px 14px; text-align: center;">
                <div style="font-size: 16pt; font-weight: bold; color: #00695c;">{{ $summaryData['wfh'] }}</div>
                <div style="font-size: 8pt; color: #888;">WFH</div>
            </td>
            <td style="border: 1px solid #ccc; border-radius: 4px; padding: 6px 14px; text-align: center;">
                <div style="font-size: 16pt; font-weight: bold; color: #283593;">{{ $summaryData['dinas_luar'] }}</div>
                <div style="font-size: 8pt; color: #888;">Dinas Luar</div>
            </td>
        </tr>
    </table>

    <!-- Table -->
    <table>
        <thead>
            <tr>
                <th style="width: 25px;">NO</th>
                <th style="width: 80px;">TANGGAL</th>
                <th>NIP</th>
                <th>NAMA PEGAWAI</th>
                <th>OPD</th>
                <th style="width: 65px;">JENIS</th>
                <th style="width: 50px;">WAKTU</th>
                <th style="width: 80px;">STATUS</th>
                <th style="width: 50px;">RADIUS</th>
            </tr>
        </thead>
        <tbody>
            @forelse($attendances as $index => $att)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td class="text-center" style="font-family: monospace; font-size: 9pt;">{{ $att['tanggal'] }}</td>
                <td class="text-center" style="font-size: 8.5pt;">{{ $att['nip'] }}</td>
                <td><b>{{ $att['name'] }}</b></td>
                <td style="font-size: 8.5pt;">{{ $att['opd'] }}</td>
                <td class="text-center">
                    @php
                        $jenisMap = [
                            'masuk' => ['badge-masuk', 'Masuk'],
                            'pulang' => ['badge-pulang', 'Pulang'],
                            'istirahat' => ['badge-istirahat', 'Istirahat'],
                            'kembali' => ['badge-kembali', 'Kembali'],
                            'dinas_luar' => ['badge-dinas', 'Dinas Luar'],
                            'wfh' => ['badge-wfh', 'WFH'],
                        ];
                        $j = $jenisMap[$att['jenis']] ?? ['', $att['jenis']];
                    @endphp
                    <span class="badge {{ $j[0] }}">{{ $j[1] }}</span>
                </td>
                <td class="text-center" style="font-family: monospace;">{{ $att['waktu'] }}</td>
                <td class="text-center">
                    @php
                        $statusMap = [
                            'tepat_waktu' => ['badge-tepat', 'Tepat Waktu'],
                            'terlambat' => ['badge-terlambat', 'Terlambat'],
                            'sangat_terlambat' => ['badge-sangat', 'Sangat Telat'],
                            'menunggu_persetujuan' => ['badge-pending', 'Pending'],
                            'pulang_cepat' => ['badge-terlambat', 'PSW'],
                        ];
                        $s = $statusMap[$att['status']] ?? ['', $att['status']];
                    @endphp
                    <span class="badge {{ $s[0] }}">{{ $s[1] }}</span>
                </td>
                <td class="text-center">
                    @if($att['in_radius'])
                        <span class="badge badge-tepat">✓</span>
                    @else
                        <span class="badge badge-sangat">✗</span>
                    @endif
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="9" class="text-center">Data presensi tidak ditemukan.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <!-- TTD Box -->
    <div class="ttd">
        <div class="ttd-box">
            <p>Watansoppeng, {{ date('d F Y') }}</p>
            <p>Kepala {{ $officeName }}</p>
            <br><br><br><br>
            <p><b><u>....................................................</u></b></p>
            <p>NIP. ....................................</p>
        </div>
    </div>

    <div style="clear: both;"></div>

    <div class="footer-info">
        Dokumen ini dicetak secara otomatis oleh Sistem Informasi Manajemen Presensi ASN Terintegrasi (SIMPATI)<br>
        Pemerintah Kabupaten Soppeng &mdash; {{ date('d F Y, H:i') }} WITA
    </div>
</body>
</html>
