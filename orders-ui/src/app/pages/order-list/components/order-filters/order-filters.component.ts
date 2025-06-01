import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectorComponent } from '../../../../components/country-selector/country-selector.component';
import { SearchComponent } from '../../../../components/search/search.component';
import { Country } from '../../../../types/country';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-filters',
  standalone: true,
  imports: [CommonModule, CountrySelectorComponent, SearchComponent, MatIconModule, MatButtonModule],
  templateUrl: './order-filters.component.html',
  styleUrls: ['./order-filters.component.scss']
})
export class OrderFiltersComponent {
  @Input() countries: Country[] = [];
  @Input() selectedCountries: string[] = [];
  @Input() descriptionFilter: string = '';

  @Output() selectedCountriesChange = new EventEmitter<string[]>();
  @Output() descriptionFilterChange = new EventEmitter<string>();

  onCountryChange(countries: string[]): void {
    this.selectedCountriesChange.emit(countries);
  }

  onDescriptionFilterChange(text: string): void {
    this.descriptionFilterChange.emit(text);
  }

  clearAllFilters(): void {
    this.selectedCountriesChange.emit([]);
    this.descriptionFilterChange.emit('');
  }
} 