export class FetchService {

  private static readonly API_URL: string = 'http://localhost:8080/v1';

  public static async get<T>(url: string): Promise<T | undefined> {
    try {
      const init: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        keepalive: true,
        mode: 'cors',
        signal: AbortSignal.timeout(30000)
      };

      const response: Response = await fetch(`${FetchService.API_URL}${url}`, init);

      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.log('Error in FetchService.get()', e);
    }
  }

  public static async post<T>(url: string, data: Record<string, any>): Promise<T | undefined> {
    try {
      const body: string = JSON.stringify(data);

      const init: RequestInit = {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': String(body.length)
        },
        redirect: 'follow',
        keepalive: true,
        mode: 'cors',
        signal: AbortSignal.timeout(30000)
      };

      const response: Response = await fetch(`${FetchService.API_URL}${url}`, init);

      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.log('Error in FetchService.post()', e);
    }
  }

  public static async put<T>(url: string, data: Record<string, any>): Promise<T | undefined> {
    try {
      const body: string = JSON.stringify(data);

      const init: RequestInit = {
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': String(body.length)
        },
        redirect: 'follow',
        keepalive: true,
        mode: 'cors',
        signal: AbortSignal.timeout(30000)
      };

      const response: Response = await fetch(`${FetchService.API_URL}${url}`, init);

      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.log('Error in FetchService.put()', e);
    }
  }

  public static async delete(url: string): Promise<void> {
    try {
      const init: RequestInit = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        keepalive: true,
        mode: 'cors',
        signal: AbortSignal.timeout(30000)
      };

      await fetch(`${FetchService.API_URL}${url}`, init);
    } catch (e) {
      console.log('Error in FetchService.delete()', e);
    }
  }

}
