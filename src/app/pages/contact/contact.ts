import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_NUMBER, SERVICES, SOCIAL_HANDLE, YOUTUBE_URL } from '../../core/data';
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
export class Contact implements OnInit, OnDestroy {
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
  readonly toast = signal<string | null>(null);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  /** SITE-04: Request-a-Call form state */
  readonly callName = signal('');
  readonly callPhone = signal('');
  readonly callSending = signal(false);
  readonly callSent = signal(false);

  ngOnInit(): void {
    this.seo.setPage(
      'Contact, Start Your Project | Jaurvo',
      'Send Jaurvo an enquiry, you get a clear scope, fixed price and timeline in writing, usually within a few hours.',
      '/contact',
    );
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

  private showToast(message: string): void {
    this.toast.set(message);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 4000);
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
    this.sent.set(true);
    this.showToast('Your inquiry successful sent,we will get back to you soon!');
    setTimeout(() => {
      document.querySelector('.sent-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
    if (!saved) {
      const subject = `New enquiry, ${this.service()}`;
      const body =
        `Name: ${this.name().trim()}\n` +
        `Contact: ${this.contact().trim()}\n` +
        `Service: ${this.service()}\n` +
        (this.budget().trim() ? `Budget: ${this.budget().trim()}\n` : '') +
        (this.message().trim() ? `Details: ${this.message().trim()}` : '');
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  async submitCallRequest(): Promise<void> {
    if (!this.callName().trim() || !this.callPhone().trim() || this.callSending()) return;
    this.callSending.set(true);
    const ok = await this.content.submitCallRequest({
      name: this.callName().trim(),
      phone: this.callPhone().trim(),
    });
    this.callSending.set(false);
    if (ok) {
      this.callSent.set(true);
      this.showToast('Call request sent! We will call you back soon. 📞');
    } else {
      this.showToast('Could not send, please try again.');
    }
  }

  ngOnDestroy(): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }
}
