<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Models\WorkSchedule;
use App\Services\FcmService;
use Illuminate\Console\Command;

class SendAttendanceReminders extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'app:send-attendance-reminders';

    /**
     * The console command description.
     */
    protected $description = 'Send push notification reminders to ASN for attendance events';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = now();
        $currentTime = $now->format('H:i');
        $currentDay = strtolower($now->translatedFormat('l')); // e.g., 'senin'

        $schedules = WorkSchedule::where('is_active', true)->get();

        foreach ($schedules as $sch) {
            // Check if schedule applies today
            if (! $sch->appliesOnDay($currentDay)) {
                continue;
            }

            $this->checkAndNotify($sch, 'masuk', $sch->jam_masuk->subMinutes(15)->format('H:i'), $currentTime, 'Sudah siap presensi masuk? Jangan lupa absen ya!');
            $this->checkAndNotify($sch, 'istirahat', $sch->jam_istirahat?->format('H:i'), $currentTime, 'Waktunya istirahat! Selamat beristirahat.');
            $this->checkAndNotify($sch, 'kembali', $sch->jam_kembali?->subMinutes(10)->format('H:i'), $currentTime, '10 menit lagi masuk kembali. Yuk persiapkan diri.');
            $this->checkAndNotify($sch, 'pulang', $sch->jam_pulang->format('H:i'), $currentTime, 'Hore! Waktunya pulang. Jangan lupa presensi pulang ya.');
        }
    }

    private function checkAndNotify($schedule, $type, $targetTime, $currentTime, $message)
    {
        if (! $targetTime || $targetTime !== $currentTime) {
            return;
        }

        $users = User::where('office_id', $schedule->office_id)
            ->whereNotNull('fcm_token')
            ->where('is_active', true)
            ->get();

        foreach ($users as $user) {
            FcmService::sendToUser($user, '⏰ SIMPATI Reminder', $message, [
                'type' => 'reminder',
                'event' => $type,
            ]);
        }

        $this->info("Sent $type reminders to office ID: {$schedule->office_id}");
    }
}
