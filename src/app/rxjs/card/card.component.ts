import { Component, NgModule } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [

    // Trigger animation cards array
    trigger('cardAnimation', [
      // Transition from any state to any state
      transition('* => *', [
        // Initially the all cards are not visible
        query(':enter', style({ opacity: 0 }), { optional: true }),

        // Each card will appear sequentially with the delay of 300ms
        query(':enter', stagger('300ms', [
          animate('.5s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ]))]), { optional: true }),

        // Cards will disappear sequentially with the delay of 300ms
        query(':leave', stagger('300ms', [
          animate('500ms ease-out', keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
            style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
          ]))]), { optional: true })
      ]),
    ]),

    // Trigger animation for plus button
    trigger('plusAnimation', [

      // Transition from any state to any state
      transition('* => *', [
        query('.plus-card', style({ opacity: 0, transform: 'translateY(-40px)' })),
        query('.plus-card', stagger('500ms', [
          animate('300ms 1.1s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),
      ])
    ])
  ]
})
export class CardComponent {

  index = 3;
  cards = ['Card 1', 'Card 2', 'Card 3'];

  addCard() {
    this.cards.push('Card ' + (++this.index));
  }

  deleteCard(i) {
    this.cards.splice(i, 1);
  }
}

// https://medium.com/@tejozarkar/angular-stagger-animation-cards-cascading-fe45eb003759


@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [CardComponent],
})
export class ParentModule {

}
