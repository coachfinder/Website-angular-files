import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-60%)'
      }),
      animate('0.5s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }))
    ])
  ]);


  export const rightswipe: AnimationEntryMetadata =
  trigger('routeAnimation', [
    // transition(":enter", [
    //   style({ transform: "translateY(-200px)", opacity: 0 }),
    //   animate(
    //     "800ms cubic-bezier(1.000, 0.000, 0.000, 1.000)",
    //     style({ transform: "translateY(0)", opacity: 1 })
    //   )
    // ]),
    // transition(":leave", [
    //   style({ transform: "translateY(0)", opacity: 1 }),
    //   animate(
    //     "800ms cubic-bezier(1.000, 0.000, 0.000, 1.000)",
    //     style({ transform: "translateY(-200px)", opacity: 0 })
    //   )
    // ])
  ]);