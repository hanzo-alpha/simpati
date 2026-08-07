import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::syncMasterData
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:26
 * @route '/api/v1/simpeg/sync-master'
 */
export const syncMasterData = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncMasterData.url(options),
    method: 'post',
})

syncMasterData.definition = {
    methods: ["post"],
    url: '/api/v1/simpeg/sync-master',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::syncMasterData
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:26
 * @route '/api/v1/simpeg/sync-master'
 */
syncMasterData.url = (options?: RouteQueryOptions) => {
    return syncMasterData.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::syncMasterData
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:26
 * @route '/api/v1/simpeg/sync-master'
 */
syncMasterData.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncMasterData.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::syncMasterData
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:26
 * @route '/api/v1/simpeg/sync-master'
 */
    const syncMasterDataForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: syncMasterData.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::syncMasterData
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:26
 * @route '/api/v1/simpeg/sync-master'
 */
        syncMasterDataForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: syncMasterData.url(options),
            method: 'post',
        })
    
    syncMasterData.form = syncMasterDataForm
/**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::getRecapForSimpeg
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:116
 * @route '/api/v1/simpeg/recap'
 */
export const getRecapForSimpeg = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRecapForSimpeg.url(options),
    method: 'get',
})

getRecapForSimpeg.definition = {
    methods: ["get","head"],
    url: '/api/v1/simpeg/recap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::getRecapForSimpeg
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:116
 * @route '/api/v1/simpeg/recap'
 */
getRecapForSimpeg.url = (options?: RouteQueryOptions) => {
    return getRecapForSimpeg.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::getRecapForSimpeg
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:116
 * @route '/api/v1/simpeg/recap'
 */
getRecapForSimpeg.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRecapForSimpeg.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::getRecapForSimpeg
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:116
 * @route '/api/v1/simpeg/recap'
 */
getRecapForSimpeg.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRecapForSimpeg.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::getRecapForSimpeg
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:116
 * @route '/api/v1/simpeg/recap'
 */
    const getRecapForSimpegForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getRecapForSimpeg.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::getRecapForSimpeg
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:116
 * @route '/api/v1/simpeg/recap'
 */
        getRecapForSimpegForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRecapForSimpeg.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SimpegIntegrationController::getRecapForSimpeg
 * @see app/Http/Controllers/Api/SimpegIntegrationController.php:116
 * @route '/api/v1/simpeg/recap'
 */
        getRecapForSimpegForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getRecapForSimpeg.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getRecapForSimpeg.form = getRecapForSimpegForm
const SimpegIntegrationController = { syncMasterData, getRecapForSimpeg }

export default SimpegIntegrationController