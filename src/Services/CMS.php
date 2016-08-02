<?php

namespace marvinosswald\OnpageCMS\Services;


use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Request;
use marvinosswald\OnpageCMS\Services\Block\Meta;
use marvinosswald\OnpageCMS\Services\Block\Text;

/**
 * Class CMS
 * @package marvinosswald\OnpageCMS\Services
 */
class CMS {
    /**
     * @var string
     */
    public $lang = 'en';
    /**
     * @var string
     */
    public $path = 'path';
    /**
     * @var array
     */
    public $blocks = [];
    /**
     * CMS constructor.
     */
    public function __construct()
    {
        $this->lang = App::getLocale();
        $this->path = str_replace('/','#',Request::path());
        $this->blocks = Block::where('language',$this->lang)->where('path',$this->path)->select('content','block')->get()->keyBy('block')->toArray();


    }
    /**
     * @return Meta
     */
    public function meta()
    {
        return new Meta($this);
    }
    /**
     * @return Text
     */
    public function text()
    {
        return new Text($this);
    }
}