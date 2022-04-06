export class BaseSearchModel {
  public id?: number;
  public searchACondition?: string;
  public fromDate?: Date;
  public toDate?: Date;
  public pageIndex?: number;
  public pageSize?: number;
  public orderBy?: string;
  public isDesc?: boolean;
}
