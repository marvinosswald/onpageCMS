<?php

namespace marvinosswald\OnpageCMS\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * Class LaravelSocialmedia
 * @package Marvinosswald
 */
class OnpageCMS extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'OnpageCMS';
    }
}