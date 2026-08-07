import AuthController from './AuthController'
import DashboardController from './DashboardController'
import AttendanceController from './AttendanceController'
import LeaveRequestController from './LeaveRequestController'
import Admin from './Admin'
const Web = {
    AuthController: Object.assign(AuthController, AuthController),
DashboardController: Object.assign(DashboardController, DashboardController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
LeaveRequestController: Object.assign(LeaveRequestController, LeaveRequestController),
Admin: Object.assign(Admin, Admin),
}

export default Web