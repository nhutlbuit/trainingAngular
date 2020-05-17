import { Component, OnInit, AfterViewInit, NgModule, Type, ComponentFactoryResolver, ViewContainerRef,
  ViewChild, ChangeDetectorRef, ɵrenderComponent, ɵɵdirectiveInject, INJECTOR } from '@angular/core';
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
  constructor(private factoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    cd: ChangeDetectorRef) {}

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
    const {instance} = this.anchor.createComponent(factory);
    instance.message = 'abcde';
  }

  loadCardDynamicComponent() {
    import('../card/card.component').then(m => {
      const factory = this.factoryResolver.resolveComponentFactory(m.CardComponent);
      this.anchor.clear();
      this.anchor.createComponent(factory);
    });
  }

  loadTypescriptComponent() {
    if (!this.typeScriptLazyLoad) {
      this.typeScriptLazyLoad = import('../typescript/typescript.component').then(m => m.TypeScriptComponent);
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

export function LazyComponent(config: { path: string, component: string, host: string }) {
  return (cmpType) => {
    const originalFactory = cmpType.ngComponentDef.factory;
    cmpType.ngComponentDef.factory = (...args) => {
      const cmp = originalFactory(...args);

      const injector = ɵɵdirectiveInject(INJECTOR);

      import(`${config.path}`).then(m =>
        ɵrenderComponent(m[config.component], { host: config.host, injector }));

      if (cmp.afterViewLoad) {
        cmp.afterViewLoad();
      }
      return cmp;
    };
    return cmpType;
  };
}
