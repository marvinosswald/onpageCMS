<?php

namespace marvinosswald\OnpageCMS\Services;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Block
 * @package marvinosswald\OnpageCMS\Services
 */
class Block extends Model
{
    /**
     * @var string
     */
    protected $table = 'cms';
    /**
     * @var array
     */
    protected $fillable = ['path','block','language','content'];
}
