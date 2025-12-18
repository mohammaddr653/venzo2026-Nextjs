//we dont need to extend with document type in subdocuments
export interface DiscountObj {
  offer: number;
  startedAt: Date | null;
  expiredAt: Date | null;
}
