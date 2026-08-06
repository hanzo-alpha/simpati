import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Web\LeaveRequestController::index
 * @see app/Http/Controllers/Web/LeaveRequestController.php:16
 * @route '/pengajuan'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pengajuan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\LeaveRequestController::index
 * @see app/Http/Controllers/Web/LeaveRequestController.php:16
 * @route '/pengajuan'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\LeaveRequestController::index
 * @see app/Http/Controllers/Web/LeaveRequestController.php:16
 * @route '/pengajuan'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\LeaveRequestController::index
 * @see app/Http/Controllers/Web/LeaveRequestController.php:16
 * @route '/pengajuan'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\LeaveRequestController::index
 * @see app/Http/Controllers/Web/LeaveRequestController.php:16
 * @route '/pengajuan'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\LeaveRequestController::index
 * @see app/Http/Controllers/Web/LeaveRequestController.php:16
 * @route '/pengajuan'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\LeaveRequestController::index
 * @see app/Http/Controllers/Web/LeaveRequestController.php:16
 * @route '/pengajuan'
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
* @see \App\Http\Controllers\Web\LeaveRequestController::create
 * @see app/Http/Controllers/Web/LeaveRequestController.php:47
 * @route '/pengajuan/buat'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/pengajuan/buat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\LeaveRequestController::create
 * @see app/Http/Controllers/Web/LeaveRequestController.php:47
 * @route '/pengajuan/buat'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\LeaveRequestController::create
 * @see app/Http/Controllers/Web/LeaveRequestController.php:47
 * @route '/pengajuan/buat'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\LeaveRequestController::create
 * @see app/Http/Controllers/Web/LeaveRequestController.php:47
 * @route '/pengajuan/buat'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\LeaveRequestController::create
 * @see app/Http/Controllers/Web/LeaveRequestController.php:47
 * @route '/pengajuan/buat'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\LeaveRequestController::create
 * @see app/Http/Controllers/Web/LeaveRequestController.php:47
 * @route '/pengajuan/buat'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\LeaveRequestController::create
 * @see app/Http/Controllers/Web/LeaveRequestController.php:47
 * @route '/pengajuan/buat'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Web\LeaveRequestController::store
 * @see app/Http/Controllers/Web/LeaveRequestController.php:59
 * @route '/pengajuan'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pengajuan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\LeaveRequestController::store
 * @see app/Http/Controllers/Web/LeaveRequestController.php:59
 * @route '/pengajuan'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\LeaveRequestController::store
 * @see app/Http/Controllers/Web/LeaveRequestController.php:59
 * @route '/pengajuan'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\LeaveRequestController::store
 * @see app/Http/Controllers/Web/LeaveRequestController.php:59
 * @route '/pengajuan'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\LeaveRequestController::store
 * @see app/Http/Controllers/Web/LeaveRequestController.php:59
 * @route '/pengajuan'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const pengajuan = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default pengajuan