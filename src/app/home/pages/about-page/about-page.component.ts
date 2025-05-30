import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core';
import { PageTitleComponent } from "../../components/page-title/page-title.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { InstitucionesService } from '../instituciones/services/instituciones.service';
import { InstitucionEntity } from '../instituciones/interfaces/aliados.interface';
import { InstitucionCardShortComponent } from "../instituciones/components/institucion-card-short/institucion-card-short.component";

@Component({
  selector: 'app-about-page',
  imports: [PageTitleComponent, InstitucionCardShortComponent],
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent {

  private currentLocale = signal(inject(LOCALE_ID));


  private institucionesServer = inject(InstitucionesService);



  institucionesResponse = rxResource({
    request: () => ({}),
    loader: ({ request }) => {

      return this.institucionesServer.getInstituciones({});
    }
  });

  aboutContenidoText: Record<'es' | 'en' | 'fr', string> = {
    es: 'RIUDICC es la Red Internacional de Universidades para el Desarrollo Inclusivo y el Intercambio Científico y Cultural, una iniciativa cofinanciada por la Unión Europea, conformada por diez Instituciones de Educación Superior provenientes de Europa, América Latina y el Caribe.',
    en: 'RIUDICC is the International Network of Universities for Inclusive Development and Scientific and Cultural Exchange, an initiative co-financed by the European Union, made up of ten Higher Education Institutions from Europe, Latin America and the Caribbean.',
    fr: 'RIUDICC est le Réseau international des universités pour le développement inclusif et l\'échange scientifique et culturel, une initiative cofinancée par l\'Union européenne, composée de dix établissements d\'enseignement supérieur provenant d\'Europe, d\'Amérique latine et des Caraïbes.',
  };

  aboutContenido = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.aboutContenidoText[locale] ?? 'News';
  });
  aboutContenidoLargeText: Record<'es' | 'en' | 'fr', string> = {
    es: ` <p>Esta red se sustenta en principios fundamentales como la promoción de la equidad en el acceso a la educación, el fortalecimiento institucional de las oficinas de Relaciones Internacionales, el fomento de la interculturalidad y la construcción de un diálogo global que permita el entendimiento mutuo entre culturas diversas.</p>

    <p>El principal objetivo de RIUDICC es generar y facilitar oportunidades de internacionalización para los distintos actores de la comunidad universitaria que enfrentan situaciones de vulnerabilidad social y económica. A través de estas oportunidades, se busca dotarles de competencias clave que les permitan ejercer roles de liderazgo, promover la inclusión social y contribuir activamente al desarrollo local y regional.</p>

    <p>Las Instituciones de Educación Superior participantes en RIUDICC son consideradas agentes estratégicos en la transformación de sus entornos. Su labor es esencial para la implementación de acciones que respondan a los Objetivos de Desarrollo Sostenible (ODS) impulsados por la Organización de las Naciones Unidas, así como para el fortalecimiento de la cooperación bilateral en materia educativa entre la Unión Europea, América Latina y el Caribe.</p>`,
    en: ` <p>This network is based on fundamental principles such as promoting equity in access to education, strengthening the institutional capacity of International Relations offices, fostering interculturality, and building a global dialogue that allows for mutual understanding among diverse cultures.</p>
    
    <p>The main objective of RIUDICC is to generate and facilitate internationalization opportunities for various actors in the university community who face social and economic vulnerabilities. Through these opportunities, the aim is to equip them with key competencies that enable them to take on leadership roles, promote social inclusion, and actively contribute to local and regional development.</p>
    
    <p>he participating Higher Education Institutions in RIUDICC are considered strategic agents in transforming their environments. Their work is essential for implementing actions that respond to the Sustainable Development Goals (SDGs) promoted by the United Nations, as well as for strengthening bilateral educational cooperation between the European Union, Latin America, and the Caribbean.</p>`,
    fr: ` <p>Ce réseau repose sur des principes fondamentaux tels que la promotion de l'équité dans l'accès à l'éducation, le renforcement de la capacité institutionnelle des bureaux des relations internationales, la promotion de l'interculturalité et la construction d'un dialogue mondial permettant une compréhension mutuelle entre les cultures diverses.</p>

    <p>L'objectif principal de RIUDICC est de générer et de faciliter des opportunités d'internationalisation pour les différents acteurs de la communauté universitaire confrontés à des situations de vulnérabilité sociale et économique. À travers ces opportunités, il s'agit de leur fournir des compétences clés leur permettant d'exercer des rôles de leadership, de promouvoir l'inclusion sociale et de contribuer activement au développement local et régional.</p>

    <p>Les établissements d'enseignement supérieur participants à RIUDICC sont considérés comme des agents stratégiques dans la transformation de leurs environnements. Leur travail est essentiel pour la mise en œuvre d'actions répondant aux Objectifs de Développement Durable (ODD) promus par l'Organisation des Nations Unies, ainsi que pour le renforcement de la coopération bilatérale en matière éducative entre l'Union Européenne, l'Amérique Latine et les Caraïbes.</p>`,

  };
  aboutContenidoLarge = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.aboutContenidoLargeText[locale] ?? 'News';
  });


  aboutContenidoInstitucionestext: Record<'es' | 'en' | 'fr', string> = {
    es: `Cada una de estas instituciones aporta su experiencia, compromiso y capacidades para consolidar una red que trabaja por la inclusión, la equidad y la internacionalización del conocimiento en contextos multiculturales y diversos. A través del trabajo conjunto, se busca no solo fortalecer las capacidades internas de cada universidad, sino también ampliar su impacto en los territorios donde operan, promoviendo procesos sostenibles de transformación social y académica.`,
    en: `Each of these institutions brings its experience, commitment, and capabilities to consolidate a network that works for inclusion, equity, and the internationalization of knowledge in multicultural and diverse contexts. Through joint work, the aim is not only to strengthen the internal capacities of each university but also to expand their impact in the territories where they operate, promoting sustainable processes of social and academic transformation.`,
    fr: `Chacune de ces institutions apporte son expérience, son engagement et ses capacités pour consolider un réseau qui œuvre pour l'inclusion, l'équité et l'internationalisation des connaissances dans des contextes multiculturels et diversifiés. À travers un travail conjoint, il s'agit non seulement de renforcer les capacités internes de chaque université, mais aussi d'élargir leur impact dans les territoires où elles opèrent, en promouvant des processus durables de transformation sociale et académique.`,

  };
  aboutContenidoInstitciones = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.aboutContenidoInstitucionestext[locale] ?? 'News';
  });


  sociosTitleText: Record<'es' | 'en' | 'fr', string> = {
    es: 'Socios',
    en: 'Partners',
    fr: 'Partenaires',
  };

  sociosTitle = computed(() => {
    const locale = this.currentLocale() as 'es' | 'en' | 'fr';
    return this.sociosTitleText[locale] ?? 'News';
  });


  getTraduccionInstitucion(institucion: InstitucionEntity) {
    const idioma = this.currentLocale();
    const traduccion = institucion.traducciones.find(t => t.idioma === idioma);
    return traduccion ?? institucion.traducciones[0];
  }


}