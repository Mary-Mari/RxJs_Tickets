import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TicketsService } from "../../../services/tickets/tickets.service";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup;

  constructor(
    private ticketsService: TicketsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.tourForm = new FormGroup({
      name: new FormControl('', { validators: Validators.required }),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      operator: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      img: new FormControl(null, Validators.required),
    });
  }

  createTour() {
    const tourDataRow = this.tourForm.getRawValue();
    let formParams = new FormData();
    if (typeof tourDataRow === 'object') {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop]);
      }
    }

    this.ticketsService.createTour(formParams).subscribe(
      (data) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Тур успешно создан'});
      },
      (error) => {
        console.error('Error creating tour:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Ошибка при создании тура'});
      }
    );
  }

  selectFile(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.tourForm.patchValue({
        img: file
      });
      this.tourForm.get('img')?.updateValueAndValidity();
    }
  }
}
