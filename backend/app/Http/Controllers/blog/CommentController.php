<?php

namespace App\Http\Controllers\blog;

use App\Models\Post;
use App\Models\Comment;
use App\Models\Reply;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $comments = Comment::with('user')->get();

            return response()->json(['comments' => $comments], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }


    public function getCommentsAndRepliesByPost($postId)
    {
        try {
            $post = Post::findOrFail($postId);
            $comments = $post->comments()->with('user', 'replies.user')->orderBy('created_at')->get();
    
            // Transform replies to include order
            $comments->transform(function ($comment) {
                $comment->replies = $comment->replies->sortBy('order');
                return $comment;
            });
    
            // Sort comments by 'order'
            $comments = $comments->sortBy('order');
    
            return response()->json(['comments' => $comments], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
    

    public function getCommentsByPost($postId)
    {
        try {
            $post = Post::findOrFail($postId);
            $comments = $post->comments()->with('user')->get();

            return response()->success($comments, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function updateApprovalStatus(Request $request, $commentId)
    {
        try {
            $comment = Comment::findOrFail($commentId);

            $comment->update([
                'is_approved' => $request->input('is_approved'),
            ]);

            return response()->json(['message' => 'Approval status updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function isCommentable(Request $request, $postId)
    {
        try {
            $post = Post::findOrFail($postId);

            $post->update([
                'is_commentable' => $request->input('is_commentable'),
            ]);

            return response()->json(['message' => 'Comments status updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function updateApproval(Request $request, Reply $reply)
    {
        // Validate the request data if needed

        // Update the is_approved field
        $reply->update(['is_approved' => $request->input('is_approved')]);

        return response()->json(['message' => 'Reply approval status updated successfully'], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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

    public function replyToComment(Request $request, $postId, $commentId)
    {
       
        try {
            $post = Post::findOrFail($postId);
            $comment = Comment::findOrFail($commentId);

            // Validate request data as needed

            $reply = new Reply(); // Use the Reply model
            $reply->body = $request->input('body');
            $reply->user_id = Auth::id(); // Assuming you have user authentication
            $reply->parent_id = $comment->id;
            $reply->post_id = $post->id;
            $reply->order = $comment->replies()->count() + 1;
            $reply->save();

            return response()->json(['message' => 'Reply added successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function deleteComment($commentId)
    {
        try {
            $comment = Comment::findOrFail($commentId);
            $comment->delete();

            return response()->json(['message' => 'Comment deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
}
