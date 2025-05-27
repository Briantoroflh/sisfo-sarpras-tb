<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetailBorrowReq;
use App\Http\Resources\BorrowedRes;
use App\Http\Resources\DetailBorrowRes;
use App\Models\Borrowed;
use App\Models\DetailsBorrow;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BorrowedController extends Controller
{
    public function BorrowedPage()
    {
        return Inertia::render('BorrowedPage');
    }

    public function index(): JsonResponse
    {
        $borrowed = Borrowed::with(['detailsBorrow', 'user'])->where('soft_delete', 0)->get();

        if ($borrowed->count() < 1) {
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }

        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => BorrowedRes::collection($borrowed)
        ])->setStatusCode(200);
    }

    public function show($id): JsonResponse
    {
        $borrowed = Borrowed::with(['detailsBorrow', 'user'])->where('id_borrowed', $id)->first();

        if (!$borrowed) {
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }

        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => new BorrowedRes($borrowed)
        ])->setStatusCode(200);
    }

    public function store(DetailBorrowReq $request)
    {
       $details = DetailsBorrow::create($request->validated());

       $user = Auth::user();

       Borrowed::create([
            'id_user' => $user->id_user,
            'id_details_borrow' => $details->id_details_borrow,
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Borrow success added!',
            'data' => new DetailBorrowRes($details)
        ])->setStatusCode(201);
    }

    public function approve($id): JsonResponse {
        $borrowed = Borrowed::find($id);

        if (!$borrowed) {
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }

        $borrowed->update(['status' => 'approved']);

        return response()->json([
            'status' => 200,
            'message' => 'Data approved by admin!',
        ])->setStatusCode(200);
    }

    public function reject($id): JsonResponse {
        $borrowed = Borrowed::find($id);

        if (!$borrowed) {
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }

        $borrowed->update(['status' => 'not approved', 'soft_delete' => 1]);

        return response()->json([
            'status' => 200,
            'message' => 'Data rejected by admin!',
        ])->setStatusCode(200);
    }
}
