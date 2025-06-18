<?php

namespace App\Providers;

use App\Models\Borrowed;
use App\Models\DetailReturns;
use App\Models\DetailsBorrow;
use App\Models\User;
use App\Observers\DetailBorrowObserver;
use App\Observers\DetailReturnObserver;
use App\Observers\PeminjamanObserver;
use App\Observers\UserActivityObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Borrowed::observe(PeminjamanObserver::class);
        User::observe(UserActivityObserver::class);
        DetailsBorrow::observe(DetailBorrowObserver::class);
        DetailReturns::observe(DetailReturnObserver::class);
    }
}
