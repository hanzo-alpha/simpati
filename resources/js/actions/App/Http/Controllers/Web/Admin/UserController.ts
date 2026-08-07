import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
    applyUrlDefaults,
} from './../../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Web\Admin\UserController::index
 * @see app/Http/Controllers/Web/Admin/UserController.php:17
 * @route '/admin/users'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/admin/users',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::index
 * @see app/Http/Controllers/Web/Admin/UserController.php:17
 * @route '/admin/users'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::index
 * @see app/Http/Controllers/Web/Admin/UserController.php:17
 * @route '/admin/users'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\Admin\UserController::index
 * @see app/Http/Controllers/Web/Admin/UserController.php:17
 * @route '/admin/users'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::index
 * @see app/Http/Controllers/Web/Admin/UserController.php:17
 * @route '/admin/users'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::index
 * @see app/Http/Controllers/Web/Admin/UserController.php:17
 * @route '/admin/users'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\Admin\UserController::index
 * @see app/Http/Controllers/Web/Admin/UserController.php:17
 * @route '/admin/users'
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
 * @see \App\Http\Controllers\Web\Admin\UserController::store
 * @see app/Http/Controllers/Web/Admin/UserController.php:57
 * @route '/admin/users'
 */
export const store = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

store.definition = {
    methods: ['post'],
    url: '/admin/users',
} satisfies RouteDefinition<['post']>;

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::store
 * @see app/Http/Controllers/Web/Admin/UserController.php:57
 * @route '/admin/users'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::store
 * @see app/Http/Controllers/Web/Admin/UserController.php:57
 * @route '/admin/users'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::store
 * @see app/Http/Controllers/Web/Admin/UserController.php:57
 * @route '/admin/users'
 */
const storeForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::store
 * @see app/Http/Controllers/Web/Admin/UserController.php:57
 * @route '/admin/users'
 */
storeForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
});

store.form = storeForm;
/**
 * @see \App\Http\Controllers\Web\Admin\UserController::update
 * @see app/Http/Controllers/Web/Admin/UserController.php:81
 * @route '/admin/users/{user}'
 */
export const update = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
});

update.definition = {
    methods: ['put'],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::update
 * @see app/Http/Controllers/Web/Admin/UserController.php:81
 * @route '/admin/users/{user}'
 */
update.url = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        user: typeof args.user === 'object' ? args.user.id : args.user,
    };

    return (
        update.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::update
 * @see app/Http/Controllers/Web/Admin/UserController.php:81
 * @route '/admin/users/{user}'
 */
update.put = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::update
 * @see app/Http/Controllers/Web/Admin/UserController.php:81
 * @route '/admin/users/{user}'
 */
const updateForm = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
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
 * @see \App\Http\Controllers\Web\Admin\UserController::update
 * @see app/Http/Controllers/Web/Admin/UserController.php:81
 * @route '/admin/users/{user}'
 */
updateForm.put = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
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
 * @see \App\Http\Controllers\Web\Admin\UserController::toggle
 * @see app/Http/Controllers/Web/Admin/UserController.php:109
 * @route '/admin/users/{user}/toggle'
 */
export const toggle = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: toggle.url(args, options),
    method: 'put',
});

toggle.definition = {
    methods: ['put'],
    url: '/admin/users/{user}/toggle',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::toggle
 * @see app/Http/Controllers/Web/Admin/UserController.php:109
 * @route '/admin/users/{user}/toggle'
 */
toggle.url = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        user: typeof args.user === 'object' ? args.user.id : args.user,
    };

    return (
        toggle.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::toggle
 * @see app/Http/Controllers/Web/Admin/UserController.php:109
 * @route '/admin/users/{user}/toggle'
 */
toggle.put = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: toggle.url(args, options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::toggle
 * @see app/Http/Controllers/Web/Admin/UserController.php:109
 * @route '/admin/users/{user}/toggle'
 */
const toggleForm = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::toggle
 * @see app/Http/Controllers/Web/Admin/UserController.php:109
 * @route '/admin/users/{user}/toggle'
 */
toggleForm.put = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

toggle.form = toggleForm;
/**
 * @see \App\Http\Controllers\Web\Admin\UserController::resetDeviceBinding
 * @see app/Http/Controllers/Web/Admin/UserController.php:118
 * @route '/admin/users/{user}/reset-device'
 */
export const resetDeviceBinding = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: resetDeviceBinding.url(args, options),
    method: 'put',
});

resetDeviceBinding.definition = {
    methods: ['put'],
    url: '/admin/users/{user}/reset-device',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::resetDeviceBinding
 * @see app/Http/Controllers/Web/Admin/UserController.php:118
 * @route '/admin/users/{user}/reset-device'
 */
resetDeviceBinding.url = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { user: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            user: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        user: typeof args.user === 'object' ? args.user.id : args.user,
    };

    return (
        resetDeviceBinding.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::resetDeviceBinding
 * @see app/Http/Controllers/Web/Admin/UserController.php:118
 * @route '/admin/users/{user}/reset-device'
 */
resetDeviceBinding.put = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: resetDeviceBinding.url(args, options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::resetDeviceBinding
 * @see app/Http/Controllers/Web/Admin/UserController.php:118
 * @route '/admin/users/{user}/reset-device'
 */
const resetDeviceBindingForm = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: resetDeviceBinding.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\UserController::resetDeviceBinding
 * @see app/Http/Controllers/Web/Admin/UserController.php:118
 * @route '/admin/users/{user}/reset-device'
 */
resetDeviceBindingForm.put = (
    args:
        | { user: number | { id: number } }
        | [user: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: resetDeviceBinding.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

resetDeviceBinding.form = resetDeviceBindingForm;
const UserController = { index, store, update, toggle, resetDeviceBinding };

export default UserController;
