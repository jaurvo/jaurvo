import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../core/data';
import { Icon } from './icon';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink, Icon],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly showDescription = input(false);

  badgeClass(project: Project): string {
    return project.badge === 'live' ? 'badge badge--live' : 'badge';
  }
}
