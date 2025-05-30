import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Country } from '../../types/country';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent {
  @Input() countries: Country[] = [];
  @Input() selectedCountries: string[] = [];
  @Output() selectedCountriesChange = new EventEmitter<string[]>();
  @Output() selectionChange = new EventEmitter<string[]>();

  filteredCountries: Country[] = [];
  searchText: string = '';

  ngOnInit() {
    this.filteredCountries = [...this.countries];
  }

  filterCountries(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value.toLowerCase();
  }

  shouldShowCountry(country: Country): boolean {
    return this.searchText === '' || 
           country.name.toLowerCase().includes(this.searchText);
  }

  isSelectedButNotMatching(country: Country): boolean {
    return this.selectedCountries.includes(country.code) && 
           !country.name.toLowerCase().includes(this.searchText);
  }

  onSelectionChange(selected: string[]): void {
    this.selectedCountriesChange.emit(selected);
    this.selectionChange.emit(selected);
  }

  clearSelections(): void {
    this.selectedCountries = [];
    this.selectedCountriesChange.emit([]);
    this.selectionChange.emit([]);
  }
} 