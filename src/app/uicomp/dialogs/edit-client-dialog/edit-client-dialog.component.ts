import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppInfo } from '../../../model/app-info';
import { Scope } from '../../../model/scope';
import { ClientAppService } from '../../../service/client-app.service';
import { ScopeService } from '../../../service/scope.service';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.css']
})
export class EditClientDialogComponent implements OnInit {

  editFromGroup: FormGroup;
  scopeList: Scope[];

  constructor(public dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppInfo,
    public clientAppService: ClientAppService,
    private formBuilder: FormBuilder,
    public scopeService: ScopeService) { }

  // config for chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA, SPACE]; // Enter, comma, space
  grantTypes = this.mapStringToArray(this.data.grantTypes);
  resourceIds = this.mapStringToArray(this.data.resourceIds);
  ////////////////////////////////////////////////////////

  ngOnInit() {
    this.loadAllScope();
    this.editFromGroup = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      clientSecrets: [{ value: '', disabled: true }, Validators.required],
      clientName: ['', Validators.required],
      redirectUrl: [''],
      resourceIds: [''],
      grantTypes: [''],
      scopes: []
    });
  }

  loadAllScope() {
    this.scopeService.findAllScopes().subscribe(data => {
      this.scopeList = data._embedded.slScopes;
    });
  }

  compareFn(scope1: Scope, scope2: Scope) {
    return scope1 && scope2 ? scope1.id === scope2.id : scope1 === scope2;
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmUpdate(): void {
    // console.log('show data', JSON.stringify(this.data));

    const grantTypes = this.mapArrayToString(this.grantTypes);
    const resourceIds = this.mapArrayToString(this.resourceIds);
    this.data['grantTypes'] = grantTypes;
    this.data['resourceIds'] = resourceIds;
    this.clientAppService.updateClientApp(this.data);
  }

  /**
   * Add Chip Grant Type Input
   * @param event event add grant type
   */
  addChipGrantTypes(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our grantTypes
    if ((value || '').trim()) {
      this.grantTypes.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Add Chip Resource Ids Input
   * @param event add event resource Id
   */
  addChipResourceIds(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our resourceIds
    if ((value || '').trim()) {
      this.resourceIds.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * Remove chip Grant Type input
   * @param grantType grantType for remove
   */
  removeChipGrantTypes(grantType: any): void {
    const index = this.grantTypes.indexOf(grantType);

    if (index >= 0) {
      this.grantTypes.splice(index, 1);
    }
  }

  /**
   * Remove chip Resource Id input
   * @param resourceId resourceId for remove
   */
  removeChipResourceIds(resourceId: any): void {
    const index = this.resourceIds.indexOf(resourceId);

    if (index >= 0) {
      this.resourceIds.splice(index, 1);
    }
  }

   /**
    * Convert value string to array object
    * @param value string value from input chips
    */
  mapStringToArray(value: string): any[] {
    const result = [];
    if (null !== value) {
      value.split(' ').map(item => {
        result.push({name: item});
      });
    }
    return result;
  }
  /**
   * Convert list object to string using for chips
   * @param arr List name object
   */
  mapArrayToString(arr: any[]): string {
    let value = '';
    if (undefined !== arr) {
      value = arr.map(item => {
        return item['name'];
      }).join(' ');
    }
    return value;
  }

}
