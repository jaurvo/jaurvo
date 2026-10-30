import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  EMAIL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_NUMBER,
  SERVICES,
  SOCIAL_HANDLE,
  YOUTUBE_URL,
} from '../../core/data';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RouterLink, Icon, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  readonly email = EMAIL;
  readonly instagramUrl = INSTAGRAM_URL;
  readonly youtubeUrl = YOUTUBE_URL;
  readonly socialHandle = SOCIAL_HANDLE;
  readonly callDisplay = PHONE_DISPLAY;
  readonly callHref = `tel:${PHONE_NUMBER}`;
  readonly serviceNames = SERVICES.map((s) => s.name);

  readonly name = signal('');
  readonly contact = signal('');
  readonly service = signal('Websites');
  readonly budget = signal('');
  readonly message = signal('');
  readonly sending = signal(false);
  readonly sent = signal(false);

  ngOnInit(): void {
    this.seo.setPage(
      'Contact, Start Your Project | Jaurvo',
      'Send Jaurvo an enquiry, you get a clear scope, fixed price and timeline in writing, usually within a few hours.',
      '/contact',
    );
    // Pre-fill from quote links: ?service=<service name>&message=<prefilled text>
    this.route.queryParamMap.subscribe((params) => {
      const service = params.get('service');
      if (service && this.serviceNames.includes(service)) {
        this.service.set(service);
      }
      const message = params.get('message');
      if (message) {
        this.message.set(message);
      }
    });
  }

  async submit(): Promise<void> {
    if (!this.name().trim() || !this.contact().trim() || this.sending()) return;
    this.sending.set(true);

    const saved = await this.content.submitEnquiry({
      name: this.name().trim(),
      contact: this.contact().trim(),
      service: this.service(),
      budget: this.budget().trim(),
      message: this.message().trim(),
    });

    this.sending.set(false);
    if (saved) {
      this.sent.set(true);
      return;
    }

    // Backend not connected (or save failed), fall back to an email
    // draft with the whole requirement pre-filled. Nothing is lost.
    const subject = `New enquiry, ${this.service()}`;
    const body =
      `Name: ${this.name().trim()}\n` +
      `Contact: ${this.contact().trim()}\n` +
      `Service: ${this.service()}\n` +
      (this.budget().trim() ? `Budget: ${this.budget().trim()}\n` : '') +
      (this.message().trim() ? `Details: ${this.message().trim()}` : '');
    window.location.href =
      `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    this.sent.set(true);
  }
}
