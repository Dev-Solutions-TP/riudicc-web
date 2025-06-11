import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NoticiaEntity, Traduccion } from '@home/pages/noticias-page/interfaces/noticia.interface';
import { NoticiasService } from '@home/pages/noticias-page/services/noticia.service';
import { InstitucionEntity } from '@home/pages/instituciones/interfaces/aliados.interface';
import { InstitucionesService } from '@home/pages/instituciones/services/instituciones.service';
import { firstValueFrom } from 'rxjs';
import { ImageEntity } from '@home/interfaces/image.interface';
import { Enlace } from '@home/interfaces/enlace.interface';

@Component({
  selector: 'noticia-details',
  imports: [ReactiveFormsModule],
  templateUrl: './noticia-details.component.html',
})
export class NoticiaDetailsComponent implements OnInit {
  noticia = input.required<NoticiaEntity>();

  router = inject(Router);
  fb = inject(FormBuilder);
  noticiasService = inject(NoticiasService);
  institucionesService = inject(InstitucionesService);

  wasSaved = signal(false);
  instituciones = signal<InstitucionEntity[]>([]);

  noticiaForm = this.fb.group({
    slug: ['', Validators.required],
    tags: [''],
    paisCode: [''],
    pais: [''],
    ciudad: [''],
    latitud: [''],
    longitud: [''],
    state: ['publicado', Validators.required],
    displayDate: [new Date(), Validators.required],
    instituciones: this.fb.array([]),
    traducciones: this.fb.array([]),
    images: this.fb.array([]),
    enlaces: this.fb.array([]),
  });

  ngOnInit(): void {
    this.setFormValue(this.noticia());

    this.institucionesService.getInstituciones({ limit: 100 }).subscribe((resp) => {
      this.instituciones.set(resp.items);
    });
  }

  // Getters para usar en HTML
  get imagesFormArray() {
    return this.noticiaForm.get('images') as FormArray<FormGroup>;
  }

  get enlacesFormArray() {
    return this.noticiaForm.get('enlaces') as FormArray<FormGroup>;
  }

  get traduccionesFormArray() {
    return this.noticiaForm.get('traducciones') as FormArray<FormGroup>;
  }

  get institucionesFormArray() {
    return this.noticiaForm.get('instituciones') as FormArray<FormControl>;
  }

  // Métodos para agregar dinámicamente
  addImage() {
    this.imagesFormArray.push(
      this.fb.group({
        url: ['', Validators.required],
        altText: [''],
      })
    );
  }

  addEnlace() {
    this.enlacesFormArray.push(
      this.fb.group({
        url: ['', Validators.required],
        label: [''],
      })
    );
  }

  addTraduccion() {
    this.traduccionesFormArray.push(
      this.fb.group({
        idioma: ['', Validators.required],
        title: ['', Validators.required],
        contentDescription: [''],
        content: [''],
      })
    );
  }

  addInstitucion(id: string) {
    this.institucionesFormArray.push(new FormControl(id));
  }

  removeImage(index: number) {
    this.imagesFormArray.removeAt(index);
  }

  removeEnlace(index: number) {
    this.enlacesFormArray.removeAt(index);
  }

  removeTraduccion(index: number) {
    this.traduccionesFormArray.removeAt(index);
  }

  removeInstitucion(index: number) {
    this.institucionesFormArray.removeAt(index);
  }

  setFormValue(noticia: NoticiaEntity) {
    this.noticiaForm.patchValue({
      slug: noticia.slug,
      tags: noticia.tags?.join(',') ?? '',
      paisCode: noticia.paisCode,
      pais: noticia.pais,
      ciudad: noticia.ciudad,
      latitud: noticia.latitud,
      longitud: noticia.longitud,
      state: noticia.state,
      displayDate: noticia.displayDate,
    });

    noticia.traducciones.forEach((t) => {
      this.traduccionesFormArray.push(
        this.fb.group({
          idioma: [t.idioma, Validators.required],
          title: [t.title, Validators.required],
          contentDescription: [t.contentDescription],
          content: [t.content],
        })
      );
    });

    noticia.images.forEach((img) => {
      this.imagesFormArray.push(
        this.fb.group({
          url: [img.url, Validators.required],
          altText: [img.altText],
        })
      );
    });

    noticia.enlaces.forEach((e) => {
      this.enlacesFormArray.push(
        this.fb.group({
          url: [e.url, Validators.required],
          label: [e.label],
        })
      );
    });

    noticia.instituciones.forEach((inst) => {
      this.institucionesFormArray.push(this.fb.control(inst.id));
    });
  }

  async onSubmit() {
    if (this.noticiaForm.invalid) {
      this.noticiaForm.markAllAsTouched();
      return;
    }

    const formValue = this.noticiaForm.value;

    const noticiaLike: Partial<NoticiaEntity> = {
      ...formValue,
      slug: formValue.slug ?? '', // Asegura string
      tags: formValue.tags?.split(',').map((t: string) => t.trim().toLowerCase()) ?? [],
      paisCode: formValue.paisCode ?? undefined,
      pais: formValue.pais ?? undefined,
      ciudad: formValue.ciudad ?? undefined,
      latitud: formValue.latitud ?? undefined,
      longitud: formValue.longitud ?? undefined,
      state: formValue.state ?? 'borrador',
      displayDate: formValue.displayDate ?? new Date(),


      instituciones: formValue.instituciones as InstitucionEntity[] ?? [] as InstitucionEntity[],
      traducciones: formValue.traducciones as Traduccion[],

      images: formValue.images as ImageEntity[],
      enlaces: formValue.enlaces as Enlace[],
    };

    if (this.noticia().id === 'new') {
      const created = await firstValueFrom(this.noticiasService.createNoticia(noticiaLike));
      this.router.navigate(['/admin/noticias', created.id]);
    } else {
      await firstValueFrom(
        this.noticiasService.updateNoticia(this.noticia().id, noticiaLike)
      );
    }

    this.wasSaved.set(true);
    setTimeout(() => this.wasSaved.set(false), 3000);
  }
}
