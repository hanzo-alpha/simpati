import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\AdminController::update
 * @see app/Http/Controllers/Web/AdminController.php:926
 * @route '/admin/settings'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::update
 * @see app/Http/Controllers/Web/AdminController.php:926
 * @route '/admin/settings'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::update
 * @see app/Http/Controllers/Web/AdminController.php:926
 * @route '/admin/settings'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::update
 * @see app/Http/Controllers/Web/AdminController.php:926
 * @route '/admin/settings'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::update
 * @see app/Http/Controllers/Web/AdminController.php:926
 * @route '/admin/settings'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Web\AdminController::testSimpeg
 * @see app/Http/Controllers/Web/AdminController.php:967
 * @route '/admin/settings/test-simpeg'
 */
export const testSimpeg = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testSimpeg.url(options),
    method: 'post',
})

testSimpeg.definition = {
    methods: ["post"],
    url: '/admin/settings/test-simpeg',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::testSimpeg
 * @see app/Http/Controllers/Web/AdminController.php:967
 * @route '/admin/settings/test-simpeg'
 */
testSimpeg.url = (options?: RouteQueryOptions) => {
    return testSimpeg.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::testSimpeg
 * @see app/Http/Controllers/Web/AdminController.php:967
 * @route '/admin/settings/test-simpeg'
 */
testSimpeg.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testSimpeg.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::testSimpeg
 * @see app/Http/Controllers/Web/AdminController.php:967
 * @route '/admin/settings/test-simpeg'
 */
    const testSimpegForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: testSimpeg.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::testSimpeg
 * @see app/Http/Controllers/Web/AdminController.php:967
 * @route '/admin/settings/test-simpeg'
 */
        testSimpegForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: testSimpeg.url(options),
            method: 'post',
        })
    
    testSimpeg.form = testSimpegForm
const settings = {
    update: Object.assign(update, update),
testSimpeg: Object.assign(testSimpeg, testSimpeg),
}

export default settings