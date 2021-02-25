import {ComponentFactoryResolver, Directive, Input, OnChanges, SimpleChanges, Type, ViewContainerRef} from '@angular/core';


@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective implements OnChanges {

  @Input()
  appPlaceholder: Type<any>;
  @Input()
  initData: any;
  private component: any;

  constructor(public viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
    viewContainer.clear();
    if (this.appPlaceholder) {
      this.component = viewContainer.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.appPlaceholder)).instance;
      Object.assign(this.component.message, this.initData || {});
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appPlaceholder'] && changes['appPlaceholder'].previousValue != changes['appPlaceholder'].currentValue) {
      this.viewContainer.clear();
      if (this.appPlaceholder) {
        // this.component = this.viewContainer.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.appPlaceholder)).instance;
        // Object.assign(this.component.message, changes['initData'] ? (changes['initData'].currentValue || {}) : {});

        const factory = this.componentFactoryResolver.resolveComponentFactory(this.appPlaceholder);
        let instance = this.viewContainer.createComponent(factory).instance;
        instance.message = 'abcde';

      }
    } else if (this.component && changes['initData'] && changes['initData'].previousValue != changes['initData'].currentValue) {
      Object.assign(this.component.message, changes['initData'].currentValue || {});
    }
  }

}
