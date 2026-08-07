import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:15
 * @route '/api/announcements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/api/announcements',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:15
 * @route '/api/announcements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:15
 * @route '/api/announcements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:15
 * @route '/api/announcements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:15
 * @route '/api/announcements'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:15
 * @route '/api/announcements'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\AnnouncementController::index
 * @see app/Http/Controllers/Api/AnnouncementController.php:15
 * @route '/api/announcements'
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
const AnnouncementController = { index };

export default AnnouncementController;
