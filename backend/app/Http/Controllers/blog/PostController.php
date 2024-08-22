<?php

namespace App\Http\Controllers\blog;

use App\Models\Tag;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $posts = Post::with('user')->paginate(2);

            $postsWithImagesAndUsers = $posts->getCollection()->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    "quote" => $post->quote,
                    'user_name' => $post->user->first_name,
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    "created_at" => $post->created_at
                ];
            });

            $posts->setCollection($postsWithImagesAndUsers);

            return $posts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function adminPosts()
    {
        try {
            $posts = Post::with('user')->get();
    
            $postsWithImagesAndUsers = $posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'quote' => $post->quote,
                    'user_name' => $post->user->first_name,
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    'is_commentable' => $post->is_commentable,
                    'created_at' => $post->created_at,
                ];
            });
    
            return $postsWithImagesAndUsers;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function getAllPosts()
    {
        try {
            $posts = Post::with('user')->get();
            $postsWithImages = [];
    
            foreach ($posts as $post) {
                $postData = $post->toArray();
                $postData['image_url'] = $post->image ? asset('images/' . $post->image) : null;
                $postsWithImages[] = $postData;
            }
    
            return response()->json(['posts' => $postsWithImages], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $user = request()->user();
            $request->validate([
                'title' => 'required|string',
                'body' => 'required|string',
                'quote' => 'nullable|string',
                'category_id' => 'required',
                'tag_id'=> 'required',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048'

            ]);

            $post = new Post();
            $post->title = $request->input('title');
            $post->body = $request->input('body');
            $post->user_id = $user->id;
            $post->quote = $request->input('quote');
            $post->business_types = $user->businessTypes;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('images'), $imageName);
                $post->image = $imageName;
            }

            $post->save();

            // Attach categories to the post
            $categoryIds = json_decode($request->input('category_id',true));
            $post->categories()->attach($categoryIds);

            // Attach tags to the post
            $tagIds = json_decode($request->input('tag_id'));
            $post->tags()->attach($tagIds);


            return response()->json(['message' => 'Post created successfully', 'post' => $post], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Failed to create post: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $post = Post::findOrFail($id);
            return response()->json($post, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Post not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function relatedPosts($postId)
    {
        try {
            $post = Post::findOrFail($postId);
            $relatedPosts = Post::where('title', 'like', '%' . $post->title . '%')
                ->where('id', '!=', $postId)
                ->paginate(2);

            $relatedPostsWithDetails = $relatedPosts->getCollection()->map(function ($relatedPost) {
                return [
                    'id' => $relatedPost->id,
                    'title' => $relatedPost->title,
                    'body' => $relatedPost->body,
                    'user_name' => $relatedPost->user->name,
                    'image_url' => $relatedPost->image ? asset('images/' . $relatedPost->image) : null,
                    "created_at" => $relatedPost->created_at,
                    "quote" => $relatedPost->quote
                ];
            });

            $relatedPosts->setCollection($relatedPostsWithDetails);

            return $relatedPosts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function searchPosts(Request $request)
    {
        try {
            $keyword = $request->input('keyword');

            $posts = Post::where(function ($query) use ($keyword) {
                $query->where('title', 'like', '%' . $keyword . '%')
                    ->orWhere('body', 'like', '%' . $keyword . '%');
            })->paginate(2);

            return $posts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function searchByCategory($categoryId)
    {
        try {
            $category = Category::findOrFail($categoryId);
            $category->load('posts.user'); // Eager loading the user data for the posts

            $posts = $category->posts()->paginate(2);

            $postsWithDetails = $posts->getCollection()->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'user_name' => $post->user->name,
                    'image_url' => $post->image ? asset('images/' . substr($post->image, strpos($post->image, '_') + 1)) : null,
                    "created_at" => $post->created_at,
                    "quote" => $post->quote
                ];
            });

            $posts->setCollection($postsWithDetails);

            return $posts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function searchByTag($tagId)
    {
        try {
            $tag = Tag::findOrFail($tagId);
            $posts = $tag->posts()->with('user')->paginate(2);

            $postsWithDetails = $posts->getCollection()->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'body' => $post->body,
                    'user_name' => $post->user->name,
                    'image_url' => $post->image ? asset('images/' . $post->image) : null,
                    "created_at" => $post->created_at,
                    "quote" => $post->quote
                ];
            });

            $posts->setCollection($postsWithDetails);

            return $posts;
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function postComment(Request $request, $postId)
    {
        try {
            $request->validate([
                'body' => 'required|string',
            ]);

            $post = Post::findOrFail($postId);

            $comment = new Comment();
            $comment->body = $request->input('body');
            $comment->user_id = request()->user()->id;

            $comment->order = $post->comments()->count() + 1;

            $post->comments()->save($comment);

            return response()->json(['message' => 'Comment posted successfully', 'comment' => $comment], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
}
