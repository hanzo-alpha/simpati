import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import attendances50f278 from './attendances'
import settings69f00b from './settings'
/**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
export const offices = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: offices.url(options),
    method: 'get',
})

offices.definition = {
    methods: ["get","head"],
    url: '/admin/offices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
offices.url = (options?: RouteQueryOptions) => {
    return offices.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
offices.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: offices.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
offices.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: offices.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
    const officesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: offices.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
        officesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: offices.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
        officesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: offices.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    offices.form = officesForm
/**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
/**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
export const attendances = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendances.url(options),
    method: 'get',
})

attendances.definition = {
    methods: ["get","head"],
    url: '/admin/attendances',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
attendances.url = (options?: RouteQueryOptions) => {
    return attendances.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
attendances.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendances.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
attendances.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendances.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
    const attendancesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendances.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
        attendancesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendances.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
        attendancesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendances.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendances.form = attendancesForm
/**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:622
 * @route '/admin/leave-requests'
 */
export const leaveRequests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveRequests.url(options),
    method: 'get',
})

leaveRequests.definition = {
    methods: ["get","head"],
    url: '/admin/leave-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:622
 * @route '/admin/leave-requests'
 */
leaveRequests.url = (options?: RouteQueryOptions) => {
    return leaveRequests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:622
 * @route '/admin/leave-requests'
 */
leaveRequests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveRequests.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:622
 * @route '/admin/leave-requests'
 */
leaveRequests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaveRequests.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:622
 * @route '/admin/leave-requests'
 */
    const leaveRequestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: leaveRequests.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:622
 * @route '/admin/leave-requests'
 */
        leaveRequestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveRequests.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:622
 * @route '/admin/leave-requests'
 */
        leaveRequestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveRequests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    leaveRequests.form = leaveRequestsForm
/**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
export const schedules = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})

schedules.definition = {
    methods: ["get","head"],
    url: '/admin/schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
schedules.url = (options?: RouteQueryOptions) => {
    return schedules.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
schedules.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
schedules.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedules.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
    const schedulesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedules.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
        schedulesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
        schedulesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedules.form = schedulesForm
/**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
export const announcements = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})

announcements.definition = {
    methods: ["get","head"],
    url: '/admin/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
announcements.url = (options?: RouteQueryOptions) => {
    return announcements.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
announcements.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
announcements.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: announcements.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
    const announcementsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: announcements.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
        announcementsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: announcements.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
        announcementsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: announcements.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    announcements.form = announcementsForm
/**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:808
 * @route '/admin/shift-swaps'
 */
export const shiftSwaps = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shiftSwaps.url(options),
    method: 'get',
})

shiftSwaps.definition = {
    methods: ["get","head"],
    url: '/admin/shift-swaps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:808
 * @route '/admin/shift-swaps'
 */
shiftSwaps.url = (options?: RouteQueryOptions) => {
    return shiftSwaps.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:808
 * @route '/admin/shift-swaps'
 */
shiftSwaps.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shiftSwaps.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:808
 * @route '/admin/shift-swaps'
 */
shiftSwaps.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shiftSwaps.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:808
 * @route '/admin/shift-swaps'
 */
    const shiftSwapsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shiftSwaps.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:808
 * @route '/admin/shift-swaps'
 */
        shiftSwapsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shiftSwaps.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:808
 * @route '/admin/shift-swaps'
 */
        shiftSwapsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shiftSwaps.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shiftSwaps.form = shiftSwapsForm
/**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:832
 * @route '/admin/audit-logs'
 */
export const auditLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})

auditLogs.definition = {
    methods: ["get","head"],
    url: '/admin/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:832
 * @route '/admin/audit-logs'
 */
auditLogs.url = (options?: RouteQueryOptions) => {
    return auditLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:832
 * @route '/admin/audit-logs'
 */
auditLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:832
 * @route '/admin/audit-logs'
 */
auditLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auditLogs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:832
 * @route '/admin/audit-logs'
 */
    const auditLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: auditLogs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:832
 * @route '/admin/audit-logs'
 */
        auditLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auditLogs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:832
 * @route '/admin/audit-logs'
 */
        auditLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auditLogs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    auditLogs.form = auditLogsForm
/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
export const peringkat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peringkat.url(options),
    method: 'get',
})

peringkat.definition = {
    methods: ["get","head"],
    url: '/admin/peringkat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
peringkat.url = (options?: RouteQueryOptions) => {
    return peringkat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
peringkat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peringkat.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
peringkat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: peringkat.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
    const peringkatForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: peringkat.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
        peringkatForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: peringkat.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
        peringkatForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: peringkat.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    peringkat.form = peringkatForm
/**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:925
 * @route '/admin/settings'
 */
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:925
 * @route '/admin/settings'
 */
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:925
 * @route '/admin/settings'
 */
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:925
 * @route '/admin/settings'
 */
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:925
 * @route '/admin/settings'
 */
    const settingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: settings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:925
 * @route '/admin/settings'
 */
        settingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:925
 * @route '/admin/settings'
 */
        settingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    settings.form = settingsForm
/**
* @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
export const profil = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profil.url(options),
    method: 'get',
})

profil.definition = {
    methods: ["get","head"],
    url: '/admin/profil',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
profil.url = (options?: RouteQueryOptions) => {
    return profil.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
profil.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profil.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
profil.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profil.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
    const profilForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: profil.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
        profilForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profil.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
        profilForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: profil.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    profil.form = profilForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
offices: Object.assign(offices, offices),
users: Object.assign(users, users),
attendances: Object.assign(attendances, attendances50f278),
leaveRequests: Object.assign(leaveRequests, leaveRequests),
schedules: Object.assign(schedules, schedules),
announcements: Object.assign(announcements, announcements),
shiftSwaps: Object.assign(shiftSwaps, shiftSwaps),
auditLogs: Object.assign(auditLogs, auditLogs),
peringkat: Object.assign(peringkat, peringkat),
settings: Object.assign(settings, settings69f00b),
profil: Object.assign(profil, profil),
}

export default admin