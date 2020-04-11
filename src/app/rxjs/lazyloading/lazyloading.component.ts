import { Component, OnInit, AfterViewInit, NgModule, Type, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { PlaceholderDirective } from '../directive/placeholder.directive';

@Component({
  selector: 'app-lazyloading',
  templateUrl: './lazyloading.component.html',
  styleUrls: ['./lazyloading.component.css']
})
export class LazyLoadingComponent implements OnInit, AfterViewInit {

  myComponent?: Type<any>;
  compHolder?: Type<any>;
  loaded = false;
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;
  cardLazyLoad?: Promise<Type<any>>;
  typeScriptLazyLoad?: Promise<Type<any>>;
  dataTranfer: string;
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
    // extract property of an object
    const { CardComponent } = await import('../card/card.component');
    const factory = this.factoryResolver.resolveComponentFactory(CardComponent);
    this.anchor.clear();
    const {instance: CardComponentInstance} = this.anchor.createComponent(factory);
    CardComponentInstance.message = 'abcde';
  }

  loadCardComponent1() {
    import('../card/card.component').then(({ CardComponent }) => {
      const factory = this.factoryResolver.resolveComponentFactory(CardComponent);
      this.anchor.clear();
      this.anchor.createComponent(factory);
    });
  }

  loadTypescriptComponent() {
    if (!this.typeScriptLazyLoad) {
      this.typeScriptLazyLoad = import('../typescript/typescript.component').then(({ TypeScriptComponent }) => TypeScriptComponent);
    }
  }

  async loadCardDirective() {
    const { TypeScriptComponent } = await import('../typescript/typescript.component');
    this.dataTranfer = 'dataTranfer';
    this.compHolder = TypeScriptComponent;
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
  declarations: [LazyLoadingComponent, PlaceholderDirective]
})
export class LazyModule {}
