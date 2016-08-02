<?php

namespace marvinosswald\OnpageCMS\Services\Block;


use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Request;
use marvinosswald\OnpageCMS\Services\CMS;

/**
 * Class Text
 * @package marvinosswald\OnpageCMS\Services\Block
 */
class Text extends Block{
    /**
     * @param $block
     * @param $args
     * @return string
     */
    public function __call($block,$args)
    {
        $content = $block;
        if ($resolved = $this->find($block)){
            $content = $resolved;
        }
        return "<cms id='cms-".$this->cms->lang."-".$this->cms->path."-".$block."'>".$content."</cms>";
    }
}