import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientAppService } from '../../../service/client-app.service';
import { AppInfo } from '../../../model/app-info';
import {ENTER, COMMA, SPACE} from '@angular/cdk/keycodes';
import { Scope } from '../../../model/scope';
import { ScopeService } from '../../../service/scope.service';


@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent implements OnInit {

  addFromGroup: FormGroup;
  isActive = 1;
  scopeList: Scope[];

  // config for chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA, SPACE]; // Enter, comma, space
  grantTypes = [];
  resourceIds = [];
  ////////////////////////////////////////////////////////

  constructor(public dialogRef: MatDialogRef<AddClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public clientAppService: ClientAppService,
    private formBuilder: FormBuilder,
    public scopeService: ScopeService) {

  }

  ngOnInit() {
    this.loadAllScope();

    this.addFromGroup = this.formBuilder.group({
      id: ['', Validators.required],
      clientSecrets: ['', Validators.required],
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

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  /**
   * Add client App data
   */
  public confirmAdd(): void {
    // console.log('data add: ', this.data);
    const grantTypes = this.mapArrayToString(this.grantTypes);
    const resourceIds = this.mapArrayToString(this.resourceIds);
    this.data['grantTypes'] = grantTypes;
    this.data['resourceIds'] = resourceIds;
    this.data['isActive'] = 1; // default enable app. 1 : enable, 2 : disable
    this.clientAppService.addClientApp(this.data);
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

}
