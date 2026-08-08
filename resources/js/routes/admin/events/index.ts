import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:51
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
 * @see app/Http/Controllers/Web/Admin/EventController.php:51
 * @route '/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:51
 * @route '/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:51
 * @route '/admin/events'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\EventController::store
 * @see app/Http/Controllers/Web/Admin/EventController.php:51
 * @route '/admin/events'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Web\Admin\EventController::update
 * @see app/Http/Controllers/Web/Admin/EventController.php:64
 * @route '/admin/events/{eventPresensi}'
 */
export const update = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/events/{eventPresensi}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\Admin\EventController::update
 * @see app/Http/Controllers/Web/Admin/EventController.php:64
 * @route '/admin/events/{eventPresensi}'
 */
update.url = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eventPresensi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { eventPresensi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    eventPresensi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        eventPresensi: typeof args.eventPresensi === 'object'
                ? args.eventPresensi.id
                : args.eventPresensi,
                }

    return update.definition.url
            .replace('{eventPresensi}', parsedArgs.eventPresensi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\EventController::update
 * @see app/Http/Controllers/Web/Admin/EventController.php:64
 * @route '/admin/events/{eventPresensi}'
 */
update.put = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\Admin\EventController::update
 * @see app/Http/Controllers/Web/Admin/EventController.php:64
 * @route '/admin/events/{eventPresensi}'
 */
    const updateForm = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\EventController::update
 * @see app/Http/Controllers/Web/Admin/EventController.php:64
 * @route '/admin/events/{eventPresensi}'
 */
        updateForm.put = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Web\Admin\EventController::destroy
 * @see app/Http/Controllers/Web/Admin/EventController.php:81
 * @route '/admin/events/{eventPresensi}'
 */
export const destroy = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/events/{eventPresensi}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\Admin\EventController::destroy
 * @see app/Http/Controllers/Web/Admin/EventController.php:81
 * @route '/admin/events/{eventPresensi}'
 */
destroy.url = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { eventPresensi: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { eventPresensi: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    eventPresensi: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        eventPresensi: typeof args.eventPresensi === 'object'
                ? args.eventPresensi.id
                : args.eventPresensi,
                }

    return destroy.definition.url
            .replace('{eventPresensi}', parsedArgs.eventPresensi.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\EventController::destroy
 * @see app/Http/Controllers/Web/Admin/EventController.php:81
 * @route '/admin/events/{eventPresensi}'
 */
destroy.delete = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\Admin\EventController::destroy
 * @see app/Http/Controllers/Web/Admin/EventController.php:81
 * @route '/admin/events/{eventPresensi}'
 */
    const destroyForm = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\EventController::destroy
 * @see app/Http/Controllers/Web/Admin/EventController.php:81
 * @route '/admin/events/{eventPresensi}'
 */
        destroyForm.delete = (args: { eventPresensi: number | { id: number } } | [eventPresensi: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const events = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default events