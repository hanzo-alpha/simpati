import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../../wayfinder';
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
const profil = {
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
};

export default profil;
