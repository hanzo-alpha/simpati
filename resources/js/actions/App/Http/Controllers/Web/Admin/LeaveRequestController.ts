import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
    applyUrlDefaults,
} from './../../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::index
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:14
 * @route '/admin/leave-requests'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/admin/leave-requests',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::index
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:14
 * @route '/admin/leave-requests'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::index
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:14
 * @route '/admin/leave-requests'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::index
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:14
 * @route '/admin/leave-requests'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::index
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:14
 * @route '/admin/leave-requests'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::index
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:14
 * @route '/admin/leave-requests'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::index
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:14
 * @route '/admin/leave-requests'
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
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::update
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:40
 * @route '/admin/leave-requests/{leaveRequest}'
 */
export const update = (
    args:
        | { leaveRequest: number | { id: number } }
        | [leaveRequest: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
});

update.definition = {
    methods: ['put'],
    url: '/admin/leave-requests/{leaveRequest}',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::update
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:40
 * @route '/admin/leave-requests/{leaveRequest}'
 */
update.url = (
    args:
        | { leaveRequest: number | { id: number } }
        | [leaveRequest: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { leaveRequest: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            leaveRequest: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        leaveRequest:
            typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
    };

    return (
        update.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::update
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:40
 * @route '/admin/leave-requests/{leaveRequest}'
 */
update.put = (
    args:
        | { leaveRequest: number | { id: number } }
        | [leaveRequest: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::update
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:40
 * @route '/admin/leave-requests/{leaveRequest}'
 */
const updateForm = (
    args:
        | { leaveRequest: number | { id: number } }
        | [leaveRequest: number | { id: number }]
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
 * @see \App\Http\Controllers\Web\Admin\LeaveRequestController::update
 * @see app/Http/Controllers/Web/Admin/LeaveRequestController.php:40
 * @route '/admin/leave-requests/{leaveRequest}'
 */
updateForm.put = (
    args:
        | { leaveRequest: number | { id: number } }
        | [leaveRequest: number | { id: number }]
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
const LeaveRequestController = { index, update };

export default LeaveRequestController;
