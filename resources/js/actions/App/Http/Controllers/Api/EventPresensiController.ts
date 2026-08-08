import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\EventPresensiController::index
 * @see app/Http/Controllers/Api/EventPresensiController.php:16
 * @route '/api/events/active'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/events/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\EventPresensiController::index
 * @see app/Http/Controllers/Api/EventPresensiController.php:16
 * @route '/api/events/active'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\EventPresensiController::index
 * @see app/Http/Controllers/Api/EventPresensiController.php:16
 * @route '/api/events/active'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\EventPresensiController::index
 * @see app/Http/Controllers/Api/EventPresensiController.php:16
 * @route '/api/events/active'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\EventPresensiController::index
 * @see app/Http/Controllers/Api/EventPresensiController.php:16
 * @route '/api/events/active'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\EventPresensiController::index
 * @see app/Http/Controllers/Api/EventPresensiController.php:16
 * @route '/api/events/active'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\EventPresensiController::index
 * @see app/Http/Controllers/Api/EventPresensiController.php:16
 * @route '/api/events/active'
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
* @see \App\Http\Controllers\Api\EventPresensiController::scan
 * @see app/Http/Controllers/Api/EventPresensiController.php:60
 * @route '/api/events/scan'
 */
export const scan = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: scan.url(options),
    method: 'post',
})

scan.definition = {
    methods: ["post"],
    url: '/api/events/scan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\EventPresensiController::scan
 * @see app/Http/Controllers/Api/EventPresensiController.php:60
 * @route '/api/events/scan'
 */
scan.url = (options?: RouteQueryOptions) => {
    return scan.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\EventPresensiController::scan
 * @see app/Http/Controllers/Api/EventPresensiController.php:60
 * @route '/api/events/scan'
 */
scan.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: scan.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\EventPresensiController::scan
 * @see app/Http/Controllers/Api/EventPresensiController.php:60
 * @route '/api/events/scan'
 */
    const scanForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: scan.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\EventPresensiController::scan
 * @see app/Http/Controllers/Api/EventPresensiController.php:60
 * @route '/api/events/scan'
 */
        scanForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: scan.url(options),
            method: 'post',
        })
    
    scan.form = scanForm
const EventPresensiController = { index, scan }

export default EventPresensiController