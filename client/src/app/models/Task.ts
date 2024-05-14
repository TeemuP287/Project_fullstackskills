export class Task {
  _id: string | null;
  title: string;
  description: string;
  completed: boolean;
day: string;
reminder: boolean;

  constructor(_id: string | null, title: string, description: string, completed: boolean, day: string, reminder: boolean) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.day = day;
    this.reminder = reminder;
  }
}
