<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemReq;
use App\Http\Resources\ItemRes;
use App\Models\Items;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function ItemsPage()
    {
        return Inertia::render('ItemsPage');
    }

    public function getAllItems(): JsonResponse 
    {
        $items = Items::with('category')->get();

        if($items->count() < 1){
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }
        
        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => ItemRes::collection($items)
        ])->setStatusCode(200);
    }

    public function getItemById($id): JsonResponse
    {
        $items = Items::with('category')->where('id_item', $id)->first();

        if(!$items){
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }
        
        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => new ItemRes($items)
        ])->setStatusCode(200);
    }

    public function store(ItemReq $request): JsonResponse 
    {
        $data = $request->validated();
        
        if($request->hasFile('item_image')) {
            $data['item_image'] = $request->file('item_image')->store('images', 'public');
        }

        $item = Items::create($data);


        return response()->json([
            'status' => 201,
            'message' => 'Item created successfully!',
            'data' => new ItemRes($item)
        ])->setStatusCode(201);
    }

    public function update(ItemReq $request, $id): JsonResponse
    {
        $req = $request->validated();

        $item = Items::find($id);

        if(!$item){
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }

        if($request->hasFile('item_image')) {
            $req['item_image'] = $request->file('item_image')->store('images', 'public');
        }

        $item->update($req);

        return response()->json([
            'status' => 200,
            'message' => 'Item updated successfully!',
            'data' => new ItemRes($item)
        ])->setStatusCode(200);
    }

    public function destroy($id): JsonResponse 
    {
        $item = Items::find($id);

        if(!$item){
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }

        $item->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Item deleted successfully!'
        ])->setStatusCode(200);
    }
}
