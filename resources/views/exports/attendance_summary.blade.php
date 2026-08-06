<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Rekap Absensi {{ $officeName }} - {{ $monthName }}</title>
    <link rel="icon" type="image/png" href="/images/logo/logo-soppeng.png">
    <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 10pt; margin: 15px; color: #000; }
        .header { position: relative; text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 15px; min-height: 60px; }
        .header .header-logo { position: absolute; left: 10px; top: 0; height: 60px; width: auto; }
        .header h2 { margin: 0; font-size: 13pt; text-transform: uppercase; }
        .header h3 { margin: 2px 0; font-size: 15pt; font-weight: bold; text-transform: uppercase; }
        .header p { margin: 0; font-size: 9pt; font-style: italic; }
        .title { text-align: center; margin-bottom: 15px; }
        .title h4 { margin: 0; text-decoration: underline; font-size: 12pt; text-transform: uppercase; }
        .title p { margin: 2px 0; font-size: 10pt; }

        table { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
        table, th, td { border: 1px solid #000; }
        th { padding: 5px 3px; text-align: center; font-weight: bold; font-size: 8pt; }
        .th-yellow { background-color: #fff9c4; }
        .th-green { background-color: #c8e6c9; }
        .th-blue { background-color: #bbdefb; }
        .th-orange { background-color: #ffe0b2; }
        .th-red { background-color: #ffcdd2; }
        td { padding: 3px 5px; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .name-cell { white-space: nowrap; font-weight: bold; }
        .nip-cell { font-family: monospace; font-size: 8pt; white-space: nowrap; }
        .val-zero { color: #bbb; }
        .val-highlight { font-weight: bold; color: #c62828; }
        .row-even { background-color: #fafafa; }

        .summary-row td { font-weight: bold; background-color: #e8f5e9; }
        .ttd { width: 100%; margin-top: 30px; }
        .ttd-box { width: 250px; text-align: center; float: right; }
        .footer-info { font-size: 8pt; color: #888; text-align: center; margin-top: 25px; border-top: 1px solid #ddd; padding-top: 6px; }
        @media print {
            .no-print { display: none; }
            body { margin: 8px; }
        }
        @page { size: landscape; margin: 10mm; }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 12px; text-align: right;">
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
        <h4>REKAPITULASI ABSENSI PEGAWAI ASN</h4>
        <p>PERIODE BULAN: {{ strtoupper($monthName) }}</p>
    </div>

    <!-- Table -->
    <table>
        <thead>
            <tr>
                <th class="th-yellow" rowspan="2" style="width: 25px;">No</th>
                <th class="th-yellow" rowspan="2" style="width: 120px;">NIP</th>
                <th class="th-yellow" rowspan="2">Nama</th>
                <th class="th-yellow" rowspan="2" style="width: 80px;">Mode Kerja</th>
                <th class="th-green" rowspan="2" style="width: 40px;">Hari Kerja Efektif</th>
                <th class="th-green" rowspan="2" style="width: 40px;">Hadir</th>
                <th class="th-blue" colspan="4">Jenis Presensi</th>
                <th class="th-orange" colspan="3">Status</th>
                <th class="th-blue" colspan="2">Tugas</th>
                <th class="th-red" colspan="2">Izin</th>
            </tr>
            <tr>
                <th class="th-blue" style="width: 40px;">Masuk</th>
                <th class="th-blue" style="width: 40px;">Istirahat</th>
                <th class="th-blue" style="width: 40px;">Kembali</th>
                <th class="th-blue" style="width: 40px;">Pulang</th>
                <th class="th-orange" style="width: 30px;">TL</th>
                <th class="th-orange" style="width: 30px;">PSW</th>
                <th class="th-orange" style="width: 30px;">TK</th>
                <th class="th-blue" style="width: 30px;">DD</th>
                <th class="th-blue" style="width: 30px;">DL</th>
                <th class="th-red" style="width: 35px;">Sakit</th>
                <th class="th-red" style="width: 35px;">Cuti</th>
            </tr>
        </thead>
        <tbody>
            @forelse($rows as $index => $row)
            <tr class="{{ $index % 2 == 1 ? 'row-even' : '' }}">
                <td class="text-center">{{ $index + 1 }}</td>
                <td class="nip-cell text-center">{{ $row['nip'] }}</td>
                <td class="name-cell">{{ $row['name'] }}</td>
                <td class="text-center">{{ $row['mode_kerja'] }}</td>
                <td class="text-center">{{ $row['hari_kerja'] }}</td>
                <td class="text-center" style="font-weight: bold;">{{ $row['hadir'] }}</td>
                @foreach(['masuk','istirahat','kembali','pulang'] as $col)
                    <td class="text-center {{ $row[$col] == 0 ? 'val-zero' : '' }}">{{ $row[$col] ?: '-' }}</td>
                @endforeach
                <td class="text-center {{ $row['terlambat'] > 0 ? 'val-highlight' : ($row['terlambat'] == 0 ? 'val-zero' : '') }}">{{ $row['terlambat'] ?: '-' }}</td>
                <td class="text-center {{ $row['psw'] > 0 ? 'val-highlight' : ($row['psw'] == 0 ? 'val-zero' : '') }}">{{ $row['psw'] ?: '-' }}</td>
                <td class="text-center {{ $row['tk'] > 0 ? 'val-highlight' : ($row['tk'] == 0 ? 'val-zero' : '') }}">{{ $row['tk'] ?: '-' }}</td>
                <td class="text-center {{ $row['dd'] == 0 ? 'val-zero' : '' }}">{{ $row['dd'] ?: '-' }}</td>
                <td class="text-center {{ $row['dl'] == 0 ? 'val-zero' : '' }}">{{ $row['dl'] ?: '-' }}</td>
                <td class="text-center {{ $row['sakit'] == 0 ? 'val-zero' : '' }}">{{ $row['sakit'] ?: '-' }}</td>
                <td class="text-center {{ $row['cuti'] == 0 ? 'val-zero' : '' }}">{{ $row['cuti'] ?: '-' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="17" class="text-center" style="padding: 15px;">Data pegawai tidak ditemukan.</td>
            </tr>
            @endforelse
        </tbody>
        @if(count($rows))
        <tfoot>
            <tr class="summary-row">
                <td colspan="4" class="text-center">TOTAL</td>
                <td class="text-center">{{ $totals['hari_kerja'] }}</td>
                <td class="text-center">{{ $totals['hadir'] }}</td>
                <td class="text-center">{{ $totals['masuk'] }}</td>
                <td class="text-center">{{ $totals['istirahat'] }}</td>
                <td class="text-center">{{ $totals['kembali'] }}</td>
                <td class="text-center">{{ $totals['pulang'] }}</td>
                <td class="text-center">{{ $totals['terlambat'] }}</td>
                <td class="text-center">{{ $totals['psw'] }}</td>
                <td class="text-center">{{ $totals['tk'] }}</td>
                <td class="text-center">{{ $totals['dd'] }}</td>
                <td class="text-center">{{ $totals['dl'] }}</td>
                <td class="text-center">{{ $totals['sakit'] }}</td>
                <td class="text-center">{{ $totals['cuti'] }}</td>
            </tr>
        </tfoot>
        @endif
    </table>

    <!-- Legend -->
    <div style="font-size: 8pt; margin-top: 10px; color: #555;">
        <b>Keterangan:</b> TL = Terlambat &nbsp;|&nbsp; PSW = Pulang Sebelum Waktu &nbsp;|&nbsp; TK = Tanpa Keterangan &nbsp;|&nbsp; DD = Dinas Dalam &nbsp;|&nbsp; DL = Dinas Luar
    </div>

    <!-- TTD -->
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
