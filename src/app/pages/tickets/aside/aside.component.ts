import {Component, Output, OnInit, EventEmitter} from '@angular/core';
import { IMenuType} from "../../../models/menuType";
import {ITourTypeSelect} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import { ToastModule } from 'primeng/toast';
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  constructor(private ticketService: TicketsService,
              private  messageService: MessageService,
              private settingsService: SettingsService) { }

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
  }

  tourTypes: ITourTypeSelect [] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]

  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }
  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]

  }

  onSubmit():void {}

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }
  initRestError(ev: Event): void {
    this.ticketService.getError().subscribe((data) => {
      if (data.error) {
        this.messageService.add({severity:'error', summary:'Not Found', detail:'Invalid URL'});
      }
    }, (err)=> {
      console.log('err', err)
      this.messageService.add({severity:'error', summary:'Not Found', detail:'Invalid URL'});
    });
  }

  initSettingsData():void {
    this.settingsService.loadUserSettingsSubject( {
      saveToken: false
    })
  }

}
