import { Component, OnInit, AfterViewInit, NgModule, Type, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-lazyloading',
  templateUrl: './lazyloading.component.html',
  styleUrls: ['./lazyloading.component.css']
})
export class LazyLoadingComponent implements OnInit, AfterViewInit {

  myComponent?: Type<any>;
  loaded = false;
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;
  parentLazyLoad?: Promise<Type<any>>;
  constructor(private factoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  loadLazy() {
    import('../parent/parent.component')
    .then(mod => mod.ParentModule)
    .then(lazyModuleLoading => {
        this.myComponent = lazyModuleLoading.components['lazy'];
        this.loaded = true;
    });
  }

  loadLazyParantComponent() {
    if (!this.parentLazyLoad) {
      this.parentLazyLoad = import('../card/card.component').then(({CardComponent}) => CardComponent);
    }
  }

  async loadComponent() {
    const { CardComponent } = await import('../card/card.component');
    const factory = this.factoryResolver.resolveComponentFactory(CardComponent);
    this.anchor.clear();
    this.anchor.createComponent(factory);
  }

}

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule.forChild([
    {
      path: '',
      component: LazyLoadingComponent
    }
  ])],
  declarations: [LazyLoadingComponent]
})
export class LazyModule { }

