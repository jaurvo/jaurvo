import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project, WORK_CATEGORIES, WorkCategory } from '../../core/data';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';
import { ProjectCard } from '../../shared/project-card';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [RouterLink, Icon, RevealDirective, ProjectCard],
  templateUrl: './work.html',
  styleUrl: './work.scss',
})
export class Work implements OnInit {
  readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  readonly categories = WORK_CATEGORIES;

  ngOnInit(): void {
    this.seo.setPage(
      'Our Work, Real Projects, Live on the Internet | Jaurvo',
      'Restaurant websites, business websites, invitation websites and beauty & salon websites built by Jaurvo, every project real, live, and organised by category.',
      '/work',
    );
  }

  projectsIn(category: WorkCategory): Project[] {
    return this.content.projects().filter((p) => p.category === category.name);
  }

  /** Map a work category to the matching service name for enquiry pre-fill. */
  sampleService(categoryName: string): string {
    if (categoryName === 'Logos & Branding') return 'Logo & Branding';
    if (categoryName === 'Posters & Banners') return 'Posters & Banners';
    if (categoryName === 'Social Media Designs') return 'Social Media Designs';
    return 'Websites';
  }
}
