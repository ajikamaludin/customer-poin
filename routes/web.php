<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerPointController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/', [HomeController::class, 'check']);

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'index'])->name('dashboard');
    Route::get('/maintance', [GeneralController::class, 'maintance'])->name('maintance');

    // User
    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::post('/users', [UserController::class, 'store'])->name('user.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('user.destroy');

    // Role
    Route::resource('/roles', RoleController::class);

    // Setting
    Route::get('/setting', [SettingController::class, 'index'])->name('setting.index');
    Route::post('/setting', [SettingController::class, 'update'])->name('setting.update');

    // Customer
    Route::get('/customers', [CustomerController::class, 'index'])->name('customer.index');
    Route::post('/customers/import', [CustomerController::class, 'import'])->name('customer.import');
    Route::get('/customers/event', [CustomerController::class, 'event'])->name('customer.event');
    Route::post('/customers', [CustomerController::class, 'store'])->name('customer.store');
    Route::put('/customers/{customer}', [CustomerController::class, 'update'])->name('customer.update');
    Route::delete('/customers/{customer}', [CustomerController::class, 'destroy'])->name('customer.destroy');

    // Customer Point
    Route::get('/customers-points', [CustomerPointController::class, 'index'])->name('customer-point.index');
    Route::post('/customers-points/import', [CustomerPointController::class, 'import'])->name('customer-point.import');
    Route::post('/customers-points', [CustomerPointController::class, 'store'])->name('customer-point.store');
    Route::put('/customers-points/{customer}', [CustomerPointController::class, 'update'])->name('customer-point.update');
    Route::delete('/customers-points/{customer}', [CustomerPointController::class, 'destroy'])->name('customer-point.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
