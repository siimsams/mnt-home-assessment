import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Country } from '../../types/country';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
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

  ngOnInit() {
    this.filteredCountries = [...this.countries];
  }

  filterCountries(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCountries = this.countries.filter(country =>
      country.name.toLowerCase().includes(searchText)
    );
  }

  onSelectionChange(selected: string[]): void {
    this.selectedCountriesChange.emit(selected);
    this.selectionChange.emit(selected);
  }
} 