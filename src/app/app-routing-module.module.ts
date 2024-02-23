import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { UserQueryDataComponent } from './pages/user-query-data/user-query-data.component';

const routes: Routes = [
  { path: '', component: RegisterFormComponent  },
  { path: 'userQuery', component: UserQueryDataComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModuleModule {}
