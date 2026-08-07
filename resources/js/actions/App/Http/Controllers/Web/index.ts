import DashboardController from './DashboardController';
import AttendanceController from './AttendanceController';
import LeaveRequestController from './LeaveRequestController';
import AdminController from './AdminController';
const Web = {
    DashboardController: Object.assign(
        DashboardController,
        DashboardController,
    ),
    AttendanceController: Object.assign(
        AttendanceController,
        AttendanceController,
    ),
    LeaveRequestController: Object.assign(
        LeaveRequestController,
        LeaveRequestController,
    ),
    AdminController: Object.assign(AdminController, AdminController),
};

export default Web;
