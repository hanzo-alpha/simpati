import AuthController from './AuthController'
import AttendanceController from './AttendanceController'
import LeaveRequestController from './LeaveRequestController'
import RankingController from './RankingController'
import AnnouncementController from './AnnouncementController'
import ShiftSwapController from './ShiftSwapController'
import StatisticController from './StatisticController'
import SimpegIntegrationController from './SimpegIntegrationController'
const Api = {
    AuthController: Object.assign(AuthController, AuthController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
LeaveRequestController: Object.assign(LeaveRequestController, LeaveRequestController),
RankingController: Object.assign(RankingController, RankingController),
AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
ShiftSwapController: Object.assign(ShiftSwapController, ShiftSwapController),
StatisticController: Object.assign(StatisticController, StatisticController),
SimpegIntegrationController: Object.assign(SimpegIntegrationController, SimpegIntegrationController),
}

export default Api