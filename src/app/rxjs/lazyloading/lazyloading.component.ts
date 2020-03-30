import { Component, OnInit, AfterViewInit, NgModule, Type, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/share.module';

@Component({
  selector: 'app-lazyloading',
  templateUrl: './lazyloading.component.html',
  styleUrls: ['./lazyloading.component.css']
})
export class LazyLoadingComponent implements OnInit, AfterViewInit {

  myComponent?: Type<any>;
  loaded = false;
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;
  constructor(private factoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  loadLazy() {
    import('../parent/parent.component')
    .then(mod => mod.ParentModule)
    .then(lazyModule => {
        this.myComponent = lazyModule.components['lazy'];
        this.loaded = true;
    });
  }

  async loadComponent() {
    const { ParentComponent } = await import('../parent/parent.component');
    const factory = this.factoryResolver.resolveComponentFactory(ParentComponent);
    this.anchor.createComponent(factory);
  }

}

const modules = [
  CommonModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: [LazyLoadingComponent],
})
export class lazyModule { }

