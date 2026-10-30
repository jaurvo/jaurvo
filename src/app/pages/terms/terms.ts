import { Component, OnInit, inject } from '@angular/core';
import { EMAIL } from '../../core/data';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  templateUrl: './terms.html',
  styleUrl: './legal.scss',
})
export class Terms implements OnInit {
  private readonly seo = inject(SeoService);
  readonly email = EMAIL;

  ngOnInit(): void {
    this.seo.setPage(
      'Terms of Service | Jaurvo',
      'Jaurvo service terms: written quotes, 50% advance payment, domain in your own name, delivery timelines, two revision rounds and cancellations.',
      '/terms',
    );
  }
}
