export interface Dashboard {
  languages: Statisticians[];
  Total: Statisticians;
}

export interface Statisticians {
  files: number;
  code: number;
  comment: number;
  blank: number;
  total: number;
  name?: string;
}
