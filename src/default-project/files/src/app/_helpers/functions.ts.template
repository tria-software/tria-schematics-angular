export class Functions {
  public onlyNumber(event: any, allowComman: boolean = false) {
    if (allowComman && event.keyCode === 44) return true;
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
      return true;
    } else if (key < 48 || key > 57) {
      return false;
    } else {
      return true;
    }
  }

  public getDateTodaySeparate(): { day: number; month: number; year: number } {
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day: day, month: month, year: year };
  }

  public convertDateToSeparateDate(date: Date): { day: number; month: number; year: number } {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day: day, month: month, year: year };
  }
}
