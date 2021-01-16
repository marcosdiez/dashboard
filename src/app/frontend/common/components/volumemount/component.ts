// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {VolumeMounts} from '@api/backendapi';
import {KdStateService} from '../../services/global/state';
import {GlobalServicesModule} from '../../services/global/module';

@Component({
  selector: 'kd-volumemounts-list',
  templateUrl: './template.html',
})
export class VolumeMountComponent {
  @Input() initialized: boolean;
  @Input() volumeMounts: VolumeMounts[];
  @Input() namespace: string;

  private readonly kdState_: KdStateService = GlobalServicesModule.injector.get(KdStateService);

  getVolumeMountColumns(): string[] {
    return ['Name', 'Read Only', 'Mount Path', 'Sub Path', 'Source Type', 'Source Name'];
  }

  getDataSource(): MatTableDataSource<VolumeMounts> {
    const tableData = new MatTableDataSource<VolumeMounts>();
    tableData.data = this.volumeMounts;

    return tableData;
  }

  hasPanelInTheDashboard(sourceType: string): boolean {
    const implemented_panels = ['ConfigMap', 'Secret', 'PersistentVolumeClaim'];
    return implemented_panels.includes(sourceType);
  }

  getDetailsHref(name: string, kind: string): string {
    return this.kdState_.href(kind.toLowerCase(), name, this.namespace);
  }
}
