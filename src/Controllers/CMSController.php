<?php

namespace marvinosswald\OnpageCMS\Controllers;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Hash;
use marvinosswald\OnpageCMS\Services\Block;


class CMSController extends Controller
{
    public function updateBlock(Request $request)
    {
        $block = Block::firstOrCreate($request->only(['path','block','language']));
        $block->update(['content' => $request->input('content')]);
        return $request->only(['path','block','language']);
    }
}
