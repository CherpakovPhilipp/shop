import { Component, OnInit, Inject, Optional } from '@angular/core';
import {
  ConstantServiceToken,
  ConstantService,
  GeneratorService,
  RandomString5,
  RandomStringNFactory,
  LocalStorageService,
  LocalStorageToken,
  ConfigOptionsService
} from '../core';

const appInfo = { App: 'Devices Shop', Ver: '1.0' };
const configInfo = {id: 1, email: 'a@a.com', login: 'admin'};

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [
    GeneratorService,
    ConfigOptionsService,
    { provide: ConstantServiceToken, useValue: appInfo },
    { provide: RandomString5, useFactory: RandomStringNFactory(5), deps: [GeneratorService] },
    { provide: LocalStorageToken, useClass: LocalStorageService }
  ]
})
export class AboutComponent implements OnInit {
  appName: string;
  appVersion: string;
  randomString: string;

  constructor(
    @Inject(ConstantServiceToken)@Optional() public appInfo: ConstantService,
    @Inject(RandomString5)@Optional() public randomString5: any,
    private storage: LocalStorageToken,
    private configService: ConfigOptionsService
  ) { }

  ngOnInit(): void {
    this.appName = appInfo.App;
    this.appVersion = appInfo.Ver;
    this.randomString = this.randomString5;
    /////////////
    this.storage.setItem('someKey', 'value');
    console.log('storage get', this.storage.getItem('someKey'));
    ////////////
    this.configService.setConfig(configInfo);
    let currentConfig = this.configService.getConfig();
    for(let key in currentConfig){
      console.log(currentConfig[key]);
    }
  }
}
