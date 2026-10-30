import { Component, OnInit, inject } from '@angular/core';
import { EMAIL } from '../../core/data';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  templateUrl: './privacy.html',
  styleUrl: './legal.scss',
})
export class Privacy implements OnInit {
  private readonly seo = inject(SeoService);
  readonly email = EMAIL;

  ngOnInit(): void {
    this.seo.setPage(
      'Privacy Policy | Jaurvo',
      'How Jaurvo handles your information: we only receive what you send us through the enquiry form or email, we never sell data, and this website stores nothing about you.',
      '/privacy',
    );
  }
}
