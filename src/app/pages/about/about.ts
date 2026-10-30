import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DISCIPLINES, PROCESS_STEPS, TEAM } from '../../core/data';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, Icon, RevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  readonly steps = PROCESS_STEPS;
  readonly team = TEAM;
  readonly disciplines = DISCIPLINES;

  ngOnInit(): void {
    this.seo.setPage(
      'About, A Full Team, One Studio | Jaurvo',
      'Jaurvo is a full team, founded by Jauhar Ayyub, a Software Engineer, building websites, brands and invitation experiences for clients worldwide.',
      '/about',
    );
  }
}
