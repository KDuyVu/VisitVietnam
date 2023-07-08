import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SampleItinerary } from 'src/app/service/CityService.service';
import { processHTML } from 'src/app/service/Functions';

@Component({
  selector: 'app-sample-itinerary',
  templateUrl: './SampleItinerary.component.html',
  styleUrls: ['./SampleItinerary.component.css'],
})
export class SampleItineraryComopnent implements OnChanges, OnInit {
  idPrefix = 'DAY-ITEM-';

  @Input() itineraries: SampleItinerary[] = [];

  itinerariesLine: SampleItinerary[][] = [];
  itinerariesIds: string[][] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.itinerariesToLines();
    this.cdr.detectChanges();
    for (let i = 0 ; i < this.itinerariesIds.length ; i++) {
      for (let e = 0 ; e < this.itinerariesLine[i].length ; e++) {
        const id: string = this.itinerariesIds[i][e];

        const itinerary: SampleItinerary = this.itinerariesLine[i][e];
        const element = document.getElementById(id);
        const content = processHTML(itinerary.HTML, id);
        element.innerHTML = content;
      }
    }
    this.cdr.detectChanges();
  }

  private itinerariesToLines(): void {
    let line: SampleItinerary[] = [];
    let idLine: string[] = [];
    let cnt: number = 0;
    if (!this.itineraries) {
      return;
    }
    this.itineraries.forEach(
      (itinerary) => {
        ++cnt;
        const id: string = `${this.idPrefix}${cnt}`;
        if (line.length === 2) {
          this.itinerariesLine.push(line);
          this.itinerariesIds.push(idLine);
          line = [];
          idLine = [];
        }
        line.push(itinerary);
        idLine.push(id);
      }
    )
    if (line.length !== 0) {
      this.itinerariesLine.push(line);
      this.itinerariesIds.push(idLine);
    }
  }
}
