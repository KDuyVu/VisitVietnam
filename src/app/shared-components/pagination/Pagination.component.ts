import { Component, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { EventEmitter } from "@angular/core";
@Component({
    selector: "app-pagination",
    templateUrl: "./Pagination.component.html",
    styleUrls: ["./Pagination.component.css"]
})
export class PaginationComponent implements OnChanges{
    @Input() itemsSize: number = 1;
    @Input() itemPerPage: number = 1;
    @Input() selectedPage: number = 1;

    @Output() pageChanged = new EventEmitter<number>();


    maxPageNumber: number = 1;
    currentPageNumbers: number[] = [];
    numberOfPagesToChoose: number = 4;

    ngOnChanges(changes: SimpleChanges): void {
      if ('itemsSize' in changes || 'itemPerPage' in changes) {
        this.maxPageNumber = Math.ceil(this.itemsSize / this.itemPerPage);
        for (let i = 1 ; i <= Math.min(this.numberOfPagesToChoose - 1, this.maxPageNumber - 1) ; i++) {
            this.currentPageNumbers.push(i);
            console.log("opk ",this.currentPageNumbers);
        }
      }
      if (this.itemsSize > 0 && 'selectPage' in changes) {
        this.onPageClick(this.selectedPage);
      }
    }

    onClickPrevious(): void {
        if (this.selectedPage === 1) {
            return;
        }
        this.selectedPage--;
        this.pageChanged.emit(this.selectedPage);
        this.reconstructCurrentPageNumbes();

    }

    onClickNext(): void {
        if (this.selectedPage === this.maxPageNumber) {
            return;
        }
        this.selectedPage++;
        this.pageChanged.emit(this.selectedPage);
        this.reconstructCurrentPageNumbes();
    }

    onPageClick(pageNum: number): void {
        this.selectedPage = pageNum;
        this.pageChanged.emit(this.selectedPage);
        this.reconstructCurrentPageNumbes();
    }

    isDotsDisplayed(): boolean {
        return (this.currentPageNumbers.slice(-1)[0] + 2) < this.maxPageNumber;
    }

    private reconstructCurrentPageNumbes(): void {
        console.log("redo ",this.currentPageNumbers);
        if (this.currentPageNumbers.length + 1 === this.maxPageNumber) {
            return;
        }
        if (this.selectedPage + this.numberOfPagesToChoose <= this.maxPageNumber) {
            for (let i = 1 ; i < this.numberOfPagesToChoose ; i++) {
                this.currentPageNumbers[i-1] = this.selectedPage + i - 1;
            }
        } else {
            this.currentPageNumbers = []
            for (let i = this.maxPageNumber - this.numberOfPagesToChoose ; i < this.maxPageNumber - 1 ; i++) {
                this.currentPageNumbers.push(i);
            }
        }

        if (this.selectedPage === this.currentPageNumbers[0] && this.selectedPage !== 1) {
            this.currentPageNumbers = this.currentPageNumbers.map(num => num - 1);
        }

        if (this.selectedPage === this.currentPageNumbers[this.currentPageNumbers.length - 1] && this.selectedPage !== this.maxPageNumber - 2) {
            this.currentPageNumbers = this.currentPageNumbers.map(num => num - 1);
        }
    }
}
