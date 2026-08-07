import {
    queryParams,
    type RouteQueryOptions,
    type RouteDefinition,
    type RouteFormDefinition,
} from './../wayfinder';
/**
 * @see routes/web.php:19
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
});

login.definition = {
    methods: ['get', 'head'],
    url: '/login',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see routes/web.php:19
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options);
};

/**
 * @see routes/web.php:19
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
});
/**
 * @see routes/web.php:19
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
});

/**
 * @see routes/web.php:19
 * @route '/login'
 */
const loginForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
});

/**
 * @see routes/web.php:19
 * @route '/login'
 */
loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url(options),
    method: 'get',
});
/**
 * @see routes/web.php:19
 * @route '/login'
 */
loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: login.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

login.form = loginForm;
/**
 * @see routes/web.php:50
 * @route '/logout'
 */
export const logout = (
    options?: RouteQueryOptions,
): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
});

logout.definition = {
    methods: ['post'],
    url: '/logout',
} satisfies RouteDefinition<['post']>;

/**
 * @see routes/web.php:50
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options);
};

/**
 * @see routes/web.php:50
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
});

/**
 * @see routes/web.php:50
 * @route '/logout'
 */
const logoutForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
});

/**
 * @see routes/web.php:50
 * @route '/logout'
 */
logoutForm.post = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'post'> => ({
    action: logout.url(options),
    method: 'post',
});

logout.form = logoutForm;
/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
export const register = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
});

register.definition = {
    methods: ['get', 'head'],
    url: '/register',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options);
};

/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
});
/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
});

/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
const registerForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
});

/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
registerForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: register.url(options),
    method: 'get',
});
/**
 * @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::register
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route '/register'
 */
registerForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: register.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

register.form = registerForm;
/**
 * @see \App\Http\Controllers\Web\DashboardController::dashboard
 * @see app/Http/Controllers/Web/DashboardController.php:13
 * @route '/dashboard'
 */
export const dashboard = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
});

dashboard.definition = {
    methods: ['get', 'head'],
    url: '/dashboard',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\DashboardController::dashboard
 * @see app/Http/Controllers/Web/DashboardController.php:13
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\DashboardController::dashboard
 * @see app/Http/Controllers/Web/DashboardController.php:13
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\DashboardController::dashboard
 * @see app/Http/Controllers/Web/DashboardController.php:13
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\DashboardController::dashboard
 * @see app/Http/Controllers/Web/DashboardController.php:13
 * @route '/dashboard'
 */
const dashboardForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\DashboardController::dashboard
 * @see app/Http/Controllers/Web/DashboardController.php:13
 * @route '/dashboard'
 */
dashboardForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\DashboardController::dashboard
 * @see app/Http/Controllers/Web/DashboardController.php:13
 * @route '/dashboard'
 */
dashboardForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

dashboard.form = dashboardForm;
/**
 * @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
export const riwayat = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
});

riwayat.definition = {
    methods: ['get', 'head'],
    url: '/riwayat',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
riwayat.url = (options?: RouteQueryOptions) => {
    return riwayat.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
riwayat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: riwayat.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
riwayat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: riwayat.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
const riwayatForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: riwayat.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
riwayatForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: riwayat.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AttendanceController::riwayat
 * @see app/Http/Controllers/Web/AttendanceController.php:20
 * @route '/riwayat'
 */
riwayatForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: riwayat.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

riwayat.form = riwayatForm;
/**
 * @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
export const statistik = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: statistik.url(options),
    method: 'get',
});

statistik.definition = {
    methods: ['get', 'head'],
    url: '/statistik',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
statistik.url = (options?: RouteQueryOptions) => {
    return statistik.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
statistik.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistik.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
statistik.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistik.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
const statistikForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: statistik.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
statistikForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: statistik.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AttendanceController::statistik
 * @see app/Http/Controllers/Web/AttendanceController.php:63
 * @route '/statistik'
 */
statistikForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: statistik.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

statistik.form = statistikForm;
/**
 * @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
export const peringkat = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: peringkat.url(options),
    method: 'get',
});

peringkat.definition = {
    methods: ['get', 'head'],
    url: '/peringkat',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
peringkat.url = (options?: RouteQueryOptions) => {
    return peringkat.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
peringkat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: peringkat.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
peringkat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: peringkat.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
const peringkatForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: peringkat.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
peringkatForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: peringkat.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Web\AttendanceController::peringkat
 * @see app/Http/Controllers/Web/AttendanceController.php:138
 * @route '/peringkat'
 */
peringkatForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: peringkat.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

peringkat.form = peringkatForm;
/**
 * @see routes/web.php:65
 * @route '/presensi'
 */
export const presensi = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: presensi.url(options),
    method: 'get',
});

presensi.definition = {
    methods: ['get', 'head'],
    url: '/presensi',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see routes/web.php:65
 * @route '/presensi'
 */
presensi.url = (options?: RouteQueryOptions) => {
    return presensi.definition.url + queryParams(options);
};

/**
 * @see routes/web.php:65
 * @route '/presensi'
 */
presensi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: presensi.url(options),
    method: 'get',
});
/**
 * @see routes/web.php:65
 * @route '/presensi'
 */
presensi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: presensi.url(options),
    method: 'head',
});

/**
 * @see routes/web.php:65
 * @route '/presensi'
 */
const presensiForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: presensi.url(options),
    method: 'get',
});

/**
 * @see routes/web.php:65
 * @route '/presensi'
 */
presensiForm.get = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: presensi.url(options),
    method: 'get',
});
/**
 * @see routes/web.php:65
 * @route '/presensi'
 */
presensiForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: presensi.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

presensi.form = presensiForm;
/**
 * @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
export const profil = (
    options?: RouteQueryOptions,
): RouteDefinition<'get'> => ({
    url: profil.url(options),
    method: 'get',
});

profil.definition = {
    methods: ['get', 'head'],
    url: '/profil',
} satisfies RouteDefinition<['get', 'head']>;

/**
 * @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
profil.url = (options?: RouteQueryOptions) => {
    return profil.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
profil.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: profil.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
profil.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: profil.url(options),
    method: 'head',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
const profilForm = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: profil.url(options),
    method: 'get',
});

/**
 * @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
profilForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: profil.url(options),
    method: 'get',
});
/**
 * @see \App\Http\Controllers\Settings\ProfileController::profil
 * @see app/Http/Controllers/Settings/ProfileController.php:0
 * @route '/profil'
 */
profilForm.head = (
    options?: RouteQueryOptions,
): RouteFormDefinition<'get'> => ({
    action: profil.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        },
    }),
    method: 'get',
});

profil.form = profilForm;
