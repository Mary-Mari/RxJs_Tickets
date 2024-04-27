import {AfterViewInit, Component, OnInit} from '@angular/core';
import {INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;
  nearestTours: INearestTour[];
  locationName: string | undefined
  toursLocation: ITourLocation[];
  newNearestTour: INearestTour[];

  constructor(private route: ActivatedRoute,
              private  ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private  ticketService: TicketsService) { }

  ngOnInit(): void {

    this.user = this.userService.getUser()

    this.userForm = new FormGroup( {
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(''),
      birthDay: new FormControl(''),
      age: new FormControl(''),
      citizen: new FormControl('')
    });


    this.ticketService.getNameCountry().subscribe((data)=> {
      this.newNearestTour = data
    })


    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;
    if(paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }


  ngAfterViewInit() {
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber)
  }

  onSubmit():void {}

  selectDate(ev: Event): void {}


  protected readonly location = location;
}
