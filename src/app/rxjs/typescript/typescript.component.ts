import { Component, OnInit, AfterViewInit, NgModule, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material';

@Component({
  selector: 'app-typescript',
  templateUrl: './typescript.component.html',
  styleUrls: ['./typescript.component.css']
})
export class TypeScriptComponent implements OnInit, AfterViewInit {

  isOptionalChaining: boolean;
  isNullishCoalescing: boolean;
  oCvariable: string;
  isOCvariable: string;
  isOCvariableIvy: string;
  foo: any;
  isNullCl: boolean;
  isNullClIvy: boolean;

  initData: string;
  message: any;
  // @Output('initData')
  // set getData(initData: string) {
  //   this.initData = initData;
  // }

  constructor() {
    this.initData;
    this.message;
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  public optionalChaining() {
    this.isOptionalChaining = !this.isOptionalChaining;
    this.renderOptionalChaining();
  }

  private renderOptionalChaining() {
    this.isOCvariable = this.oCvariable !== null && this.oCvariable !== undefined ? this.oCvariable : 'oCvariable is not initial';
    this.isOCvariableIvy = this.oCvariable ?? 'oCvariable is not initial';
  }

  public InitOptionalChainingVar() {
    this.oCvariable = 'ABC';
    this.renderOptionalChaining();

  }

  public nullishCoalescing() {
    this.isNullishCoalescing = !this.isNullishCoalescing;
    this.renderNullishCoalescing();
  }

  private renderNullishCoalescing() {
    this.isNullClIvy = this.foo?.bar?.baz;
    this.isNullCl = this.foo && this.foo.bar && this.foo.bar.baz;
  }

  public InitNullishCoalescingVar() {
    this.foo = {};
    this.foo['bar'] = {};
    this.foo['bar']['baz'] = 'ABC';
    this.renderNullishCoalescing();
  }


}

@NgModule({
  imports: [CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [TypeScriptComponent]
})
class TypeScriptModule {}
