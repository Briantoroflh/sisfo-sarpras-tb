<?php

namespace App\Http\Controllers;

use App\Http\Resources\LogActivityRes;
use App\Models\Borrowed;
use App\Models\CategoryItems;
use App\Models\DetailReturns;
use App\Models\Items;
use App\Models\LogActivity;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DahsboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function Dashboard(): JsonResponse {
        $users = User::count();
        $categories = CategoryItems::count();
        $borrowed = Borrowed::count();
        $returnItems = DetailReturns::count();
        $log = LogActivity::with('user')->get();
        $items = Items::count();

        return response()->json([
            'status' => 200,
            'message' => '',
            'sum' => [
                'sum_users' => $users,
                'sum_categories' => $categories,
                'sum_borrowed' => $borrowed,
                'sum_return' => $returnItems,
                'sum_items' => $items
            ],
            'log' => LogActivityRes::collection($log)
        ])->setStatusCode(200);
    }
}
