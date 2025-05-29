<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginReq;
use App\Http\Requests\UserRegisterReq;
use App\Http\Resources\TokenRes;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{

    public function index()
    {
        return Inertia::render('Login');
    }

    public function Login(UserLoginReq $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $user = User::where('email', $data['email'])->first();

            // mengecek apakah data ada di database
            if (!$user || !Hash::check($data['password'], $user->password)) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Your email or password wrong!'
                ])->setStatusCode(404);
            }

            //membuat token laravel sanctum untuk login
            $token = $user->createToken('credential_token')->plainTextToken;

            return response()->json([
                'status' => 200,
                'message' => 'Login success!',
                'token' => $token,
                'token_type' => 'Bearer',
                'data' => (new UserResource($user))
            ])->setStatusCode(200);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Login failed!',
                'error' => $e->getMessage()
            ])->setStatusCode(500);
        }
    }

    public function Me(): JsonResponse
    {
        $user = Auth::user();
        return response()->json([
            'success' => false,
            'message' => '',
            'data' => new UserResource($user)
        ]);
    }

    public function Logout($tokenId): JsonResponse
    {
        $token = PersonalAccessToken::find($tokenId);

        if (!$token) {
            return response()->json([
                'status' => 401,
                'message' => 'Unauthorized!'
            ])->setStatusCode(401);
        }

        $token->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Logout success!'
        ])->setStatusCode(200);
    }

    public function allToken(): JsonResponse
    {
       $token = PersonalAccessToken::all();

       return response()->json([
        'status' => 200,
        'message' => '',
        'data' => TokenRes::collection($token)
       ]);
    }
}
