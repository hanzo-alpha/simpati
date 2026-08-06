<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Rekapitulasi TPP - {{ $officeName }}</title>
    <link rel="icon" type="image/png" href="/images/logo/logo-soppeng.png">
    <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin: 20px; color: #000; }
        .header { position: relative; text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 20px; min-height: 65px; }
        .header .header-logo { position: absolute; left: 10px; top: 0; height: 65px; width: auto; }
        .header h2 { margin: 0; font-size: 14pt; text-transform: uppercase; }
        .header h3 { margin: 2px 0; font-size: 16pt; font-weight: bold; text-transform: uppercase; }
        .header p { margin: 0; font-size: 10pt; font-style: italic; }
        .title { text-align: center; margin-bottom: 20px; }
        .title h4 { margin: 0; text-decoration: underline; font-size: 13pt; text-transform: uppercase; }
        .title p { margin: 2px 0; font-size: 11pt; }
        table { w-full; width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10pt; }
        table, th, td { border: 1px solid #000; }
        th { background-color: #f2f2f2; padding: 6px; text-align: center; font-weight: bold; }
        td { padding: 5px 8px; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .ttd { width: 100%; margin-top: 40px; display: flex; justify-content: flex-end; }
        .ttd-box { width: 250px; text-align: center; float: right; }
        @media print {
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 15px; text-align: right;">
        <button onclick="window.print()" style="padding: 8px 16px; background: #0d9488; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
            🖨️ Cetak / Download PDF
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
        <h4>LAPORAN REKAPITULASI PEMOTONGAN TPP PEGAWAI</h4>
        <p>PERIODE BULAN: {{ strtoupper($monthName) }}</p>
    </div>

    <!-- Table -->
    <table>
        <thead>
            <tr>
                <th style="width: 30px;">NO</th>
                <th>NIP</th>
                <th>NAMA PEGAWAI</th>
                <th>JABATAN</th>
                <th>HADIR</th>
                <th>TERLAMBAT</th>
                <th>POTONGAN (%)</th>
                <th>CAPAIAN TPP (%)</th>
            </tr>
        </thead>
        <tbody>
            @forelse($reportData as $index => $row)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td class="text-center">{{ $row['nip'] }}</td>
                <td><b>{{ $row['name'] }}</b></td>
                <td>{{ $row['jabatan'] }}</td>
                <td class="text-center">{{ $row['hadir'] }} Hari</td>
                <td class="text-center">{{ $row['terlambat'] }} Kali</td>
                <td class="text-center" style="color: {{ $row['potongan_percent'] > 0 ? 'red' : 'green' }};">
                    <b>{{ number_format($row['potongan_percent'], 1) }}%</b>
                </td>
                <td class="text-center"><b>{{ number_format($row['sisa_tpp_percent'], 1) }}%</b></td>
            </tr>
            @empty
            <tr>
                <td colspan="8" class="text-center">Data presensi tidak ditemukan.</td>
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
</body>
</html>
