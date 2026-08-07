import DashboardController from './DashboardController'
import OfficeController from './OfficeController'
import UserController from './UserController'
import AttendanceController from './AttendanceController'
import LeaveRequestController from './LeaveRequestController'
import ScheduleController from './ScheduleController'
import AnnouncementController from './AnnouncementController'
import ShiftSwapController from './ShiftSwapController'
import CorrectionController from './CorrectionController'
import EventController from './EventController'
import AuditLogController from './AuditLogController'
import SettingController from './SettingController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
OfficeController: Object.assign(OfficeController, OfficeController),
UserController: Object.assign(UserController, UserController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
LeaveRequestController: Object.assign(LeaveRequestController, LeaveRequestController),
ScheduleController: Object.assign(ScheduleController, ScheduleController),
AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
ShiftSwapController: Object.assign(ShiftSwapController, ShiftSwapController),
CorrectionController: Object.assign(CorrectionController, CorrectionController),
EventController: Object.assign(EventController, EventController),
AuditLogController: Object.assign(AuditLogController, AuditLogController),
SettingController: Object.assign(SettingController, SettingController),
}

export default Admin