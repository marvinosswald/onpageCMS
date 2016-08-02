<?php

namespace marvinosswald\OnpageCMS\Providers;

use \Illuminate\Support\ServiceProvider;
/**
 * Class SocialmediaServiceProvider
 * @package Marvinosswald\Socialmedia\Providers
 */
class OnpageCMSServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;
    /**
     * Bootstrap the application.
     *
     * @return void
     */
    public function boot()
    {
        $this->publishes([
            __DIR__.'/../../public' => public_path('opcms'),
        ], 'public');
        $this->publishes([
            __DIR__.'/../../resources/database/migrations' => database_path('migrations'),
        ], 'migrations');
    }
    /**
     * Register the package.
     */
    public function register()
    {
        $this->app->bind('OnpageCMS','marvinosswald\OnpageCMS\OnpageCMS');
    }
    /**
     * The services that package provides.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }
}