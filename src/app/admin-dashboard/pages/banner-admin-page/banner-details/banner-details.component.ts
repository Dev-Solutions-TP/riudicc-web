import { Component, OnInit, inject, input, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { traduccionesValidator } from '@dashboard/validators/traducciontes.validator';
import { BannerEntity, TraduccionBanner, UpdateBannerDto } from '@home/pages/home-page/interfaces/banner.interface';
import { BannersService } from '@home/pages/home-page/services/banner.service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';


const API_URL = environment.baseUrl;

@Component({
  selector: 'banner-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './banner-details.component.html',
})
export class BannerDetailsComponent implements OnInit {
  banner = input.required<BannerEntity>();

  fb = inject(FormBuilder);
  router = inject(Router);
  bannersService = inject(BannersService);

  wasSaved = signal(false);

  bannerForm = this.fb.group({
    slug: ['', Validators.required],
    tags: [''],
    image: ['', Validators.required],
    enlaces: [''],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    state: ['borrador', Validators.required],
    traducciones: this.fb.array([], { validators: traduccionesValidator }),
  });

  get traduccionesFormArray() {
    return this.bannerForm.get('traducciones') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    const current = this.banner();
    if (current.id !== 'new') {
      this.setFormValue(current);
    } else {
      this.addInitialTranslations(); // 👈 nueva función
    }
  }


  private addInitialTranslations() {
    const idiomas = ['es', 'en'];
    idiomas.forEach(idioma => {
      this.traduccionesFormArray.push(
        this.fb.group({
          idioma: [idioma, Validators.required],
          altText: ['', Validators.required],
        })
      );
    });
  }

  private formatToDateInput(value: string | Date | undefined | null): string {
    if (!value) return '';
    if (typeof value === 'string') return value.slice(0, 10);
    return value.toISOString().slice(0, 10);
  }

  setFormValue(banner: BannerEntity) {
    console.log('Banner recibido:', banner);
    this.bannerForm.patchValue({
      slug: banner.slug ?? '',
      tags: banner.tags?.join(',') ?? '',
      image: banner.image ?? '',
      enlaces: banner.enlaces ?? '',
      fechaInicio: this.formatToDateInput(banner.fechaInicio),
      fechaFin: this.formatToDateInput(banner.fechaFin),
      state: banner.state ?? '',
    });

    // this.traduccionesFormArray.clear();
    // banner.traducciones.forEach(t => {
    //   this.traduccionesFormArray.push(
    //     this.fb.group({
    //       idioma: [t.idioma, Validators.required],
    //       altText: [t.altText, Validators.required],
    //     })
    //   );
    // });
    // 🟢 Mostrar imagen previa si ya existe y no hay una cargada nueva
    if (banner.image) {
      this.originalImageName = banner.image; // 👈 guarda solo el nombre
      this.originalImageUrl = `${API_URL}/files/ban/${banner.image}`; // la URL completa
      this.previewImageUrl.set(this.originalImageUrl);
    }

    setTimeout(() => {
      this.traduccionesFormArray.clear();
      banner.traducciones.forEach(t => {
        console.log('Añadiendo traducción:', t);
        this.traduccionesFormArray.push(
          this.fb.group({
            idioma: [t.idioma, Validators.required],
            altText: [t.altText, Validators.required],
          })
        );
      });
    }, 0);

  }




  addTraduccion() {
    this.traduccionesFormArray.push(
      this.fb.group({
        idioma: ['', Validators.required],
        altText: ['', Validators.required],
      })
    );
  }

  removeTraduccion(index: number) {
    this.traduccionesFormArray.removeAt(index);
  }

  async onSubmit() {

    if (this.traduccionesFormArray.length < 2) {
      alert('Debe ingresar al menos dos traducciones.');
      return;
    }
    if (this.bannerForm.invalid) {
      this.bannerForm.markAllAsTouched();
      return;
    }



    const value = this.bannerForm.value;

    const dto: Partial<UpdateBannerDto> = {
      slug: value.slug ?? '',
      tags: value.tags?.split(',').map(t => t.trim()) ?? [],

      enlaces: value.enlaces ?? null,
      fechaInicio: value.fechaInicio ? new Date(value.fechaInicio).toISOString() : undefined,
      fechaFin: value.fechaFin ? new Date(value.fechaFin).toISOString() : undefined,
      state: value.state ?? 'borrador',
      traducciones: value.traducciones?.map((t: any) => ({
        idioma: t.idioma,
        altText: t.altText,
      })),
    };


    const bannerId = this.banner().id;
    const isNew = bannerId === 'new';


    let result: BannerEntity;

    if (isNew) {
      result = await firstValueFrom(
        this.bannersService.createBanner(dto, this.imageFile)
      );
      this.router.navigate(['/admin/banners', result.id]);
    } else {
      result = await firstValueFrom(
        this.bannersService.updateBanner(bannerId, dto, this.imageFile)
      );
    }

    this.wasSaved.set(true);
    setTimeout(() => this.wasSaved.set(false), 3000);
  }



  originalImageUrl: string | null = null;
  originalImageName: string | null = null; // 👈 para mostrar el nombre actual

  previewImageUrl = signal<string | null>(null);
  imageFile: File | undefined = undefined;


  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.imageFile = file ?? undefined;

    if (file) {
      this.previewImageUrl.set(URL.createObjectURL(file));
      this.originalImageName = file.name; // 👈 actualiza el nombre mostrado
    } else {
      // Si se cancela selección, volvemos a mostrar la imagen original
      this.previewImageUrl.set(this.originalImageUrl);
      // Y dejamos el nombre original tal como estaba
    }
  }

}
