import { IframeProvider } from './../../providers/iframe/iframe';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
@IonicPage()
@Component({
  selector: 'page-iframe',
  templateUrl: 'iframe.html'
})
export class IframePage {
  url: Observable<any>;
  @ViewChild("iframe")
  iframe: ElementRef;
  testUrl: string = "https://www.baidu.com";
  postMsgSub: Subscription;
  constructor(private _sanitizer: DomSanitizer,private _navParams:NavParams, public navCtrl: NavController, private iframeSer: IframeProvider) {
    //接收传递过来的参数
    this.testUrl = this._navParams.get("url")||this.testUrl;

    this.url = Observable.of(this._sanitizer.bypassSecurityTrustResourceUrl(this.testUrl));

    this.postMsgSub = this.iframeSer.onPostMessage()
      .subscribe(md => {
        if (this.iframe) {
          //这里传递给后台网页的是一个对象，键分别是message和data
          this.iframe.nativeElement.contentWindow.postMessage({
            message: md.message,
            data: md.data
          }, "*");
        }
      })
  }
  ngOnDestroy(): void {
    //如果销毁了当前的iframe页面，直接取消监听函数即可
    this.postMsgSub.unsubscribe();
  }
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if(this.iframe){
      // window.addEventListener('touchstart',null,{})
      this.iframe.nativeElement.contentWindow.addEventListener("touchstart",this.touchstart,{passive:true});
    }
  }
  touchstart(){

  }
}
