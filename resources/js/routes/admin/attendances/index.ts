import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../../../wayfinder';
/**
 * @see \App\Http\Controllers\Web\AdminController::exportMethod
 * @see app/Http/Controllers/Web/AdminController.php:375
 * @route '/admin/attendances/export'
 */
export const exportMethod = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
});

exportMethod.definition = {
    methods: ['get', 'head'],
    url: '/admin/attendances/export',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\AdminController::exportMethod
 * @see app/Http/Controllers/Web/AdminController.php:375
 * @route '/admin/attendances/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\AdminController::exportMethod
 * @see app/Http/Controllers/Web/AdminController.php:375
 * @route '/admin/attendances/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AdminController::exportMethod
 * @see app/Http/Controllers/Web/AdminController.php:375
 * @route '/admin/attendances/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::exportMethod
 * @see app/Http/Controllers/Web/AdminController.php:375
 * @route '/admin/attendances/export'
 */
const exportMethodForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::exportMethod
 * @see app/Http/Controllers/Web/AdminController.php:375
 * @route '/admin/attendances/export'
 */
exportMethodForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AdminController::exportMethod
 * @see app/Http/Controllers/Web/AdminController.php:375
 * @route '/admin/attendances/export'
 */
exportMethodForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

exportMethod.form = exportMethodForm;
/**
 * @see \App\Http\Controllers\Web\AdminController::exportTpp
 * @see app/Http/Controllers/Web/AdminController.php:792
 * @route '/admin/attendances/export-tpp'
 */
export const exportTpp = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: exportTpp.url(options),
    method: 'get',
});

exportTpp.definition = {
    methods: ['get', 'head'],
    url: '/admin/attendances/export-tpp',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\AdminController::exportTpp
 * @see app/Http/Controllers/Web/AdminController.php:792
 * @route '/admin/attendances/export-tpp'
 */
exportTpp.url = (options?: RouteQueryOptions) => {
    return exportTpp.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\AdminController::exportTpp
 * @see app/Http/Controllers/Web/AdminController.php:792
 * @route '/admin/attendances/export-tpp'
 */
exportTpp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTpp.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AdminController::exportTpp
 * @see app/Http/Controllers/Web/AdminController.php:792
 * @route '/admin/attendances/export-tpp'
 */
exportTpp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTpp.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::exportTpp
 * @see app/Http/Controllers/Web/AdminController.php:792
 * @route '/admin/attendances/export-tpp'
 */
const exportTppForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportTpp.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::exportTpp
 * @see app/Http/Controllers/Web/AdminController.php:792
 * @route '/admin/attendances/export-tpp'
 */
exportTppForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportTpp.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AdminController::exportTpp
 * @see app/Http/Controllers/Web/AdminController.php:792
 * @route '/admin/attendances/export-tpp'
 */
exportTppForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportTpp.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

exportTpp.form = exportTppForm;
/**
 * @see \App\Http\Controllers\Web\AdminController::exportRecap
 * @see app/Http/Controllers/Web/AdminController.php:419
 * @route '/admin/attendances/export-recap'
 */
export const exportRecap = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: exportRecap.url(options),
    method: 'get',
});

exportRecap.definition = {
    methods: ['get', 'head'],
    url: '/admin/attendances/export-recap',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\AdminController::exportRecap
 * @see app/Http/Controllers/Web/AdminController.php:419
 * @route '/admin/attendances/export-recap'
 */
exportRecap.url = (options?: RouteQueryOptions) => {
    return exportRecap.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\AdminController::exportRecap
 * @see app/Http/Controllers/Web/AdminController.php:419
 * @route '/admin/attendances/export-recap'
 */
exportRecap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportRecap.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AdminController::exportRecap
 * @see app/Http/Controllers/Web/AdminController.php:419
 * @route '/admin/attendances/export-recap'
 */
exportRecap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportRecap.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::exportRecap
 * @see app/Http/Controllers/Web/AdminController.php:419
 * @route '/admin/attendances/export-recap'
 */
const exportRecapForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportRecap.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::exportRecap
 * @see app/Http/Controllers/Web/AdminController.php:419
 * @route '/admin/attendances/export-recap'
 */
exportRecapForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportRecap.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AdminController::exportRecap
 * @see app/Http/Controllers/Web/AdminController.php:419
 * @route '/admin/attendances/export-recap'
 */
exportRecapForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportRecap.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

exportRecap.form = exportRecapForm;
/**
 * @see \App\Http\Controllers\Web\AdminController::exportSummary
 * @see app/Http/Controllers/Web/AdminController.php:478
 * @route '/admin/attendances/export-summary'
 */
export const exportSummary = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: exportSummary.url(options),
    method: 'get',
});

exportSummary.definition = {
    methods: ['get', 'head'],
    url: '/admin/attendances/export-summary',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\AdminController::exportSummary
 * @see app/Http/Controllers/Web/AdminController.php:478
 * @route '/admin/attendances/export-summary'
 */
exportSummary.url = (options?: RouteQueryOptions) => {
    return exportSummary.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\AdminController::exportSummary
 * @see app/Http/Controllers/Web/AdminController.php:478
 * @route '/admin/attendances/export-summary'
 */
exportSummary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSummary.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AdminController::exportSummary
 * @see app/Http/Controllers/Web/AdminController.php:478
 * @route '/admin/attendances/export-summary'
 */
exportSummary.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: exportSummary.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::exportSummary
 * @see app/Http/Controllers/Web/AdminController.php:478
 * @route '/admin/attendances/export-summary'
 */
const exportSummaryForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportSummary.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::exportSummary
 * @see app/Http/Controllers/Web/AdminController.php:478
 * @route '/admin/attendances/export-summary'
 */
exportSummaryForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportSummary.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AdminController::exportSummary
 * @see app/Http/Controllers/Web/AdminController.php:478
 * @route '/admin/attendances/export-summary'
 */
exportSummaryForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: exportSummary.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

exportSummary.form = exportSummaryForm;
/**
 * @see \App\Http\Controllers\Web\AdminController::verifyQr
 * @see app/Http/Controllers/Web/AdminController.php:932
 * @route '/admin/attendances/verify-qr'
 */
export const verifyQr = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: verifyQr.url(options),
    method: 'post',
});

verifyQr.definition = {
    methods: ['post'],
    url: '/admin/attendances/verify-qr',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\Web\AdminController::verifyQr
 * @see app/Http/Controllers/Web/AdminController.php:932
 * @route '/admin/attendances/verify-qr'
 */
verifyQr.url = (options?: RouteQueryOptions) => {
    return verifyQr.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\AdminController::verifyQr
 * @see app/Http/Controllers/Web/AdminController.php:932
 * @route '/admin/attendances/verify-qr'
 */
verifyQr.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyQr.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::verifyQr
 * @see app/Http/Controllers/Web/AdminController.php:932
 * @route '/admin/attendances/verify-qr'
 */
const verifyQrForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: verifyQr.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\AdminController::verifyQr
 * @see app/Http/Controllers/Web/AdminController.php:932
 * @route '/admin/attendances/verify-qr'
 */
verifyQrForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: verifyQr.url(options),
    method: 'post',
});

verifyQr.form = verifyQrForm;
const attendances = {
    export: Object.assign(exportMethod, exportMethod),
    exportTpp: Object.assign(exportTpp, exportTpp),
    exportRecap: Object.assign(exportRecap, exportRecap),
    exportSummary: Object.assign(exportSummary, exportSummary),
    verifyQr: Object.assign(verifyQr, verifyQr),
};

export default attendances;
