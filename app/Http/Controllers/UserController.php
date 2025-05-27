<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateReq;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function UserPage() {
        return Inertia::render('UserPage');
    }
    
    public function index(Request $request): JsonResponse
    {
        $user = User::all();

        if ($user->count() < 1) {
            return response()->json([
                'status' => 404,
                'message' => 'Data not found in collection!'
            ])->setStatusCode(404);
        }

        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => UserResource::collection($user)
        ])->setStatusCode(200);
    }

    public function show(int $id): JsonResponse
    {
        $user = User::where('id_user', $id)->first();

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found!'
            ])->setStatusCode(404);
        }

        return response()->json([
            'status' => 200,
            'message' => '',
            'data' => new UserResource($user)
        ])->setStatusCode(200);
    }

    public function store(UserCreateReq $request): JsonResponse {
        $data = $request->validated();

        if(User::where('email', $data['email'])->count() > 0){
            return response()->json([
                'status' => 422,
                'message' => 'Email already exist!'
            ])->setStatusCode(422);
        }

        $user = new User($data);
        $user->password = Hash::make($data['password']);
        $user->save();

        return response()->json([
            'status' => 201,
            'message' => 'User has been created!',
            'data' => new UserResource($user)
        ])->setStatusCode(201);
    }

    public function update(int $id, UserCreateReq $request): JsonResponse {
        $data = $request->validated();
        $user = User::where('id_user', $id)->first();

        if(!$user){
            return response()->json([
                'success' => false,
                'message' => "User with id {$id} doesn't exist!"
            ]);
        }

        $user->password = Hash::make($data['password']);
        $user->fill($data);
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User has been updated!',
            'data' => new UserResource($user)
        ])->setStatusCode(200);
    }

    public function destroy(int $id): JsonResponse {
        $user = User::where('id_user', $id)->first();

        if(!$user){
            return response()->json([
                'success' => false,
                'message' => "User with id {$id} doesn't exist!"
            ]);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'User has been deleted!'
        ])->setStatusCode(200);
    }
}
