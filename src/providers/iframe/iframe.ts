import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import 'rxjs/add/operator/filter';
@Injectable()
export class IframeProvider {
  //  {
  //   message:string;//消息名称，string类型
  //   data?:any;传递的数据，任意类型，可选
  // }
  private _postMessageSub: Subject<{ message: string; data?: any }>;
  constructor() {
    this._postMessageSub = new BehaviorSubject(null);
  }
  /**
   * 在某个页面需要把消息传递给后台网页时候调用
   * @param message 要传递给后天网页的消息名称
   * @param data 数据，任意类型，可选
   */
  sendMessage(message: string, data?: any) {
    this._postMessageSub.next({ message, data });
  }
  /**
   * 该方法用于在iframe里面监听是否有消息要传递到后台网页，具体使用方法见iframe页面里面
   */
  onPostMessage() {
    return this._postMessageSub
      .asObservable()
      .filter(m => m&&!!m.message);
  }
}
