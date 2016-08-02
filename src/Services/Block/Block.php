<?php

namespace marvinosswald\OnpageCMS\Services\Block;


use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Request;
use marvinosswald\OnpageCMS\Services\CMS;

/**
 * Class Block
 * @package marvinosswald\OnpageCMS\Services\Block
 */
class Block {
    /**
     * @var CMS
     */
    protected $cms;
    /**
     * Block constructor.
     * @param $cms
     */
    public function __construct($cms)
    {
        $this->cms = $cms;
    }
    /**
     * @param $block
     * @return bool
     */
    protected function find($block)
    {
        if (array_key_exists($block,$this->cms->blocks)){
            return $this->cms->blocks[$block]['content'];
        }
        return false;
    }
}