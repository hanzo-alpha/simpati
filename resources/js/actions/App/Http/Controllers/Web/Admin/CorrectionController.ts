import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
    applyUrlDefaults,
} from './../../../../../../wayfinder';
/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::index
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:14
 * @route '/admin/attendance-corrections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});

index.definition = {
    methods: ['get', 'head'],
    url: '/admin/attendance-corrections',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::index
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:14
 * @route '/admin/attendance-corrections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::index
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:14
 * @route '/admin/attendance-corrections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::index
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:14
 * @route '/admin/attendance-corrections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::index
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:14
 * @route '/admin/attendance-corrections'
 */
const indexForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::index
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:14
 * @route '/admin/attendance-corrections'
 */
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::index
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:14
 * @route '/admin/attendance-corrections'
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
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::updateStatus
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:23
 * @route '/admin/attendance-corrections/{attendanceCorrection}'
 */
export const updateStatus = (
    args:
        | { attendanceCorrection: number | { id: number } }
        | [attendanceCorrection: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
});

updateStatus.definition = {
    methods: ['put'],
    url: '/admin/attendance-corrections/{attendanceCorrection}',
} satisfies RouteDefinition<['put']>;

/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::updateStatus
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:23
 * @route '/admin/attendance-corrections/{attendanceCorrection}'
 */
updateStatus.url = (
    args:
        | { attendanceCorrection: number | { id: number } }
        | [attendanceCorrection: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attendanceCorrection: args };
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { attendanceCorrection: args.id };
    }

    if (Array.isArray(args)) {
        args = {
            attendanceCorrection: args[0],
        };
    }

    args = applyUrlDefaults(args);

    const parsedArgs = {
        attendanceCorrection:
            typeof args.attendanceCorrection === 'object'
                ? args.attendanceCorrection.id
                : args.attendanceCorrection,
    };

    return (
        updateStatus.definition.url
            .replace(
                '{attendanceCorrection}',
                parsedArgs.attendanceCorrection.toString(),
            )
            .replace(/\/+$/, '') + queryParams(options)
    );
};

/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::updateStatus
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:23
 * @route '/admin/attendance-corrections/{attendanceCorrection}'
 */
updateStatus.put = (
    args:
        | { attendanceCorrection: number | { id: number } }
        | [attendanceCorrection: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
});

/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::updateStatus
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:23
 * @route '/admin/attendance-corrections/{attendanceCorrection}'
 */
const updateStatusForm = (
    args:
        | { attendanceCorrection: number | { id: number } }
        | [attendanceCorrection: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

/**
 * @see \App\Http\Controllers\Web\Admin\CorrectionController::updateStatus
 * @see app/Http/Controllers/Web/Admin/CorrectionController.php:23
 * @route '/admin/attendance-corrections/{attendanceCorrection}'
 */
updateStatusForm.put = (
    args:
        | { attendanceCorrection: number | { id: number } }
        | [attendanceCorrection: number | { id: number }]
        | number
        | { id: number },
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'post',
});

updateStatus.form = updateStatusForm;
const CorrectionController = { index, updateStatus };

export default CorrectionController;
