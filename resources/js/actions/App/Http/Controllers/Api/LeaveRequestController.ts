import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\LeaveRequestController::index
 * @see app/Http/Controllers/Api/LeaveRequestController.php:18
 * @route '/api/leave-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/leave-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::index
 * @see app/Http/Controllers/Api/LeaveRequestController.php:18
 * @route '/api/leave-requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::index
 * @see app/Http/Controllers/Api/LeaveRequestController.php:18
 * @route '/api/leave-requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\LeaveRequestController::index
 * @see app/Http/Controllers/Api/LeaveRequestController.php:18
 * @route '/api/leave-requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\LeaveRequestController::index
 * @see app/Http/Controllers/Api/LeaveRequestController.php:18
 * @route '/api/leave-requests'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\LeaveRequestController::index
 * @see app/Http/Controllers/Api/LeaveRequestController.php:18
 * @route '/api/leave-requests'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\LeaveRequestController::index
 * @see app/Http/Controllers/Api/LeaveRequestController.php:18
 * @route '/api/leave-requests'
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
* @see \App\Http\Controllers\Api\LeaveRequestController::subordinatesIndex
 * @see app/Http/Controllers/Api/LeaveRequestController.php:36
 * @route '/api/leave-requests/subordinates'
 */
export const subordinatesIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subordinatesIndex.url(options),
    method: 'get',
})

subordinatesIndex.definition = {
    methods: ["get","head"],
    url: '/api/leave-requests/subordinates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::subordinatesIndex
 * @see app/Http/Controllers/Api/LeaveRequestController.php:36
 * @route '/api/leave-requests/subordinates'
 */
subordinatesIndex.url = (options?: RouteQueryOptions) => {
    return subordinatesIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::subordinatesIndex
 * @see app/Http/Controllers/Api/LeaveRequestController.php:36
 * @route '/api/leave-requests/subordinates'
 */
subordinatesIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subordinatesIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\LeaveRequestController::subordinatesIndex
 * @see app/Http/Controllers/Api/LeaveRequestController.php:36
 * @route '/api/leave-requests/subordinates'
 */
subordinatesIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subordinatesIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\LeaveRequestController::subordinatesIndex
 * @see app/Http/Controllers/Api/LeaveRequestController.php:36
 * @route '/api/leave-requests/subordinates'
 */
    const subordinatesIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: subordinatesIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\LeaveRequestController::subordinatesIndex
 * @see app/Http/Controllers/Api/LeaveRequestController.php:36
 * @route '/api/leave-requests/subordinates'
 */
        subordinatesIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subordinatesIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\LeaveRequestController::subordinatesIndex
 * @see app/Http/Controllers/Api/LeaveRequestController.php:36
 * @route '/api/leave-requests/subordinates'
 */
        subordinatesIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subordinatesIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    subordinatesIndex.form = subordinatesIndexForm
/**
* @see \App\Http\Controllers\Api\LeaveRequestController::store
 * @see app/Http/Controllers/Api/LeaveRequestController.php:68
 * @route '/api/leave-requests'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/leave-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::store
 * @see app/Http/Controllers/Api/LeaveRequestController.php:68
 * @route '/api/leave-requests'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::store
 * @see app/Http/Controllers/Api/LeaveRequestController.php:68
 * @route '/api/leave-requests'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\LeaveRequestController::store
 * @see app/Http/Controllers/Api/LeaveRequestController.php:68
 * @route '/api/leave-requests'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\LeaveRequestController::store
 * @see app/Http/Controllers/Api/LeaveRequestController.php:68
 * @route '/api/leave-requests'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\LeaveRequestController::show
 * @see app/Http/Controllers/Api/LeaveRequestController.php:118
 * @route '/api/leave-requests/{leaveRequest}'
 */
export const show = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/leave-requests/{leaveRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::show
 * @see app/Http/Controllers/Api/LeaveRequestController.php:118
 * @route '/api/leave-requests/{leaveRequest}'
 */
show.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return show.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::show
 * @see app/Http/Controllers/Api/LeaveRequestController.php:118
 * @route '/api/leave-requests/{leaveRequest}'
 */
show.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\LeaveRequestController::show
 * @see app/Http/Controllers/Api/LeaveRequestController.php:118
 * @route '/api/leave-requests/{leaveRequest}'
 */
show.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\LeaveRequestController::show
 * @see app/Http/Controllers/Api/LeaveRequestController.php:118
 * @route '/api/leave-requests/{leaveRequest}'
 */
    const showForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\LeaveRequestController::show
 * @see app/Http/Controllers/Api/LeaveRequestController.php:118
 * @route '/api/leave-requests/{leaveRequest}'
 */
        showForm.get = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\LeaveRequestController::show
 * @see app/Http/Controllers/Api/LeaveRequestController.php:118
 * @route '/api/leave-requests/{leaveRequest}'
 */
        showForm.head = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Api\LeaveRequestController::updateStatus
 * @see app/Http/Controllers/Api/LeaveRequestController.php:133
 * @route '/api/leave-requests/{leaveRequest}/status'
 */
export const updateStatus = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/api/leave-requests/{leaveRequest}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::updateStatus
 * @see app/Http/Controllers/Api/LeaveRequestController.php:133
 * @route '/api/leave-requests/{leaveRequest}/status'
 */
updateStatus.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return updateStatus.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\LeaveRequestController::updateStatus
 * @see app/Http/Controllers/Api/LeaveRequestController.php:133
 * @route '/api/leave-requests/{leaveRequest}/status'
 */
updateStatus.patch = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\LeaveRequestController::updateStatus
 * @see app/Http/Controllers/Api/LeaveRequestController.php:133
 * @route '/api/leave-requests/{leaveRequest}/status'
 */
    const updateStatusForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\LeaveRequestController::updateStatus
 * @see app/Http/Controllers/Api/LeaveRequestController.php:133
 * @route '/api/leave-requests/{leaveRequest}/status'
 */
        updateStatusForm.patch = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const LeaveRequestController = { index, subordinatesIndex, store, show, updateStatus }

export default LeaveRequestController