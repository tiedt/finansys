import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
//import toastr from "toastr";
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currecntAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submitingForm: boolean = false;
  category: Category = new Category();


  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }
  submitForm() {
    this.submitingForm = true;
    if (this.currecntAction == "new") {
      this.createCategory();
    } else {
      this.updateCategory();
    }

  }
  private createCategory() {
    const category: Category = Object.assign(new Category, this.categoryForm.value);
    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSucess(category),
        error => this.actionForError(error)
      )
  }
  actionForError(error: any): void {
    //  toastr.error("Ocorreu um erro ao processar sua solicitação!");
    this.submitingForm = false;
    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o Servidor, por favor tente novamente mais tarde"]
  }
  actionsForSucess(category: Category) {
    //  toastr.success("Solicitação processada com sucesso!");
    this.router.navigateByUrl("categories", { skipLocationChange: true }).then(
      () => this.router.navigate(["categories", category.id, "id"])
    )
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category, this.categoryForm.value);

    this.categoryService.update(category).subscribe(
      category => this.actionsForSucess(category),
      error => this.actionForError(error)
    )
  }
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currecntAction = "new"
    } else {
      this.currecntAction = "edit"
    }
  }
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }
  private loadCategory() {
    if (this.currecntAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(p => this.categoryService.getById(+p.get("id")))
      ).subscribe(
        (category) => {
          this.category = category
          this.categoryForm.patchValue(this.category)
        },
        (error) => alert("Ocorreu um erro no servidor, tente mais tarde")
      )
    }
  }

  private setPageTitle() {
    if (this.currecntAction == "new")
      this.pageTitle = "Cadastro de Nova Categoria";
    else {
      const categoryName = this.category.name || ""
      this.pageTitle = "Edição de uma Categoria: " + categoryName;
    }
  }
}
