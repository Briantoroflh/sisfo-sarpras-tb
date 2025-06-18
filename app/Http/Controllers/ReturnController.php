<?php

namespace App\Http\Controllers;

use App\Http\Requests\DetailReturnReq;
use App\Http\Resources\ReturnRes;
use App\Models\Borrowed;
use App\Models\DetailReturns;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReturnController extends Controller
{
    public function ReturnPage()
    {
        return Inertia::render('ReturnPage');
    }

    public function getAllReturn(): JsonResponse
    {
        $return = DetailReturns::with('borrowed')->get();

        if ($return->count() < 1) {
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!',
            ])->setStatusCode(404);
        }

        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => ReturnRes::collection($return)
        ])->setStatusCode(200);
    }

    public function getReturnById($id): JsonResponse
    {
        $return = DetailReturns::where('id_detail_return', $id)->first();

        if (!$return) {
            return response()->json([
                'status' => 404,
                'message' => `Data with id $id not found in collection!`,
            ])->setStatusCode(404);
        }

        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => new ReturnRes($return)
        ], 200);
    }

    public function getReturnByUserId($id): JsonResponse {
        $borrowed = Borrowed::find($id);
        if(!$borrowed){
            return response()->json([
                'message' => "Borrow with id $id doesn't exist!"
            ], 404);
        }
        $return = DetailReturns::where('id_borrowed', $borrowed->id_borrowed)->get();

        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => ReturnRes::collection($return)
        ]);
    }

    public function store(DetailReturnReq $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('return_image')) {
            $data['return_image'] = $request->file('return_image')->store('images', 'public');
        }

        $return = DetailReturns::create([
            'id_borrowed' => $data['id_borrowed'],
            'return_image' => $data['return_image'],
            'description' => $data['description'],
            'date_return' => $data['date_return']
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Pengembalian berhasil!',
            'data' => new ReturnRes($return)
        ],201);
    }

    public function approve($id): JsonResponse
    {
        $return = DetailReturns::find($id);

        if (!$return) {
            return response()->json([
                'status' => 404,
                'message' => `Data with id $id not found in collection!`
            ])->setStatusCode(404);
        }

        $return->update(['status' => 'approved']);

        return response()->json([
            'status' => 200,
            'message' => 'Data approved by admin!'
        ])->setStatusCode(200);
    }

    public function reject($id): JsonResponse
    {
        $return = DetailReturns::find($id);

        if (!$return) {
            return response()->json([
                'status' => 404,
                'message' => `Data with id $id not found in collection!`
            ])->setStatusCode(404);
        }

        $return->udpate([
            'status' => 'not approved'
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Data rejected by admin!'
        ])->setStatusCode(200);
    }
}
