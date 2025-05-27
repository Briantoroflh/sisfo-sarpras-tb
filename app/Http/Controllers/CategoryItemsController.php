<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryReq;
use App\Http\Resources\CategoryItemRes;
use App\Models\CategoryItems;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryItemsController extends Controller
{
    public function CategoryPage()
    {
        return Inertia::render('CategoryPage');
    }

    public function getAllCategory(): JsonResponse 
    {
        $items = CategoryItems::with('items')->get();

        if($items->count() < 1){
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }
        
        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => CategoryItemRes::collection($items)
        ])->setStatusCode(200);
    }

    public function getCategoryById($id): JsonResponse 
    {
        $items = CategoryItems::with('items')->where('id_category', $id)->first();

        if(!$items){
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }
        
        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => new CategoryItemRes($items)
        ])->setStatusCode(200);
    }

    public function store(CategoryReq $request): JsonResponse 
    {
        $category = CategoryItems::create($request->validated());

        return response()->json([
            'status' => 201,
            'message' => 'Category created successfully!',
            'data' => new CategoryItemRes($category)
        ])->setStatusCode(201);
    }

    public function update(CategoryReq $request, $id): JsonResponse 
    {
       $req = $request->validated();

        $category = CategoryItems::find($id);

        if(!$category){
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }

        $category->update($req);

        return response()->json([
            'status' => 200,
            'message' => 'Category updated successfully!',
            'data' => new CategoryItemRes($category)
        ])->setStatusCode(200);
    }

    public function destroy($id): JsonResponse 
    {
        $category = CategoryItems::find($id);

        if(!$category){
            return response()->json([
                'status' => 404,
                'message' => "Data with id {$id} not found in collection!"
            ])->setStatusCode(404);
        }

        $category->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully!'
        ])->setStatusCode(200);

    }
}
