import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { firstValueFrom } from 'rxjs';

import { FormErrorLabelComponent } from '../../../../shared/components/form-error-label/form-error-label.component';
import { Router } from '@angular/router';
import { NoticiaEntity } from '@home/pages/noticias-page/interfaces/noticia.interface';
import { CreateNoticiaDto, NoticiasService } from '@home/pages/noticias-page/services/noticia.service';
import { FormUtils } from '@shared/utils/form-utils';

@Component({
  selector: 'noticia-details',
  imports: [

    ReactiveFormsModule,
    FormErrorLabelComponent,
  ],
  templateUrl: './noticia-details.component.html',
})
export class NoticiaDetailsComponent implements OnInit {
  noticia = input.required<NoticiaEntity>();

  router = inject(Router);
  fb = inject(FormBuilder);

  noticiasService = inject(NoticiasService);
  wasSaved = signal(false);

  noticiaForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  });

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  ngOnInit(): void {
    this.setFormValue(this.noticia());
  }

  setFormValue(formLike: Partial<NoticiaEntity>) {
    this.noticiaForm.reset(this.noticia() as any);
    this.noticiaForm.patchValue({ tags: formLike.tags?.join(',') });
    // this.productForm.patchValue(formLike as any);
  }

  onSizeClicked(size: string) {
    const currentSizes = this.noticiaForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.noticiaForm.patchValue({ sizes: currentSizes });
  }

  async onSubmit() {
    const isValid = this.noticiaForm.valid;
    this.noticiaForm.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.noticiaForm.value;

    const noticiaLike: Partial<NoticiaEntity> = {
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? [],
    };

    if (this.noticia().id === 'new') {
      // Crear producto
      const noticia = await firstValueFrom(
        this.noticiasService.createNoticia(noticiaLike)
      );

      this.router.navigate(['/admin/products', noticia.id]);
    } else {
      await firstValueFrom(
        this.noticiasService.updateNoticia(this.noticia().id, noticiaLike)
      );
    }

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
}
