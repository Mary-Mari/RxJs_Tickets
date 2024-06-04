import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITour } from '../../../models/tours';
import { UserService } from '../../../services/user/user.service';
import { TicketsService } from '../../../services/tickets/tickets.service';
import { IOrder } from 'src/app/models/order';
import { forkJoin } from 'rxjs';
import { INearestTour, ITourLocation } from '../../../models/tours';


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  isNotFound: boolean = false;
  ticket: ITour | undefined;
  userForm: FormGroup;
  nearestTours: INearestTour[] = [];
  tourLocations: ITourLocation[] = []
  ticketSearchValue: string = '';
  ticketRestSub: PushSubscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private ticketService: TicketsService
  ) {}

  ngOnInit(): void {

    
    this.userForm = new FormGroup({
      firstName: new FormControl('', { validators: Validators.required }),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(''),
      dateOfBirth: new FormControl(''),
      age: new FormControl(''),
      citizenship: new FormControl(''),
    });


    
    // Получение информации о туре при инициализации компонента
    this.getTourById();

    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getTourLocations()]).subscribe(([tours, locations]) => {
      this.tourLocations = locations;
      this.nearestTours = this.ticketService.transformData(tours, locations);
    })

  }

  ngAfterViewInit() {
    const user = this.userService.getUser();
    if (user && user.cardNumber) {
      this.userForm.controls['cardNumber'].setValue(user.cardNumber);
    }
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      return;
    }

    // Вызываем метод для отправки данных на сервер
    this.initTour();
  }

  initTour(): void {
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
  
    const userId = this.userService.getUser()?.id || null;
    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId,
    }
    this.ticketService.sendTourData(postObj).subscribe();
  }

  private getTourById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.ticketService.getTourById(id).subscribe(
        (tour: ITour) => {
          console.log('Tour data:', tour);
          this.ticket = tour;
        },
        (error) => {
          console.error('Error fetching tour by ID:', error);
        }
      );
    }
  }

  selectDate(ev: Event): void {
    
  }

  getTourCountry(tour: INearestTour) {
    return this.tourLocations.find(({id}) => tour.locationId === id)?.name || '-';
  }

  
}
