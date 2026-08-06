import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:20
 * @route '/api/attendance'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/api/attendance',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:20
 * @route '/api/attendance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:20
 * @route '/api/attendance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:20
 * @route '/api/attendance'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::store
 * @see app/Http/Controllers/Api/AttendanceController.php:20
 * @route '/api/attendance'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;
/**
 * @see \App\Http\Controllers\Api\AttendanceController::scanQr
 * @see app/Http/Controllers/Api/AttendanceController.php:279
 * @route '/api/attendance/scan-qr'
 */
export const scanQr = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: scanQr.url(options),
    method: 'post',
});

scanQr.definition = {
    methods: ['post'],
    url: '/api/attendance/scan-qr',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\Api\AttendanceController::scanQr
 * @see app/Http/Controllers/Api/AttendanceController.php:279
 * @route '/api/attendance/scan-qr'
 */
scanQr.url = (options?: RouteQueryOptions) => {
    return scanQr.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\AttendanceController::scanQr
 * @see app/Http/Controllers/Api/AttendanceController.php:279
 * @route '/api/attendance/scan-qr'
 */
scanQr.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: scanQr.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::scanQr
 * @see app/Http/Controllers/Api/AttendanceController.php:279
 * @route '/api/attendance/scan-qr'
 */
const scanQrForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: scanQr.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::scanQr
 * @see app/Http/Controllers/Api/AttendanceController.php:279
 * @route '/api/attendance/scan-qr'
 */
scanQrForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: scanQr.url(options),
    method: 'post',
});

scanQr.form = scanQrForm;
/**
 * @see \App\Http\Controllers\Api\AttendanceController::today
 * @see app/Http/Controllers/Api/AttendanceController.php:124
 * @route '/api/attendance/today'
 */
export const today = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
});

today.definition = {
    methods: ['get', 'head'],
    url: '/api/attendance/today',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\AttendanceController::today
 * @see app/Http/Controllers/Api/AttendanceController.php:124
 * @route '/api/attendance/today'
 */
today.url = (options?: RouteQueryOptions) => {
    return today.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\AttendanceController::today
 * @see app/Http/Controllers/Api/AttendanceController.php:124
 * @route '/api/attendance/today'
 */
today.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: today.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::today
 * @see app/Http/Controllers/Api/AttendanceController.php:124
 * @route '/api/attendance/today'
 */
today.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: today.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::today
 * @see app/Http/Controllers/Api/AttendanceController.php:124
 * @route '/api/attendance/today'
 */
const todayForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: today.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::today
 * @see app/Http/Controllers/Api/AttendanceController.php:124
 * @route '/api/attendance/today'
 */
todayForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: today.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::today
 * @see app/Http/Controllers/Api/AttendanceController.php:124
 * @route '/api/attendance/today'
 */
todayForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: today.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

today.form = todayForm;
/**
 * @see \App\Http\Controllers\Api\AttendanceController::history
 * @see app/Http/Controllers/Api/AttendanceController.php:154
 * @route '/api/attendance/history'
 */
export const history = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
});

history.definition = {
    methods: ['get', 'head'],
    url: '/api/attendance/history',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\AttendanceController::history
 * @see app/Http/Controllers/Api/AttendanceController.php:154
 * @route '/api/attendance/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\AttendanceController::history
 * @see app/Http/Controllers/Api/AttendanceController.php:154
 * @route '/api/attendance/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::history
 * @see app/Http/Controllers/Api/AttendanceController.php:154
 * @route '/api/attendance/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::history
 * @see app/Http/Controllers/Api/AttendanceController.php:154
 * @route '/api/attendance/history'
 */
const historyForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: history.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::history
 * @see app/Http/Controllers/Api/AttendanceController.php:154
 * @route '/api/attendance/history'
 */
historyForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: history.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::history
 * @see app/Http/Controllers/Api/AttendanceController.php:154
 * @route '/api/attendance/history'
 */
historyForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: history.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

history.form = historyForm;
/**
 * @see \App\Http\Controllers\Api\AttendanceController::getSchedule
 * @see app/Http/Controllers/Api/AttendanceController.php:177
 * @route '/api/attendance/schedule'
 */
export const getSchedule = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: getSchedule.url(options),
    method: 'get',
});

getSchedule.definition = {
    methods: ['get', 'head'],
    url: '/api/attendance/schedule',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\AttendanceController::getSchedule
 * @see app/Http/Controllers/Api/AttendanceController.php:177
 * @route '/api/attendance/schedule'
 */
getSchedule.url = (options?: RouteQueryOptions) => {
    return getSchedule.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\AttendanceController::getSchedule
 * @see app/Http/Controllers/Api/AttendanceController.php:177
 * @route '/api/attendance/schedule'
 */
getSchedule.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getSchedule.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::getSchedule
 * @see app/Http/Controllers/Api/AttendanceController.php:177
 * @route '/api/attendance/schedule'
 */
getSchedule.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getSchedule.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::getSchedule
 * @see app/Http/Controllers/Api/AttendanceController.php:177
 * @route '/api/attendance/schedule'
 */
const getScheduleForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: getSchedule.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::getSchedule
 * @see app/Http/Controllers/Api/AttendanceController.php:177
 * @route '/api/attendance/schedule'
 */
getScheduleForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: getSchedule.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::getSchedule
 * @see app/Http/Controllers/Api/AttendanceController.php:177
 * @route '/api/attendance/schedule'
 */
getScheduleForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: getSchedule.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

getSchedule.form = getScheduleForm;
/**
 * @see \App\Http\Controllers\Api\AttendanceController::exportPdf
 * @see app/Http/Controllers/Api/AttendanceController.php:194
 * @route '/api/attendance/export-pdf'
 */
export const exportPdf = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
});

exportPdf.definition = {
    methods: ['get', 'head'],
    url: '/api/attendance/export-pdf',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\AttendanceController::exportPdf
 * @see app/Http/Controllers/Api/AttendanceController.php:194
 * @route '/api/attendance/export-pdf'
 */
exportPdf.url = (options?: RouteQueryOptions) => {
    return exportPdf.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\AttendanceController::exportPdf
 * @see app/Http/Controllers/Api/AttendanceController.php:194
 * @route '/api/attendance/export-pdf'
 */
exportPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::exportPdf
 * @see app/Http/Controllers/Api/AttendanceController.php:194
 * @route '/api/attendance/export-pdf'
 */
exportPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::exportPdf
 * @see app/Http/Controllers/Api/AttendanceController.php:194
 * @route '/api/attendance/export-pdf'
 */
const exportPdfForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportPdf.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::exportPdf
 * @see app/Http/Controllers/Api/AttendanceController.php:194
 * @route '/api/attendance/export-pdf'
 */
exportPdfForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportPdf.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::exportPdf
 * @see app/Http/Controllers/Api/AttendanceController.php:194
 * @route '/api/attendance/export-pdf'
 */
exportPdfForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportPdf.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

exportPdf.form = exportPdfForm;
/**
 * @see \App\Http\Controllers\Api\AttendanceController::liveLocations
 * @see app/Http/Controllers/Api/AttendanceController.php:225
 * @route '/api/supervision/live-locations'
 */
export const liveLocations = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: liveLocations.url(options),
    method: 'get',
});

liveLocations.definition = {
    methods: ['get', 'head'],
    url: '/api/supervision/live-locations',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\AttendanceController::liveLocations
 * @see app/Http/Controllers/Api/AttendanceController.php:225
 * @route '/api/supervision/live-locations'
 */
liveLocations.url = (options?: RouteQueryOptions) => {
    return liveLocations.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\AttendanceController::liveLocations
 * @see app/Http/Controllers/Api/AttendanceController.php:225
 * @route '/api/supervision/live-locations'
 */
liveLocations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: liveLocations.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::liveLocations
 * @see app/Http/Controllers/Api/AttendanceController.php:225
 * @route '/api/supervision/live-locations'
 */
liveLocations.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: liveLocations.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::liveLocations
 * @see app/Http/Controllers/Api/AttendanceController.php:225
 * @route '/api/supervision/live-locations'
 */
const liveLocationsForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: liveLocations.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\AttendanceController::liveLocations
 * @see app/Http/Controllers/Api/AttendanceController.php:225
 * @route '/api/supervision/live-locations'
 */
liveLocationsForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: liveLocations.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AttendanceController::liveLocations
 * @see app/Http/Controllers/Api/AttendanceController.php:225
 * @route '/api/supervision/live-locations'
 */
liveLocationsForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: liveLocations.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

liveLocations.form = liveLocationsForm;
const AttendanceController = {
    store,
    scanQr,
    today,
    history,
    getSchedule,
    exportPdf,
    liveLocations,
};

export default AttendanceController;
