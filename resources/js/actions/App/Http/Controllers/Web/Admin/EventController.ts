import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\EventController::index
 * @see app/Http/Controllers/Web/Admin/EventController.php:12
 * @route '/admin/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\EventController::index
 * @see app/Http/Controllers/Web/Admin/EventController.php:12
 * @route '/admin/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\EventController::index
 * @see app/Http/Controllers/Web/Admin/EventController.php:12
 * @route '/admin/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\EventController::index
 * @see app/Http/Controllers/Web/Admin/EventController.php:12
 * @route '/admin/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\EventController::index
 * @see app/Http/Controllers/Web/Admin/EventController.php:12
 * @route '/admin/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\EventController::index
 * @see app/Http/Controllers/Web/Admin/EventController.php:12
 * @route '/admin/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\EventController::index
 * @see app/Http/Controllers/Web/Admin/EventController.php:12
 * @route '/admin/events'
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
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:34
 * @route '/admin/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:34
 * @route '/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:34
 * @route '/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:34
 * @route '/admin/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:34
 * @route '/admin/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const EventController = { index, store }

export default EventController