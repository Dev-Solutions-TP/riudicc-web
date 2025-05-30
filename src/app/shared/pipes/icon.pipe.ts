
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enlaceIconPipe',
  standalone: true,
})
export class EnlaceIconPipe implements PipeTransform {

  transform(label?: string): string {
    if (!label) return 'fa-solid fa-globe';

    const l = label.toLowerCase();

    if (l.includes('facebook')) return 'fa-brands fa-facebook-f';
    if (l.includes('instagram')) return 'fa-brands fa-instagram';
    if (l.includes('linkedin')) return 'fa-brands fa-linkedin';
    if (l.includes('twitter')) return 'fa-brands fa-twitter';
    if (l.includes('youtube')) return 'fa-brands fa-youtube';
    if (l.includes('tiktok')) return 'fa-brands fa-tiktok';

    return 'fa-solid fa-globe';
  }

}
