import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::index
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:18
 * @route '/admin/attendances'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/attendances',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::index
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:18
 * @route '/admin/attendances'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::index
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:18
 * @route '/admin/attendances'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::index
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:18
 * @route '/admin/attendances'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::index
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:18
 * @route '/admin/attendances'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::index
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:18
 * @route '/admin/attendances'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::index
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:18
 * @route '/admin/attendances'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendances
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:98
 * @route '/admin/attendances/export'
 */
export const exportAttendances = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendances.url(options),
    method: 'get',
})

exportAttendances.definition = {
    methods: ["get","head"],
    url: '/admin/attendances/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendances
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:98
 * @route '/admin/attendances/export'
 */
exportAttendances.url = (options?: RouteQueryOptions) => {
    return exportAttendances.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendances
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:98
 * @route '/admin/attendances/export'
 */
exportAttendances.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendances.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendances
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:98
 * @route '/admin/attendances/export'
 */
exportAttendances.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportAttendances.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendances
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:98
 * @route '/admin/attendances/export'
 */
    const exportAttendancesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportAttendances.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendances
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:98
 * @route '/admin/attendances/export'
 */
        exportAttendancesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendances.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendances
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:98
 * @route '/admin/attendances/export'
 */
        exportAttendancesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendances.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportAttendances.form = exportAttendancesForm
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportTppReport
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:203
 * @route '/admin/attendances/export-tpp'
 */
export const exportTppReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTppReport.url(options),
    method: 'get',
})

exportTppReport.definition = {
    methods: ["get","head"],
    url: '/admin/attendances/export-tpp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportTppReport
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:203
 * @route '/admin/attendances/export-tpp'
 */
exportTppReport.url = (options?: RouteQueryOptions) => {
    return exportTppReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportTppReport
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:203
 * @route '/admin/attendances/export-tpp'
 */
exportTppReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTppReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportTppReport
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:203
 * @route '/admin/attendances/export-tpp'
 */
exportTppReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTppReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportTppReport
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:203
 * @route '/admin/attendances/export-tpp'
 */
    const exportTppReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportTppReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportTppReport
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:203
 * @route '/admin/attendances/export-tpp'
 */
        exportTppReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTppReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportTppReport
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:203
 * @route '/admin/attendances/export-tpp'
 */
        exportTppReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTppReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportTppReport.form = exportTppReportForm
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:143
 * @route '/admin/attendances/export-recap'
 */
export const exportAttendanceRecap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendanceRecap.url(options),
    method: 'get',
})

exportAttendanceRecap.definition = {
    methods: ["get","head"],
    url: '/admin/attendances/export-recap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:143
 * @route '/admin/attendances/export-recap'
 */
exportAttendanceRecap.url = (options?: RouteQueryOptions) => {
    return exportAttendanceRecap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:143
 * @route '/admin/attendances/export-recap'
 */
exportAttendanceRecap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendanceRecap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:143
 * @route '/admin/attendances/export-recap'
 */
exportAttendanceRecap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportAttendanceRecap.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:143
 * @route '/admin/attendances/export-recap'
 */
    const exportAttendanceRecapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportAttendanceRecap.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:143
 * @route '/admin/attendances/export-recap'
 */
        exportAttendanceRecapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendanceRecap.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:143
 * @route '/admin/attendances/export-recap'
 */
        exportAttendanceRecapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendanceRecap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportAttendanceRecap.form = exportAttendanceRecapForm
/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::verifyQrCode
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:262
 * @route '/admin/attendances/verify-qr'
 */
export const verifyQrCode = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyQrCode.url(options),
    method: 'post',
})

verifyQrCode.definition = {
    methods: ["post"],
    url: '/admin/attendances/verify-qr',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::verifyQrCode
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:262
 * @route '/admin/attendances/verify-qr'
 */
verifyQrCode.url = (options?: RouteQueryOptions) => {
    return verifyQrCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::verifyQrCode
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:262
 * @route '/admin/attendances/verify-qr'
 */
verifyQrCode.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyQrCode.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::verifyQrCode
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:262
 * @route '/admin/attendances/verify-qr'
 */
    const verifyQrCodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verifyQrCode.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\AttendanceController::verifyQrCode
 * @see app/Http/Controllers/Web/Admin/AttendanceController.php:262
 * @route '/admin/attendances/verify-qr'
 */
        verifyQrCodeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verifyQrCode.url(options),
            method: 'post',
        })
    
    verifyQrCode.form = verifyQrCodeForm
const AttendanceController = { index, exportAttendances, exportTppReport, exportAttendanceRecap, verifyQrCode }

export default AttendanceController