import type { IDateValue, IDatePickerControl } from './common';

// ----------------------------------------------------------------------

export type ITourFilters = {
  services: string[];
  destination: string[];
  tourGuides: ITourGuide[];
  endDate: IDatePickerControl;
  startDate: IDatePickerControl;
};

export type ITourGuide = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

export type ITourBooker = {
  id: string;
  name: string;
  guests: number;
  avatarUrl: string;
};

export type ITourItem = {
  id: string;
  name: string;
  price: number;
  tags: string[];
  content: string;
  publish: string;
  images: string[];
  durations: string;
  priceSale: number;
  totalViews: number;
  services: string[];
  destination: string;
  ratingNumber: number;
  createdAt: IDateValue;
  bookers: ITourBooker[];
  tourGuides: ITourGuide[];
  available: {
    endDate: IDateValue;
    startDate: IDateValue;
  };
};
