export type ProductType = undefined | 'hotel' | 'str' | 'car' | 'activity'

export type Config = {
  defaultPaths: {
    components: {
      global: string;
      hotel: string;
      str: string;
      car: string;
      activity: string;
    };
    pages: string;
    layouts: string;
  };
} | undefined