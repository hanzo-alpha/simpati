import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Settings\ProfileController::show
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
});

show.definition = {
    methods: ['get', 'head'],
    url: '/profil',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::show
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::show
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::show
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::show
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::show
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::show
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

show.form = showForm;
/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
export const update = (
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
});

update.definition = {
    methods: ['put'],
    url: '/profil',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::update
 * @see app/Http/Controllers/Settings/ProfileController.php:35
 * @route '/profil'
 */
const updateForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: update.url({
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
updateForm.put = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

update.form = updateForm;
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
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/settings/profile'
 */
const editfc6874003af373efc88e5e18eecd9c17 = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
});

editfc6874003af373efc88e5e18eecd9c17.definition = {
    methods: ['get', 'head'],
    url: '/settings/profile',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/settings/profile'
 */
editfc6874003af373efc88e5e18eecd9c17.url = (options?: RouteQueryOptions) => {
    return (
        editfc6874003af373efc88e5e18eecd9c17.definition.url +
        queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/settings/profile'
 */
editfc6874003af373efc88e5e18eecd9c17.get = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/settings/profile'
 */
editfc6874003af373efc88e5e18eecd9c17.head = (
    options?: RouteQueryOptions,
): RouteDefinition<'head'> => ({
    url: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/settings/profile'
 */
const editfc6874003af373efc88e5e18eecd9c17Form = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/settings/profile'
 */
editfc6874003af373efc88e5e18eecd9c17Form.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: editfc6874003af373efc88e5e18eecd9c17.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::edit
 * @see app/Http/Controllers/Settings/ProfileController.php:21
 * @route '/settings/profile'
 */
editfc6874003af373efc88e5e18eecd9c17Form.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: editfc6874003af373efc88e5e18eecd9c17.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

editfc6874003af373efc88e5e18eecd9c17.form =
    editfc6874003af373efc88e5e18eecd9c17Form;

/**
 * Multiple routes resolve to \App\Http\Controllers\Settings\ProfileController::edit, so this export is a
 * dictionary keyed by URI rather than a callable. Call a specific route with `edit['<uri>'](...)`,
 * or import the route by name from your generated `routes/` directory.
 */
export const edit = {
    '/admin/profil': edit1b0b25d57de8d27fea6f116f8af4c45a,
    '/settings/profile': editfc6874003af373efc88e5e18eecd9c17,
};

const ProfileController = { show, update, destroy, edit };

export default ProfileController;
