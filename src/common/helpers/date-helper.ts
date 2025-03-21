export class DateHelper {
  static isSameDay(date: Date, date1: Date) {
    return (
      date.getDate() === date1.getDate() &&
      date.getMonth() === date1.getMonth() &&
      date.getFullYear() === date1.getFullYear()
    );
  }

  static isTomorrow(date: Date): boolean {
    const today: Date = new Date();
    const tomorrow: Date = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  }
}
