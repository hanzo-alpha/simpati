import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::index
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:11
 * @route '/admin/shift-swaps'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/shift-swaps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::index
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:11
 * @route '/admin/shift-swaps'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::index
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:11
 * @route '/admin/shift-swaps'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::index
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:11
 * @route '/admin/shift-swaps'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::index
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:11
 * @route '/admin/shift-swaps'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::index
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:11
 * @route '/admin/shift-swaps'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::index
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:11
 * @route '/admin/shift-swaps'
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
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:20
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
export const updateStatus = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

updateStatus.definition = {
    methods: ["put"],
    url: '/admin/shift-swaps/{shiftSwap}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:20
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
updateStatus.url = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shiftSwap: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shiftSwap: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shiftSwap: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shiftSwap: typeof args.shiftSwap === 'object'
                ? args.shiftSwap.id
                : args.shiftSwap,
                }

    return updateStatus.definition.url
            .replace('{shiftSwap}', parsedArgs.shiftSwap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:20
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
updateStatus.put = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:20
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
    const updateStatusForm = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\Admin\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Web/Admin/ShiftSwapController.php:20
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
        updateStatusForm.put = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const ShiftSwapController = { index, updateStatus }

export default ShiftSwapController