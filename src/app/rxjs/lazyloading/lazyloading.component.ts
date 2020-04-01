import { Component, OnInit, AfterViewInit, NgModule, Type, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-lazyloading',
  templateUrl: './lazyloading.component.html',
  styleUrls: ['./lazyloading.component.css']
})
export class LazyLoadingComponent implements OnInit, AfterViewInit {

  myComponent?: Type<any>;
  loaded = false;
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;
  cardLazyLoad?: Promise<Type<any>>;
  constructor(private factoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  ngOnInit() { }

  ngAfterViewInit() { }

  loadLazy() {
    import('../parent/parent.component')
      .then(mod => mod.ParentModule)
      .then(lazyModuleLoading => {
        this.myComponent = lazyModuleLoading.components['lazy'];
        this.loaded = true;
      });
  }

  loadCardComponent() {
    if (!this.cardLazyLoad) {
      this.cardLazyLoad = import('../card/card.component').then(({ CardComponent }) => CardComponent);
    }
  }

  async loadComponent() {
    const { CardComponent } = await import('../card/card.component');
    const factory = this.factoryResolver.resolveComponentFactory(CardComponent);
    this.anchor.clear();
    this.anchor.createComponent(factory);

  }

  loadCardComponent1() {
    import('../card/card.component').then(({ CardComponent }) => {
      const factory = this.factoryResolver.resolveComponentFactory(CardComponent);
      this.anchor.clear();
      this.anchor.createComponent(factory);
    });
  }

}

@NgModule({
  imports: [CommonModule,
    MatButtonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: LazyLoadingComponent
      }
    ])
  ],
  declarations: [LazyLoadingComponent]
})
export class LazyModule {}
