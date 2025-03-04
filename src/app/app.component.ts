import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {StringTyperComponent} from './string-typer/string-typer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StringTyperComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-code-samples';
  readonly items = [
    {title: 'Explore the Docs', link: 'https://angular.dev'},
    {title: 'Learn with Tutorials', link: 'https://angular.dev/tutorials'},
    {title: 'CLI Docs', link: 'https://angular.dev/tools/cli'},
    {title: 'Angular Language Service', link: 'https://angular.dev/tools/language-service'},
    {title: 'Angular DevTools', link: 'https://angular.dev/tools/devtools'},
  ].map(_ => _.title);
}
