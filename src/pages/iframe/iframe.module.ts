import { IframePage } from './iframe';
import { NgModule } from "@angular/core";
import { IonicPageModule } from 'ionic-angular';
@NgModule({
    imports:[
        IonicPageModule.forChild(IframePage)
    ],
    declarations:[
        IframePage
    ],
    entryComponents:[
        IframePage
    ]
})
export class IframePageModule{

}