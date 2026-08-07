import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
    applyUrlDefaults,
} from './../../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::index
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:12
 * @route '/admin/offices'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/admin/offices',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::index
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:12
 * @route '/admin/offices'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::index
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:12
 * @route '/admin/offices'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::index
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:12
 * @route '/admin/offices'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::index
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:12
 * @route '/admin/offices'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::index
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:12
 * @route '/admin/offices'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::index
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:12
 * @route '/admin/offices'
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
 * @see \App\Http\Controllers\Web\Admin\OfficeController::store
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:21
 * @route '/admin/offices'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/admin/offices',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::store
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:21
 * @route '/admin/offices'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::store
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:21
 * @route '/admin/offices'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::store
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:21
 * @route '/admin/offices'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::store
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:21
 * @route '/admin/offices'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;
/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::update
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:34
 * @route '/admin/offices/{office}'
 */
export const update = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
});

update.definition = {
    methods: ['put'],
    url: '/admin/offices/{office}',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::update
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:34
 * @route '/admin/offices/{office}'
 */
update.url = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { office: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { office: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            office: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        office: typeof args.office === 'object' ? args.office.id : args.office,
    };

    return (
        update.definition.url
            .replace('{office}', parsedArgs.office.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::update
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:34
 * @route '/admin/offices/{office}'
 */
update.put = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::update
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:34
 * @route '/admin/offices/{office}'
 */
const updateForm = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::update
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:34
 * @route '/admin/offices/{office}'
 */
updateForm.put = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

update.form = updateForm;
/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::destroy
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:47
 * @route '/admin/offices/{office}'
 */
export const destroy = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
});

destroy.definition = {
    methods: ['delete'],
    url: '/admin/offices/{office}',
} satisfies RouteDefinition<['delete']>;

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::destroy
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:47
 * @route '/admin/offices/{office}'
 */
destroy.url = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { office: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { office: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            office: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        office: typeof args.office === 'object' ? args.office.id : args.office,
    };

    return (
        destroy.definition.url
            .replace('{office}', parsedArgs.office.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::destroy
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:47
 * @route '/admin/offices/{office}'
 */
destroy.delete = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
});

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::destroy
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:47
 * @route '/admin/offices/{office}'
 */
const destroyForm = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\OfficeController::destroy
 * @see app/Http/Controllers/Web/Admin/OfficeController.php:47
 * @route '/admin/offices/{office}'
 */
destroyForm.delete = (
    args:
        | { office: number | { id: number } }
        | [office: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

destroy.form = destroyForm;
const OfficeController = { index, store, update, destroy };

export default OfficeController;
