export type ActionResponse = {
  success?: boolean;
  error?: {
    form?: string[];
    name?: string[];
  };
};
