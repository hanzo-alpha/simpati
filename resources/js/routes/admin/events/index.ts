import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\AdminController::store
 * @see app/Http/Controllers/Web/AdminController.php:1176
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
* @see \App\Http\Controllers\Web\AdminController::store
 * @see app/Http/Controllers/Web/AdminController.php:1176
 * @route '/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::store
 * @see app/Http/Controllers/Web/AdminController.php:1176
 * @route '/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::store
 * @see app/Http/Controllers/Web/AdminController.php:1176
 * @route '/admin/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::store
 * @see app/Http/Controllers/Web/AdminController.php:1176
 * @route '/admin/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const events = {
    store: Object.assign(store, store),
}

export default events