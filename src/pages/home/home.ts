import { IframeProvider } from './../../providers/iframe/iframe';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url="https://www.baidu.com";
  constructor(public navCtrl: NavController, private iframeSer: IframeProvider) {
    window.addEventListener("message", this.handler);
    window.addEventListener("mousewheel",this.mousewheel,{
      passive:true,
      capture:false
    });
  }
  handler(evt) {
    //这里处理要处理的逻辑
    console.log(evt);
  }
  mousewheel(){

  }
  login(){
    this.url = `https://www.baidu.com`;
    this.navCtrl.push('IframePage',{url:this.url});
  }
  onClick(){
    this.iframeSer.sendMessage('click','用户点击了页面，需要后台网页处理');
  }
  ngOnDestroy(): void {
    console.log("home,ngOnDestroy");
    window.removeEventListener('message',this.handler);
  }
}
