<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'add leads', 'status'=> 0, 'module'=> 'Inventory']);
        Permission::create(['name' => 'view leads', 'status'=> 1, 'module'=> 'Inventory']);
        Permission::create(['name' => 'edit leads', 'status'=> 0, 'module'=> 'Inventory']);
        Permission::create(['name' => 'remove leads', 'status'=> 1, 'module'=> 'Inventory']);
        Permission::create(['name' => 'add users', 'status'=> 0, 'module'=> 'Users']);
        Permission::create(['name' => 'view users', 'status'=> 1, 'module'=> 'Users']);
        Permission::create(['name' => 'edit users', 'status'=> 0, 'module'=> 'Users']);
        Permission::create(['name' => 'remove users', 'status'=> 1, 'module'=> 'Users']);
        Permission::create(['name' => 'add tickets', 'status'=> 0, 'module'=> 'Tickets']);
        Permission::create(['name' => 'view tickets', 'status'=> 1, 'module'=> 'TIckets']);
        Permission::create(['name' => 'edit tickets', 'status'=> 0, 'module'=> 'TIckets']);
        Permission::create(['name' => 'remove tickets', 'status'=> 1, 'module'=> 'TIckets']);

        // create roles and assign created permissions

        // this can be done as separate statements
        $role = Role::create(['name' => 'user-admin', 'description'=> 'Responsible for user related activities']);
        $role->givePermissionTo('add users', 'view users', 'edit users', 'remove users');

        // or may be done by chaining
        $role = Role::create(['name' => 'ticket-admin', 'description'=> 'Responsible for ticket related activities'])
            ->givePermissionTo(['add tickets', 'view tickets', 'edit tickets', 'remove tickets']);

        $role = Role::create(['name' => 'inventory-admin', 'description'=> 'Responsible for inventory related activities']);
        $role->givePermissionTo('add leads', 'view leads', 'edit leads', 'remove leads');

        $role = Role::create(['name' => 'super-admin', 'description'=> 'Responsible for assigning permissions and roles']);
        $role->givePermissionTo(Permission::all());
    }
}
