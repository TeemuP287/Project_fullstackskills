export class Task {
  _id: string | null;
  title: string;
  description: string;
  completed: boolean;
  day: string;
  reminder: boolean;
  created_at: Date;
  updated_at: Date | null;

  constructor(
    _id: string | null,
    title: string,
    description: string,
    completed: boolean,
    day: string,
    reminder: boolean,
    created_at: Date,
    updated_at: Date | null = null // Asetetaan oletusarvo null
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.day = day;
    this.reminder = reminder;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Staattinen metodi oletustehtävän luomiseen
  static createDefaultTask(): Task {
    return new Task(null, '', '', false, '', false, new Date(), null);
  }
}