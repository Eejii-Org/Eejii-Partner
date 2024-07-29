export type HydraCollectionType<T> = {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:totalItems": number;
  "hydra:member": T;
  "hydra:meta": {
    pagination: PaginationType;
  };
};
export type GenderType = "m" | "f";
export type UserType = {
  address: AddressType;
  plainPassword?: string;
  approvedAt?: string | null;
  bio: string;
  email: string;
  historyDescription?: string | null;
  id?: number;
  images?: ImageType[];
  introduction?: string | null;
  organizationType: string;
  phoneNumber: string;
  state?: string;
  subscriptionCode?: string;
  subscriptionEndDate?: string | null;
  subscriptionId?: number;
  subscriptionStartDate?: string;
  type?: string;
  username: string;

  createdAt?: string;
  updatedAt?: string;

  eventPermit?: number;
  fundraisingPermit?: number;
  mediaPermit?: number;
  volunteeringEventPermit?: number;
  grantFundraisingPermit?: number;
};

export type VolunteerType = {
  id?: string;
  email: string;
  type?: string;
  plainPassword: string;
  phoneNumber: string;
  username: string;
  firstName?: string;
  lastName?: string;
  gender?: GenderType;
  bio: string;
  registerNumber?: string;
  organizationType?: string;
  birthday?: string;
  address: AddressType;
  images?: ImageType[];
  level?: number;
  xp?: number;
};

export type OwnerType = {
  "@id": string;
  "@type": string;
  id: number;
  email: string;
  images: ImageType[];
  phoneNumber: string;
  type: string;
  level: number | null;
  username: string;
  gender: string | null;
  introduction: string | null;
  address: AddressType | null;
  organizationType: string | null;
};
export type ContactType = {
  email: string;
  phoneNumber: string;
};
export type EventType = {
  "@context": string;
  "@id": string;
  "@type": string;
  id: number;
  slug: string;
  title: string;
  type: string;
  description: string;
  shortDescription: string | null;
  state: string;
  isEnabled: boolean;
  isFeatured: boolean;
  contact: ContactType;
  maxPoint: number;
  volunteeringHours: null | number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  owner: OwnerType;
  images: ImageType[];
  address: AddressType;
  media: MediaType[];
  eventUsers: EventUserType[];
  roles: RoleType[];
  categories: CategoryType[];
  approvedAt: null;
};
export type EventUserType = {
  "@id": string;
  "@type": string;
  id: number;
  event: string;
  owner: OwnerType;
  state: "pending" | "accepted" | "denied";
  requestType: "invitation" | "request";
  createdAt: "string";
  userType: "volunteer";
};

export type ProjectUserType = {
  "@id": string;
  "@type": string;
  id: number;
  project: string;
  owner: OwnerType;
  state: "pending" | "accepted" | "denied";
  requestType: "invitation" | "request";
  userType: "volunteer";
  createdAt: string;
};

export type ImageType = {
  "@type": string;
  "@id": string;
  id: number;
  path: string;
  type: "thumbnail" | "main";
};

export type AddressType = {
  "@id"?: string;
  "@type"?: string;
  id?: number;
  country: string;
  region: string;
  regionCode: null | string;
  countryCode: string;
  address: null | string;
};

export type RoleType = {
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  slots: number;
  accepted: null | string;
  event: string;
  eventUsers: EventUserType[];
};

export type CategoryType = {
  "@id": string;
  "@type": string;
  id: number;
  slug: string;
  name: string;
};

export type MediaType = {};

export type SubscriptionType = {
  "@id": string;
  "@type": string;
  code: string;
  description: string;
  id: number;
  maxEvent: number;
  maxFundraising: number;
  maxGrantFundraising: number;
  maxMedia: number;
  maxVolunteeringEvent: number;
  name: string;
  originalPrice: string;
  price: string;
};

export type ProjectType = {
  "@id": string;
  "@type": string;
  id: number;
  slug: string;
  title: string;
  type: string;
  link: string | null;
  description: string;
  shortDescription: string | null;
  state: string;
  isEnabled: boolean;
  isFeatured: boolean;
  contact: ContactType;
  goalAmount: string;
  currentAmount: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  owner: OwnerType;
  images: ImageType[];
  categories: CategoryType[];
  approvedAt: null;
};

export type PaginationType = {
  first: number;
  current: number;
  last: number;
  previous: number;
  next: number;
  totalItems: number;
  itemsPerPage: number;
};

export type BannerPositionType = {
  "@id": string;
  id: number;
  code: string;
  name: string;
};
