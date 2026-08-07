import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
export const riwayat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})

riwayat.definition = {
    methods: ["get","head"],
    url: '/riwayat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
riwayat.url = (options?: RouteQueryOptions) => {
    return riwayat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
riwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
riwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
    const riwayatForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: riwayat.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
        riwayatForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: riwayat.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
        riwayatForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: riwayat.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    riwayat.form = riwayatForm
/**
* @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
export const statistik = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistik.url(options),
    method: 'get',
})

statistik.definition = {
    methods: ["get","head"],
    url: '/statistik',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
statistik.url = (options?: RouteQueryOptions) => {
    return statistik.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
statistik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistik.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
statistik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistik.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
    const statistikForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: statistik.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
        statistikForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statistik.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
        statistikForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statistik.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    statistik.form = statistikForm
/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
const peringkatd309dd143a9821b81999b84b0f69126b = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peringkatd309dd143a9821b81999b84b0f69126b.url(options),
    method: 'get',
})

peringkatd309dd143a9821b81999b84b0f69126b.definition = {
    methods: ["get","head"],
    url: '/peringkat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
peringkatd309dd143a9821b81999b84b0f69126b.url = (options?: RouteQueryOptions) => {
    return peringkatd309dd143a9821b81999b84b0f69126b.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
peringkatd309dd143a9821b81999b84b0f69126b.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peringkatd309dd143a9821b81999b84b0f69126b.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
peringkatd309dd143a9821b81999b84b0f69126b.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: peringkatd309dd143a9821b81999b84b0f69126b.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
    const peringkatd309dd143a9821b81999b84b0f69126bForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: peringkatd309dd143a9821b81999b84b0f69126b.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
        peringkatd309dd143a9821b81999b84b0f69126bForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: peringkatd309dd143a9821b81999b84b0f69126b.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
        peringkatd309dd143a9821b81999b84b0f69126bForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: peringkatd309dd143a9821b81999b84b0f69126b.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    peringkatd309dd143a9821b81999b84b0f69126b.form = peringkatd309dd143a9821b81999b84b0f69126bForm
    /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
const peringkatfe5c9d6e26cd4499906036fc9049b161 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peringkatfe5c9d6e26cd4499906036fc9049b161.url(options),
    method: 'get',
})

peringkatfe5c9d6e26cd4499906036fc9049b161.definition = {
    methods: ["get","head"],
    url: '/admin/peringkat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
peringkatfe5c9d6e26cd4499906036fc9049b161.url = (options?: RouteQueryOptions) => {
    return peringkatfe5c9d6e26cd4499906036fc9049b161.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
peringkatfe5c9d6e26cd4499906036fc9049b161.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peringkatfe5c9d6e26cd4499906036fc9049b161.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
peringkatfe5c9d6e26cd4499906036fc9049b161.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: peringkatfe5c9d6e26cd4499906036fc9049b161.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
    const peringkatfe5c9d6e26cd4499906036fc9049b161Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: peringkatfe5c9d6e26cd4499906036fc9049b161.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
        peringkatfe5c9d6e26cd4499906036fc9049b161Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: peringkatfe5c9d6e26cd4499906036fc9049b161.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/admin/peringkat'
 */
        peringkatfe5c9d6e26cd4499906036fc9049b161Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: peringkatfe5c9d6e26cd4499906036fc9049b161.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    peringkatfe5c9d6e26cd4499906036fc9049b161.form = peringkatfe5c9d6e26cd4499906036fc9049b161Form

/**
* Multiple routes resolve to \App\Http\Controllers\Web\AttendanceController::peringkat, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `peringkat['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const peringkat = {
    '/peringkat': peringkatd309dd143a9821b81999b84b0f69126b,
    '/admin/peringkat': peringkatfe5c9d6e26cd4499906036fc9049b161,
}

const AttendanceController = { riwayat, statistik, peringkat }

export default AttendanceController