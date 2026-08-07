import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
    applyUrlDefaults,
} from './../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::index
 * @see app/Http/Controllers/Api/ShiftSwapController.php:12
 * @route '/api/shift-swaps'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/api/shift-swaps',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::index
 * @see app/Http/Controllers/Api/ShiftSwapController.php:12
 * @route '/api/shift-swaps'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::index
 * @see app/Http/Controllers/Api/ShiftSwapController.php:12
 * @route '/api/shift-swaps'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::index
 * @see app/Http/Controllers/Api/ShiftSwapController.php:12
 * @route '/api/shift-swaps'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::index
 * @see app/Http/Controllers/Api/ShiftSwapController.php:12
 * @route '/api/shift-swaps'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::index
 * @see app/Http/Controllers/Api/ShiftSwapController.php:12
 * @route '/api/shift-swaps'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::index
 * @see app/Http/Controllers/Api/ShiftSwapController.php:12
 * @route '/api/shift-swaps'
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
 * @see \App\Http\Controllers\Api\ShiftSwapController::subordinatesIndex
 * @see app/Http/Controllers/Api/ShiftSwapController.php:24
 * @route '/api/shift-swaps/subordinates'
 */
export const subordinatesIndex = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: subordinatesIndex.url(options),
    method: 'get',
});

subordinatesIndex.definition = {
    methods: ['get', 'head'],
    url: '/api/shift-swaps/subordinates',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::subordinatesIndex
 * @see app/Http/Controllers/Api/ShiftSwapController.php:24
 * @route '/api/shift-swaps/subordinates'
 */
subordinatesIndex.url = (options?: RouteQueryOptions) => {
    return subordinatesIndex.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::subordinatesIndex
 * @see app/Http/Controllers/Api/ShiftSwapController.php:24
 * @route '/api/shift-swaps/subordinates'
 */
subordinatesIndex.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: subordinatesIndex.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::subordinatesIndex
 * @see app/Http/Controllers/Api/ShiftSwapController.php:24
 * @route '/api/shift-swaps/subordinates'
 */
subordinatesIndex.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: subordinatesIndex.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::subordinatesIndex
 * @see app/Http/Controllers/Api/ShiftSwapController.php:24
 * @route '/api/shift-swaps/subordinates'
 */
const subordinatesIndexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: subordinatesIndex.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::subordinatesIndex
 * @see app/Http/Controllers/Api/ShiftSwapController.php:24
 * @route '/api/shift-swaps/subordinates'
 */
subordinatesIndexForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: subordinatesIndex.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::subordinatesIndex
 * @see app/Http/Controllers/Api/ShiftSwapController.php:24
 * @route '/api/shift-swaps/subordinates'
 */
subordinatesIndexForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: subordinatesIndex.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

subordinatesIndex.form = subordinatesIndexForm;
/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::store
 * @see app/Http/Controllers/Api/ShiftSwapController.php:51
 * @route '/api/shift-swaps'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/api/shift-swaps',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::store
 * @see app/Http/Controllers/Api/ShiftSwapController.php:51
 * @route '/api/shift-swaps'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::store
 * @see app/Http/Controllers/Api/ShiftSwapController.php:51
 * @route '/api/shift-swaps'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::store
 * @see app/Http/Controllers/Api/ShiftSwapController.php:51
 * @route '/api/shift-swaps'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::store
 * @see app/Http/Controllers/Api/ShiftSwapController.php:51
 * @route '/api/shift-swaps'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;
/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Api/ShiftSwapController.php:73
 * @route '/api/shift-swaps/{shiftSwap}/status'
 */
export const updateStatus = (
    args:
        | { shiftSwap: number | { id: number } }
        | [shiftSwap: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
});

updateStatus.definition = {
    methods: ['patch'],
    url: '/api/shift-swaps/{shiftSwap}/status',
} satisfies RouteDefinition<['patch']>;

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Api/ShiftSwapController.php:73
 * @route '/api/shift-swaps/{shiftSwap}/status'
 */
updateStatus.url = (
    args:
        | { shiftSwap: number | { id: number } }
        | [shiftSwap: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shiftSwap: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { shiftSwap: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            shiftSwap: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        shiftSwap:
            typeof args.shiftSwap === 'object'
                ? args.shiftSwap.id
                : args.shiftSwap,
    };

    return (
        updateStatus.definition.url
            .replace('{shiftSwap}', parsedArgs.shiftSwap.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Api/ShiftSwapController.php:73
 * @route '/api/shift-swaps/{shiftSwap}/status'
 */
updateStatus.patch = (
    args:
        | { shiftSwap: number | { id: number } }
        | [shiftSwap: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
});

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Api/ShiftSwapController.php:73
 * @route '/api/shift-swaps/{shiftSwap}/status'
 */
const updateStatusForm = (
    args:
        | { shiftSwap: number | { id: number } }
        | [shiftSwap: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Api\ShiftSwapController::updateStatus
 * @see app/Http/Controllers/Api/ShiftSwapController.php:73
 * @route '/api/shift-swaps/{shiftSwap}/status'
 */
updateStatusForm.patch = (
    args:
        | { shiftSwap: number | { id: number } }
        | [shiftSwap: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

updateStatus.form = updateStatusForm;
const ShiftSwapController = { index, subordinatesIndex, store, updateStatus };

export default ShiftSwapController;
