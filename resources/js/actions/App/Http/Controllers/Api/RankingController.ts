import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\RankingController::index
 * @see app/Http/Controllers/Api/RankingController.php:16
 * @route '/api/ranking'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/ranking',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\RankingController::index
 * @see app/Http/Controllers/Api/RankingController.php:16
 * @route '/api/ranking'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\RankingController::index
 * @see app/Http/Controllers/Api/RankingController.php:16
 * @route '/api/ranking'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\RankingController::index
 * @see app/Http/Controllers/Api/RankingController.php:16
 * @route '/api/ranking'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\RankingController::index
 * @see app/Http/Controllers/Api/RankingController.php:16
 * @route '/api/ranking'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\RankingController::index
 * @see app/Http/Controllers/Api/RankingController.php:16
 * @route '/api/ranking'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\RankingController::index
 * @see app/Http/Controllers/Api/RankingController.php:16
 * @route '/api/ranking'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const RankingController = { index }

export default RankingController