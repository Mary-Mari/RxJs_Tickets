import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../../services/observable/observable.service";
import {Subject, Subscription, take} from "rxjs";
import {SettingsService} from "../../../services/settings/settings.service";
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
  settingsData: Subscription;
  settingsDataSubject: Subscription
  subjectForUnsubscribe = new Subject()

  constructor(
    private test: ObservableExampleService,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit(): void {
    this.settingsData = this.settingsService.loadUserSettings()
      .pipe(takeUntil(this.subjectForUnsubscribe))
      .subscribe((data) => {
        console.log('setting data', data);
      })
    this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable()
      .pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
        console.log('setting data from subject', data);
      })
  }

  ngOnDestroy() {
    this.subjectForUnsubscribe.next(true)
    this.subjectForUnsubscribe.complete()
  }

}
