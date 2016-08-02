<?php

namespace marvinosswald\OnpageCMS\Services\Block;


use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Request;
use marvinosswald\OnpageCMS\Services\CMS;

/**
 * Class Meta
 * @package marvinosswald\OnpageCMS\Services\Block
 */
class Meta extends Block{
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
        return "<meta id='cms-".$this->cms->lang."-".$this->cms->path."-meta-".$block."' class='cms-meta' name='".$block."' content='".$content."'/>";
    }
    /**
     * @return string
     */
    public function title()
    {
        $content = $this->find('MetaTitle');

        return "<title id='cms-".$this->cms->lang."-".$this->cms->path."-meta-title' class='cms-meta' >".$content."</title>";

    }
}