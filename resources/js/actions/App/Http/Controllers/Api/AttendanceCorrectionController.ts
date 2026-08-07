import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:18
 * @route '/api/attendance-corrections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/attendance-corrections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:18
 * @route '/api/attendance-corrections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:18
 * @route '/api/attendance-corrections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:18
 * @route '/api/attendance-corrections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:18
 * @route '/api/attendance-corrections'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:18
 * @route '/api/attendance-corrections'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::index
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:18
 * @route '/api/attendance-corrections'
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
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::subordinatesIndex
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:31
 * @route '/api/attendance-corrections/subordinates'
 */
export const subordinatesIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subordinatesIndex.url(options),
    method: 'get',
})

subordinatesIndex.definition = {
    methods: ["get","head"],
    url: '/api/attendance-corrections/subordinates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::subordinatesIndex
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:31
 * @route '/api/attendance-corrections/subordinates'
 */
subordinatesIndex.url = (options?: RouteQueryOptions) => {
    return subordinatesIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::subordinatesIndex
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:31
 * @route '/api/attendance-corrections/subordinates'
 */
subordinatesIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subordinatesIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::subordinatesIndex
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:31
 * @route '/api/attendance-corrections/subordinates'
 */
subordinatesIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subordinatesIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::subordinatesIndex
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:31
 * @route '/api/attendance-corrections/subordinates'
 */
    const subordinatesIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: subordinatesIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::subordinatesIndex
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:31
 * @route '/api/attendance-corrections/subordinates'
 */
        subordinatesIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subordinatesIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::subordinatesIndex
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:31
 * @route '/api/attendance-corrections/subordinates'
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
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:61
 * @route '/api/attendance-corrections'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/attendance-corrections',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:61
 * @route '/api/attendance-corrections'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:61
 * @route '/api/attendance-corrections'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:61
 * @route '/api/attendance-corrections'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::store
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:61
 * @route '/api/attendance-corrections'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::updateStatus
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:95
 * @route '/api/attendance-corrections/{attendanceCorrection}/status'
 */
export const updateStatus = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/api/attendance-corrections/{attendanceCorrection}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::updateStatus
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:95
 * @route '/api/attendance-corrections/{attendanceCorrection}/status'
 */
updateStatus.url = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendanceCorrection: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attendanceCorrection: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attendanceCorrection: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attendanceCorrection: typeof args.attendanceCorrection === 'object'
                ? args.attendanceCorrection.id
                : args.attendanceCorrection,
                }

    return updateStatus.definition.url
            .replace('{attendanceCorrection}', parsedArgs.attendanceCorrection.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::updateStatus
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:95
 * @route '/api/attendance-corrections/{attendanceCorrection}/status'
 */
updateStatus.patch = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::updateStatus
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:95
 * @route '/api/attendance-corrections/{attendanceCorrection}/status'
 */
    const updateStatusForm = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AttendanceCorrectionController::updateStatus
 * @see app/Http/Controllers/Api/AttendanceCorrectionController.php:95
 * @route '/api/attendance-corrections/{attendanceCorrection}/status'
 */
        updateStatusForm.patch = (args: { attendanceCorrection: number | { id: number } } | [attendanceCorrection: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const AttendanceCorrectionController = { index, subordinatesIndex, store, updateStatus }

export default AttendanceCorrectionController