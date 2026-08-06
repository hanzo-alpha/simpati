import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/profil'
 */
const editadd0e44966c55b0d628f61554b3c4ce2 = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: editadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'get',
});

editadd0e44966c55b0d628f61554b3c4ce2.definition = {
    methods: ['get', 'head'],
    url: '/profil',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/profil'
 */
editadd0e44966c55b0d628f61554b3c4ce2.url = (options?: RouteQueryOptions) => {
    return (
        editadd0e44966c55b0d628f61554b3c4ce2.definition.url +
        queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/profil'
 */
editadd0e44966c55b0d628f61554b3c4ce2.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: editadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/profil'
 */
editadd0e44966c55b0d628f61554b3c4ce2.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: editadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/profil'
 */
const editadd0e44966c55b0d628f61554b3c4ce2Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: editadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/profil'
 */
editadd0e44966c55b0d628f61554b3c4ce2Form.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: editadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/profil'
 */
editadd0e44966c55b0d628f61554b3c4ce2Form.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: editadd0e44966c55b0d628f61554b3c4ce2.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

editadd0e44966c55b0d628f61554b3c4ce2.form =
    editadd0e44966c55b0d628f61554b3c4ce2Form;
/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
const edit1b0b25d57de8d27fea6f116f8af4c45a = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: edit1b0b25d57de8d27fea6f116f8af4c45a.url(options),
    method: 'get',
});

edit1b0b25d57de8d27fea6f116f8af4c45a.definition = {
    methods: ['get', 'head'],
    url: '/admin/profil',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
edit1b0b25d57de8d27fea6f116f8af4c45a.url = (options?: RouteQueryOptions) => {
    return (
        edit1b0b25d57de8d27fea6f116f8af4c45a.definition.url +
        queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
edit1b0b25d57de8d27fea6f116f8af4c45a.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: edit1b0b25d57de8d27fea6f116f8af4c45a.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
edit1b0b25d57de8d27fea6f116f8af4c45a.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: edit1b0b25d57de8d27fea6f116f8af4c45a.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
const edit1b0b25d57de8d27fea6f116f8af4c45aForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: edit1b0b25d57de8d27fea6f116f8af4c45a.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
edit1b0b25d57de8d27fea6f116f8af4c45aForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: edit1b0b25d57de8d27fea6f116f8af4c45a.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/admin/profil'
 */
edit1b0b25d57de8d27fea6f116f8af4c45aForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: edit1b0b25d57de8d27fea6f116f8af4c45a.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

edit1b0b25d57de8d27fea6f116f8af4c45a.form =
    edit1b0b25d57de8d27fea6f116f8af4c45aForm;

/**
 * Multiple routes resolve to \App\Http\Controllers\Settings\ProfileController::edit, so this export is a
 * dictionary keyed by URI rather than a callable. Call a specific route with `edit['<uri>'](...)`,
 * or import the route by name from your generated `routes/` directory.
 */
export const edit = {
    '/profil': editadd0e44966c55b0d628f61554b3c4ce2,
    '/admin/profil': edit1b0b25d57de8d27fea6f116f8af4c45a,
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
const updateadd0e44966c55b0d628f61554b3c4ce2 = (
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: updateadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'put',
});

updateadd0e44966c55b0d628f61554b3c4ce2.definition = {
    methods: ['put'],
    url: '/profil',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
updateadd0e44966c55b0d628f61554b3c4ce2.url = (options?: RouteQueryOptions) => {
    return (
        updateadd0e44966c55b0d628f61554b3c4ce2.definition.url +
        queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
updateadd0e44966c55b0d628f61554b3c4ce2.put = (
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: updateadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
const updateadd0e44966c55b0d628f61554b3c4ce2Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: updateadd0e44966c55b0d628f61554b3c4ce2.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
updateadd0e44966c55b0d628f61554b3c4ce2Form.put = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: updateadd0e44966c55b0d628f61554b3c4ce2.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

updateadd0e44966c55b0d628f61554b3c4ce2.form =
    updateadd0e44966c55b0d628f61554b3c4ce2Form;
/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
const updateadd0e44966c55b0d628f61554b3c4ce2 = (
    options?: RouteQueryOptions,
): RouteDefinition<'patch'> => ({
    url: updateadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'patch',
});

updateadd0e44966c55b0d628f61554b3c4ce2.definition = {
    methods: ['patch'],
    url: '/profil',
} satisfies RouteDefinition<['patch']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
updateadd0e44966c55b0d628f61554b3c4ce2.url = (options?: RouteQueryOptions) => {
    return (
        updateadd0e44966c55b0d628f61554b3c4ce2.definition.url +
        queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
updateadd0e44966c55b0d628f61554b3c4ce2.patch = (
    options?: RouteQueryOptions,
): RouteDefinition<'patch'> => ({
    url: updateadd0e44966c55b0d628f61554b3c4ce2.url(options),
    method: 'patch',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
const updateadd0e44966c55b0d628f61554b3c4ce2Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: updateadd0e44966c55b0d628f61554b3c4ce2.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
updateadd0e44966c55b0d628f61554b3c4ce2Form.patch = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: updateadd0e44966c55b0d628f61554b3c4ce2.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

updateadd0e44966c55b0d628f61554b3c4ce2.form =
    updateadd0e44966c55b0d628f61554b3c4ce2Form;

/**
 * Multiple routes resolve to \App\Http\Controllers\Settings\ProfileController::update, so this export is a
 * dictionary keyed by URI rather than a callable. Call a specific route with `update['<uri>'](...)`,
 * or import the route by name from your generated `routes/` directory.
 */
export const update = {
    '/profil': updateadd0e44966c55b0d628f61554b3c4ce2,
    '/profile': updateadd0e44966c55b0d628f61554b3c4ce2,
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/profil'
 */
export const destroy = (
    options?: RouteQueryOptions,
): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
});

destroy.definition = {
    methods: ['delete'],
    url: '/profil',
} satisfies RouteDefinition<['delete']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/profil'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/profil'
 */
destroy.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(options),
    method: 'delete',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/profil'
 */
const destroyForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::destroy
 * @see app/Http/Controllers/Settings/ProfileController.php:47
 * @route '/profil'
 */
destroyForm.delete = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: destroy.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

destroy.form = destroyForm;
const ProfileController = { edit, update, destroy };

export default ProfileController;
