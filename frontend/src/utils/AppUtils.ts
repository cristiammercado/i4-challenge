export class AppUtils {

  private constructor() {
  }

  public static readId(id: string | undefined): number {
    try {
      if (id) {
        return parseInt(id)
      }
    } catch (e) {
      return -1;
    }
    return -1;
  };

}
