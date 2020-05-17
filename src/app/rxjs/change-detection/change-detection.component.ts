import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-detection',
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * A Subject is a special type of Observable that allows values to be
 * multicasted to many Observers. Subjects are like EventEmitters.
 *
 * Every Subject is an Observable and an Observer. You can subscribe to a
 * Subject, and you can call next to feed values as well as error and complete.
 * https://indepth.dev/everything-you-need-to-know-about-change-detection-in-angular/
 */
export class ChangeDetectionComponent implements OnInit, AfterViewInit {

  input = 'a';

  constructor(public cd: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
   // this.cd.detach();
   }

  onClick() {
  
    this.input = 'Setted';
    this.cd.checkNoChanges();
  }


}

@NgModule({
  imports: [CommonModule, FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChangeDetectionComponent
      }
    ])
  ],
  declarations: [ChangeDetectionComponent]
})
export class ChangeDetectionModule {}
