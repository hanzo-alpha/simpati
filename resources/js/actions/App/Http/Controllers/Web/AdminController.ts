import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::dashboard
 * @see app/Http/Controllers/Web/AdminController.php:28
 * @route '/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
export const offices = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: offices.url(options),
    method: 'get',
})

offices.definition = {
    methods: ["get","head"],
    url: '/admin/offices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
offices.url = (options?: RouteQueryOptions) => {
    return offices.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
offices.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: offices.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
offices.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: offices.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
    const officesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: offices.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
        officesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: offices.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::offices
 * @see app/Http/Controllers/Web/AdminController.php:228
 * @route '/admin/offices'
 */
        officesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: offices.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    offices.form = officesForm
/**
* @see \App\Http\Controllers\Web\AdminController::storeOffice
 * @see app/Http/Controllers/Web/AdminController.php:237
 * @route '/admin/offices'
 */
export const storeOffice = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeOffice.url(options),
    method: 'post',
})

storeOffice.definition = {
    methods: ["post"],
    url: '/admin/offices',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::storeOffice
 * @see app/Http/Controllers/Web/AdminController.php:237
 * @route '/admin/offices'
 */
storeOffice.url = (options?: RouteQueryOptions) => {
    return storeOffice.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::storeOffice
 * @see app/Http/Controllers/Web/AdminController.php:237
 * @route '/admin/offices'
 */
storeOffice.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeOffice.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::storeOffice
 * @see app/Http/Controllers/Web/AdminController.php:237
 * @route '/admin/offices'
 */
    const storeOfficeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeOffice.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::storeOffice
 * @see app/Http/Controllers/Web/AdminController.php:237
 * @route '/admin/offices'
 */
        storeOfficeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeOffice.url(options),
            method: 'post',
        })
    
    storeOffice.form = storeOfficeForm
/**
* @see \App\Http\Controllers\Web\AdminController::updateOffice
 * @see app/Http/Controllers/Web/AdminController.php:259
 * @route '/admin/offices/{office}'
 */
export const updateOffice = (args: { office: number | { id: number } } | [office: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateOffice.url(args, options),
    method: 'put',
})

updateOffice.definition = {
    methods: ["put"],
    url: '/admin/offices/{office}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\AdminController::updateOffice
 * @see app/Http/Controllers/Web/AdminController.php:259
 * @route '/admin/offices/{office}'
 */
updateOffice.url = (args: { office: number | { id: number } } | [office: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { office: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { office: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    office: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        office: typeof args.office === 'object'
                ? args.office.id
                : args.office,
                }

    return updateOffice.definition.url
            .replace('{office}', parsedArgs.office.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::updateOffice
 * @see app/Http/Controllers/Web/AdminController.php:259
 * @route '/admin/offices/{office}'
 */
updateOffice.put = (args: { office: number | { id: number } } | [office: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateOffice.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::updateOffice
 * @see app/Http/Controllers/Web/AdminController.php:259
 * @route '/admin/offices/{office}'
 */
    const updateOfficeForm = (args: { office: number | { id: number } } | [office: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateOffice.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::updateOffice
 * @see app/Http/Controllers/Web/AdminController.php:259
 * @route '/admin/offices/{office}'
 */
        updateOfficeForm.put = (args: { office: number | { id: number } } | [office: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateOffice.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateOffice.form = updateOfficeForm
/**
* @see \App\Http\Controllers\Web\AdminController::destroyOffice
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/offices/{office}'
 */
export const destroyOffice = (args: { office: string | number } | [office: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyOffice.url(args, options),
    method: 'delete',
})

destroyOffice.definition = {
    methods: ["delete"],
    url: '/admin/offices/{office}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\AdminController::destroyOffice
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/offices/{office}'
 */
destroyOffice.url = (args: { office: string | number } | [office: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { office: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    office: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        office: args.office,
                }

    return destroyOffice.definition.url
            .replace('{office}', parsedArgs.office.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::destroyOffice
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/offices/{office}'
 */
destroyOffice.delete = (args: { office: string | number } | [office: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyOffice.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::destroyOffice
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/offices/{office}'
 */
    const destroyOfficeForm = (args: { office: string | number } | [office: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyOffice.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::destroyOffice
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/offices/{office}'
 */
        destroyOfficeForm.delete = (args: { office: string | number } | [office: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyOffice.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyOffice.form = destroyOfficeForm
/**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::users
 * @see app/Http/Controllers/Web/AdminController.php:143
 * @route '/admin/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
/**
* @see \App\Http\Controllers\Web\AdminController::storeUser
 * @see app/Http/Controllers/Web/AdminController.php:163
 * @route '/admin/users'
 */
export const storeUser = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser.url(options),
    method: 'post',
})

storeUser.definition = {
    methods: ["post"],
    url: '/admin/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::storeUser
 * @see app/Http/Controllers/Web/AdminController.php:163
 * @route '/admin/users'
 */
storeUser.url = (options?: RouteQueryOptions) => {
    return storeUser.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::storeUser
 * @see app/Http/Controllers/Web/AdminController.php:163
 * @route '/admin/users'
 */
storeUser.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeUser.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::storeUser
 * @see app/Http/Controllers/Web/AdminController.php:163
 * @route '/admin/users'
 */
    const storeUserForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeUser.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::storeUser
 * @see app/Http/Controllers/Web/AdminController.php:163
 * @route '/admin/users'
 */
        storeUserForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeUser.url(options),
            method: 'post',
        })
    
    storeUser.form = storeUserForm
/**
* @see \App\Http\Controllers\Web\AdminController::updateUser
 * @see app/Http/Controllers/Web/AdminController.php:192
 * @route '/admin/users/{user}'
 */
export const updateUser = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(args, options),
    method: 'put',
})

updateUser.definition = {
    methods: ["put"],
    url: '/admin/users/{user}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\AdminController::updateUser
 * @see app/Http/Controllers/Web/AdminController.php:192
 * @route '/admin/users/{user}'
 */
updateUser.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return updateUser.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::updateUser
 * @see app/Http/Controllers/Web/AdminController.php:192
 * @route '/admin/users/{user}'
 */
updateUser.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateUser.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::updateUser
 * @see app/Http/Controllers/Web/AdminController.php:192
 * @route '/admin/users/{user}'
 */
    const updateUserForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateUser.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::updateUser
 * @see app/Http/Controllers/Web/AdminController.php:192
 * @route '/admin/users/{user}'
 */
        updateUserForm.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateUser.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateUser.form = updateUserForm
/**
* @see \App\Http\Controllers\Web\AdminController::toggleUser
 * @see app/Http/Controllers/Web/AdminController.php:221
 * @route '/admin/users/{user}/toggle'
 */
export const toggleUser = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleUser.url(args, options),
    method: 'put',
})

toggleUser.definition = {
    methods: ["put"],
    url: '/admin/users/{user}/toggle',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\AdminController::toggleUser
 * @see app/Http/Controllers/Web/AdminController.php:221
 * @route '/admin/users/{user}/toggle'
 */
toggleUser.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return toggleUser.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::toggleUser
 * @see app/Http/Controllers/Web/AdminController.php:221
 * @route '/admin/users/{user}/toggle'
 */
toggleUser.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleUser.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::toggleUser
 * @see app/Http/Controllers/Web/AdminController.php:221
 * @route '/admin/users/{user}/toggle'
 */
    const toggleUserForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleUser.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::toggleUser
 * @see app/Http/Controllers/Web/AdminController.php:221
 * @route '/admin/users/{user}/toggle'
 */
        toggleUserForm.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleUser.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleUser.form = toggleUserForm
/**
* @see \App\Http\Controllers\Web\AdminController::resetDeviceBinding
 * @see app/Http/Controllers/Web/AdminController.php:156
 * @route '/admin/users/{user}/reset-device'
 */
export const resetDeviceBinding = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: resetDeviceBinding.url(args, options),
    method: 'put',
})

resetDeviceBinding.definition = {
    methods: ["put"],
    url: '/admin/users/{user}/reset-device',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\AdminController::resetDeviceBinding
 * @see app/Http/Controllers/Web/AdminController.php:156
 * @route '/admin/users/{user}/reset-device'
 */
resetDeviceBinding.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return resetDeviceBinding.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::resetDeviceBinding
 * @see app/Http/Controllers/Web/AdminController.php:156
 * @route '/admin/users/{user}/reset-device'
 */
resetDeviceBinding.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: resetDeviceBinding.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::resetDeviceBinding
 * @see app/Http/Controllers/Web/AdminController.php:156
 * @route '/admin/users/{user}/reset-device'
 */
    const resetDeviceBindingForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resetDeviceBinding.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::resetDeviceBinding
 * @see app/Http/Controllers/Web/AdminController.php:156
 * @route '/admin/users/{user}/reset-device'
 */
        resetDeviceBindingForm.put = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resetDeviceBinding.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    resetDeviceBinding.form = resetDeviceBindingForm
/**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
export const attendances = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendances.url(options),
    method: 'get',
})

attendances.definition = {
    methods: ["get","head"],
    url: '/admin/attendances',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
attendances.url = (options?: RouteQueryOptions) => {
    return attendances.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
attendances.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendances.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
attendances.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendances.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
    const attendancesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendances.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
        attendancesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendances.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::attendances
 * @see app/Http/Controllers/Web/AdminController.php:281
 * @route '/admin/attendances'
 */
        attendancesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendances.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendances.form = attendancesForm
/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendances
 * @see app/Http/Controllers/Web/AdminController.php:369
 * @route '/admin/attendances/export'
 */
export const exportAttendances = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendances.url(options),
    method: 'get',
})

exportAttendances.definition = {
    methods: ["get","head"],
    url: '/admin/attendances/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendances
 * @see app/Http/Controllers/Web/AdminController.php:369
 * @route '/admin/attendances/export'
 */
exportAttendances.url = (options?: RouteQueryOptions) => {
    return exportAttendances.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendances
 * @see app/Http/Controllers/Web/AdminController.php:369
 * @route '/admin/attendances/export'
 */
exportAttendances.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendances.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendances
 * @see app/Http/Controllers/Web/AdminController.php:369
 * @route '/admin/attendances/export'
 */
exportAttendances.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportAttendances.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendances
 * @see app/Http/Controllers/Web/AdminController.php:369
 * @route '/admin/attendances/export'
 */
    const exportAttendancesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportAttendances.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendances
 * @see app/Http/Controllers/Web/AdminController.php:369
 * @route '/admin/attendances/export'
 */
        exportAttendancesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendances.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendances
 * @see app/Http/Controllers/Web/AdminController.php:369
 * @route '/admin/attendances/export'
 */
        exportAttendancesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendances.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportAttendances.form = exportAttendancesForm
/**
* @see \App\Http\Controllers\Web\AdminController::exportTppReport
 * @see app/Http/Controllers/Web/AdminController.php:752
 * @route '/admin/attendances/export-tpp'
 */
export const exportTppReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTppReport.url(options),
    method: 'get',
})

exportTppReport.definition = {
    methods: ["get","head"],
    url: '/admin/attendances/export-tpp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::exportTppReport
 * @see app/Http/Controllers/Web/AdminController.php:752
 * @route '/admin/attendances/export-tpp'
 */
exportTppReport.url = (options?: RouteQueryOptions) => {
    return exportTppReport.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::exportTppReport
 * @see app/Http/Controllers/Web/AdminController.php:752
 * @route '/admin/attendances/export-tpp'
 */
exportTppReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTppReport.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::exportTppReport
 * @see app/Http/Controllers/Web/AdminController.php:752
 * @route '/admin/attendances/export-tpp'
 */
exportTppReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTppReport.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::exportTppReport
 * @see app/Http/Controllers/Web/AdminController.php:752
 * @route '/admin/attendances/export-tpp'
 */
    const exportTppReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportTppReport.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::exportTppReport
 * @see app/Http/Controllers/Web/AdminController.php:752
 * @route '/admin/attendances/export-tpp'
 */
        exportTppReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTppReport.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::exportTppReport
 * @see app/Http/Controllers/Web/AdminController.php:752
 * @route '/admin/attendances/export-tpp'
 */
        exportTppReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportTppReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportTppReport.form = exportTppReportForm
/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/AdminController.php:413
 * @route '/admin/attendances/export-recap'
 */
export const exportAttendanceRecap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendanceRecap.url(options),
    method: 'get',
})

exportAttendanceRecap.definition = {
    methods: ["get","head"],
    url: '/admin/attendances/export-recap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/AdminController.php:413
 * @route '/admin/attendances/export-recap'
 */
exportAttendanceRecap.url = (options?: RouteQueryOptions) => {
    return exportAttendanceRecap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/AdminController.php:413
 * @route '/admin/attendances/export-recap'
 */
exportAttendanceRecap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendanceRecap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/AdminController.php:413
 * @route '/admin/attendances/export-recap'
 */
exportAttendanceRecap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportAttendanceRecap.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/AdminController.php:413
 * @route '/admin/attendances/export-recap'
 */
    const exportAttendanceRecapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportAttendanceRecap.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/AdminController.php:413
 * @route '/admin/attendances/export-recap'
 */
        exportAttendanceRecapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendanceRecap.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceRecap
 * @see app/Http/Controllers/Web/AdminController.php:413
 * @route '/admin/attendances/export-recap'
 */
        exportAttendanceRecapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendanceRecap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportAttendanceRecap.form = exportAttendanceRecapForm
/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceSummary
 * @see app/Http/Controllers/Web/AdminController.php:472
 * @route '/admin/attendances/export-summary'
 */
export const exportAttendanceSummary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendanceSummary.url(options),
    method: 'get',
})

exportAttendanceSummary.definition = {
    methods: ["get","head"],
    url: '/admin/attendances/export-summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceSummary
 * @see app/Http/Controllers/Web/AdminController.php:472
 * @route '/admin/attendances/export-summary'
 */
exportAttendanceSummary.url = (options?: RouteQueryOptions) => {
    return exportAttendanceSummary.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceSummary
 * @see app/Http/Controllers/Web/AdminController.php:472
 * @route '/admin/attendances/export-summary'
 */
exportAttendanceSummary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportAttendanceSummary.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceSummary
 * @see app/Http/Controllers/Web/AdminController.php:472
 * @route '/admin/attendances/export-summary'
 */
exportAttendanceSummary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportAttendanceSummary.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceSummary
 * @see app/Http/Controllers/Web/AdminController.php:472
 * @route '/admin/attendances/export-summary'
 */
    const exportAttendanceSummaryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportAttendanceSummary.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceSummary
 * @see app/Http/Controllers/Web/AdminController.php:472
 * @route '/admin/attendances/export-summary'
 */
        exportAttendanceSummaryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendanceSummary.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::exportAttendanceSummary
 * @see app/Http/Controllers/Web/AdminController.php:472
 * @route '/admin/attendances/export-summary'
 */
        exportAttendanceSummaryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportAttendanceSummary.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportAttendanceSummary.form = exportAttendanceSummaryForm
/**
* @see \App\Http\Controllers\Web\AdminController::verifyQrCode
 * @see app/Http/Controllers/Web/AdminController.php:845
 * @route '/admin/attendances/verify-qr'
 */
export const verifyQrCode = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyQrCode.url(options),
    method: 'post',
})

verifyQrCode.definition = {
    methods: ["post"],
    url: '/admin/attendances/verify-qr',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::verifyQrCode
 * @see app/Http/Controllers/Web/AdminController.php:845
 * @route '/admin/attendances/verify-qr'
 */
verifyQrCode.url = (options?: RouteQueryOptions) => {
    return verifyQrCode.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::verifyQrCode
 * @see app/Http/Controllers/Web/AdminController.php:845
 * @route '/admin/attendances/verify-qr'
 */
verifyQrCode.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyQrCode.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::verifyQrCode
 * @see app/Http/Controllers/Web/AdminController.php:845
 * @route '/admin/attendances/verify-qr'
 */
    const verifyQrCodeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verifyQrCode.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::verifyQrCode
 * @see app/Http/Controllers/Web/AdminController.php:845
 * @route '/admin/attendances/verify-qr'
 */
        verifyQrCodeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verifyQrCode.url(options),
            method: 'post',
        })
    
    verifyQrCode.form = verifyQrCodeForm
/**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:611
 * @route '/admin/leave-requests'
 */
export const leaveRequests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveRequests.url(options),
    method: 'get',
})

leaveRequests.definition = {
    methods: ["get","head"],
    url: '/admin/leave-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:611
 * @route '/admin/leave-requests'
 */
leaveRequests.url = (options?: RouteQueryOptions) => {
    return leaveRequests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:611
 * @route '/admin/leave-requests'
 */
leaveRequests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveRequests.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:611
 * @route '/admin/leave-requests'
 */
leaveRequests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaveRequests.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:611
 * @route '/admin/leave-requests'
 */
    const leaveRequestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: leaveRequests.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:611
 * @route '/admin/leave-requests'
 */
        leaveRequestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveRequests.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::leaveRequests
 * @see app/Http/Controllers/Web/AdminController.php:611
 * @route '/admin/leave-requests'
 */
        leaveRequestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveRequests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    leaveRequests.form = leaveRequestsForm
/**
* @see \App\Http\Controllers\Web\AdminController::updateLeaveRequest
 * @see app/Http/Controllers/Web/AdminController.php:639
 * @route '/admin/leave-requests/{leaveRequest}'
 */
export const updateLeaveRequest = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLeaveRequest.url(args, options),
    method: 'put',
})

updateLeaveRequest.definition = {
    methods: ["put"],
    url: '/admin/leave-requests/{leaveRequest}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\AdminController::updateLeaveRequest
 * @see app/Http/Controllers/Web/AdminController.php:639
 * @route '/admin/leave-requests/{leaveRequest}'
 */
updateLeaveRequest.url = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { leaveRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { leaveRequest: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    leaveRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        leaveRequest: typeof args.leaveRequest === 'object'
                ? args.leaveRequest.id
                : args.leaveRequest,
                }

    return updateLeaveRequest.definition.url
            .replace('{leaveRequest}', parsedArgs.leaveRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::updateLeaveRequest
 * @see app/Http/Controllers/Web/AdminController.php:639
 * @route '/admin/leave-requests/{leaveRequest}'
 */
updateLeaveRequest.put = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLeaveRequest.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::updateLeaveRequest
 * @see app/Http/Controllers/Web/AdminController.php:639
 * @route '/admin/leave-requests/{leaveRequest}'
 */
    const updateLeaveRequestForm = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateLeaveRequest.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::updateLeaveRequest
 * @see app/Http/Controllers/Web/AdminController.php:639
 * @route '/admin/leave-requests/{leaveRequest}'
 */
        updateLeaveRequestForm.put = (args: { leaveRequest: number | { id: number } } | [leaveRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateLeaveRequest.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateLeaveRequest.form = updateLeaveRequestForm
/**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:658
 * @route '/admin/schedules'
 */
export const schedules = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})

schedules.definition = {
    methods: ["get","head"],
    url: '/admin/schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:658
 * @route '/admin/schedules'
 */
schedules.url = (options?: RouteQueryOptions) => {
    return schedules.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:658
 * @route '/admin/schedules'
 */
schedules.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:658
 * @route '/admin/schedules'
 */
schedules.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedules.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:658
 * @route '/admin/schedules'
 */
    const schedulesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedules.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:658
 * @route '/admin/schedules'
 */
        schedulesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::schedules
 * @see app/Http/Controllers/Web/AdminController.php:658
 * @route '/admin/schedules'
 */
        schedulesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedules.form = schedulesForm
/**
* @see \App\Http\Controllers\Web\AdminController::storeSchedule
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
export const storeSchedule = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSchedule.url(options),
    method: 'post',
})

storeSchedule.definition = {
    methods: ["post"],
    url: '/admin/schedules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::storeSchedule
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
storeSchedule.url = (options?: RouteQueryOptions) => {
    return storeSchedule.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::storeSchedule
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
storeSchedule.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSchedule.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::storeSchedule
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
    const storeScheduleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeSchedule.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::storeSchedule
 * @see app/Http/Controllers/Web/AdminController.php:669
 * @route '/admin/schedules'
 */
        storeScheduleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeSchedule.url(options),
            method: 'post',
        })
    
    storeSchedule.form = storeScheduleForm
/**
* @see \App\Http\Controllers\Web\AdminController::updateSchedule
 * @see app/Http/Controllers/Web/AdminController.php:691
 * @route '/admin/schedules/{schedule}'
 */
export const updateSchedule = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSchedule.url(args, options),
    method: 'put',
})

updateSchedule.definition = {
    methods: ["put"],
    url: '/admin/schedules/{schedule}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\AdminController::updateSchedule
 * @see app/Http/Controllers/Web/AdminController.php:691
 * @route '/admin/schedules/{schedule}'
 */
updateSchedule.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        schedule: typeof args.schedule === 'object'
                ? args.schedule.id
                : args.schedule,
                }

    return updateSchedule.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::updateSchedule
 * @see app/Http/Controllers/Web/AdminController.php:691
 * @route '/admin/schedules/{schedule}'
 */
updateSchedule.put = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSchedule.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::updateSchedule
 * @see app/Http/Controllers/Web/AdminController.php:691
 * @route '/admin/schedules/{schedule}'
 */
    const updateScheduleForm = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSchedule.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::updateSchedule
 * @see app/Http/Controllers/Web/AdminController.php:691
 * @route '/admin/schedules/{schedule}'
 */
        updateScheduleForm.put = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSchedule.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateSchedule.form = updateScheduleForm
/**
* @see \App\Http\Controllers\Web\AdminController::destroySchedule
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/schedules/{schedule}'
 */
export const destroySchedule = (args: { schedule: string | number } | [schedule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySchedule.url(args, options),
    method: 'delete',
})

destroySchedule.definition = {
    methods: ["delete"],
    url: '/admin/schedules/{schedule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\AdminController::destroySchedule
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/schedules/{schedule}'
 */
destroySchedule.url = (args: { schedule: string | number } | [schedule: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        schedule: args.schedule,
                }

    return destroySchedule.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::destroySchedule
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/schedules/{schedule}'
 */
destroySchedule.delete = (args: { schedule: string | number } | [schedule: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySchedule.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::destroySchedule
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/schedules/{schedule}'
 */
    const destroyScheduleForm = (args: { schedule: string | number } | [schedule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroySchedule.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::destroySchedule
 * @see app/Http/Controllers/Web/AdminController.php:0
 * @route '/admin/schedules/{schedule}'
 */
        destroyScheduleForm.delete = (args: { schedule: string | number } | [schedule: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroySchedule.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroySchedule.form = destroyScheduleForm
/**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:720
 * @route '/admin/announcements'
 */
export const announcements = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})

announcements.definition = {
    methods: ["get","head"],
    url: '/admin/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:720
 * @route '/admin/announcements'
 */
announcements.url = (options?: RouteQueryOptions) => {
    return announcements.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:720
 * @route '/admin/announcements'
 */
announcements.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:720
 * @route '/admin/announcements'
 */
announcements.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: announcements.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:720
 * @route '/admin/announcements'
 */
    const announcementsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: announcements.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:720
 * @route '/admin/announcements'
 */
        announcementsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: announcements.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::announcements
 * @see app/Http/Controllers/Web/AdminController.php:720
 * @route '/admin/announcements'
 */
        announcementsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: announcements.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    announcements.form = announcementsForm
/**
* @see \App\Http\Controllers\Web\AdminController::storeAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
export const storeAnnouncement = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAnnouncement.url(options),
    method: 'post',
})

storeAnnouncement.definition = {
    methods: ["post"],
    url: '/admin/announcements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::storeAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
storeAnnouncement.url = (options?: RouteQueryOptions) => {
    return storeAnnouncement.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::storeAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
storeAnnouncement.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAnnouncement.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::storeAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
    const storeAnnouncementForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeAnnouncement.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::storeAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:731
 * @route '/admin/announcements'
 */
        storeAnnouncementForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeAnnouncement.url(options),
            method: 'post',
        })
    
    storeAnnouncement.form = storeAnnouncementForm
/**
* @see \App\Http\Controllers\Web\AdminController::destroyAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:745
 * @route '/admin/announcements/{announcement}'
 */
export const destroyAnnouncement = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAnnouncement.url(args, options),
    method: 'delete',
})

destroyAnnouncement.definition = {
    methods: ["delete"],
    url: '/admin/announcements/{announcement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Web\AdminController::destroyAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:745
 * @route '/admin/announcements/{announcement}'
 */
destroyAnnouncement.url = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { announcement: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.id
                : args.announcement,
                }

    return destroyAnnouncement.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::destroyAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:745
 * @route '/admin/announcements/{announcement}'
 */
destroyAnnouncement.delete = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyAnnouncement.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::destroyAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:745
 * @route '/admin/announcements/{announcement}'
 */
    const destroyAnnouncementForm = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyAnnouncement.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::destroyAnnouncement
 * @see app/Http/Controllers/Web/AdminController.php:745
 * @route '/admin/announcements/{announcement}'
 */
        destroyAnnouncementForm.delete = (args: { announcement: number | { id: number } } | [announcement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyAnnouncement.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyAnnouncement.form = destroyAnnouncementForm
/**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:797
 * @route '/admin/shift-swaps'
 */
export const shiftSwaps = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shiftSwaps.url(options),
    method: 'get',
})

shiftSwaps.definition = {
    methods: ["get","head"],
    url: '/admin/shift-swaps',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:797
 * @route '/admin/shift-swaps'
 */
shiftSwaps.url = (options?: RouteQueryOptions) => {
    return shiftSwaps.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:797
 * @route '/admin/shift-swaps'
 */
shiftSwaps.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shiftSwaps.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:797
 * @route '/admin/shift-swaps'
 */
shiftSwaps.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shiftSwaps.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:797
 * @route '/admin/shift-swaps'
 */
    const shiftSwapsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shiftSwaps.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:797
 * @route '/admin/shift-swaps'
 */
        shiftSwapsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shiftSwaps.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::shiftSwaps
 * @see app/Http/Controllers/Web/AdminController.php:797
 * @route '/admin/shift-swaps'
 */
        shiftSwapsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shiftSwaps.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shiftSwaps.form = shiftSwapsForm
/**
* @see \App\Http\Controllers\Web\AdminController::updateShiftSwapStatus
 * @see app/Http/Controllers/Web/AdminController.php:806
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
export const updateShiftSwapStatus = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateShiftSwapStatus.url(args, options),
    method: 'put',
})

updateShiftSwapStatus.definition = {
    methods: ["put"],
    url: '/admin/shift-swaps/{shiftSwap}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Web\AdminController::updateShiftSwapStatus
 * @see app/Http/Controllers/Web/AdminController.php:806
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
updateShiftSwapStatus.url = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shiftSwap: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shiftSwap: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shiftSwap: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shiftSwap: typeof args.shiftSwap === 'object'
                ? args.shiftSwap.id
                : args.shiftSwap,
                }

    return updateShiftSwapStatus.definition.url
            .replace('{shiftSwap}', parsedArgs.shiftSwap.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::updateShiftSwapStatus
 * @see app/Http/Controllers/Web/AdminController.php:806
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
updateShiftSwapStatus.put = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateShiftSwapStatus.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::updateShiftSwapStatus
 * @see app/Http/Controllers/Web/AdminController.php:806
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
    const updateShiftSwapStatusForm = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateShiftSwapStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::updateShiftSwapStatus
 * @see app/Http/Controllers/Web/AdminController.php:806
 * @route '/admin/shift-swaps/{shiftSwap}'
 */
        updateShiftSwapStatusForm.put = (args: { shiftSwap: number | { id: number } } | [shiftSwap: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateShiftSwapStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateShiftSwapStatus.form = updateShiftSwapStatusForm
/**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:821
 * @route '/admin/audit-logs'
 */
export const auditLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})

auditLogs.definition = {
    methods: ["get","head"],
    url: '/admin/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:821
 * @route '/admin/audit-logs'
 */
auditLogs.url = (options?: RouteQueryOptions) => {
    return auditLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:821
 * @route '/admin/audit-logs'
 */
auditLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:821
 * @route '/admin/audit-logs'
 */
auditLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auditLogs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:821
 * @route '/admin/audit-logs'
 */
    const auditLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: auditLogs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:821
 * @route '/admin/audit-logs'
 */
        auditLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auditLogs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::auditLogs
 * @see app/Http/Controllers/Web/AdminController.php:821
 * @route '/admin/audit-logs'
 */
        auditLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auditLogs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    auditLogs.form = auditLogsForm
/**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:914
 * @route '/admin/settings'
 */
export const settings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})

settings.definition = {
    methods: ["get","head"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:914
 * @route '/admin/settings'
 */
settings.url = (options?: RouteQueryOptions) => {
    return settings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:914
 * @route '/admin/settings'
 */
settings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: settings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:914
 * @route '/admin/settings'
 */
settings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: settings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:914
 * @route '/admin/settings'
 */
    const settingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: settings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:914
 * @route '/admin/settings'
 */
        settingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Web\AdminController::settings
 * @see app/Http/Controllers/Web/AdminController.php:914
 * @route '/admin/settings'
 */
        settingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: settings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    settings.form = settingsForm
/**
* @see \App\Http\Controllers\Web\AdminController::updateSettings
 * @see app/Http/Controllers/Web/AdminController.php:950
 * @route '/admin/settings'
 */
export const updateSettings = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSettings.url(options),
    method: 'post',
})

updateSettings.definition = {
    methods: ["post"],
    url: '/admin/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::updateSettings
 * @see app/Http/Controllers/Web/AdminController.php:950
 * @route '/admin/settings'
 */
updateSettings.url = (options?: RouteQueryOptions) => {
    return updateSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::updateSettings
 * @see app/Http/Controllers/Web/AdminController.php:950
 * @route '/admin/settings'
 */
updateSettings.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateSettings.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::updateSettings
 * @see app/Http/Controllers/Web/AdminController.php:950
 * @route '/admin/settings'
 */
    const updateSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSettings.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::updateSettings
 * @see app/Http/Controllers/Web/AdminController.php:950
 * @route '/admin/settings'
 */
        updateSettingsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSettings.url(options),
            method: 'post',
        })
    
    updateSettings.form = updateSettingsForm
/**
* @see \App\Http\Controllers\Web\AdminController::testSimpegConnection
 * @see app/Http/Controllers/Web/AdminController.php:991
 * @route '/admin/settings/test-simpeg'
 */
export const testSimpegConnection = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testSimpegConnection.url(options),
    method: 'post',
})

testSimpegConnection.definition = {
    methods: ["post"],
    url: '/admin/settings/test-simpeg',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Web\AdminController::testSimpegConnection
 * @see app/Http/Controllers/Web/AdminController.php:991
 * @route '/admin/settings/test-simpeg'
 */
testSimpegConnection.url = (options?: RouteQueryOptions) => {
    return testSimpegConnection.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Web\AdminController::testSimpegConnection
 * @see app/Http/Controllers/Web/AdminController.php:991
 * @route '/admin/settings/test-simpeg'
 */
testSimpegConnection.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testSimpegConnection.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Web\AdminController::testSimpegConnection
 * @see app/Http/Controllers/Web/AdminController.php:991
 * @route '/admin/settings/test-simpeg'
 */
    const testSimpegConnectionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: testSimpegConnection.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Web\AdminController::testSimpegConnection
 * @see app/Http/Controllers/Web/AdminController.php:991
 * @route '/admin/settings/test-simpeg'
 */
        testSimpegConnectionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: testSimpegConnection.url(options),
            method: 'post',
        })
    
    testSimpegConnection.form = testSimpegConnectionForm
const AdminController = { dashboard, offices, storeOffice, updateOffice, destroyOffice, users, storeUser, updateUser, toggleUser, resetDeviceBinding, attendances, exportAttendances, exportTppReport, exportAttendanceRecap, exportAttendanceSummary, verifyQrCode, leaveRequests, updateLeaveRequest, schedules, storeSchedule, updateSchedule, destroySchedule, announcements, storeAnnouncement, destroyAnnouncement, shiftSwaps, updateShiftSwapStatus, auditLogs, settings, updateSettings, testSimpegConnection }

export default AdminController