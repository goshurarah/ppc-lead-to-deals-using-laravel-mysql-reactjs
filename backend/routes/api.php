<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\blog\TagController;
use App\Http\Controllers\user\FaqController;
use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\blog\PostController;
use App\Http\Controllers\blog\CommentController;
use App\Http\Controllers\blog\CategoryController;
use App\Http\Controllers\dashboard\CrmController;
use App\Http\Controllers\dashboard\RoleController;
use App\Http\Controllers\payment\StripeController;
use App\Http\Controllers\user\UserReviewController;
use App\Http\Controllers\dashboard\CountyController;
use App\Http\Controllers\dashboard\ModuleController;
use App\Http\Controllers\dashboard\TicketController;
use App\Http\Controllers\dashboard\MessageController;
use App\Http\Controllers\dashboard\PackageController;
use App\Http\Controllers\dashboard\PaymentController;
use App\Http\Controllers\dashboard\ProfileController;
use App\Http\Controllers\dashboard\MainMenuController;
use App\Http\Controllers\dashboard\DashboardController;
use App\Http\Controllers\dashboard\PermissionController;
use App\Http\Controllers\dashboard\AppointmentController;
use App\Http\Controllers\dashboard\IntegrationController;
use App\Http\Controllers\dashboard\SubscriptionController;
use App\Http\Controllers\dashboard\PurchasedLeadsController;
use App\Http\Controllers\dashboard\AdvancedLeadSettingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/contact_us', [ContactController::class, 'contactUs']);

Route::middleware(['storeApiRequest', 'cors', 'count.requests'])->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
    Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);
    Route::get('get-user-residence', [AuthController::class, 'getUserResidence']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
    Route::post('send-phone-verification-code', [AuthController::class, 'sendPhoneVerificationCode']);
    Route::post('verify-phone', [AuthController::class, 'verifyPhone']);
    Route::post('verify-email', [AuthController::class, 'verifyEmail']);
    Route::get('get-states', [AuthController::class, 'getStates']);
    Route::get('get-cities', [AuthController::class, 'getCities']);
    Route::get('get-counties', [AuthController::class, 'getCounties']);
    Route::get('get-counties-dropdown', [MainMenuController::class, 'getCountiesDropdown']);
    Route::get('get-cities-dropdown', [MainMenuController::class, 'getcitiesDropdown']);
    Route::get('get-business_types', [AuthController::class, 'getBusinessTypes']);
    Route::post('add-user-business-types', [AuthController::class, 'addUserBusinessTypes']);
    Route::post('add-user-states', [AuthController::class, 'addUserStates']);
    Route::post('add-user-counties', [AuthController::class, 'addUserCounties']);
    Route::post('add-user-cities', [AuthController::class, 'addUserCities']);
});

Route::prefix('user')->middleware('cors', 'count.requests')->group(function () {
    Route::get('get-reviews', [UserReviewController::class, 'getReviews']);
    Route::get('get-faqs', [FaqController::class, 'getFaqs']);
});

Route::prefix('auth')->middleware(['storeApiRequest', 'cors', 'auth:api', 'count.requests'])->group(function () {

    Route::get('get-user-residence', [AuthController::class, 'getUserResidence']);

});

Route::prefix('dashboard')->middleware(['storeApiRequest', 'cors', 'auth:api', 'count.requests'])->group(function () {
    Route::get('get-counties-dropdown-main-menu', [MainMenuController::class, 'getCountiesDropdownMainMenu']);
    Route::get('get-cities-dropdown-main-menu', [MainMenuController::class, 'getCitiesDropdownMainMenu']);
    Route::get('get-all-sellers', [MainMenuController::class, 'getAllSellers']);
    Route::get('get-leads', [MainMenuController::class, 'getLeads']);
    Route::post('create-purchased-leads', [PurchasedLeadsController::class, 'store']);
    Route::get('get-purchased-leads', [PurchasedLeadsController::class, 'index']);
    Route::get('get-side-menu-modules', [DashboardController::class, 'getSideMenuModules']);
    Route::resource('roles', RoleController::class);
    Route::post('add-role', [RoleController::class, 'store']);
    Route::get('get-roles', [RoleController::class, 'getAllRoles']);
    Route::get('get-user-roles', [RoleController::class, 'getUserRoles']);
    Route::post('assign-role-to-user', [RoleController::class, 'assignRoleToUser']);
    Route::resource('permissions', PermissionController::class);
    Route::post('assign-permissions-to-role', [PermissionController::class, 'assignPermissionsToRole']);
    Route::get('/get-role-permissions', [PermissionController::class, 'getRolePermissions']);
    Route::get('get-crm-data', [CrmController::class, 'getCrmData']);
    Route::post('make-payment', [StripeController::class, 'makePayment']);
    Route::post('tickets', [TicketController::class, 'create']);
    Route::post('/tickets/{ticket_id}/messages', [MessageController::class, 'create']);
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::get('integrations', [IntegrationController::class, 'index']);
    Route::post('integrations', [IntegrationController::class, 'create']);
    Route::post('test-integration', [IntegrationController::class, 'integrationTest']);
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::get('/user-profile', [AuthController::class, 'getUserProfile']);
    Route::get('/user-info', [AuthController::class, 'getUserInfo']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post('/payment/add-card', [PaymentController::class, 'addCard']);
    Route::delete('/payment/delete-card/{id}', [PaymentController::class, 'destroy']);
    Route::get('/payment/get-cards', [PaymentController::class, 'getCards']);
    Route::post('/subscriptions', [SubscriptionController::class, 'create']);
    Route::get('/get-all-packages', [PackageController::class, 'index']);
    Route::get('get-user-cities', [AuthController::class, 'getUserCities']);
    Route::get('get-user-counties', [AuthController::class, 'getUserCounties']);
    Route::get('get-user-states', [AuthController::class, 'getUserStates']);
    Route::get('/ticket-admin/get-all-usernames', [TicketController::class, 'getAllUserNames']);
    Route::get('/ticket-admin/tickets', [TicketController::class, 'getAdminTickets']);
    Route::post('/create-appointment', [AppointmentController::class, 'createAppointment']);
    Route::post('/advanced-lead-settings', [AdvancedLeadSettingsController::class, 'createAdvancedLead']);
    Route::get('/get-advanced-lead-settings', [AdvancedLeadSettingsController::class, 'getAdvancedLeadSettings']);
    Route::post('/advanced-lead-settings/state/counties', [AdvancedLeadSettingsController::class, 'addStateCounties']);
    Route::put('/advanced-lead-settings/state/{id}/counties', [AdvancedLeadSettingsController::class, 'updateStateCounties']);
    Route::get('/advanced-lead-settings/state/counties', [AdvancedLeadSettingsController::class, 'getStateCounties']);
    Route::delete('advanced-lead-settings/state/counties/{id}', [AdvancedLeadSettingsController::class, 'deleteStateCounties']);
    Route::delete('advanced-lead-settings/state/counties', [AdvancedLeadSettingsController::class, 'deleteAllStateCounties']);
    Route::post('/save-filter', [MainMenuController::class, 'saveFilter']);
    Route::get('/get-saved-filters', [MainMenuController::class, 'getSavedFilters']);
    Route::delete('/delete-saved-filter/{filterId}', [MainMenuController::class, 'deleteSavedFilter']);
    Route::put('/orders/{leadId}/update-reminder', [CrmController::class, 'updateReminder']);
    Route::get('blog/posts/{postId}/comments', [CommentController::class, 'getCommentsAndRepliesByPost']);
  

});

Route::prefix('dashboard')->middleware(['storeApiRequest', 'cors', 'auth:api', 'role:ticket-admin', 'count.requests'])->group(function () {


    Route::get('/ticket-admin/modules', [ModuleController::class, 'getTicketAdminModule']);

    Route::put('/tickets/{id}/update-status', [TicketController::class, 'updateStatus']);


});

Route::prefix('dashboard')->middleware(['storeApiRequest', 'cors', 'auth:api', 'role:user-admin', 'count.requests'])->group(function () {


    Route::get('/user-admin/modules', [ModuleController::class, 'getUserAdminModule']);
    Route::put('/users/{id}/status', [AuthController::class, 'updateUserStatus']);
    Route::put('/users/{id}/integration/status', [AuthController::class, 'updateUserIntegrationStatus']);

});


Route::prefix('dashboard')->middleware(['storeApiRequest', 'cors', 'auth:api', 'role:inventory-admin', 'count.requests'])->group(function () {

    Route::get('/inventory-admin/module', [ModuleController::class, 'getTicketAdminModule']);
    Route::post('create-lead', [MainMenuController::class, 'createLead']);

});

Route::prefix('dashboard')->middleware(['storeApiRequest', 'cors', 'auth:api', 'role:blog-admin', 'count.requests'])->group(function () {

    Route::get('/blog-admin/module', [ModuleController::class, 'getBlogAdminModule']);
    Route::resource('posts', PostController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('tags', TagController::class);

});

Route::prefix('dashboard')->middleware(['storeApiRequest', 'cors', 'auth:api', 'role:super-admin', 'count.requests'])->group(function () {

    Route::get('super-admin/modules', [ModuleController::class, 'getPermissionAdminModule']);
    Route::post('create-lead', [MainMenuController::class, 'createLead']);
    Route::put('/users/{id}/status', [AuthController::class, 'updateUserStatus']);
    Route::put('/users/{id}/integration/status', [AuthController::class, 'updateUserIntegrationStatus']);
    // Route::put('/tickets/{id}/update-status', [TicketController::class, 'updateStatus']);

});

Route::get('/counties', [CountyController::class, 'index']);

Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);





Route::get('/test', [AuthController::class, 'test']);

Route::get('posts/search', [PostController::class, 'searchPosts']);

Route::get('get-posts', [PostController::class, 'getAllPosts']);

Route::get('/categories/{categoryId}/posts', [PostController::class, 'searchByCategory'])
;

Route::get('/tags/{tagId}/posts', [PostController::class, 'searchByTag']);

Route::get('/comments', [CommentController::class, 'index']);

Route::get('/posts/{postId}/comments', [CommentController::class, 'getCommentsAndRepliesByPost']);


Route::middleware('auth:api')->group(function () {

    Route::get('/is-premium-user', [AuthController::class, 'isPremiumUser']);
    
    Route::resource('categories', CategoryController::class);
    Route::resource('tags', TagController::class);
    Route::post('/posts/{postId}/comments', [PostController::class, 'postComment']);
    Route::get('dashboard/blog/posts/{postId}/comments', [CommentController::class, 'getCommentsByPost']);
    Route::delete('dashboard/blog/posts/comments/{commentId}', [CommentController::class, 'deleteComment']);
    Route::post('/posts/{postId}/comments/{commentId}/reply', [CommentController::class, 'replyToComment']);
    Route::put('dashboard/blog/comments/{commentId}/update-approval-status', [CommentController::class, 'updateApprovalStatus']);
    Route::put('dashboard/blog/posts/{postId}/update-comments-status', [CommentController::class, 'isCommentable']);
    Route::put('/dashboard/blog/comments/replies/{reply}', [CommentController::class, 'updateApproval']);
});

Route::get('posts', [PostController::class, 'index']);
Route::get('dashboard/blog-admin/posts', [PostController::class, 'adminPosts']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('tags', [TagController::class, 'index']);
Route::get('posts/{id}/related-posts', [PostController::class, 'relatedPosts']);
Route::get('/user-count', [AuthController::class, 'getUserCount']);
Route::get('/lead-count', [MainMenuController::class, 'getLeadCount']);



