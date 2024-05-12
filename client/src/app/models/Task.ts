export class Task {
  _id: string | null;
  title: string;
  description: string;
  completed: boolean;

  constructor(_id: string | null, title: string, description: string, completed: boolean) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}
