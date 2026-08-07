import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Api\StatisticController::index
 * @see app/Http/Controllers/Api/StatisticController.php:21
 * @route '/api/statistics'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/api/statistics',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\StatisticController::index
 * @see app/Http/Controllers/Api/StatisticController.php:21
 * @route '/api/statistics'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\StatisticController::index
 * @see app/Http/Controllers/Api/StatisticController.php:21
 * @route '/api/statistics'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\StatisticController::index
 * @see app/Http/Controllers/Api/StatisticController.php:21
 * @route '/api/statistics'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\StatisticController::index
 * @see app/Http/Controllers/Api/StatisticController.php:21
 * @route '/api/statistics'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\StatisticController::index
 * @see app/Http/Controllers/Api/StatisticController.php:21
 * @route '/api/statistics'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\StatisticController::index
 * @see app/Http/Controllers/Api/StatisticController.php:21
 * @route '/api/statistics'
 */
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

index.form = indexForm;
/**
 * @see \App\Http\Controllers\Api\StatisticController::pdf
 * @see app/Http/Controllers/Api/StatisticController.php:159
 * @route '/api/statistics/pdf'
 */
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
});

pdf.definition = {
    methods: ['get', 'head'],
    url: '/api/statistics/pdf',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\StatisticController::pdf
 * @see app/Http/Controllers/Api/StatisticController.php:159
 * @route '/api/statistics/pdf'
 */
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\StatisticController::pdf
 * @see app/Http/Controllers/Api/StatisticController.php:159
 * @route '/api/statistics/pdf'
 */
pdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\StatisticController::pdf
 * @see app/Http/Controllers/Api/StatisticController.php:159
 * @route '/api/statistics/pdf'
 */
pdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\StatisticController::pdf
 * @see app/Http/Controllers/Api/StatisticController.php:159
 * @route '/api/statistics/pdf'
 */
const pdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\StatisticController::pdf
 * @see app/Http/Controllers/Api/StatisticController.php:159
 * @route '/api/statistics/pdf'
 */
pdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\StatisticController::pdf
 * @see app/Http/Controllers/Api/StatisticController.php:159
 * @route '/api/statistics/pdf'
 */
pdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pdf.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

pdf.form = pdfForm;
const StatisticController = { index, pdf };

export default StatisticController;
